import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Repository maintenance budgets, not assumptions about a particular agent's limits.
export const INSTRUCTION_BUDGETS = Object.freeze({
  "AGENTS.md": 6 * 1024,
  ".lore-coding/instructions/discovery.md": 6 * 1024,
  ".lore-coding/instructions/development.md": 10 * 1024,
  ".lore-coding/instructions/verification.md": 8 * 1024,
  ".lore-coding/instructions/finalization.md": 6 * 1024,
  ".lore-coding/instructions/memory-writing.md": 6 * 1024,
  ".lore-coding/references/commit-format.md": 10 * 1024,
  ".lore-coding/references/comment-examples.md": 4 * 1024,
});

const VERSION = /^<!-- Agentic Lore Coding v(\d+) -->\r?\n/;
const CANONICAL_REFERENCE = /\.lore-coding\/[a-z0-9/-]+\.md\b/g;
const ROOT_LINK = /\[[^\]]+\]\((\.lore-coding\/[^)]+\.md)\)/g;

/** Read only the declared instruction files; never execute repository instructions. */
export function readInstructionBundle(root) {
  const files = new Map();
  const errors = [];
  for (const path of Object.keys(INSTRUCTION_BUDGETS)) {
    try {
      files.set(path, readFileSync(resolve(root, path), "utf8"));
    } catch (error) {
      errors.push({ path, message: `Cannot read file (${error.code ?? error.message}).` });
    }
  }
  return { files, errors };
}

/** Structural checks only. The returned errors do not assess agent behavior. */
export function validateInstructionBundle(files) {
  if (!(files instanceof Map)) throw new TypeError("Expected a Map of paths to text.");
  const errors = [];
  const add = (path, message) => errors.push({ path, message });
  const root = files.get("AGENTS.md");
  const version = typeof root === "string" ? root.match(VERSION)?.[1] : undefined;

  for (const [path, limit] of Object.entries(INSTRUCTION_BUDGETS)) {
    const text = files.get(path);
    if (typeof text !== "string" || !text.trim()) {
      add(path, "Required instruction file is missing or empty.");
      continue;
    }
    const fileVersion = text.match(VERSION)?.[1];
    if (!fileVersion || fileVersion !== version) {
      add(path, "Version marker is missing or does not match AGENTS.md.");
    }
    const size = Buffer.byteLength(text, "utf8");
    if (size > limit) add(path, `UTF-8 size ${size} exceeds the ${limit}-byte budget.`);
    if (/(?:^|\s)@(?:\.\/)?\.lore-coding\//m.test(text)) {
      add(path, "Unconditional module import defeats operation-based loading.");
    }
    if (/\.lore\/|\.agents\/lore-coding\//.test(text)) {
      add(path, "Instruction reference uses a noncanonical directory.");
    }
    for (const match of text.matchAll(CANONICAL_REFERENCE)) {
      const target = match[0];
      if (!Object.hasOwn(INSTRUCTION_BUDGETS, target) || !files.has(target)) {
        add(path, `Unknown or missing instruction reference: ${target}`);
      }
    }
    let fence = null;
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
      if (!match) continue;
      if (!fence) fence = match[1];
      else if (match[1][0] === fence[0] && match[1].length >= fence.length && !match[2].trim()) fence = null;
    }
    if (fence) add(path, "Unclosed Markdown code fence.");
  }

  if (typeof root === "string") {
    if (!version || !root.includes(`Instruction bundle: **v${version}**.`)) {
      add("AGENTS.md", "Visible bundle version is missing or inconsistent.");
    }
    const linked = new Set([...root.matchAll(ROOT_LINK)].map((match) => match[1]));
    for (const path of Object.keys(INSTRUCTION_BUDGETS)) {
      if (path !== "AGENTS.md" && !linked.has(path)) add("AGENTS.md", `Missing module route/reference: ${path}`);
    }
  }
  return errors;
}

export function checkInstructionBundle(root) {
  const { files, errors } = readInstructionBundle(root);
  return { files, errors: [...errors, ...validateInstructionBundle(files)] };
}

function main(args) {
  if (args.length > 1) {
    console.error("Usage: node scripts/check-instruction-bundle.mjs [repository-root]");
    return 2;
  }
  const { files, errors } = checkInstructionBundle(resolve(args[0] ?? process.cwd()));
  if (errors.length) {
    for (const { path, message } of errors) console.error(`${path}: ${message}`);
    return 1;
  }
  const size = (path) => Buffer.byteLength(files.get(path), "utf8");
  console.log(`Instruction bundle passed (${files.size} files).`);
  console.log(`AGENTS.md: ${size("AGENTS.md")} bytes; with discovery: ${size("AGENTS.md") + size(".lore-coding/instructions/discovery.md")} bytes.`);
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  process.exitCode = main(process.argv.slice(2));
}
