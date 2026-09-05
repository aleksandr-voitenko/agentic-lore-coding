<!-- Agentic Lore Coding v22 -->

# Lore commit format

Read before writing or validating a Lore task message. Historical readers need only the interpretation guide in discovery. This specification does not authorize staging or committing.

## Required structure

```text
<Type>: concise task subject

Context:
Why the task exists and which constraints matter.

Implementation:
What changed and why the chosen approach matters.

Verification:
Specific behavior checked, actual results, and limitations.

Lore-ID: LC-YYYYMMDD-XXXX
Lore-Link: LC-YYYYMMDD-XXXX — reason this related task matters
```

The subject is the first meaningful line. Optional scope uses `<Type>(<scope>): concise task subject`. Scopes are lower-case words or numbers separated by single spaces or hyphens. Use a scope for a module, game, service, or feature area only when it aids navigation.

The body has exactly these non-empty sections, in this order: `Context:`, `Implementation:`, `Verification:`. Use plain section labels, not Markdown `#` headings (Git editors can treat them as comments). The actual commit message must not include enclosing code fences or assistant wrapper prose. Fences in this document only illustrate the format.

End with one required `Lore-ID:` and any useful `Lore-Link:` trailers. Trailers form one contiguous final block; no free-form text follows them. Omit links only when no historical task provides useful context.

## Task types

Use the most specific type describing the task's primary purpose, not incidental supporting work.

```text
Feature        New user-visible or system-visible capability
Improvement    Better existing behavior without a distinct new capability
Bug fix        Correction of broken, incorrect, or unintended behavior
Refactor       Implementation restructuring with no intended behavior change
Revert         Undoing a previous change
Formatting     Formatting-only change
Mechanical     Minor mechanical change with no intended behavior change
Dependency     Dependency addition, removal, or update
Database       Schema, migration, index, backfill, or data-shape change
CI             CI/CD, release automation, or automated checks
Build          Build tooling, bundling, compilation, or build scripts
Test           Test-only change
Docs           Documentation-only change
Config         Project, environment, tool, or runtime configuration
Security       Security, privacy, permissions, or abuse resistance
Performance    Speed, memory, bundle size, latency, or scalability
Accessibility  Accessibility behavior or semantics
Chore          Repository maintenance that does not fit another type
```

Use `Chore:` sparingly. A feature with database work is `Feature:`; a bug fix with supporting refactoring is `Bug fix:`; a dependency update with compatibility edits is `Dependency:`. Tests accompanying a feature/fix keep its primary type; test-only work is `Test:`. Split unrelated UI cleanup or formatting from a behavior change.

Prefer subjects describing completed outcomes:

```text
Feature(snake): Add timed yellow apples
Improvement(tetris): Center next-piece preview
Bug fix(leaderboard): Prevent duplicate submissions
Refactor(scores): Extract shared formatting helper
```

Avoid vague subjects such as `Update component`, `Fix bug`, or `Refactor stuff`.

## Task identity and links

Use `Lore-ID: LC-YYYYMMDD-XXXX`, with the task date and a four-character uppercase alphanumeric random suffix, unless repository tooling explicitly defines another format. The supplied validator expects that form. Check reachable history before using an ID; generate another if it is already used. A commit hash identifies one exact Git object; a Lore ID identifies the logical task.

Repeated `Lore-Link: LC-YYYYMMDD-XXXX — reason` lines are allowed. Use an em dash separator and a non-empty reason naming the inherited behavior, constraint, decision, or test strategy. Verify that the target record exists and is reachable from the target history. Inspect ambiguous matches; do not fabricate IDs or link mechanically to every blamed change.

A link is a semantic dependency, not merely a nearby-line edit. Useful links can concern behavior, data models, APIs, UI, tests, configuration, architecture, or constraints. Older records can contain a legacy `Links:` section with hashes; follow it when reading history but write new records with Lore trailers.

## Context

Explain the previous state, problem/opportunity, desired outcome, and important constraints. Include material assumptions, alternatives, or rejected directions only when they clarify the decision. Keep implementation details here only when needed to explain a constraint.

Good: a Tetris preview looked top-left aligned because source coordinates were rendered in a visible 4x4 grid; it should be centered without changing piece definitions or gameplay.

Weak: updated a component to compute a bounding box (that describes implementation, not the task's purpose).

For fixes, describe incorrect and expected behavior and the cause when known. For refactors, explain the benefit and unchanged-behavior intent. For reverts, explain why the earlier decision is being undone.

## Implementation

Explain the completed solution, important affected files/components/interfaces, supporting tests and documentation, and why the chosen layer or approach matters. Be specific enough to understand the solution without the full diff, but do not narrate it line by line. Place detailed test results in `Verification:`.

Good: compute the next tetromino's occupied bounding box in the sidebar and position its blocks around the preview center, retaining piece definitions and accessible labeling. This explains the approach and its boundary.

Describe new behavior for features, how the cause is addressed for fixes, and unchanged-behavior intent for refactors. Mention actual memory updates. Put implementation consequences of material assumptions here.

## Verification

Record honest, concrete, reproducible, behavior-specific acceptance evidence. Each important behavior needs a matching check. Include the relevant command and observed result when it helps reproduce the check; describe what manual/UI verification actually demonstrated.

Good: deterministic tests cover timed-food placement beside safe obstacle cells, fallback placement when those cells are unsafe, and unchanged placement for other food; the named test command passed with the observed count.

Weak: a list of `npm test`, `npm run build`, and server startup with no behavior or outcomes.

Never copy example counts as real results. Include failures, expected checks not run, and their reasons/impact. Omit routine passing lint/build/format/smoke checks unless the task concerns them, they are the only meaningful verification, or they affected the task. Do not list every imaginable unrun check. A standard check does not replace acceptance evidence. Put assumption-related checks here.

## Type-specific reminders

For a bug fix, include the test gap, cause when known, and regression evidence or justified alternative. For refactors/formatting/mechanical changes, state unchanged-behavior intent and verification. For reverts, link the reverted Lore task when available and explain adjustments. For dependencies, cover compatibility; for databases, migration/rollback and existing data. For CI/build changes, verify the affected workflow or artifact. For test-only tasks, name the risk and exact command/result. For docs, state no runtime change unless generation affects runtime. For security/performance/accessibility, provide evidence specific to the concern.
