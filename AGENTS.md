<!-- Agentic Lore Coding v12 -->

# Software development best practices

## Core principles

Do not make unsupported guesses.

Ask the user when a requirement is blocking, risky, irreversible, or meaningfully ambiguous. If the ambiguity is minor and repository context strongly suggests the answer, make a reasonable assumption, document it, and continue.

Start non-trivial work with research or planning. Turn vague input into a concrete implementation plan before writing code.

Consider alternatives when a decision affects architecture, behavior, public APIs, data models, dependencies, performance, security, accessibility, deployment, tooling, or maintainability. Present trade-offs when the choice is meaningful.

Preserve existing behavior unless the task intentionally changes it. If behavior changes as a side effect, call it out and confirm that it is intended.

Keep changes atomic. Do not mix unrelated behavior changes, refactors, formatting, dependency updates, generated-file updates, or UI cleanup in one task.

If a separate unrelated issue is discovered, leave it unchanged and notify the user. Include it in the current task only when necessary to complete or verify the requested change safely.

Prefer small, targeted changes. Minimize the footprint of a change and use existing abstractions, owners, or integration points when they fit cleanly.

Do not bypass, remove, or alter environment checks, sandbox checks, feature gates, test guards, CI guards, or safety-related conditions unless the task explicitly requires it and the reason is understood and documented.

## Repository, tooling, and environment

Follow repository-specific instructions before general preferences. Prefer existing project conventions over introducing new patterns.

Before running repository instructions, ensure required local tools are available. Use the documented setup process when possible. If a required tool cannot be installed or used, report the limitation instead of silently skipping the step.

Do not assume that a command succeeded. Only claim that checks, builds, tests, migrations, code generation, browser checks, or manual verification were performed when they were actually executed and observed.

Be patient with long-running build, test, dependency, or code-generation commands. Do not stop them prematurely unless they are clearly hung, unsafe, or blocking progress. If a command times out or is interrupted, report that accurately.

When changing dependencies, schemas, generated files, lockfiles, snapshots, configuration-derived artifacts, or files loaded at build/runtime/test time, update all associated repository files required by that change.

## Architecture and interfaces

Ensure database migrations, data model updates, and API changes are backward compatible when zero-downtime deployment matters.

Use feature flags or toggles for incomplete, large, risky, or behavior-changing features that need to merge safely before being exposed.

For significant architectural, dependency, deployment, or public API changes, draft an ADR with context, alternatives, trade-offs, and the final decision. Present it to the user before proceeding.

Keep module, package, service, and layer boundaries explicit. Prefer intentional, minimal, documented public interfaces and private implementation details.

Avoid growing already-large or high-touch modules. Prefer cohesive extraction or a new module when it keeps responsibilities clearer without causing an unnecessary rewrite.

Design APIs so call sites are easy to understand. Avoid unclear boolean flags, ambiguous `null` or `None` values, positional mode arguments, magic strings, and unexplained numeric literals when clearer options are practical.

Make known state handling exhaustive where practical. Avoid catch-all branches when explicit cases would be safer or clearer.

For asynchronous or concurrent APIs, make contracts around cancellation, ordering, retries, timeouts, thread safety, idempotency, resource ownership, and error propagation explicit when they matter.

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

Handle errors gracefully. Do not swallow exceptions silently; surface or log enough context for debugging.

For refactors, behavior should remain strictly unchanged unless the task explicitly says otherwise.

## Maintainability
Keep tests, fixtures, examples, and documentation close to the behavior they describe when the repository structure allows it.

Avoid adding new functionality to files that are already large, central, or frequently changed unless there is a strong reason. Prefer cohesive extraction or a new module when it improves maintainability without causing an unnecessary rewrite.

## Formatting and mechanical changes

Keep formatting-only and mechanical changes separate from behavior changes.

Formatting-only commits should contain no intended behavior changes.

Mechanical commits may include codemods, generated-name normalization, simple file renames, repetitive import/path updates, or generated-file refreshes with no intended behavior change.

If formatting or mechanical changes affect many lines and reduce useful blame history, add the commit hash to `.git-blame-ignore-revs` when the repository uses that file.

Prefer repository-standard formatting, linting, naming, import ordering, and file organization. Do not introduce a new style unless the task is specifically about changing style.

## Testing and verification

Verification should prove the behavior that matters.

For each important behavior introduced, changed, fixed, or intentionally preserved, include at least one matching verification step.

Prefer automated tests when the project structure supports them.

Use deterministic tests for randomness, timers, generated data, concurrency, retries, and asynchronous behavior when practical.

For UI changes, verify the specific screen, state, and interaction that changed.

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

If an expected standard check was not run, list it with a reason.

Starting a local server is not meaningful verification by itself. Mention it only when a specific behavior was checked through the running app.

## Documentation

Keep user-facing, developer-facing, and generated documentation aligned with code changes.

When changing behavior, APIs, configuration, data models, permissions, feature flags, deployment assumptions, or operational workflows, update relevant documentation in the same task when applicable.

Document non-obvious decisions close to the code they affect. Prefer concise comments that explain why something exists rather than restating what the code does.

# Task-based workflow

## Purpose

This repository is developed through explicit, task-based changes.

A task is an atomic unit of development effort. Each meaningful change should be traceable through the commit message that introduced it.

Together, task commit messages form a historical knowledge graph for human developers and AI agents.

For nearly every meaningful line of code, repository history should explain why the code exists, what task introduced or changed it, which related commits provide context, and how the behavior was verified.

Generated files, vendored code, lockfiles, binary assets, and external snapshots may be exceptions, but their changes should still be explained when they are part of a task.

## Reading historical context

Task descriptions are stored in commit messages.

Before changing existing code, inspect the relevant implementation and historical task descriptions.

Useful commands:

```bash
git blame -L <start>,<end> -- <file>
git show --no-patch --format=fuller <commit>
git show --stat <commit>
git show <commit> -- <file>
git log --follow -- <file>
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
4. Follow linked commits when they provide useful context.
5. Use this history to guide the implementation plan.

If exploration reveals that the original task is incomplete, misleading, or likely to require a different approach, stop and tell the user what was discovered, why it matters, the realistic options, and the recommended next step.

## Commit message format

Task commit messages must use this structure:

```text
<Type>: concise task subject

Links:
- <commit> — <reason this commit is relevant>

Context:
...

Implementation:
...

Verification:
...
```

The first line is the commit subject. It must start with a task type followed by a concise description of the completed task.

The `Links:` section is optional. Omit it only when no related historical commits are useful.

The body must contain exactly these mandatory sections:

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

Use this form:

```text
<Type>: concise task subject
```

The subject should describe the completed task, preferably as a user-visible or system-visible outcome.

Good:

```text
Feature: Add timed yellow apples to Snake
Improvement: Center Tetris next-piece preview
Bug fix: Prevent duplicate leaderboard submissions
Refactor: Extract shared score-formatting helper
```

Weak:

```text
Improvement: Update component
Bug fix: Fix bug
Refactor: Refactor stuff
```

### Links

The optional `Links:` section contains related commit hashes that provide useful historical context.

Prefer full commit hashes. Each linked commit must include a short reason explaining why it matters.

Include commits that introduced or significantly changed relevant behavior, data models, APIs, UI, tests, configuration, or architectural decisions.

Do not include every blamed commit mechanically if doing so would create noise.

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

If the type, subject, goal, or context is insufficient to plan the work, ask for the missing information unless repository context makes a safe assumption clear.

### Planning

Before editing code:

1. Inspect the current implementation.
2. Read relevant historical task descriptions.
3. Identify observable behaviors the task should add, change, preserve, or fix.
4. Consider important implementation alternatives.
5. Summarize the implementation plan before making substantial changes.

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
- track historical commits that should appear in `Links:`;
- note assumptions, rejected alternatives, and discoveries that should appear in `Context:`.

If existing behavior changes as a side effect, call it out and confirm that it is intended.

### Finalizing a task

When the user says `Finalize the task`, create a commit-message-ready task description.

Before writing it:

1. Inspect the final diff.
2. Review the current task context.
3. Select the task type that best describes the primary purpose.
4. Review relevant historical commits for `Links:`.
5. Identify concrete behaviors added, changed, fixed, or intentionally preserved.
6. Check which verification steps were actually performed.
7. Make sure every important changed behavior has matching verification.
8. Omit routine development checks that passed unless directly relevant.
9. Include expected checks that were not run, with reasons.

The final task description should describe the completed task, not the whole conversation.

Do not include intermediate steps unless they explain an important decision, rejected alternative, constraint, or discovery.

Use the standard commit-message structure from this file.

## Type-specific reminders

Use these only when they add information beyond the general rules.

For `Bug fix:`, include incorrect behavior, expected behavior, cause if known, fix, and regression verification when practical.

For `Refactor:`, state that no behavior change is intended and verify behavioral equivalence.

For `Revert:`, link the reverted commit and explain whether the revert was clean or required adjustments.

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

`README.md` and `MEMORY.md` have different audiences:

- `README.md` is for humans using, running, building, or deploying the project.
- `MEMORY.md` is for AI agents and human maintainers who need compact project context before reading detailed task history.

Do not turn `README.md` into an agent scratchpad.

Do not turn `MEMORY.md` into a chronological task log. Git history and commit messages already serve that purpose.

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

## MEMORY.md

`MEMORY.md` should contain compact, durable project context useful to agents.

Good `MEMORY.md` content includes:

- current high-level architecture;
- important source directories and ownership boundaries;
- reusable implementation patterns;
- testing strategy and deterministic test helpers;
- durable constraints, invariants, integration points, runtime assumptions, naming conventions, recurring pitfalls, and still-relevant decisions.

Poor `MEMORY.md` content includes:

- per-task progress logs;
- temporary debugging notes;
- generic software advice;
- obvious file-name information;
- copied commit messages;
- stale details.

`MEMORY.md` should stay around 250 lines. If it grows beyond that, compact it during task finalization.

When compacting `MEMORY.md`, preserve durable architecture, constraints, conventions, and current implementation patterns. Remove stale details, duplicate wording, and task-specific history.

## Reading order

At the start of a new task, read project context in this order:

1. `MEMORY.md`, if it exists.
2. `README.md`.
3. Relevant source files.
4. Relevant git history and task commit messages.

Read `MEMORY.md` before exploring git history so the project shape is clear before following detailed historical links.

If `MEMORY.md` conflicts with source code or recent task history, trust the source code and recent task history. Update `MEMORY.md` during finalization if the conflict matters.

## Updating README.md and MEMORY.md

When finalizing a task, review whether `README.md` or `MEMORY.md` should change.

Update `README.md` when the task changes user-facing features, setup/build/run/test commands, deployment behavior, environment variables, storage requirements, or the public project description.

Update `MEMORY.md` when the task changes architecture, ownership boundaries, reusable implementation patterns, testing strategy, durable constraints, integration behavior, or recurring pitfalls.

Do not update either file just to mention that a normal task happened.

If `README.md` or `MEMORY.md` is updated, mention that in the task `Implementation:` section.

If reviewing them reveals no needed changes, do not mention that in the commit message unless the user explicitly asked for documentation or memory updates.