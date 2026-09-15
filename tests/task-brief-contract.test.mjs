import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

// Targeted prose/routing regressions, not an LLM evaluator or a semantic parser.
// LORE_TEST_ROOT allows the identical assertions to be run against a baseline export.
const root = resolve(process.env.LORE_TEST_ROOT ?? resolve(dirname(fileURLToPath(import.meta.url)), '..'));
const paths = {
  root: 'AGENTS.md',
  discovery: '.lore-coding/instructions/discovery.md',
  development: '.lore-coding/instructions/development.md',
  verification: '.lore-coding/instructions/verification.md',
  finalization: '.lore-coding/instructions/finalization.md',
  memory: '.lore-coding/instructions/memory-writing.md',
  format: '.lore-coding/references/commit-format.md',
};
const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, readFileSync(resolve(root, path), 'utf8')]));

function contains(file, phrases, source = files) {
  for (const phrase of phrases) {
    assert.ok(source[file].includes(phrase), `${paths[file]} must retain: ${phrase}`);
  }
}

function briefAuthority(source = files) {
  contains('development', [
    'The brief summarizes the user\'s request and verified applicable requirements; it is not a new source of authority.',
    'An omission or mistaken interpretation in the brief does not override those sources.',
    'Do not silently weaken acceptance conditions to match the implementation.',
  ], source);
}

function reportEvidence(source = files) {
  contains('verification', [
    'Distinguish implementation completeness from verification coverage.',
    'Do not describe an unmet or unverified condition as satisfied.',
    'A passing check supports only the behavior it actually exercises.',
  ], source);
}

const contracts = [
  ['the root establishes a brief before referring to it and names its storage', () => {
    contains('root', [
      'Before implementing a task, state its material outcomes, scope boundaries, and task-relevant preservation requirements in a concise task brief.',
      'Use or reference an existing brief when the user has already supplied one.',
      'Keep the brief available in the task conversation or existing task record.',
      'Before reporting completion, compare the result and verification evidence',
    ]);
    assert.doesNotMatch(files.root, /Retain this task brief/i);
  }],
  ['standalone brief preparation loads development, without authorizing edits', () => {
    const route = files.root.split('\n').find(line => line.includes('[Development]'));
    assert.match(route, /Preparing or revising a task brief/);
    contains('development', ['Read before preparing or revising a task brief', 'Writing a brief does not grant new permissions.']);
    contains('discovery', ['Before preparing or revising a task brief']);
  }],
  ['the brief covers outcomes, preservation, boundaries, and acceptance', () => {
    contains('development', [
      '**Outcome:**', '**Preserve:**', '**Boundaries:**', '**Acceptance evidence:**',
      'Separate the task brief from the implementation approach.',
    ]);
  }],
  ['a brief is not permission to narrow or invent requirements', () => briefAuthority()],
  ['preservation requirements are scoped and do not freeze existing bugs', () => {
    contains('development', [
      'Current implementation alone does not establish intended behavior.',
      'Listing selected invariants does not waive the obligation to avoid unrelated regressions.',
      'An exclusion does not excuse supporting work needed to meet the task\'s requirements.',
    ]);
  }],
  ['presentation stays lightweight without delaying assumptions or demanding approval', () => {
    contains('development', [
      'The brief does not replace or delay the initial standalone `Assumptions:` block.',
      'One sentence can suffice for a trivial task',
      'No separate brief file, mandatory headings, or additional approval round is required.',
      'When scope is clear and the work is authorized, present the brief and continue.',
    ]);
  }],
  ['material revisions remain visible and follow existing scope controls', () => {
    contains('development', [
      'Record material revisions and their reasons in the task conversation or existing task record.',
      'Obtain clarification or approval where the existing assumption and authorization rules require it.',
      'Revisit the task brief, plan, implementation, and expected test results',
    ]);
  }],
  ['handoffs carry the brief rather than assuming conversation persistence', () => {
    contains('development', ['include or reference the latest brief, material revisions, their source anchors, and available acceptance evidence']);
    contains('root', ['any established task brief and its material revisions']);
  }],
  ['completion-only sessions can recover requirements without inventing agreement', () => {
    contains('verification', [
      'Recover the latest task brief and material revisions from the task conversation or existing task record.',
      'Do not infer prior agreement from the final diff',
      'Completion-only sessions use these reporting rules without needing to load development solely to report results.',
    ]);
  }],
  ['reports distinguish delivery, evidence, and unverified conditions', () => reportEvidence()],
  ['review reports require useful decisions, not invented choices or fixed forms', () => {
    contains('verification', [
      'what was delivered relative to the brief',
      'material deviations, failures, and unverified acceptance conditions',
      'Do not invent a decision to fill a template',
      'Raise blocking or scope-changing decisions when discovered, not only at completion.',
      'These are content requirements, not mandatory headings or a fixed status vocabulary.',
    ]);
  }],
  ['finalization checks requirements and changes made after review', () => {
    contains('finalization', [
      'Recover the latest supported task brief and its material revisions',
      'Compare the final diff with the supported outcomes, scope boundaries, and preservation requirements',
      'disclose it before committing and obtain any further approval required',
      'A request to draft or explain a message does not authorize staging or committing.',
    ]);
  }],
  ['task-specific boundaries do not become permanent project policy', () => {
    contains('memory', [
      'A task brief is temporary task context, not a mandatory memory entry.',
      'A task-specific exclusion or preservation requirement does not automatically become repository-wide policy.',
    ]);
  }],
  ['the existing commit sections carry requirements and evidence without new fields', () => {
    contains('format', [
      'Summarize material task outcomes, preservation requirements, and supported scope revisions here when relevant.',
      'do not introduce new required sections, fields, or trailers.',
      'Map acceptance evidence and remaining gaps to the supported task outcomes and preservation requirements.',
    ]);
  }],
];

for (const [name, check] of contracts) test(name, check);

test('removing the brief-authority safeguard is detected even when other guidance survives', () => {
  briefAuthority();
  const mutated = { ...files, development: files.development.replace(
    'An omission or mistaken interpretation in the brief does not override those sources.',
    'Only the agent-written brief determines the accepted scope.',
  ) };
  assert.throws(() => briefAuthority(mutated), /does not override/);
});

test('replacing evidence discipline with an unsupported success claim is detected', () => {
  reportEvidence();
  const mutated = { ...files, verification: files.verification.replace(
    'Do not describe an unmet or unverified condition as satisfied.',
    'A passing test suite establishes full task completion.',
  ) };
  assert.throws(() => reportEvidence(mutated), /unmet or unverified/);
});

test('existing assumptions, memory timing, decision context, and permissions remain present', () => {
  contains('root', ['At the beginning of each distinct task, you must display a standalone `Assumptions:` block', 'A condition prompts review, not automatic change', 'A request to draft a message is not permission to commit.']);
  contains('development', ['Before reporting an implementation or documentation task ready for user review', 'reconcile task-relevant memory']);
  contains('verification', ['### Assumptions in completion reports', 'briefly state both the earlier assumption and the final one']);
  contains('memory', ['Summarization and compaction must not turn conditional choices into unconditional rules.']);
  contains('finalization', ['A draft-only request authorizes review and disclosure of gaps, not edits.']);
});

test('module links still refer to the existing modules and do not eagerly import them', () => {
  const expected = new Set([...Object.values(paths).filter(path => path.startsWith('.lore-coding/')), '.lore-coding/references/comment-examples.md']);
  const routes = [...files.root.matchAll(/\]\((\.lore-coding\/[^)]+\.md)\)/g)].map(match => match[1]);
  assert.deepEqual(new Set(routes), expected);
  for (const text of Object.values(files)) {
    assert.doesNotMatch(text, /(?:^|\s)@\.?\/?\.lore-coding\//m);
    for (const match of text.matchAll(/\.lore-coding\/[a-z0-9/-]+\.md\b/g)) assert.ok(expected.has(match[0]), match[0]);
  }
});
