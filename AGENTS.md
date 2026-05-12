<!-- Agentic Lore Coding v1 -->

# General workflow

## Common work principles

This repository is developed through explicit, task-based changes. Each meaningful change should be traceable to a task description stored in the corresponding commit message.

Do not make unsupported guesses. If a requirement is blocking, risky, irreversible, or meaningfully ambiguous, ask the user before proceeding. If the ambiguity is minor and the likely answer is clear from the repository context, make a reasonable assumption, document it in the plan or task description, and continue.

Always begin non-trivial work with a research or planning phase. The goal is to turn possibly vague input into a concrete implementation plan that is useful both for a human developer and for a future AI agent reading the project history.

When researching how to implement a task, consider relevant alternatives. Present important alternatives to the user when the choice affects architecture, behavior, public APIs, data models, dependencies, performance, security, or maintainability. Describe the trade-offs clearly.

Prefer small, atomic changes. A task should be narrow enough that its purpose, implementation, and verification can be explained clearly in one commit message. Split unrelated work into separate tasks and commits.

Do not mix unrelated formatting, refactoring, and behavior changes in the same task. If mechanical formatting or large-scale renaming is unavoidable, keep it separate from behavioral changes.

## Tasks

### Essence

A task is an atomic unit of development effort applied to the project.

For nearly every meaningful line of code in the project, there should be an associated task. This allows a human developer or AI agent to use the repository history as a knowledge tree.

A task is a historical entity. It should contain the high-level information required to understand why the change was made, what was changed, and how completeness was verified.

### Location

Task descriptions are stored in commit messages.

Before changing existing code, inspect the relevant historical task descriptions from previous commits. Read the full commit messages for commits that introduced or significantly changed the code being modified.

Useful commands include:

```bash
git blame -L <start>,<end> -- <file>
git show --no-patch --format=fuller <commit>
git show --stat <commit>
git show <commit> -- <file>
git log --follow -- <file>
```

When files have been renamed or moved, use history-following commands where appropriate.

### Code mapping

The preferred way to recover task context for existing code is:

1. Identify the relevant file, symbol, or line range.
2. Use `git blame` to find the commits that introduced or last meaningfully changed those lines.
3. Read the full task descriptions in those commit messages.
4. Follow any related commits listed in their `Links:` sections when they appear relevant.

Avoid broad, unrelated rewrites that obscure useful blame history.

For purely mechanical formatting commits, use `.git-blame-ignore-revs` when available. When investigating history, prefer blame commands that respect the ignore-revs file, for example:

```bash
git blame --ignore-revs-file .git-blame-ignore-revs -- <file>
```

Generated files, vendored code, lockfiles, binary assets, and external snapshots may not have meaningful task-level line mapping. Treat them as exceptions, but still explain why they changed when they are part of a task.

### Commit message format

Task commit messages must use the following structure.

Do not use Markdown headings starting with `#` inside the commit message, because Git may treat them as comments in commit editors.

The first line must be:

```text
Title: concise but useful task title
```

Then there may be an optional `Links:` section.

The `Links:` section contains related commit hashes that provide useful historical context for the current task. Prefer full commit hashes when possible. Each linked commit should include a short reason explaining why it is relevant.

Example:

```text
Title: Add global user rank to the user profile page

Links:
- e876f30f26473edad0e21384fa7e5e8f91bfb2f1 — introduced the user profile page structure
- 7f5ef1510dd84282344d662055b2b92496013d55 — added ranking data to the user API response
- f54d4c0a9be1d21caa4d671f6c13183b245e6a60 — defined the existing user statistics display pattern

Context:
The profile page already shows local user statistics, but it does not show the user's global rank.
Users need this information to understand their position across the full platform.

The rank is already available in the user API response, so this task only needs to expose it in the existing profile UI.

Implementation:
- Read the existing global rank field from the user profile data.
- Add a global-rank display row to the profile statistics section.
- Reuse the existing statistic row component to keep the layout consistent.
- Show the same empty-state behavior used by other missing profile statistics.

Verification:
- Added or updated automated tests covering profiles with and without a global rank.
- Manually checked the profile page with a ranked user.
- Manually checked the profile page with an unranked user.
```

A task commit message has exactly three mandatory body sections:

```text
Context:
Implementation:
Verification:
```

Additional sections should be avoided unless they are genuinely useful. Important risks, assumptions, alternatives, and follow-up work should usually be included inside one of the three mandatory sections.

### Context section

The `Context:` section explains why the task exists.

It should describe the relevant current state, the problem or opportunity, and the desired outcome. It may include business context, user-facing behavior, technical constraints, compatibility requirements, security concerns, performance concerns, or links to external sources used during research.

If alternatives were considered, include the important ones and explain why the chosen approach was selected. Do not include every intermediate thought or abandoned micro-step; include only information that will help a future developer understand the decision.

If the context is unclear or incomplete, ask the user before implementation when the missing information could materially affect the solution.

### Implementation section

The `Implementation:` section explains what changed.

It should describe the transition from the previous project state to the new project state. Mention important files, components, classes, functions, database migrations, configuration changes, API changes, and dependency changes.

The implementation description should be specific enough that a future reader can understand the shape of the solution without reading the entire diff, but it should not duplicate the diff line by line.

For refactoring tasks, explain whether behavior is intended to remain unchanged.

For bug fixes, explain the cause of the bug and how the change prevents it.

For dependency updates, explain why the update was needed and mention any compatibility or migration work.

### Verification section

The `Verification:` section describes how the task was checked.

Verification steps must be reproducible. Include exact commands where practical.

Examples:

```text
Verification:
- Ran `npm test`.
- Ran `npm run lint`.
- Added unit tests for invalid login attempts.
- Manually verified that the login form shows an error for incorrect credentials.
```

If a check was not run, say so honestly and explain why.

Example:

```text
Verification:
- Not run: integration tests require credentials that are not available in the local environment.
- Manually verified the fallback state in the browser.
```

Do not claim that tests, builds, migrations, or manual checks were performed unless they were actually performed.

## Task workflow

### Starting a new task

When the user says `Start a new task`, treat it as the boundary of a new task, even if there was previous conversation.

When a task is finalized, gather the required task information from the latest `Start a new task` message onward, plus any relevant repository history discovered during exploration.

If the user starts a task using this form:

```text
Start a new task: implement something useful
```

use the text after `Start a new task:` to infer a draft task title.

If the title, goal, or context is insufficient to plan the work, ask the user for the missing information. If the missing information is minor and the repository context strongly suggests the intended behavior, document the assumption and proceed.

### Planning and exploration

Before editing code, inspect the relevant current implementation and related history.

When deciding what code needs to change:

1. Identify the files, symbols, tests, routes, commands, schemas, or configuration likely to be affected.
2. Use blame and log history to find task descriptions for the relevant existing code.
3. Read linked commits when they provide useful context.
4. Summarize the implementation plan before making substantial changes.
5. Ask the user before taking a materially different direction from the task request.

If exploration reveals that the original task description is incomplete, misleading, or likely to require a different approach, stop and notify the user with:

- what was discovered;
- why it matters;
- the realistic implementation options;
- the recommended next step.

### Code editing

When editing code, preserve task traceability.

Include related historical commits in the current task's `Links:` section when they provide meaningful context for the changed code. Prefer commits that introduced or significantly changed the relevant behavior, data model, API, UI, or tests.

Do not include every blamed commit mechanically if doing so would create noise. For large changes, include the most relevant commits and explain their relevance.

If a task modifies code whose blame history points to a formatting-only or mechanical commit, look past that commit to the meaningful earlier task where possible.

Avoid unrelated cleanup. If cleanup is necessary to complete the task safely, mention it in the `Implementation:` section.

### Finalizing a task

When the user says `Finalize the task`, create a task description suitable for a commit message.

Before writing the final task description:

1. Inspect the final diff.
2. Review the relevant task context from the current conversation.
3. Review related historical commits that should be included in `Links:`.
4. Check which verification steps were actually performed.

The final task description should describe the completed task, not the entire conversation. Do not include intermediate steps unless they explain an important decision, rejected alternative, constraint, or discovery.

The final output must follow this structure:

```text
Title: ...

Links:
- <commit> — <reason>

Context:
...

Implementation:
...

Verification:
...
```

Omit the `Links:` section only if no related historical commits are useful.

### Handling special task types

#### Bug fixes

For bug fixes, the `Context:` section should explain the incorrect behavior, the expected behavior, and the cause if known.

The `Implementation:` section should explain how the fix addresses the cause.

The `Verification:` section should include a regression test when practical.

#### Refactors

For refactors, the `Context:` section should explain why the refactor was needed.

The `Implementation:` section should explicitly state whether behavior is intended to remain unchanged.

The `Verification:` section should include tests or checks that support behavioral equivalence.

#### Reverts

For reverts, the `Links:` section should include the reverted commit.

The `Context:` section should explain why the revert is needed.

The `Implementation:` section should describe whether the revert is clean or whether additional adjustments were required.

The `Verification:` section should describe how the restored behavior was checked.

#### Formatting-only or mechanical commits

Formatting-only and mechanical commits should be rare.

They must not be mixed with behavior changes.

If they affect many lines and reduce the usefulness of normal blame output, add the commit hash to `.git-blame-ignore-revs` when the repository uses that file.

The `Context:` section should explain why the mechanical change was necessary.

The `Implementation:` section should state that no behavior change is intended.

The `Verification:` section should include appropriate formatting, linting, build, or test commands.