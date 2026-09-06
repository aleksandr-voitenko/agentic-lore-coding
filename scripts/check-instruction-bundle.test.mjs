import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { INSTRUCTION_BUDGETS, readInstructionBundle, validateInstructionBundle } from "./check-instruction-bundle.mjs";
import { LORE_TASK_TYPES, validateLoreCoding } from "../.githooks/lore-coding.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const discovery = ".lore-coding/instructions/discovery.md";
const finalization = ".lore-coding/instructions/finalization.md";
const cli = resolve(root, "scripts/check-instruction-bundle.mjs");
function fixture() {
  const { files, errors } = readInstructionBundle(root);
  assert.deepEqual(errors, []);
  return files;
}
function hasError(files, path, pattern) {
  assert.ok(validateInstructionBundle(files).some((error) => error.path === path && pattern.test(error.message)));
}

test("the distributed instruction bundle satisfies its structural contract", () => {
  assert.deepEqual(validateInstructionBundle(fixture()), []);
});

test("a missing required module is rejected", () => {
  const files = fixture();
  files.delete(finalization);
  hasError(files, finalization, /missing or empty/);
});

test("an empty required module is rejected", () => {
  const files = fixture();
  files.set(discovery, "\n");
  hasError(files, discovery, /missing or empty/);
});

test("modules do not require individual version markers", () => {
  const files = fixture();
  for (const [path, text] of files) {
    if (path !== "AGENTS.md") files.set(path, text.replace(/^<!-- Agentic Lore Coding v\d+ -->\r?\n(?:\r?\n)?/, ""));
  }
  assert.deepEqual(validateInstructionBundle(files), []);
});

test("legacy module labels are not compared with the root version", () => {
  const files = fixture();
  const text = files.get(discovery).replace(/^<!-- Agentic Lore Coding v\d+ -->\r?\n(?:\r?\n)?/, "");
  files.set(discovery, "<!-- Agentic Lore Coding v999999 -->\n\n" + text);
  assert.deepEqual(validateInstructionBundle(files), []);
});

test("a root bundle version change does not require module edits", () => {
  const files = fixture();
  files.set("AGENTS.md", files.get("AGENTS.md")
    .replace(/Coding v\d+/, "Coding v999999")
    .replace(/Instruction bundle: \*\*v\d+\*\*\./, "Instruction bundle: **v999999**."));
  assert.deepEqual(validateInstructionBundle(files), []);
});

test("distributed modules do not repeat the bundle version marker", () => {
  for (const [path, text] of fixture()) {
    if (path !== "AGENTS.md") assert.doesNotMatch(text, /<!-- Agentic Lore Coding v\d+ -->/, path);
  }
});

test("a missing root version marker is rejected", () => {
  const files = fixture();
  files.set("AGENTS.md", files.get("AGENTS.md").replace(/^<!--[^\n]+-->\n/, ""));
  hasError(files, "AGENTS.md", /Version marker/);
});

test("the root budget is measured in UTF-8 bytes, not character count", () => {
  const files = fixture();
  const text = files.get("AGENTS.md");
  const remaining = INSTRUCTION_BUDGETS["AGENTS.md"] - Buffer.byteLength(text, "utf8");
  files.set("AGENTS.md", text + "é".repeat(Math.floor(remaining / 2) + 1));
  hasError(files, "AGENTS.md", /UTF-8 size/);
});

test("module growth beyond its own budget is rejected", () => {
  const files = fixture();
  files.set(finalization, files.get(finalization) + "x".repeat(INSTRUCTION_BUDGETS[finalization]));
  hasError(files, finalization, /UTF-8 size/);
});

test("dangling canonical references are rejected", () => {
  const files = fixture();
  files.set(discovery, files.get(discovery) + "\nSee `.lore-coding/instructions/missing.md`.\n");
  hasError(files, discovery, /Unknown or missing instruction reference/);
});

test("an existing module omitted from the root routing table is rejected", () => {
  const files = fixture();
  files.set("AGENTS.md", files.get("AGENTS.md").split("\n").filter((line) => !line.includes(`(${finalization})`)).join("\n"));
  hasError(files, "AGENTS.md", /Missing module route/);
});

test("eager import syntax is rejected", () => {
  const files = fixture();
  files.set("AGENTS.md", files.get("AGENTS.md") + "\n@.lore-coding/instructions/finalization.md\n");
  hasError(files, "AGENTS.md", /Unconditional module import/);
});

test("the old proposed namespace is rejected", () => {
  const files = fixture();
  files.set(discovery, files.get(discovery) + "\nRead .lore/instructions/finalization.md\n");
  hasError(files, discovery, /noncanonical directory/);
});

test("an unclosed code example is rejected", () => {
  const files = fixture();
  files.set(discovery, files.get(discovery) + "\n```bash\ngit status\n");
  hasError(files, discovery, /Unclosed Markdown/);
});

test("the CLI succeeds on the repository bundle", () => {
  const output = execFileSync(process.execPath, [cli, root], { encoding: "utf8" });
  assert.match(output, /Instruction bundle passed \(8 files\)/);
});

test("the CLI reports missing files and fails outside a complete installation", () => {
  const empty = mkdtempSync(resolve(tmpdir(), "lore-bundle-test-"));
  try {
    const result = spawnSync(process.execPath, [cli, empty], { encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /AGENTS\.md: Cannot read file/);
    assert.match(result.stderr, /finalization\.md: Cannot read file/);
  } finally {
    rmSync(empty, { recursive: true, force: true });
  }
});


test("inline eager imports are also rejected", () => {
  const files = fixture();
  files.set("AGENTS.md", files.get("AGENTS.md") + "\nAlso read @.lore-coding/instructions/finalization.md\n");
  hasError(files, "AGENTS.md", /Unconditional module import/);
});

test("the visible version remains available when HTML comments are stripped", () => {
  const files = fixture();
  files.set("AGENTS.md", files.get("AGENTS.md").replace(/Instruction bundle: \*\*v\d+\*\*\./, ""));
  hasError(files, "AGENTS.md", /Visible bundle version/);
});


test("the authoring reference preserves every supported validator task type", () => {
  const text = readFileSync(resolve(root, ".lore-coding/references/commit-format.md"), "utf8");
  const block = text.match(/## Task types[\s\S]*?```text\n([\s\S]*?)```/);
  assert.ok(block, "Expected the documented task-type catalogue.");
  const types = block[1].trim().split("\n").map((line) => line.split(/\s{2,}/)[0]);
  assert.deepEqual(types, LORE_TASK_TYPES);
});

test("the existing validator accepts the retained schema and rejects a missing section", async () => {
  const message = "Docs(instructions): Split task procedures into modules\n\nContext:\nStartup loaded unrelated procedures.\n\nImplementation:\nSeparated operation-specific instructions.\n\nVerification:\nChecked module routing and references.\n\nLore-ID: LC-20260906-MOD1\n";
  assert.equal((await validateLoreCoding(message)).valid, true);
  assert.equal((await validateLoreCoding(message.replace("Verification:", "Testing:"))).valid, false);
});


test("the module reference stays compact and links every module", () => {
  const text = readFileSync(resolve(root, "docs/modular-instructions.md"), "utf8");
  assert.ok(Buffer.byteLength(text, "utf8") <= 3 * 1024, "Keep the module reference within 3 KiB.");
  const linked = [...text.matchAll(/\]\(\.\.\/(\.lore-coding\/[^)]+\.md)\)/g)].map((match) => match[1]);
  const expected = Object.keys(INSTRUCTION_BUDGETS).filter((path) => path !== "AGENTS.md");
  assert.deepEqual(linked.sort(), expected.sort());
});
