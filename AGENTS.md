<!-- Agentic Lore Coding v6 -->

# General workflow

## Purpose

This repository is developed through explicit, task-based changes.

A task is an atomic unit of development effort. Each meaningful change should be traceable through the commit message that introduced it. Together, these commit messages form a historical knowledge graph for human developers and AI agents.

For nearly every meaningful line of code, it should be possible to use repository history to understand:

- why the code exists;
- what task introduced or changed it;
- which related commits provide useful context;
- how the behavior was verified.

Generated files, vendored code, lockfiles, binary assets, and external snapshots may be exceptions, but their changes should still be explained when they are part of a task.

## Common principles

Do not make unsupported guesses. If a requirement is blocking, risky, irreversible, or meaningfully ambiguous, ask the user before proceeding. If the ambiguity is minor and the likely answer is clear from repository context, make a reasonable assumption, document it, and continue.

Start non-trivial work with research or planning. Turn vague input into a concrete implementation plan that is useful both as a human roadmap and as future historical context.

When important implementation choices exist, consider alternatives. Present trade-offs to the user when the decision affects architecture, behavior, public APIs, data models, dependencies, performance, security, accessibility, or maintainability.

Keep tasks atomic. Do not mix unrelated behavior changes, refactors, formatting, dependency updates, or UI cleanup in one task. If a separate issue is discovered, leave it unchanged, ask whether to expand the task, or create a separate task.

Preserve useful blame history. Avoid broad unrelated rewrites. Keep mechanical formatting separate from behavior changes.

## Reading historical context

Task descriptions are stored in commit messages. Before changing existing code, inspect the relevant implementation and the historical task descriptions behind it.

Useful commands include:

```bash
git blame -L <start>,<end> -- <file>
git show --no-patch --format=fuller <commit>
git show --stat <commit>
git show <commit> -- <file>
git log --follow -- <file>
```

When files have been renamed or moved, use history-following commands where appropriate.

For formatting-only or mechanical commits, look past the mechanical commit to the meaningful earlier task when possible. If the repository uses `.git-blame-ignore-revs`, prefer:

```bash
git blame --ignore-revs-file .git-blame-ignore-revs -- <file>
```

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
CI:             Change CI/CD, build pipelines, release automation, or checks.
Test:           Add or update tests without changing production behavior.
Docs:           Change documentation without changing product behavior.
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
Improvement: Simplify the qualifying-score save form
Bug fix: Prevent duplicate leaderboard submissions
Refactor: Extract shared score-formatting helper
Revert: Revert optimistic leaderboard saves
Formatting: Format source files with the project formatter
Mechanical: Rename generated route constants
Dependency: Update Vite and related plugins
Database: Add index for leaderboard score lookups
CI: Add typecheck step to pull request workflow
Test: Add regression tests for tied leaderboard scores
Docs: Document the leaderboard scoring rules
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

It should describe the transition from the previous project state to the new project state. Mention important files, components, classes, functions, migrations, configuration changes, API changes, dependency changes, and tests when relevant.

Be specific enough that a future reader can understand the shape of the solution without reading the entire diff. Do not duplicate the diff line by line.

For behavior changes, describe the new behavior.

For bug fixes, explain how the fix addresses the cause.

For refactors, explicitly state whether behavior is intended to remain unchanged.

For cleanup work, explain why it was necessary for the task.

### Verification

The `Verification:` section explains how the completed task was checked.

Verification must be honest, concrete, and reproducible. Include exact commands where practical.

General checks such as linting, typechecking, building, formatting, and smoke testing are useful, but they are not enough for behavior-changing tasks.

For each important behavior introduced, changed, fixed, or intentionally preserved, include at least one matching verification item.

A good verification section should answer:

- what behavior changed;
- how it was checked;
- which important edge cases were checked;
- whether the check was automated, manual, or user-verified;
- what was not verified, if anything.

Weak example:

```text
Verification:
- Ran `npm run build`.
- User verified the app.
```

Better example:

```text
Verification:
- Ran `npm run build`.
- Manually verified that yellow apples appear while the game is running.
- Manually verified that eating a yellow apple adds 2 points and grows the snake.
- Manually verified that yellow apples disappear after their timeout when not eaten.
- Manually verified that yellow apples do not overlap red apples.
- Manually verified that active yellow apples are cleared after game over.
- User verified the updated gameplay in the browser.
```

If something was not verified, say so clearly.

Example:

```text
Verification:
- Ran `npm test`.
- Manually verified that invalid login credentials show an error message.
- Manually verified that valid login credentials redirect to the dashboard.
- Not verified: password-reset email delivery, because the local environment does not have email service credentials.
```

Do not claim that tests, builds, migrations, browser checks, or user verification were performed unless they were actually performed.

## Task workflow

### Starting a new task

When the user says `Start a new task`, treat it as the boundary of a new task, even if there was previous conversation.

When finalizing the task, gather required information from the latest `Start a new task` message onward, plus any relevant repository history discovered during exploration.

If the user starts a task using this form:

```text
Start a new task: implement something useful
```

use the text after `Start a new task:` to infer a draft subject and task type.

If the type, subject, goal, or context is insufficient to plan the work, ask the user for the missing information. If the missing information is minor and the repository context strongly suggests the intended behavior, document the assumption and proceed.

### Planning

Before editing code:

1. Inspect the current implementation.
2. Read relevant historical task descriptions.
3. Identify the observable behaviors the task should add, change, preserve, or fix.
4. Consider important implementation alternatives.
5. Summarize the implementation plan before making substantial changes.

Do not track only implementation mechanisms. Convert the task goal into observable behavior.

Weak:

```text
Add bonus-food state.
```

Better:

```text
A yellow apple can appear during gameplay, awards 2 points when eaten, expires after its timeout, never overlaps other food, and is cleared when the game ends.
```

Use these observable behaviors to guide implementation, tests, manual checks, and the final `Verification:` section.

### Editing code

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

Use `CI:` for CI/CD workflows, release automation, build pipelines, and automated project checks.

The `Context:` section should explain what pipeline behavior is missing or incorrect.

The `Implementation:` section should describe the workflow, script, environment, or automation changes.

The `Verification:` section should mention local command checks and, when available, the CI run or workflow result that verified the change.

### Test

Use `Test:` for test-only changes.

The `Context:` section should explain what risk, behavior, or regression the tests cover.

The `Implementation:` section should describe the new or updated tests.

The `Verification:` section should include the exact test command that was run.

### Docs

Use `Docs:` for documentation-only changes.

The `Context:` section should explain what information was missing, outdated, or unclear.

The `Implementation:` section should summarize the documentation changes.

The `Verification:` section should mention review steps, link checks, generated-doc checks, or state that no runtime behavior changed.

### Security, performance, and accessibility

Use `Security:`, `Performance:`, or `Accessibility:` when that concern is the primary purpose of the task.

The `Context:` section should explain the risk, limitation, or user impact.

The `Implementation:` section should describe the mitigation or improvement.

The `Verification:` section should include behavior-specific checks, such as permission checks, abuse cases, performance measurements, accessibility interactions, or tool results.