<!-- Agentic Lore Coding v17 -->

# Introduction
You are working in an Agentic Lore Coding environment.

# Instruction strength

Use these meanings throughout this file:

- **Must** means required unless impossible in the current environment or explicitly overridden by the user.
- **Should** means expected for normal work, but may be skipped when repository context makes it inappropriate.
- **Prefer** means a default style or design preference, not a hard rule.

When instructions conflict, follow safety and repository-specific requirements first, then task traceability, then general preferences.

# Software development principles

## Core guidelines

Do not make unsupported guesses.

Start non-trivial work with research or planning. Turn vague input into a concrete implementation plan before writing code. Identify important working assumptions and separate them from open questions that would change the plan.

Consider alternatives when a decision affects architecture, behavior, public APIs, data models, dependencies, performance, security, accessibility, deployment, tooling, or maintainability.

Keep changes atomic. Do not mix unrelated behavior changes, refactors, formatting, dependency updates, generated-file updates, or UI cleanup in one task. Minimize the footprint of a change and use existing abstractions, owners, or integration points when they fit cleanly.

If a separate unrelated issue is discovered, leave it unchanged and notify the user. Include it in the current task only when necessary to complete or verify the requested change safely.

Do not bypass, remove, or alter environment checks, sandbox checks, feature gates, test guards, CI guards, or safety-related conditions unless the task explicitly requires it and the reason is understood and documented.

## Semantic sanity gate

Before implementing any task, check whether the literal request makes sense for the current product, game, domain, and user-facing experience.

Do not convert a nonsensical request into a plausible feature by inventing an interpretation. The existence of a low-risk implementation does not make the assumption safe.

In these cases, respond with:
1. why the request appears inconsistent with the current game or product;
2. one or two plausible interpretations;
3. a direct clarification question.

Proceed without asking only when the user explicitly confirms that the oddity is intentional.

## Repository, tooling, and environment

Follow repository-specific instructions before general preferences. Prefer existing project conventions over introducing new patterns. Preserve existing behavior unless the task intentionally changes it. If behavior changes as a side effect, call it out and confirm that it is intended.

Before running repository instructions, ensure required local tools are available. Use the documented setup process when possible. If a required tool cannot be installed or used, report the limitation instead of silently skipping the step.

Do not assume that a command succeeded. Only claim that checks, builds, tests, migrations, code generation, browser checks, or manual verification were performed when they were actually executed and observed.

Be patient with long-running build, test, dependency, or code-generation commands. Do not stop them prematurely unless they are clearly hung, unsafe, or blocking progress. If a command times out or is interrupted, report that accurately.

When changing dependencies, schemas, generated files, lockfiles, snapshots, configuration-derived artifacts, or files loaded at build/runtime/test time, update all associated repository files required by that change.

## Architecture and interfaces

Ensure database migrations, data model updates, and API changes are backward compatible when zero-downtime deployment matters.

In large codebases, use feature flags or toggles when incomplete, large, risky, or behavior-changing work needs to merge safely before being exposed.

For significant durable decisions, consider an ADR. This is especially useful for architectural, dependency, deployment, public API, data model, or security decisions that future maintainers will need to understand. Present it to the user before proceeding when the decision materially affects the task direction.

Keep module, package, service, and layer boundaries explicit. Prefer intentional, minimal, documented public interfaces and private implementation details.

Design APIs so call sites are easy to understand. Avoid unclear boolean flags, ambiguous `null` or `None` values, positional mode arguments, magic strings, and unexplained numeric literals when clearer options are practical.

Make known state handling exhaustive where practical. Avoid catch-all branches when explicit cases would be safer or clearer.

For asynchronous or concurrent APIs, make contracts around cancellation, ordering, retries, timeouts, thread safety, idempotency, resource ownership, and error propagation explicit when they matter.

## Assumption management

Treat assumptions as part of the work. User prompts may omit important details. When that happens, identify the missing information and decide whether to ask, infer, or proceed with a documented assumption.

### Mandatory assumption checkpoint

Before making code edits for any non-trivial task, the surface working assumptions in a short standalone `Assumptions:` section.

The section must include:

- `Safe assumptions:` low-risk assumptions the agent will proceed with
- `Material assumptions:` assumptions that affect behavior, UX, APIs, data, architecture, tests, or user-facing meaning
- `Blocking assumptions:` assumptions that require confirmation before editing

If there are no assumptions in a category, say `None`.

Material assumptions must be explicitly justified with repository evidence. If the evidence is weak, ambiguous, or based mainly on interpreting the user's intent, treat the assumption as blocking and ask before editing.

Do not hide assumptions inside a general plan. They must be visible as assumptions.

### Assumption escalation triggers

Treat the following as material or blocking assumptions by default:

- the request seems joke-like, absurd, contradictory, or cross-domain.
- the request would add behavior that does not fit the current product.
- the implementation is easy but the purpose is unclear.

Low implementation risk does not make an assumption safe.

### Documenting assumption
Do not document trivial assumptions in final task messages. Document only assumptions that materially shaped the solution.

In final task descriptions:

- put task-shaping assumptions in `Context:`
- put implementation consequences of assumptions in `Implementation:`
- put checks related to assumptions in `Verification:`

## Code quality

Prefer clear, maintainable code over clever code.

Use names that describe behavior or intent and align with surrounding codebase vocabulary.

Avoid unnecessary abstractions. Add abstractions when they reduce duplication, clarify intent, improve testability, isolate meaningful domain concepts, or make future changes safer.

Do not create small helpers referenced only once unless they meaningfully improve readability, isolate complexity, or preserve a clear boundary.

Keep implementation details local when possible. Avoid large rewrites unless required by the task.

Prefer existing abstractions and ownership boundaries over parallel mechanisms.

Simplify control flow when it improves readability. Use idiomatic language features for formatting, mapping, iteration, resource management, and error handling.

Prefer comparing complete values or meaningful structured outputs in tests instead of asserting many fields one by one, unless field-level assertions produce clearer failures.

Update nearby obsolete comments, docstrings, examples, or inline documentation when modifying related code, while preserving atomic task scope.

Handle errors gracefully. Do not swallow exceptions silently.

Write useful error messages. Include what failed, why it likely failed when that can be inferred safely, and the relevant identifier, request, file path, user action, operation, or external service context. Do not expose secrets or sensitive data in errors or logs.

For refactors, behavior should remain strictly unchanged unless the task explicitly says otherwise.

Keep tests, fixtures, examples, and documentation close to the behavior they describe when possible. Avoid growing large, central, or high-touch modules without a strong reason; prefer cohesive extraction when it improves maintainability without causing an unnecessary rewrite.

## Formatting and mechanical changes

Keep formatting-only and mechanical changes separate from behavior changes.

Formatting-only commits should contain no intended behavior changes.

Mechanical commits may include codemods, generated-name normalization, simple file renames, repetitive import/path updates, or generated-file refreshes with no intended behavior change.

If formatting or mechanical changes affect many lines and reduce useful blame history, add the commit hash to `.git-blame-ignore-revs` when the repository uses that file.

Prefer repository-standard formatting, linting, naming, import ordering, and file organization. Do not introduce a new style unless the task is specifically about changing style.

## Testing and verification

Verification should prove the behavior that matters.

For each important behavior introduced, changed, fixed, or intentionally preserved, include at least one matching verification step.

Prefer automated tests when the project structure supports them. If the number of tests grows and the technology stack allows measuring test coverage, suggest that the user add it and set recommended thresholds to fail the CI build.

Use deterministic tests for randomness, timers, generated data, concurrency, retries, and asynchronous behavior when practical.

For UI changes, verify the specific screen, state, and interaction that changed. Prefer user-visible behavior over implementation details. Mention DOM classes, element counts, screenshots, pixel measurements, or console output only when they are meaningful acceptance evidence. If screenshots are mentioned, they should be attached to a review, or otherwise recoverable; otherwise describe the manual visual comparison. Use meaningful tolerances such as "within sub-pixel tolerance" unless an exact number matters.

For API or data-model changes, verify relevant request, response, migration, compatibility, documentation, generated schema/client, and error behavior.

For accessibility changes, verify relevant focus, keyboard, semantic, label, contrast, reduced-motion, or screen-reader-visible behavior.

For performance changes, include measurements or before-and-after evidence when practical.

For configuration and dependency changes, verify affected defaults, overrides, schemas, lockfiles, generated metadata, build files, compatibility constraints, and documentation when applicable.

Do not claim that tests, builds, migrations, browser checks, or user verification were performed unless they were actually executed and observed.

When a check cannot be run because of local environment, missing tools, sandbox restrictions, time constraints, or external services, say so clearly and explain the impact.

## Standard development checks

Standard development checks are expected during development, but they are not a substitute for behavior-specific verification.

Examples include linting, typechecking, building, formatting checks, dependency or lockfile checks, generated-file consistency checks, `git diff --check`, smoke-starting the local app, and checking that a local route returns HTTP 200.

Do not list standard checks in every task description when they pass.

List standard checks only when:

- the task is about that check, build step, formatter, CI behavior, dependency setup, code generation, or project setup;
- the check is the only meaningful verification for the task;
- the check failed and affected the task;
- the check was expected but was not run.

A standard check is expected when repository documentation, package scripts, task type, changed files, or user request make it the normal validation path. Do not list every possible unrun check.

If an expected standard check was not run, list it with a reason.

Starting a local server is not meaningful verification by itself. Mention it only when a specific behavior was checked through the running app.

## Documentation

Keep user-facing, developer-facing, and generated documentation aligned with code changes.

When changing behavior, APIs, configuration, data models, permissions, feature flags, deployment assumptions, or operational workflows, update relevant documentation in the same task when applicable.

Document non-obvious decisions close to the code they affect. Prefer concise comments that explain why something exists rather than restating what the code does.

When useful, document invariants, edge cases, external constraints, compatibility requirements, data-shape assumptions, timing assumptions, or integration contracts that are not obvious from the code alone.

# Agentic Lore Coding protocol

## Purpose

Lore Coding is a Git-native development protocol for preserving task context in repository history.

A task is an atomic unit of development effort. Each meaningful change should be recorded as a structured task commit with context, implementation summary, verification evidence, a stable `Lore-ID:` trailer, and optional `Lore-Link:` trailers to related tasks.

Together, task commit messages and their trailers form a historical knowledge graph for human developers and AI agents.

For nearly every meaningful line of code, repository history should explain why the code exists, what task introduced or changed it, which related tasks provide context, and how the behavior was verified.

Generated files, vendored code, lockfiles, binary assets, and external snapshots may be exceptions, but their changes should still be explained when they are part of a task.

## Reading historical context

Task descriptions are stored in commit messages. Stable task identity and task relationships are stored in Git trailers at the end of those messages.

Before changing existing code, inspect the relevant implementation and historical task descriptions.

Useful commands:

```bash
git blame -L <start>,<end> -- <file>
git show --no-patch --format=fuller <commit>
git show --stat <commit>
git show <commit> -- <file>
git log --follow -- <file>
git show --no-patch --format=%B <commit> | git interpret-trailers --parse
git log --all --grep="Lore-ID: <lore-id>"
```

When files have been renamed or moved, use history-following commands where appropriate.

For formatting-only or mechanical commits, look past the mechanical commit to the meaningful earlier task when possible.

If the repository uses `.git-blame-ignore-revs`, prefer:

```bash
git blame --ignore-revs-file .git-blame-ignore-revs -- <file>
```

When exploring history:

1. Identify the relevant file, symbol, route, component, function, schema, test, or configuration.
2. Use blame and log history to find commits that introduced or significantly changed it.
3. Read the full commit messages for those commits.
4. Parse the `Lore-ID:` and any `Lore-Link:` trailers from those commits.
5. Follow linked Lore IDs when they provide useful context.
6. Use this history to guide the implementation plan.

When resolving a `Lore-Link:`, find the linked task by searching commit messages for its `Lore-ID:` trailer. If multiple commits contain the same Lore ID, inspect them and prefer the one that is reachable from the current branch history unless the task requires another branch.

If exploration reveals that the original task is incomplete, misleading, or likely to require a different approach, stop and tell the user what was discovered, why it matters, the realistic options, and the recommended next step.

## Commit message format

Task commit messages must use this structure:

```text
<Type>: concise task subject

Context:
...

Implementation:
...

Verification:
...

Lore-ID: LC-YYYYMMDD-XXXX
Lore-Link: LC-YYYYMMDD-XXXX — reason this related task is relevant
```

The first line is the commit subject. It must start with a task type followed by a concise description of the completed task. It may include an optional scope when that improves navigation:

```text
<Type>(<scope>): concise task subject
```

Use a scope for a feature area, module, package, game, service, or subsystem. Omit it when it would add noise.

`Lore-ID:` is required and identifies the logical task. `Lore-Link:` is optional and repeatable. Omit `Lore-Link:` trailers only when no related historical tasks are useful. Trailers must be the final lines of the commit message.

The body must contain exactly these mandatory sections followed by trailers:

```text
Context:
Implementation:
Verification:
```

Do not use Markdown headings starting with `#` inside commit messages, because Git may treat them as comments in commit editors.

## Task types

Use the type that best describes the primary purpose of the task.

Allowed types:

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

Prefer the most specific accurate type. Use `Chore:` sparingly.

When a task touches several categories, choose the type that describes the primary purpose, not incidental supporting work.

Selection rules:

- feature with supporting database work → `Feature:`;
- bug fix with supporting refactor → `Bug fix:`;
- dependency update with compatibility edits → `Dependency:`;
- tests added as part of a feature or bug fix → keep the feature or bug-fix type;
- tests-only change → `Test:`;
- unrelated UI cleanup during a feature → separate `Improvement:` task;
- formatting mixed with behavior changes → split into separate commits.

## Commit message sections

### Subject

Use one of these forms:

```text
<Type>: concise task subject
<Type>(<scope>): concise task subject
```

The subject should describe the completed task, preferably as a user-visible or system-visible outcome. Use a scope only when it improves navigation.

Good:

```text
Feature(snake): Add timed yellow apples
Improvement(tetris): Center next-piece preview
Bug fix(leaderboard): Prevent duplicate submissions
Refactor(scores): Extract shared formatting helper
```

Weak:

```text
Improvement: Update component
Bug fix: Fix bug
Refactor: Refactor stuff
```

### Lore trailers

Task commits must end with a required `Lore-ID:` trailer. Trailers must appear after the `Verification:` section and no free-form content should follow them.

Use this format unless repository tooling defines another one:

```text
Lore-ID: LC-YYYYMMDD-XXXX
```

`Lore-ID:` identifies the logical task. The commit hash identifies one exact Git object. Use the hash for direct code exploration and the Lore ID for durable task identity.

Use optional repeated `Lore-Link:` trailers to point to related tasks:

```text
Lore-Link: LC-YYYYMMDD-XXXX — reason this related task is relevant
```

Each linked task must include a short reason explaining why it matters. Link tasks that introduced or significantly changed relevant behavior, data models, APIs, UI, tests, configuration, constraints, or architectural decisions.

Do not include every blamed task mechanically if doing so would create noise.

A `Lore-Link:` should be a semantic dependency, not merely a nearby-line edit. The reason should name the inherited behavior, constraint, design decision, or test strategy.

Older commits may still contain a legacy `Links:` section with commit hashes. When reading older history, follow those links when they provide useful context. New task commits should use `Lore-Link:` trailers instead of a `Links:` section.

### Context

The `Context:` section explains why the task exists.

Focus on:

- current state;
- problem or opportunity;
- desired behavior or outcome;
- important constraints;
- assumptions or alternatives only when they clarify the decision.

Keep implementation details out of `Context:` unless they are necessary to explain a constraint or rejected direction.

Good:

```text
Context:
The Tetris sidebar preview rendered the next tetromino inside a visible 4x4 grid using the tetromino's source coordinates. That made most next pieces appear aligned toward the top-left of the preview box, and the empty grid cells made odd- and even-sized pieces feel inconsistently placed.

The desired behavior is for the next-piece preview to look visually centered while preserving the existing tetromino definitions and gameplay behavior.
```

Weak:

```text
Context:
Updated `src/components/tetris-game.tsx` to compute a bounding box and absolutely position preview cells.
```

For bug fixes, explain the incorrect behavior, expected behavior, and cause if known.

For refactors, explain why the refactor is useful and whether behavior is intended to remain unchanged.

For reverts, explain why the original change is being reverted.

### Implementation

The `Implementation:` section explains what changed.

Mention important files, components, classes, functions, migrations, configuration changes, API changes, dependency changes, and tests when relevant.

Be specific enough that a future reader can understand the solution without reading the full diff. Do not duplicate the diff line by line.

Implementation may include design rationale when it explains why the chosen implementation layer or approach matters.

Good:

```text
Implementation:
Updated `src/components/tetris-game.tsx` so the next-piece preview computes the bounding box of the current next tetromino, normalizes its cells to that local box, and positions the four rendered blocks around the center of the preview square.

Kept the change local to the sidebar preview instead of changing `getTetrominoPreviewCells`, because the piece definitions were already correct and only the presentation needed different positioning.

Replaced the rendered 16-cell preview grid with a plain `var(--tetris-board)` background and four absolutely positioned tetromino-colored blocks. The preview keeps the existing accessible label and reuses tetromino color classes while removing empty placeholder cells from the preview surface.
```

For behavior changes, describe the new behavior.

For bug fixes, explain how the fix addresses the cause.

For refactors, state whether behavior is intended to remain unchanged.

Mention test files only as part of the changed code structure. Put detailed test coverage and test results in `Verification:`.

### Verification

The `Verification:` section explains how the completed task was checked.

Verification must be honest, concrete, reproducible, and behavior-specific.

For each important behavior introduced, changed, fixed, or intentionally preserved, include at least one matching verification item.

Prefer verification entries that describe observable behavior, not only commands.

Good:

```text
Verification:
- Added deterministic tests covering yellow apples spawning beside obstacle islands when a safe adjacent cell is available.
- Added deterministic tests covering yellow apples falling back to generic placement when obstacle-adjacent cells are unsafe.
- Added deterministic tests covering purple diamonds preserving generic timed-food placement near obstacle islands.
- Ran `npm test`; all 18 tests passed, including the new timed-food placement cases.
```

Weak:

```text
Verification:
- Ran `npm test`.
- Ran `npm run build`.
- Started the local dev server.
```

If manual verification was performed, describe the specific behavior that was checked.

If something was not verified, say so clearly and explain why.

Do not use generic checks as a substitute for behavior-specific verification.

Do not list standard development checks when they pass unless they are directly relevant. Follow the standard-check rules from the best-practices section.

## Task lifecycle

### Starting a task

When the user says `Start a new task`, treat it as the boundary of a new task, even if there was previous conversation.

When finalizing the task, gather required information from the latest `Start a new task` message onward, plus relevant repository history discovered during exploration.

If the user starts a task using this form:

```text
Start a new task: implement something useful
```

use the text after `Start a new task:` to infer a draft subject and task type.

Generate a new `Lore-ID:` for the task before finalization. Prefer `LC-YYYYMMDD-XXXX`, where the date is the task date and the suffix is a short uppercase random identifier. Verify that the ID is not already used in reachable history before using it.

If the type, subject, goal, or context is insufficient to plan the work, ask for the missing information unless repository context makes a safe assumption clear.

### Planning

Before editing code:

1. Inspect applicable `README.md` and memory files using the project-memory reading order.
2. Inspect the current implementation.
3. Read relevant historical task descriptions and Lore trailers.
4. Identify observable behaviors the task should add, change, preserve, or fix.
5. Consider important implementation alternatives.
6. Summarize the implementation plan before making substantial changes.
7. List any gaps in the user's prompt that were addressed, and describe the assumptions made.

Convert implementation goals into observable behavior.

Weak:

```text
Add bonus-food state.
```

Better:

```text
A yellow apple can appear during gameplay, awards 2 points when eaten, expires after its timeout, never overlaps other food, and is cleared when the game ends.
```

Use observable behaviors to guide implementation, tests, manual checks, and the final `Verification:` section.

### Editing code

While editing code:

- preserve existing behavior unless the task intentionally changes it;
- avoid unrelated cleanup;
- keep formatting-only changes separate where practical;
- add or update tests when the project structure supports it;
- track related historical tasks that should appear as `Lore-Link:` trailers;
- note assumptions, rejected alternatives, and discoveries that should appear in `Context:`.

If existing behavior changes as a side effect, call it out and confirm that it is intended.

### Writing post-implementation summary

When reporting completed work to the user, mention any material assumptions that shaped the solution, unless they were already disclosed in an earlier final/task-completion report for the same task and have not changed.

Assumptions disclosed only in planning notes, progress updates, or pre-edit checkpoints do not count as task-completion-report disclosure. Repeat task-shaping assumptions in the final report when they affected behavior, UX, APIs, data, architecture, tests, or user-facing meaning.

Do not include trivial assumptions that did not shape the implementation. If an assumption changed during the work, briefly state both the earlier assumption and the final one.

### Finalizing a task

When the user says `Finalize the task`, create a commit-message-ready task description.

Before writing it:

1. Inspect the final diff.
2. Review the current task context.
3. Select the task type that best describes the primary purpose.
4. Generate or confirm a unique `Lore-ID:` for the task.
5. Review relevant historical tasks for `Lore-Link:` trailers.
6. Identify concrete behaviors added, changed, fixed, or intentionally preserved.
7. Check which verification steps were actually performed.
8. Make sure every important changed behavior has matching verification.
9. Omit routine development checks that passed unless directly relevant.
10. Include expected checks that were not run, with reasons.

Before returning, check that `Context:` explains the problem and desired outcome, `Implementation:` explains the chosen solution, `Verification:` maps to acceptance evidence, routine passing checks are omitted unless relevant, `Lore-ID:` is present, and `Lore-Link:` trailers point to meaningful related tasks.

The final task description should describe the completed task, not the whole conversation.

Do not include intermediate steps unless they explain an important decision, rejected alternative, constraint, or discovery. Document only assumptions that materially shaped the solution.

Use the standard commit-message structure from this file, including the required `Lore-ID:` trailer.

## Type-specific reminders

Use these only when they add information beyond the general rules.

For `Bug fix:`, include incorrect behavior, expected behavior, cause if known, fix, and regression verification when practical.

For `Refactor:`, state that no behavior change is intended and verify behavioral equivalence.

For `Revert:`, include a `Lore-Link:` to the reverted task when available and explain whether the revert was clean or required adjustments.

For `Formatting:` and `Mechanical:`, state that no behavior change is intended. Use `.git-blame-ignore-revs` for large blame-obscuring changes when available.

For `Dependency:`, describe changed packages, compatibility work, and affected behavior verification.

For `Database:`, cover migration, rollback, existing data, and new data where practical.

For `CI:` and `Build:`, verify the affected workflow, command, or produced output.

For `Test:`, describe the risk or regression covered and include the exact test command and result.

For `Docs:`, state that no runtime behavior changed unless documentation generation affects runtime artifacts.

For `Security:`, `Performance:`, and `Accessibility:`, include evidence specific to that concern.

# Project memory management

## Purpose

Use project memory to reduce repeated rediscovery at the start of each new conversation.

`README.md` and `MEMORY.md` files have different audiences:

- `README.md` is for humans using, running, building, or deploying the project.
- `MEMORY.md` files are for AI agents and human maintainers who need compact durable context before reading detailed task history.

Do not turn `README.md` into an agent scratchpad.

Do not turn any `MEMORY.md` file into a chronological task log. Git history, task commit messages, and Lore trailers already serve that purpose.

## Hierarchical memory

A repository may contain multiple `MEMORY.md` files.

Prefer scoped memory over one large root memory file. The goal is to keep memory growth controllable by placing durable context near the code it describes.

The root `MEMORY.md` contains repository-wide context:

- high-level architecture;
- major source directories and ownership boundaries;
- cross-cutting implementation patterns;
- global testing strategy;
- durable project-wide constraints;
- important runtime, deployment, or storage assumptions;
- pointers to important child memory files.

A folder-level `MEMORY.md` contains context for that folder:

- local architecture and ownership boundaries;
- important files and immediate child folders;
- local implementation patterns;
- local testing strategy and helpers;
- local constraints, invariants, integration points, naming conventions, and recurring pitfalls.

A folder-level memory file should describe files and immediate child folders in that folder. It may describe deeper descendants only when the detail is necessary to explain a local invariant, boundary, or exception. When doing that, state why the deeper detail belongs there.

Child memory files must refine parent memory, not contradict it. If memory conflicts with source code or recent task history, trust source code and recent task history. Update the affected memory files during finalization if the conflict matters.

## Memory size and content

Keep memory files compact.

As a guideline:

- root `MEMORY.md` should stay around 150-250 lines;
- folder-level `MEMORY.md` files should stay around 80-150 lines.

If a memory file grows beyond its useful size, split or compact it during task finalization.

Good memory content includes durable architecture, ownership boundaries, reusable implementation patterns, testing strategy, deterministic helpers, constraints, invariants, integration points, runtime assumptions, naming conventions, recurring pitfalls, and still-relevant decisions.

Poor memory content includes per-task progress logs, temporary debugging notes, generic software advice, obvious file-name information, copied commit messages, and stale details.

When compacting memory, preserve durable architecture, constraints, conventions, and current implementation patterns. Remove stale details, duplicate wording, and task-specific history.

When a durable memory entry depends on a specific historical decision, include a short source pointer such as a Lore ID, commit hash, or file path. Do not copy full task descriptions into memory files.

## README.md

`README.md` should contain public, human-facing project information:

- project description and user-facing features;
- tech stack when useful;
- install, development, build, and test commands;
- deployment notes;
- important environment variables;
- persistent storage notes;
- links to other documentation when useful.

Keep `README.md` understandable without requiring knowledge of the internal task workflow.

Avoid long internal file maps in `README.md` unless they are genuinely useful to human contributors.

## Reading order

At the start of a new task, read project context in this order:

1. root `MEMORY.md`, if it exists;
2. `README.md`;
3. any `MEMORY.md` files on the path from the repository root to the target file or folder;
4. relevant source files;
5. relevant git history, task commit messages, and Lore trailers.

Read memory files from root to leaf so broad constraints are known before local details.

When exploring a new folder during implementation, check whether that folder has its own `MEMORY.md` before editing files inside it.

If a task touches multiple folders, read the memory chain for each touched path. Do not read unrelated sibling or descendant memory files unless the task touches those areas.

## Updating memory

When finalizing a task, review whether `README.md` or any relevant `MEMORY.md` files should change.

Update `README.md` when the task changes user-facing features, setup/build/run/test commands, deployment behavior, environment variables, storage requirements, or the public project description.

Update the most specific relevant `MEMORY.md` when the task changes local architecture, ownership boundaries, reusable implementation patterns, testing strategy, durable constraints, integration behavior, or recurring pitfalls.

Update parent memory only when the change affects that parent's scope. Prefer updating the lowest applicable memory file when the change is local.

Do not update memory files just to mention that a normal task happened.

If a memory file is updated, mention that in the task `Implementation:` section.

If reviewing memory reveals no needed changes, do not mention that in the commit message unless the user explicitly asked for documentation or memory updates.
