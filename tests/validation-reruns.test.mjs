import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

// Selected written-contract regressions, not an evaluator of agent behavior.
// Use the same baseline override as task-brief-contract.test.mjs.
const root = resolve(process.env.LORE_TEST_ROOT ?? resolve(dirname(fileURLToPath(import.meta.url)), '..'));
const text = readFileSync(resolve(root, '.lore-coding/instructions/verification.md'), 'utf8');

function requirePhrases(source, phrases) {
  for (const phrase of phrases) assert.ok(source.includes(phrase), `Missing verification guidance: ${phrase}`);
}

function rerunEvidence(source = text) {
  requirePhrases(source, [
    "A rerun under different conditions provides evidence for that rerun; it does not erase a failure under the repository's expected validation conditions.",
    'A passing isolated or reduced-concurrency run alone does not establish that the original required check passes.',
  ]);
}

function causalEvidence(source = text) {
  requirePhrases(source, [
    'Distinguish observed failures from suspected causes.',
    'Do not call a failure pre-existing or unrelated to the patch without supporting evidence.',
    'An unchanged file path alone does not establish either conclusion.',
  ]);
}

function summaryEvidence(source = text) {
  requirePhrases(source, [
    'When shortening the report, preserve direct acceptance evidence and any unresolved required-validation failure.',
    'State whether the expected check passed, remains failing, or was not completed, and identify changed-condition successes separately.',
  ]);
}

test('diagnostic passes do not erase failures under expected conditions', () => {
  rerunEvidence();
});

test('changes in execution conditions and the original check status are recorded', () => {
  requirePhrases(text, [
    'When changing worker count, test selection, environment, timeouts, or other relevant conditions, record what changed and whether the expected check remains unresolved.',
  ]);
});

test('failure attribution distinguishes observations from causal hypotheses', () => {
  causalEvidence();
  requirePhrases(text, [
    'A comparable unchanged-baseline run can show that a failure also occurs there; it does not by itself prove the patch has no effect.',
    'When evidence is insufficient, state the uncertainty.',
  ]);
});

test('legitimate recovery is allowed without weakening checks or losing earlier evidence', () => {
  requirePhrases(text, [
    'Diagnostic reruns do not authorize weakening checks or unrelated repairs; follow the existing scope and authorization rules.',
    'A later successful run under the expected conditions establishes a pass for that run. Preserve earlier failure evidence and disclose unresolved intermittency or uncertainty rather than claiming an unestablished fix.',
  ]);
});

test('short completion reports retain direct evidence and unresolved required validation', () => {
  summaryEvidence();
  requirePhrases(text, [
    'Include material verification limitations before user review',
    'These are content requirements, not mandatory headings or a fixed status vocabulary.',
    'Do not invent an exhaustive list of every possible unrun check.',
  ]);
});

test('a mutation allowing an isolated pass to replace the normal gate is detected', () => {
  rerunEvidence();
  const mutated = text.replace(
    'A passing isolated or reduced-concurrency run alone does not establish that the original required check passes.',
    'An isolated pass replaces the failing normal gate.',
  );
  assert.notEqual(mutated, text);
  assert.throws(() => rerunEvidence(mutated), /original required check/);
});

test('a mutation declaring failures in untouched files unrelated is detected', () => {
  causalEvidence();
  const mutated = text.replace(
    'An unchanged file path alone does not establish either conclusion.',
    'Failures in unchanged files are unrelated to the patch.',
  );
  assert.notEqual(mutated, text);
  assert.throws(() => causalEvidence(mutated), /unchanged file path/);
});

test('a mutation hiding the unresolved gate in a short report is detected', () => {
  summaryEvidence();
  const mutated = text.replace(
    'When shortening the report, preserve direct acceptance evidence and any unresolved required-validation failure.',
    'When shortening the report, omit earlier failures after any successful rerun.',
  );
  assert.notEqual(mutated, text);
  assert.throws(() => summaryEvidence(mutated), /unresolved required-validation failure/);
});
