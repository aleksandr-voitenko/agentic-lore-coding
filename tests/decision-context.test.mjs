import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { validateLoreCoding } from "../.githooks/lore-coding.mjs";

// Targeted wording/routing checks, not a semantic-equivalence engine or a live
// agent evaluation. LORE_REVIEW_ROOT permits testing an exported older revision.
const root = resolve(process.env.LORE_REVIEW_ROOT ?? resolve(dirname(fileURLToPath(import.meta.url)), ".."));
const A = "AGENTS.md";
const D = ".lore-coding/instructions/development.md";
const R = ".lore-coding/instructions/discovery.md";
const M = ".lore-coding/instructions/memory-writing.md";
const F = ".lore-coding/instructions/finalization.md";
const V = ".lore-coding/instructions/verification.md";
const C = ".lore-coding/references/commit-format.md";
const E = ".lore-coding/references/comment-examples.md";
const files = new Map([A, D, R, M, F, V, C, E, "README.md"].map(path => [path, readFileSync(resolve(root, path), "utf8")]));
function contains(path, text, source = files) {
  assert.ok(source.get(path)?.includes(text), `${path} must retain: ${text}`);
}
function preservesQualifications(source = files) {
  contains(M, "Do not turn a conditional design choice into an unconditional rule.", source);
  contains(M, "Compaction must preserve qualifications that affect when a decision applies.", source);
}
function preservesAuthority(source = files) {
  contains(R, "A reconsideration condition prompts review, not automatic reversal or new authorization.", source);
}

test("the root retains material decision evidence without preloading authoring modules", () => {
  contains(A, "rationale, supporting evidence, scope, relevant assumptions, and identified reconsideration conditions");
  contains(R, "Do not load finalization or commit-format instructions merely to explore history.");
  contains(A, "Do not preload all modules");
});

test("capture is bounded to material decisions and happens when they are made", () => {
  contains(D, "For material decisions likely to guide future work");
  contains(D, "Capture this evidence when the decision is made or revised");
  contains(D, "not a mandatory template for routine local choices");
  contains(D, "Do not reconstruct unsupported rationale from the completed implementation.");
});

test("conditions are not fabricated requirements, thresholds, deadlines, or permissions", () => {
  contains(D, "Do not invent thresholds, deadlines, or future requirements");
  contains(D, "Distinguish explicit requirements, design choices, and working assumptions.");
  contains(D, "does not authorize reversing the decision or changing task scope");
  contains(D, "does not make a decision permanent");
});

test("historical decisions receive evidence checks before plans and test expectations", () => {
  contains(D, "memory claims or historical decisions");
  contains(D, "Before committing to a plan or choosing expected test results");
  contains(R, "Before a historical decision materially guides the task");
  contains(R, "same evidence and intent distinctions used for memory claims");
  contains(D, "Revisit the plan, implementation, and expected test results");
});

test("discovery looks for later revisions rather than treating old or newer text as authority", () => {
  contains(R, "Look for later relevant records, including incoming Lore links");
  contains(R, "A newer timestamp or an unexplained code difference does not establish an authorized replacement.");
  contains(R, "without treating the whole earlier task as superseded");
  preservesAuthority();
});

test("missing rationale and unchanged conditions do not cause invention or blanket audits", () => {
  contains(R, "If the rationale or relevant history is unavailable");
  contains(R, "do not invent a justification");
  contains(R, "continue independent work supported by verified evidence");
  contains(R, "not a requirement to reopen every decision or audit all history");
});

test("memory and compaction preserve reasons and applicability, not just conclusions", () => {
  preservesQualifications();
  contains(M, "rationale, scope, relevant assumptions, and identified reconsideration conditions");
  contains(M, "A future condition is not a verified claim that it has occurred.");
});

test("pre-review reconciliation covers changed decision bases and affected copies", () => {
  contains(M, "before reporting the result ready for user review");
  contains(M, "rationale, scope, or assumptions changed even when the implementation did not");
  contains(M, "including qualifications on affected copies");
  contains(D, "reconcile task-relevant memory, and retain its review evidence");
});

test("source pointers before finalization do not require a nonexistent commit", () => {
  contains(M, "Do not invent or require a future Lore ID or commit before review");
  contains(M, "available source anchors and retained task evidence");
  contains(M, "during authorized finalization when useful");
});

test("finalization rechecks later changes without inventing rationale or rewriting history", () => {
  contains(F, "including changes made after user review");
  contains(F, "rationale, scope, relevant assumptions, and identified reconsideration conditions");
  contains(F, "unsupported explanations inferred during finalization");
  contains(F, "Do not rewrite historical records.");
  contains(F, "A draft-only request authorizes review and disclosure of gaps, not edits.");
});

test("Context and existing semantic links carry decisions without a schema extension", () => {
  contains(C, "Record material decision rationale, scope, relevant assumptions, and identified reconsideration conditions in `Context:`.");
  contains(C, "Do not add a required section or trailer");
  contains(C, "A `Lore-Link` reason may identify a decision revised or superseded by the task.");
  contains(C, "which decision and scope changed");
  contains(C, "exactly these non-empty sections");
});

test("verification separates observed evidence from future conditions", () => {
  contains(V, "Recording a future condition does not mean it was tested or satisfied.");
  contains(V, "does not require implementing or testing an out-of-scope future feature");
  contains(V, "Only report tests, builds, migrations, browser/manual checks, or user verification actually executed and observed.");
});

test("examples and README explain the conditional-decision distinction", () => {
  contains(E, "We chose X because Y");
  contains(E, "Always use X");
  contains(E, "original scope and relevant qualifications");
  contains("README.md", "conditions that would justify reviewing them as the project evolves");
});

test("dropping compaction qualifications is rejected by the targeted assertion", () => {
  const mutated = new Map(files);
  mutated.set(M, files.get(M).replace("Compaction must preserve qualifications that affect when a decision applies.", "Compaction may keep only the chosen approach."));
  assert.throws(() => preservesQualifications(mutated), /Compaction must preserve/);
});

test("turning a review condition into automatic reversal is rejected", () => {
  const mutated = new Map(files);
  mutated.set(R, files.get(R).replace("A reconsideration condition prompts review, not automatic reversal or new authorization.", "Reverse the decision whenever its condition is met."));
  assert.throws(() => preservesAuthority(mutated), /not automatic reversal/);
});

test("all instruction references resolve and modules remain unversioned", () => {
  for (const [path, text] of files) {
    if (path.startsWith(".lore-coding/")) assert.doesNotMatch(text, /<!-- Agentic Lore Coding v/);
    for (const match of text.matchAll(/\.lore-coding\/(?:instructions|references)\/[a-z-]+\.md/g)) {
      assert.ok(files.has(match[0]), `${path}: missing ${match[0]}`);
    }
  }
  assert.equal(readFileSync(resolve(root, "CLAUDE.md"), "utf8"), "@AGENTS.md\n");
});

// This fixture checks Git retrieval and trailer compatibility, not whether an
// LLM follows the prose. All writes are confined to a disposable repository.
function git(cwd, ...args) {
  return execFileSync("git", ["-c", "commit.gpgsign=false", "-c", `core.hooksPath=${resolve(cwd, "unused-hooks")}`, ...args], {
    cwd, encoding: "utf8", env: { ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))),
      GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: resolve(cwd, "unused-global-config"),
      GIT_AUTHOR_NAME: "Lore test", GIT_AUTHOR_EMAIL: "lore-test@example.invalid",
      GIT_COMMITTER_NAME: "Lore test", GIT_COMMITTER_EMAIL: "lore-test@example.invalid" },
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}
function message(id, context, link = "") {
  return `Docs(decisions): Record fixture decision\n\nContext:\n${context}\n\nImplementation:\nNo application changes in this retrieval fixture.\n\nVerification:\nThis record is test data, not a report of application checks.\n\nLore-ID: ${id}${link ? `\nLore-Link: ${link}` : ""}\n`;
}

test("incoming links and the existing validator preserve scoped revision history", async () => {
  const cwd = mkdtempSync(resolve(tmpdir(), "lore-decisions-"));
  try {
    git(cwd, "init", "--initial-branch=main");
    git(cwd, "commit", "--allow-empty", "-m", message("LC-20260914-AA01", "Room state is volatile because restart recovery is not required. Room identifiers remain opaque. Reconsider persistence if restart recovery becomes required."));
    const earlier = git(cwd, "rev-parse", "HEAD");
    git(cwd, "checkout", "-b", "recovery");
    git(cwd, "commit", "--allow-empty", "-m", message("LC-20260914-BB02", "An explicit new requirement adds restart recovery. Persistence replaces volatile storage; opaque identifiers remain required.", "LC-20260914-AA01 — revises only the storage decision after restart recovery becomes required"));
    const revised = git(cwd, "rev-parse", "HEAD");
    const search = ["log", "--format=%H", "--fixed-strings", "--grep=Lore-Link: LC-20260914-AA01"];
    assert.equal(git(cwd, ...search, earlier), "");
    assert.equal(git(cwd, ...search, "main"), "");
    assert.equal(git(cwd, ...search, "recovery"), revised);
    const body = git(cwd, "show", "--no-patch", "--format=%B", revised);
    assert.equal((await validateLoreCoding(body, { cwd, targetCommit: earlier })).valid, true);
    const missing = await validateLoreCoding(body.replace("Lore-Link: LC-20260914-AA01", "Lore-Link: LC-20260914-ZZ09"), { cwd, targetCommit: earlier });
    assert.ok(missing.errors.some(error => error.code === "LORE047"));
    assert.match(body, /opaque identifiers remain required/);
    assert.match(body, /revises only the storage decision/);
    const trailers = execFileSync("git", ["interpret-trailers", "--parse"], { cwd, input: body, encoding: "utf8" });
    assert.deepEqual(trailers.trim().split("\n").map(line => line.split(":")[0]), ["Lore-ID", "Lore-Link"]);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});


test("decision conditions fit Context without adding a section or weakening the validator", async () => {
  const body = message("LC-20260914-CC03", "Volatile state is appropriate while restart recovery is not required. Reconsider if that requirement changes; this is not permission to change it.");
  assert.equal((await validateLoreCoding(body)).valid, true);
  const invalid = await validateLoreCoding(body.replace("Verification:", "Future checks:"));
  assert.ok(invalid.errors.some(error => error.code === "LORE020"));
});
