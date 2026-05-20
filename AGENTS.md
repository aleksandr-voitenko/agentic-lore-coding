<!-- Agentic Lore Coding v9 -->

# Software development best practices

## Core principles

Do not make unsupported guesses. 

Ask the user when a requirement is blocking, risky, irreversible, or meaningfully ambiguous. If the ambiguity is minor and repository context strongly suggests the answer, make a reasonable assumption, document it, and continue.

Start non-trivial work with research or planning. Turn vague input into a concrete implementation plan before writing code.

Consider alternatives when a decision affects architecture, behavior, public APIs, data models, dependencies, performance, security, accessibility, or maintainability. Present trade-offs to the user when the choice is meaningful.

Preserve existing behavior unless the task intentionally changes it. If behavior changes as a side effect, call it out and confirm with the user that it is intended.

Keep changes atomic. Do not mix unrelated behavior changes, refactors, formatting, dependency updates, or UI cleanup in one task. If a cleanup or refactor is strictly necessary to safely implement the requested change, explicitly state why in your plan and proceed only if appropriate.

If a separate, unrelated issue is discovered, leave it unchanged but notify the user about it. Include the fix in the current task only when necessary to complete or verify the requested change safely.

## Architecture, deployment, and feature management

Ensure all database migrations, data model updates, and API changes are backward compatible to allow for safe, zero-downtime deployments. 

Use feature flags or toggles for incomplete, large, or risky new features. This allows code to be merged into the main branch safely without exposing unfinished behavior in production.

For any significant architectural, technical, or dependency change, draft an Architectural Decision Record (ADR) outlining the context, alternatives considered, and the final decision. Present this to the user for review before proceeding.

## Code quality

Prefer clear, maintainable code over clever code.

Use names that describe behavior or intent and align with the surrounding codebase vocabulary.

Avoid unnecessary abstractions. Add abstractions only when they reduce duplication, clarify intent, or make future changes safer.

Keep implementation details local when possible. Avoid large rewrites unless explicitly required by the task.

Follow the Boy Scout Rule: leave the code better than you found it. While respecting the rule of atomic commits, always update outdated inline documentation, docstrings, or comments when modifying a function to ensure long-term codebase health. Do not leave obsolete comments behind.

Implement graceful error handling. Do not swallow exceptions silently, and ensure errors are logged with sufficient context to make debugging easier in production.

For refactors, behavior should remain strictly unchanged unless the task explicitly says otherwise.

## Formatting and mechanical changes

Keep formatting-only and mechanical changes separate from behavior changes.

Formatting-only commits should contain no intended behavior changes.

Mechanical commits may include codemods, generated-name normalization, simple file renames, repetitive import updates, or repetitive path updates with no intended behavior change.

If formatting or mechanical changes affect many lines and reduce useful blame history, add the commit hash to `.git-blame-ignore-revs` when the repository uses that file.

## Testing and verification

Verification should prove the behavior that matters.

For each important behavior introduced, changed, fixed, or intentionally preserved, include at least one matching verification step.

Prefer automated tests when the project structure supports them.

Use deterministic tests for randomness, timers, generated data, and asynchronous behavior when practical.

For UI changes, verify the specific screen, state, and interaction that changed.

For API or data-model changes, verify relevant request, response, migration, compatibility, and error behavior.

For accessibility changes, verify relevant focus, keyboard, semantic, label, or screen-reader-visible behavior.

For performance changes, include measurements or before-and-after evidence when practical.

Do not claim that tests, builds, migrations, browser checks, or user verification were performed unless you have actually executed and observed them.

## Standard development checks

Standard development checks are expected during development, but they are not a substitute for behavior-specific verification.

Examples:

- linting;
- typechecking;
- building;
- formatting checks;
- `git diff --check`;
- smoke-starting the local app;
- checking that a local route returns HTTP 200.

Do not list standard checks in every task description when they pass.

List standard checks only when:

- the task is specifically about that check, build step, formatter, CI behavior, or project setup;
- the check is the only meaningful verification for the task;
- the check failed and affected the task;
- the check was expected but was not run.

If an expected standard check was not run, list it with a reason.

Starting a local server is not meaningful verification by itself. Mention it only when a specific behavior was checked through the running app.











# Task-based workflow

## Purpose

This repository is developed through explicit, task-based changes.

A task is an atomic unit of development effort. Each meaningful change should be traceable through the commit message that introduced it.

Together, task commit messages form a historical knowledge graph for human developers and AI agents.

For nearly every meaningful line of code, repository history should explain:

- why the code exists;
- what task introduced or changed it;
- which related commits provide useful context;
- how the behavior was verified.

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

The body must contain exactly these three mandatory sections:

```text
Context:
Implementation:
Verification:
```

Do not use Markdown headings starting with `#` inside commit messages, because Git may treat them as comments in commit editors.

## Task types

Use the type that best describes the primary purpose of the task.

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

When a task touches several categories, choose the type that describes the primary purpose, not incidental supporting work.

Examples of type selection:

- If a feature requires a database migration, use `Feature:` unless the database change is the main purpose.
- If a bug fix requires refactoring, use `Bug fix:`.
- If a dependency update requires small compatibility edits, use `Dependency:`.
- If a UI cleanup is unrelated to a feature, make it a separate `Improvement:` task.
- If tests are added as part of a feature or bug fix, keep the feature or bug-fix type.
- If only tests change, use `Test:`.
- If formatting changes are mixed with behavior changes, split them into separate commits.

## Commit message sections

### Subject

The subject line must be:

```text
<Type>: concise task subject
```

The subject should describe the completed task, preferably as a user-visible or system-visible outcome.

Good examples:

```text
Feature: Add timed yellow apples to Snake
Bug fix: Prevent duplicate leaderboard submissions
Refactor: Extract shared score-formatting helper
```

Weak examples:

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

Example:

```text
Links:
- e876f30f26473edad0e21384fa7e5e8f91bfb2f1 — introduced the profile page structure extended by this task
- 7f5ef1510dd84282344d662055b2b92496013d55 — added the ranking field used by this task
- 93ff88bf7320dc9487f303951ce7f6bf35939e38 — added obstacle generation that must avoid the initial food and starting path
```

### Context

The `Context:` section explains why the task exists.

Describe the relevant current state, the problem or opportunity, and the desired outcome.

Include important constraints, assumptions, external references, and alternatives considered when they help a future reader understand the decision.

For bug fixes, explain the incorrect behavior, expected behavior, and cause if known.

For refactors, explain why the refactor is useful and whether behavior is intended to remain unchanged.

For reverts, explain why the original change is being reverted.

### Implementation

The `Implementation:` section explains what changed.

Mention important files, components, classes, functions, migrations, configuration changes, API changes, dependency changes, and tests when relevant.

Be specific enough that a future reader can understand the solution without reading the full diff. Do not duplicate the diff line by line.

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

If the type, subject, goal, or context is insufficient to plan the work, ask for the missing information unless the repository context makes a safe assumption clear.

### Planning

Before editing code:

1. Inspect the current implementation.
2. Read relevant historical task descriptions.
3. Identify the observable behaviors the task should add, change, preserve, or fix.
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

### Feature

Use `Feature:` for a new user-visible or system-visible capability.

The `Context:` section should explain the missing capability and why it is needed.

The `Implementation:` section should describe the new behavior and the main implementation pieces.

The `Verification:` section should cover the main success path and important edge cases.

### Improvement

Use `Improvement:` for improving existing behavior without adding a distinct new capability.

The `Context:` section should explain what was suboptimal and what better behavior is expected.

The `Implementation:` section should describe what changed and whether existing behavior was preserved.

The `Verification:` section should cover the improved behavior and any important existing behavior that should still work.

### Bug fix

Use `Bug fix:` for correcting incorrect, broken, or unintended behavior.

The `Context:` section should explain the incorrect behavior, expected behavior, and cause if known.

The `Implementation:` section should explain how the fix addresses the cause.

The `Verification:` section should include a regression test when practical, or explain how the behavior was otherwise verified.

### Refactor

Use `Refactor:` for restructuring implementation without intended behavior changes.

The `Context:` section should explain why the refactor is useful.

The `Implementation:` section should state that no behavior change is intended.

The `Verification:` section should include tests or checks that support behavioral equivalence.

### Revert

Use `Revert:` for undoing a previous change.

The `Links:` section should include the reverted commit.

The `Context:` section should explain why the revert is needed.

The `Implementation:` section should describe whether the revert was clean or required adjustments.

The `Verification:` section should describe how the restored behavior was checked.

### Formatting and mechanical changes

Use `Formatting:` for formatting-only changes.

Use `Mechanical:` for minor mechanical changes such as codemods, generated-name normalization, simple file renames, or repetitive import/path updates with no intended behavior change.

Formatting and mechanical commits should be rare and must not be mixed with behavior changes.

If they affect many lines and reduce the usefulness of normal blame output, add the commit hash to `.git-blame-ignore-revs` when the repository uses that file.

The `Context:` section should explain why the change was necessary.

The `Implementation:` section should state that no behavior change is intended.

The `Verification:` section should include appropriate formatting, linting, build, or test commands.

### Dependency

Use `Dependency:` for adding, removing, or updating dependencies.

The `Context:` section should explain why the dependency change is needed.

The `Implementation:` section should mention changed packages, migration work, configuration changes, and compatibility adjustments.

The `Verification:` section should prove that affected behavior still works.

### Database

Use `Database:` for schema changes, migrations, indexes, backfills, or data-shape changes.

The `Context:` section should explain why the data shape needs to change.

The `Implementation:` section should mention migrations, schema changes, model changes, backfills, and compatibility behavior.

The `Verification:` section should cover migration, rollback, existing data, and new data where practical.

### CI

Use `CI:` for CI/CD workflows, release automation, and automated project checks.

The `Context:` section should explain what pipeline behavior is missing or incorrect.

The `Implementation:` section should describe the workflow, script, environment, or automation changes.

The `Verification:` section should mention local command checks and, when available, the CI run or workflow result that verified the change.

### Build

Use `Build:` for build tooling, bundling, compilation, or build-script changes.

The `Context:` section should explain what build behavior is missing, broken, inefficient, or outdated.

The `Implementation:` section should describe changes to build tools, scripts, compiler options, bundling, generated artifacts, or output behavior.

The `Verification:` section should include the relevant build command and any behavior-specific checks for the produced output.

### Test

Use `Test:` for test-only changes.

The `Context:` section should explain what risk, behavior, or regression the tests cover.

The `Implementation:` section should describe the new or updated tests.

The `Verification:` section should include the exact test command that was run and whether the new or updated tests passed.

### Docs

Use `Docs:` for documentation-only changes.

The `Context:` section should explain what information was missing, outdated, or unclear.

The `Implementation:` section should summarize the documentation changes.

The `Verification:` section should mention review steps, link checks, generated-doc checks, or state that no runtime behavior changed.

### Config

Use `Config:` for project, environment, tool, or runtime configuration changes.

The `Context:` section should explain what configuration was missing, incorrect, noisy, or outdated.

The `Implementation:` section should describe changed configuration files, defaults, environment behavior, or tool settings.

The `Verification:` section should include checks proving that the affected tool, environment, or runtime behavior uses the new configuration.

### Security, performance, and accessibility

Use `Security:`, `Performance:`, or `Accessibility:` when that concern is the primary purpose of the task.

The `Context:` section should explain the risk, limitation, or user impact.

The `Implementation:` section should describe the mitigation or improvement.

The `Verification:` section should include behavior-specific checks, such as permission checks, abuse cases, performance measurements, accessibility interactions, or tool results.