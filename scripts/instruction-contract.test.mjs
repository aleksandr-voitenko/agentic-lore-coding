import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { readInstructionBundle, validateInstructionBundle } from "./check-instruction-bundle.mjs";

// Targeted wording/routing regressions from the semantic audit of v21
// (1950f7a2c06412839d9fadc13ad5f1cf6b29793a). These assertions do not
// prove general semantic equivalence or observed coding-agent behavior.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { files, errors } = readInstructionBundle(root);
assert.deepEqual(errors, []);
const A = "AGENTS.md";
const R = ".lore-coding/instructions/discovery.md";
const D = ".lore-coding/instructions/development.md";
const V = ".lore-coding/instructions/verification.md";
const F = ".lore-coding/instructions/finalization.md";
const M = ".lore-coding/instructions/memory-writing.md";
const C = ".lore-coding/references/commit-format.md";

function includes(path, wording, source = files) {
  assert.ok(source.get(path)?.includes(wording), `${path} must retain: ${wording}`);
}

function assertMemoryReviewRoutes(source) {
  const route = source.get(A).split("\n").find((line) => line.includes(`](${M})`));
  assert.ok(route?.includes("Reviewing memory maintenance"), "Memory rules must load for the review decision, not just the write.");
  includes(M, "Read before reviewing whether memory needs changes", source);
  includes(F, `Read \`${M}\` before deciding whether README or memory needs changes`, source);
}

test("F1: memory criteria are required before the finalization review decision", () => {
  assertMemoryReviewRoutes(files);
});

test("F1: a linked but optional memory route fails the targeted regression check", () => {
  const mutated = new Map(files);
  mutated.set(A, files.get(A).split("\n").map((line) => line.includes(`](${M})`)
    ? `| Optional background reading | [Memory writing](${M}) |` : line).join("\n"));
  assert.deepEqual(validateInstructionBundle(mutated), []);
  assert.throws(() => assertMemoryReviewRoutes(mutated), /Memory rules must load/);
});

test("F1: README-only edits receive the audience and content rules through development", () => {
  for (const wording of [
    "Do not turn `README.md` into an agent scratchpad.",
    "tech stack when useful", "links to other documentation when useful",
    "without requiring knowledge of the internal task workflow",
    "Avoid long internal file maps",
  ]) includes(D, wording);
});

test("F2: eventual task recording is mandatory without granting immediate commit authority", () => {
  includes(A, "Each meaningful change must eventually be recorded as a structured task commit");
  includes(A, "only during explicit finalization");
  includes(A, "does not authorize staging or committing");
  assert.doesNotMatch(files.get(R), /Each meaningful change should/);
});

test("F3: supported code edits retain test updates and the original coverage trigger", () => {
  includes(D, "While editing code, add or update tests when the project structure supports it.");
  includes(V, "If the number of tests grows and the technology stack allows measuring test coverage");
  includes(V, "set recommended thresholds to fail the CI build");
});

test("F4: completion-only sessions receive the full assumption-reporting procedure", () => {
  includes(A, "running checks, or reporting completion | [Verification]");
  includes(V, "unless they were already disclosed in an earlier final/task-completion report for the same task and have not changed");
  includes(V, "Assumptions disclosed only in planning notes, progress updates, or pre-edit checkpoints do not count");
  includes(V, "briefly state both the earlier assumption and the final one");
  assert.doesNotMatch(files.get(V), /as required by the development instructions/);
  assert.doesNotMatch(files.get(D), /do not repeat them in another completion report/);
});

test("F5: permanent and detailed guard rules retain alterations and their narrow exception", () => {
  for (const path of [A, D, V]) {
    includes(path, "bypass, remove, or alter");
    includes(path, "unless the task explicitly requires it and the reason is understood and documented");
  }
  assert.doesNotMatch(files.get(A), /Do not bypass guards,/);
});

test("F6: suspicious requests are material or blocking by default, not categorically blocked", () => {
  includes(D, "material or blocking assumptions by default");
  includes(D, "joke-like, absurd, contradictory, or cross-domain");
  includes(D, "the implementation is easy but the purpose is unclear");
  includes(D, "If the evidence is weak, ambiguous, or based mainly on interpreting the user's intent");
  assert.doesNotMatch(files.get(D), /Treat nonsensical or cross-domain requests as blocking/);
});

test("F7: behavior-only alternatives, error causes, and colocation remain explicit", () => {
  includes(D, "affecting architecture, behavior, public APIs");
  includes(D, "Write useful error messages.");
  includes(D, "why it likely failed when that can be inferred safely");
  includes(D, "Keep tests, fixtures, examples, and documentation close to the behavior they describe when possible.");
});

test("F7: formatting blame handling and new-data verification survive finalization-only entry", () => {
  includes(D, "formatting-only or mechanical");
  includes(D, "`.git-blame-ignore-revs`");
  includes(C, "For `Formatting:` and `Mechanical:`");
  includes(C, "`.git-blame-ignore-revs`");
  for (const path of [V, C]) includes(path, "existing data, and new data where practical");
});

test("scope and recommendation strength match the original code, flag, and screenshot rules", () => {
  for (const path of [A, D]) includes(path, "Before making code edits for any non-trivial task");
  includes(D, "In large codebases, use feature flags");
  includes(V, "If screenshots are mentioned, they should be attached");
  assert.doesNotMatch(files.get(V), /Screenshots must be attached/);
});

test("blame, task type, subject, and normal checks retain preference or expectation strength", () => {
  includes(R, "When available, prefer `git blame --ignore-revs-file");
  includes(R, "earlier meaningful task when possible");
  includes(C, "Prefer the most specific accurate type.");
  includes(F, "preferably as a user-visible or system-visible outcome");
  includes(V, "Standard development checks are expected during development");
});

test("task-start metadata and tracked follow-up recommendations are retained", () => {
  includes(R, "`Start a new task: ...`");
  includes(R, "infer a draft subject and task type");
  includes(D, "Prefer creating a tracked task when follow-up work matters.");
});

test("memory review restores finalization timing and the no-change reporting prohibition", () => {
  includes(M, "Update the affected memory files during finalization if the conflict matters.");
  includes(M, "split or compact it during task finalization");
  includes(M, "do not mention that in the commit message unless the user explicitly asked for documentation or memory updates");
});

test("type reminders avoid repetition and distinguish a clean revert from adjustments", () => {
  includes(C, "Use these only when they add information beyond the general rules.");
  includes(C, "whether the revert was clean or required adjustments");
});

test("tool preflight and command patience are available without loading development", () => {
  includes(A, "Before running repository instructions, ensure required local tools are available.");
  includes(A, "Use the documented setup process when possible.");
  includes(A, "unless they are clearly hung, unsafe, or blocking progress");
});

test("test-gap identification remains required while only classification is conditional", () => {
  includes(V, "The investigation must identify why existing tests");
  includes(V, "Classify the gap when possible");
  assert.doesNotMatch(files.get(V), /Identify the gap when possible/);
});

test("comment-only runtime prohibition and explanation placement remain distinct from Docs generation", () => {
  includes(D, "It must not change runtime behavior.");
  includes(D, "state that no runtime behavior changed in `Implementation:` or `Verification:`");
  includes(V, "Comment-only work must not change runtime behavior.");
  includes(C, "unless documentation generation affects runtime artifacts");
});

test("error handling and one-use helpers retain the original boundaries", () => {
  includes(D, "Handle errors gracefully. Do not swallow exceptions silently.");
  includes(D, "Do not create small helpers referenced only once unless they meaningfully improve readability, isolate complexity, or preserve a clear boundary.");
});

test("draft-only finalization does not impose a new validator-execution prerequisite", () => {
  includes(F, "A draft-only request does not itself require executing the validator.");
  includes(F, "A request to draft or explain a message does not authorize staging or committing.");
  assert.doesNotMatch(files.get(F), /stage this task's files, inspect the staged diff/);
});

test("the compact guide describes decision-time memory loading without setup material", () => {
  const guide = readFileSync(resolve(root, "docs/modular-instructions.md"), "utf8");
  assert.match(guide, /Reviewing memory maintenance/);
  assert.ok(Buffer.byteLength(guide, "utf8") <= 3 * 1024);
  assert.doesNotMatch(guide, /^## (?:Setup|Migration|Maintenance|Evaluation)/m);
});
