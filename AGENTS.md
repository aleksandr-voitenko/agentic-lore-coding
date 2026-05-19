<!-- Agentic Lore Coding v8 -->

# Software development best practices

## Purpose

This section describes general software development practices that apply while working on this repository.

These practices are independent from the task-recording workflow. They exist to improve implementation quality, reduce accidental regressions, and keep the codebase maintainable.

## Requirements and assumptions

Do not make unsupported guesses. If a requirement is blocking, risky, irreversible, or meaningfully ambiguous, ask the user before proceeding.

If the ambiguity is minor and the likely answer is clear from repository context, make a reasonable assumption, document it, and continue.

Preserve existing behavior unless the task intentionally changes it. If existing behavior changes as a side effect, call it out and confirm that it is intended.

## Research and planning

Start non-trivial work with research or planning.

Before editing code:

1. Inspect the current implementation.
2. Understand the relevant data flow, control flow, public API, UI behavior, or test coverage.
3. Identify the observable behaviors the task should add, change, preserve, or fix.
4. Consider important implementation alternatives.
5. Summarize the implementation plan before making substantial changes.

When important implementation choices exist, consider alternatives. Present trade-offs to the user when the decision affects architecture, behavior, public APIs, data models, dependencies, performance, security, accessibility, or maintainability.

Do not track only implementation mechanisms.

Weak:

```text
Add bonus-food state.
```

Better:

```text
A yellow apple can appear during gameplay, awards 2 points when eaten, expires after its timeout, never overlaps other food, and is cleared when the game ends.
```

Use observable behaviors to guide implementation, tests, manual checks, and final verification notes.

## Code quality

Prefer simple, direct implementations.

Avoid unnecessary abstraction, broad rewrites, speculative extensibility, and clever code that is harder to understand than the problem requires.

Keep responsibilities localized. Change the smallest reasonable surface area that solves the task correctly.

Use clear names for variables, functions, components, files, and tests. Names should describe behavior or purpose rather than implementation trivia.

Avoid unrelated cleanup. If cleanup is necessary to complete the task safely, keep it focused and explain why it was needed.

Do not add, remove, or update dependencies unless the task requires it or the user approves it.

Do not silently change public APIs, data models, persistent storage, configuration semantics, or user-visible behavior as a side effect of another task.

## Scope control

Keep work atomic.

Do not mix unrelated behavior changes, refactors, formatting, dependency updates, or UI cleanup in one task.

If a separate issue is discovered while working:

1. leave it unchanged;
2. ask whether to expand the current task;
3. or create a separate task.

A separate issue belongs in the same task only when it is necessary to complete or verify the requested change safely.

Examples of changes that usually require a separate task:

- unrelated UI cleanup;
- unrelated formatting;
- broad renaming;
- dependency updates not required by the task;
- opportunistic refactoring;
- fixing a different bug discovered during testing.

## Blame and history preservation

Preserve useful Git history.

Avoid broad unrelated rewrites that obscure meaningful `git blame` output.

Keep formatting-only and mechanical changes separate from behavior changes.

For formatting-only or mechanical commits, look past the mechanical commit to the meaningful earlier task when possible.

If the repository uses `.git-blame-ignore-revs`, prefer blame commands that respect it:

```bash
git blame --ignore-revs-file .git-blame-ignore-revs -- <file>
```

If a formatting-only or mechanical commit affects many lines and reduces the usefulness of normal blame output, add the commit hash to `.git-blame-ignore-revs` when the repository uses that file.

## Testing and verification

Add or update tests when the project structure supports it and the behavior is important enough to regress.

For each important behavior introduced, changed, fixed, or intentionally preserved, there should be at least one matching verification step.

Prefer behavior-specific verification over generic command output.

Weak:

```text
Ran the tests.
```

Better:

```text
Added deterministic tests covering yellow apples spawning beside obstacle islands when a safe adjacent cell is available.
```

For randomness, timers, asynchronous behavior, generated data, permissions, persistence, migrations, or error handling, verify the important edge cases explicitly.

When a task adds or changes tests, describe what behavior those tests cover. The existence of specific tests is important acceptance evidence.

Do not claim that tests, builds, migrations, browser checks, or user verification were performed unless they were actually performed.

## Routine development checks

Routine development checks are expected during development, but they are not always useful historical evidence when they pass.

Routine checks include:

- linting;
- typechecking;
- building;
- formatting checks;
- `git diff --check`;
- smoke-starting the local app;
- checking that a local route returns HTTP 200.

Use routine checks during development as appropriate.

In task commit messages, list routine checks only when:

- the task is specifically about that check, build step, formatter, CI behavior, or project setup;
- the check is the only meaningful verification for a formatting, mechanical, dependency, CI, build, configuration, or infrastructure task;
- the check failed and the failure affected the task;
- the check was expected but not run.

If an expected routine check was not run, state that clearly and include the reason.

Starting a local server is not meaningful verification by itself. Only mention it when a specific behavior was checked through the running app.

# Task-based workflow

## Purpose

This repository is developed through explicit, task-based changes.

A task is an atomic unit of development effort. Each meaningful change should be traceable through the commit message that introduced it. Together, these commit messages form a historical knowledge tree for human developers and AI agents.

For nearly every meaningful line of code, it should be possible to use repository history to understand:

- why the code exists;
- what task introduced or changed it;
- which related commits provide useful context;
- how the behavior was verified.

Generated files, vendored code, lockfiles, binary assets, and external snapshots may be exceptions, but their changes should still be explained when they are part of a task.

## Reading historical task context

Task descriptions are stored in commit messages.

Before changing existing code, inspect the relevant implementation and the historical task descriptions behind it.

Useful commands include:

```bash
git blame -L <start>,<end> -- <file>
git show --no-patch --format=fuller <commit>
git show --stat <commit>
git show <commit> -- <file>
git log --follow -- <file>
```

When files have been renamed or moved, use history-following commands where appropriate.

When exploring history:

1. Identify the relevant file, symbol, route, component, function, schema, test, or configuration.
2. Use blame and log history to find commits that introduced or significantly changed it.
3. Read the full commit messages for those commits.
4. Follow linked commits when they provide useful context.
5. Use this history to guide the implementation plan.

If exploration reveals that the original task is incomplete, misleading, or likely to require a different approach, stop and tell the user:

- what was discovered;
- why it matters;
- realistic implementation options;
- the recommended next step.

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

The first line is the commit subject. It must start with a short task type followed by a concise description of the completed task.

The `Links:` section is optional. Omit it only when no related historical commits are useful.

The body must contain exactly these three mandatory sections:

```text
Context:
Implementation:
Verification:
```

Do not use Markdown headings starting with `#` inside commit messages, because Git may treat them as comments in commit editors.

## Task types

Use one of these task types in the commit subject.

```text
Feature:        Add a new user-visible or system-visible capability.
Improvement:    Improve existing behavior without adding a distinct new capability.
Bug fix:        Correct incorrect, broken, or unintended behavior.
Refactor:       Restructure implementation without intended behavior changes.
Revert:         Undo a previous change.
Formatting:     Apply formatting-only changes with no intended behavior changes.
Mechanical:     Apply minor mechanical changes with no intended behavior changes.
Dependency:     Add, remove, or update dependencies.
Database:       Change schema, migrations, indexes, backfills, or data shape.
CI:             Change CI/CD workflows, release automation, or automated checks.
Build:          Change build tooling, bundling, compilation, or build scripts.
Test:           Add or update tests without changing production behavior.
Docs:           Change documentation without changing product behavior.
Config:         Change project, environment, tool, or runtime configuration.
Security:       Improve security, privacy, permissions, or abuse resistance.
Performance:    Improve speed, memory use, bundle size, latency, or scalability.
Accessibility:  Improve accessibility behavior or semantics.
Chore:          Perform repository maintenance that does not fit another type.
```

Prefer the most specific accurate type. Use `Chore:` sparingly.

When a task touches several categories, choose the type that best describes the primary purpose of the task, not incidental supporting work.

Examples:

```text
Feature: Add timed yellow apples to Snake
Improvement: Spawn yellow apples beside obstacle islands
Improvement: Simplify the qualifying-score save form
Bug fix: Prevent duplicate leaderboard submissions
Refactor: Extract shared score-formatting helper
Revert: Revert optimistic leaderboard saves
Formatting: Format source files with the project formatter
Mechanical: Rename generated route constants
Dependency: Update Vite and related plugins
Database: Add index for leaderboard score lookups
CI: Add typecheck step to pull request workflow
Build: Configure production bundle splitting
Test: Add regression tests for tied leaderboard scores
Docs: Document the leaderboard scoring rules
Config: Add local development environment defaults
Security: Require CSRF token for score submission
Performance: Reduce Snake board rerenders during movement
Accessibility: Add accessible labels to Snake board cells
Chore: Remove unused development script
```

Category selection examples:

- If a feature requires a database migration, use `Feature:` unless the database change is the main purpose.
- If a bug fix requires refactoring, use `Bug fix:`.
- If a dependency update requires small compatibility edits, use `Dependency:`.
- If a UI cleanup is unrelated to a feature, make it a separate `Improvement:` task.
- If tests are added as part of a feature or bug fix, keep the feature or bug-fix type.
- If only tests change, use `Test:`.
- If formatting changes are mixed with behavior changes, split them into separate commits.

## Commit message sections

### Subject line

The subject line must be:

```text
<Type>: concise task subject
```

The subject should describe the completed task, preferably as a user-visible or system-visible outcome.

Good examples:

```text
Feature: Add timed yellow apples to Snake
Improvement: Preserve draft comments after page refresh
Bug fix: Fix leaderboard sorting for tied scores
Improvement: Add email validation to the signup form
```

Weak examples:

```text
Improvement: Update component
Improvement: Change state
Bug fix: Fix bug
Refactor: Refactor stuff
```

### Links

The optional `Links:` section contains related commit hashes that provide useful historical context.

Prefer full commit hashes when possible. Each linked commit must include a short reason explaining why it matters.

Include commits that introduced or significantly changed relevant behavior, data models, APIs, UI, tests, configuration, or architectural decisions.

Do not include every blamed commit mechanically if doing so would create noise.

Example:

```text
Links:
- e876f30f26473edad0e21384fa7e5e8f91bfb2f1 — introduced the profile page structure extended by this task
- 7f5ef1510dd84282344d662055b2b92496013d55 — added the ranking field used by this task
```

### Context

The `Context:` section explains why the task exists.

It should describe the relevant current state, the problem or opportunity, and the desired outcome.

Include important constraints, assumptions, external references, and alternatives considered when they will help a future reader understand the decision.

For bug fixes, explain the incorrect behavior, the expected behavior, and the cause if known.

For refactors, explain why the refactor is useful and whether behavior is intended to remain unchanged.

For reverts, explain why the original change is being reverted.

### Implementation

The `Implementation:` section explains what changed.

It should describe the transition from the previous project state to the new project state.

Mention important files, components, classes, functions, migrations, configuration changes, API changes, dependency changes, and tests when relevant.

Be specific enough that a future reader can understand the shape of the solution without reading the entire diff. Do not duplicate the diff line by line.

For behavior changes, describe the new behavior.

For bug fixes, explain how the fix addresses the cause.

For refactors, explicitly state whether behavior is intended to remain unchanged.

For cleanup work, explain why it was necessary for the task.

Mention test files in `Implementation:` only as part of the changed code structure. Put detailed test coverage and test results in `Verification:`.

### Verification

The `Verification:` section explains how the completed task was checked.

Verification must be honest, concrete, reproducible, and behavior-specific.

For each important behavior introduced, changed, fixed, or intentionally preserved, include at least one matching verification item.

Prefer verification entries that describe observable behavior, not only commands.

When tests are added or changed, mention the specific behavior covered by those tests.

Weak example:

```text
Verification:
- Ran `npm test`.
- Ran `npm run build`.
- User verified the app.
```

Better example:

```text
Verification:
- Added deterministic tests covering yellow apples spawning beside obstacle islands when a safe adjacent cell is available.
- Added deterministic tests covering yellow apples falling back to generic placement when obstacle-adjacent cells are unsafe.
- Added deterministic tests covering purple diamonds preserving generic timed-food placement near obstacle islands.
- Ran `npm test`; all 18 tests passed, including the new timed-food placement cases.
```

If manual verification was performed, describe the specific behavior that was checked.

Weak example:

```text
Verification:
- Started the local dev server at `http://localhost:3000`.
```

Better example:

```text
Verification:
- Manually verified in the browser that yellow apples can appear beside obstacle islands during gameplay.
```

Routine development checks should not be listed in every `Verification:` section when they pass.

List routine checks only when they are directly relevant, failed, were expected but not run, or are the only meaningful verification for the task type.

If something was not verified, say so clearly and explain why.

Example:

```text
Verification:
- Added deterministic tests covering tied-score leaderboard sorting.
- Ran `npm test`; the leaderboard sorting tests passed.
- Not run: browser verification, because the changed behavior is isolated to the tested sorting helper.
```

Do not claim that tests, builds, migrations, browser checks, or user verification were performed unless they were actually performed.

Do not use generic checks as a substitute for behavior-specific verification.

## Task lifecycle

### Starting a new task

When the user says `Start a new task`, treat it as the boundary of a new task, even if there was previous conversation.

When finalizing the task, gather required information from the latest `Start a new task` message onward, plus any relevant repository history discovered during exploration.

If the user starts a task using this form:

```text
Start a new task: implement something useful
```

use the text after `Start a new task:` to infer a draft subject and task type.

If the type, subject, goal, or context is insufficient to plan the work, ask the user for the missing information.

If the missing information is minor and repository context strongly suggests the intended behavior, document the assumption and proceed.

### Planning a task

Before editing code for a task:

1. Apply the development best practices from the first top-level section.
2. Inspect the current implementation.
3. Read relevant historical task descriptions.
4. Identify observable behaviors the task should add, change, preserve, or fix.
5. Consider important implementation alternatives.
6. Summarize the implementation plan before making substantial changes.

### Editing code for a task

While editing code:

- preserve existing behavior unless the task intentionally changes it;
- avoid unrelated cleanup;
- keep formatting-only changes separate where practical;
- add or update tests when the project structure supports it;
- keep track of historical commits that should appear in `Links:`;
- note assumptions, rejected alternatives, and discoveries that should appear in `Context:`.

If existing behavior changes as a side effect, call it out and confirm that it is intended.

### Finalizing a task

When the user says `Finalize the task`, create a commit-message-ready task description.

Before writing it:

1. Inspect the final diff.
2. Review the current task context from the conversation.
3. Select the task type that best describes the primary purpose of the completed work.
4. Review relevant historical commits for the `Links:` section.
5. Identify the concrete behaviors added, changed, fixed, or intentionally preserved.
6. Check which verification steps were actually performed.
7. Make sure every important changed behavior has a matching verification item.
8. Omit routine development checks that passed unless they are directly relevant to the task type.
9. Include expected checks that were not run, with reasons.

The final task description should describe the completed task, not the entire conversation.

Do not include intermediate steps unless they explain an important decision, rejected alternative, constraint, or discovery.

Use this final structure:

```text
<Type>: <concise task subject>

Links:
- <commit> — <reason>

Context:
...

Implementation:
...

Verification:
...
```

Omit `Links:` only when no related historical commits are useful.

## Special task guidance

| Type | Use when | Context should explain | Verification should emphasize |
|---|---|---|---|
| `Feature:` | A new user-visible or system-visible capability is added. | The missing capability and why it is needed. | Main success path and important edge cases. |
| `Improvement:` | Existing behavior is improved without adding a distinct new capability. | What was suboptimal and what better behavior is expected. | The improved behavior and important existing behavior that should still work. |
| `Bug fix:` | Incorrect, broken, or unintended behavior is corrected. | Incorrect behavior, expected behavior, and cause if known. | Regression coverage when practical, or another behavior-specific check. |
| `Refactor:` | Implementation is restructured without intended behavior changes. | Why the refactor is useful. | Behavioral equivalence. |
| `Revert:` | A previous change is undone. | Why the revert is needed. | Restored behavior. |
| `Formatting:` | Formatting-only changes are applied. | Why the formatting change was necessary. | Formatting, linting, or other relevant routine checks. |
| `Mechanical:` | Minor mechanical changes are applied with no intended behavior change. | Why the mechanical change was necessary. | Checks that support no behavior change. |
| `Dependency:` | Dependencies are added, removed, or updated. | Why the dependency change is needed. | Affected behavior still works. |
| `Database:` | Schema, migration, index, backfill, or data-shape changes are made. | Why the data shape needs to change. | Migration, rollback, existing data, and new data where practical. |
| `CI:` | CI/CD workflows, release automation, or automated checks are changed. | What pipeline behavior is missing or incorrect. | Local checks and CI run or workflow result when available. |
| `Build:` | Build tooling, bundling, compilation, or build scripts change. | What build behavior is missing, broken, inefficient, or outdated. | Relevant build command and produced-output behavior. |
| `Test:` | Only tests change. | What risk, behavior, or regression the tests cover. | Exact test command and whether the new or updated tests passed. |
| `Docs:` | Only documentation changes. | What information was missing, outdated, or unclear. | Review steps, link checks, generated-doc checks, or no-runtime-change statement. |
| `Config:` | Project, environment, tool, or runtime configuration changes. | What configuration was missing, incorrect, noisy, or outdated. | The affected tool, environment, or runtime behavior uses the new configuration. |
| `Security:` | Security, privacy, permissions, or abuse resistance is the primary purpose. | The risk, limitation, or user impact. | Permission checks, abuse cases, or security tool results. |
| `Performance:` | Speed, memory use, bundle size, latency, or scalability is the primary purpose. | The performance limitation or user impact. | Measurements or reproducible performance checks. |
| `Accessibility:` | Accessibility behavior or semantics are the primary purpose. | The accessibility problem and affected users. | Accessibility interactions, semantics, keyboard behavior, screen-reader behavior, or tool results. |
| `Chore:` | Repository maintenance does not fit another type. | Why the maintenance is useful. | The maintenance result and any relevant routine checks. |