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

## Proportionate detail

Scale the record to the change's meaningful complexity, consequences, and uncertainty, rather than lines changed or effort spent. For straightforward tasks, one short sentence each in `Context:` and `Implementation:` and one or two sentences in `Verification:` normally suffice. Expand only to preserve material rationale, constraints, behavior, evidence, or unresolved limitations; those details should make the need for a longer record clear.

Treat the section guidance as applicable content to select, not a checklist to fill. State each fact once in its most useful section, repeating it only to connect a requirement with evidence or explain a historical relationship. Prefer clear, complete statements over dense abbreviations. Remove generic assurances, routine process narration, and repeated explanations from linked records, while keeping essential context understandable in this message.

Shortening the record does not reduce required investigation, verification, or final review. Apply the evidence-selection rules under [Verification](#verification) when deciding which check results and limitations belong in the record.

## Task types

Use the type that best describes the task's primary purpose, not incidental supporting work. Prefer the most specific accurate type.

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

A `Lore-Link` reason may identify a revised or superseded decision. Name the affected decision and scope; explain the changed basis in `Context:`. Do not imply that unrelated decisions were superseded.

For example, an earlier task disabled retries and set a request timeout. A later task could explain in `Context:`:

> The provider now documents duplicate-request guarantees, and integration checks verify our handling. The requested change enables retries for the charge endpoint; the existing request timeout remains unchanged.

Its link would identify only the revised decision (the ID is illustrative):

```text
Lore-Link: LC-20260617-A1B2 — revises the charge endpoint's retry policy; preserves its request timeout
```

A link is a semantic dependency, not merely a nearby-line edit. Useful links can concern behavior, data models, APIs, UI, tests, configuration, architecture, or constraints. Older records can contain a legacy `Links:` section with hashes; follow it when reading history but write new records with Lore trailers.

## Context

Explain the previous state, problem/opportunity, desired outcome, and important constraints. Include material assumptions, alternatives, or rejected directions only when they clarify the decision. Keep implementation details here only when needed to explain a constraint.

Summarize material task outcomes, preservation requirements, and supported scope revisions here when relevant. Reuse concise context rather than copying the brief or conversation wholesale; do not introduce new required sections, fields, or trailers.

Record material decision context in concise prose within this section, without additional required fields, sections, or trailers. Use useful source pointers for unchanged inherited rationale instead of copying full earlier records.

Good: a Tetris preview looked top-left aligned because source coordinates were rendered in a visible 4x4 grid; it should be centered without changing piece definitions or gameplay.

Weak: updated a component to compute a bounding box (that describes implementation, not the task's purpose).

For fixes, describe incorrect and expected behavior and the cause when known. For refactors, explain the benefit and unchanged-behavior intent. For reverts, explain why the earlier decision is being undone.

## Implementation

Explain the completed solution, important affected files/components/interfaces, supporting tests and documentation, and why the chosen layer or approach matters. Be specific enough to understand the solution without the full diff, but do not narrate it line by line. Place detailed test results in `Verification:`.

Good: compute the next tetromino's occupied bounding box in the sidebar and position its blocks around the preview center, retaining piece definitions and accessible labeling. This explains the approach and its boundary.

For behavior changes, describe the new behavior. For bug fixes, explain how the fix addresses the cause. For refactors, state whether behavior is intended to remain unchanged. Mention actual memory updates. Put implementation consequences of material assumptions here.

## Verification

Record honest, concrete, reproducible, behavior-specific acceptance evidence. Each important behavior needs a matching check. Map acceptance evidence and remaining gaps to the supported task outcomes and preservation requirements. Distinguish actual delivery from what remains unmet or unverified; describe implementation in `Implementation:` rather than implying a planned check passed. Include the relevant command and observed result when it helps reproduce the check; describe what manual/UI verification actually demonstrated.

Good: deterministic tests cover timed-food placement beside safe obstacle cells, fallback placement when those cells are unsafe, and unchanged placement for other food; the named test command passed with the observed count.

Weak: a list of `npm test`, `npm run build`, and server startup with no behavior or outcomes.

Never copy example counts as real results. Include unresolved failures and limitations affecting acceptance, expected validation, or the scope of a claim; identify expected checks not completed and their reasons/impact. Retain a resolved failure when it explains the defect, a material decision, a reproduction requirement, or remaining uncertainty. Omit resolved incidental setup problems only when the final evidence applies to the task's final state and no material uncertainty remains. A success under changed conditions must not conceal an unresolved expected check.

Omit unrelated unrun checks. Omit routine passing lint/build/format/smoke checks unless the task concerns them, they are the only meaningful verification, or they affected the task. An unlisted check is unspecified: omission makes no claim that it passed, failed, or was not run. A standard check does not replace acceptance evidence. Put assumption-related checks here.

## Type-specific reminders

Use these only when they add information beyond the general rules.

For `Bug fix:`, include incorrect and expected behavior, cause when known, test-gap analysis, the fix, and regression verification when practical. For `Refactor:`, state that no behavior change is intended and verify behavioral equivalence. For `Revert:`, link the reverted Lore task when available and explain whether the revert was clean or required adjustments.

For `Formatting:` and `Mechanical:`, state that no behavior change is intended. Use `.git-blame-ignore-revs` for large blame-obscuring changes when available. For `Dependency:`, describe changed packages, compatibility work, and affected behavior verification. For `Database:`, cover migration, rollback, existing data, and new data where practical.

For `CI:` and `Build:`, verify the affected workflow, command, or produced output. For `Test:`, name the risk and exact command/result. For `Docs:`, state that no runtime behavior changed unless documentation generation affects runtime artifacts. For `Security:`, `Performance:`, and `Accessibility:`, provide evidence specific to the concern.

## Complete examples

These examples are illustrative; their IDs, commands, and results are not evidence of checks performed in this repository. Actual records must use verified task evidence and useful reachable Lore links when available.

### Straightforward wording change

The final browser check covers the changed page. An earlier occupied-port startup attempt is omitted because it no longer affects that evidence. No full end-to-end run was expected for this example task.

```text
Improvement(home): Rename related-words heading to Discover

Context:
Avoid two homepage sections beginning with Explore.

Implementation:
Change the related-words heading to Discover; align its test assertion and README.

Verification:
npm run test -- src/components/home/wordgarden-home.test.tsx: 7 passed, including label and section-order checks.
Chromium at 390×844, 768×1024, and 1365×768: readable label, no wrapping or horizontal overflow. Diff: three text replacements.

Lore-ID: LC-20261026-A1B2
```

### Small fix with a material verification gap

The tenant condition is a small code change, but its security consequence and incomplete expected validation justify the extra detail.

```text
Bug fix(reports): Enforce tenant ownership on downloads

Context:
Report lookup accepted IDs from other tenants; prior tests used only same-tenant IDs. Reports must be accessible only to their owning tenant.

Implementation:
Constrain downloads by the authenticated tenant and retain the existing not-found response for inaccessible reports. Add regression cases for same-tenant, cross-tenant, and missing reports.

Verification:
node --test test/report-access.test.mjs: the cross-tenant regression failed before the fix; all 6 cases passed afterward.
Required database integration checks could not run because the test database was unavailable; ownership enforcement against the real database remains unverified.

Lore-ID: LC-20261026-C3D4
```
