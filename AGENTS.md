<!-- Agentic Lore Coding v4 -->

# General workflow

## Common work principles

This repository is developed through explicit, task-based changes. Each meaningful change should be traceable to a task description stored in the corresponding commit message.

Do not make unsupported guesses. If a requirement is blocking, risky, irreversible, or meaningfully ambiguous, ask the user before proceeding. If the ambiguity is minor and the likely answer is clear from the repository context, make a reasonable assumption, document it in the plan or task description, and continue.

Always begin non-trivial work with a research or planning phase. The goal is to turn possibly vague input into a concrete implementation plan that is useful both for a human developer and for a future AI agent reading the project history.

When researching how to implement a task, consider relevant alternatives. Present important alternatives to the user when the choice affects architecture, behavior, public APIs, data models, dependencies, performance, security, or maintainability. Describe the trade-offs clearly.

Prefer small, atomic changes. A task should be narrow enough that its purpose, implementation, and verification can be explained clearly in one commit message. Split unrelated work into separate tasks and commits.

Do not mix unrelated formatting, refactoring, and behavior changes in the same task. If mechanical formatting or large-scale renaming is unavoidable, keep it separate from behavioral changes.

Before changing code, understand the existing implementation and the historical task context behind the relevant code. Use repository history as part of the project documentation.

## Tasks

### Essence

A task is an atomic unit of development effort applied to the project.

For nearly every meaningful line of code in the project, there should be an associated task. This allows a human developer or AI agent to use the repository history as a knowledge graph.

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

## Commit message format

Task commit messages must use the following structure.

Do not use Markdown headings starting with `#` inside the commit message, because Git may treat them as comments in commit editors.

The first line must be:

```text
Title: concise but useful task title
```

The title should describe the completed task, not the implementation mechanism alone. Prefer user-visible or system-visible outcomes when practical.

Good examples:

```text
Title: Add timed yellow apples to Snake
Title: Preserve draft comments after page refresh
Title: Fix leaderboard sorting for tied scores
Title: Add email validation to the signup form
```

Weak examples:

```text
Title: Update component
Title: Change state
Title: Fix bug
Title: Refactor stuff
```

After the title, there may be an optional `Links:` section.

The `Links:` section contains related commit hashes that provide useful historical context for the current task. Prefer full commit hashes when possible. Each linked commit should include a short reason explaining why it is relevant.

Do not include every blamed commit mechanically if doing so would create noise. Include commits that introduced or significantly changed the relevant behavior, data model, API, UI, tests, configuration, or architectural decision.

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
- Ran `npm test`.
- Ran `npm run lint`.
- Manually verified that a ranked user sees their global rank on the profile page.
- Manually verified that an unranked user sees the existing empty-state behavior.
```

A task commit message has exactly three mandatory body sections:

```text
Context:
Implementation:
Verification:
```

Additional sections should be avoided unless they are genuinely useful. Important risks, assumptions, alternatives, and follow-up work should usually be included inside one of the three mandatory sections.

Omit the `Links:` section only if no related historical commits are useful.

## Commit message sections

### Context section

The `Context:` section explains why the task exists.

It should describe the relevant current state, the problem or opportunity, and the desired outcome.

It may include:

- user-facing context;
- business or product context;
- technical constraints;
- compatibility requirements;
- security concerns;
- performance concerns;
- accessibility concerns;
- links to external sources used during research;
- relevant alternatives that were considered.

If alternatives were considered, include the important ones and explain why the chosen approach was selected. Do not include every intermediate thought or abandoned micro-step; include only information that will help a future developer understand the decision.

If the context is unclear or incomplete, ask the user before implementation when the missing information could materially affect the solution.

For bug fixes, explain the incorrect behavior, the expected behavior, and the cause if known.

For refactors, explain why the refactor is useful and whether behavior is intended to remain unchanged.

For reverts, explain why the original change is being reverted.

### Implementation section

The `Implementation:` section explains what changed.

It should describe the transition from the previous project state to the new project state. Mention important files, components, classes, functions, database migrations, configuration changes, API changes, dependency changes, and test changes when relevant.

The implementation description should be specific enough that a future reader can understand the shape of the solution without reading the entire diff, but it should not duplicate the diff line by line.

For behavior changes, describe the new behavior.

For bug fixes, explain how the fix addresses the cause.

For refactors, explicitly state whether behavior is intended to remain unchanged.

For dependency updates, explain why the update was needed and mention any compatibility or migration work.

For cleanup work, explain why it was necessary for the task. Avoid unrelated cleanup.

### Verification section

The `Verification:` section describes how the task was checked.

Verification steps must be reproducible. Include exact commands where practical.

The `Verification:` section must describe checks that prove the task's intended behavior, not only general project health.

Build, lint, typecheck, formatting, and smoke-test commands are useful, but they are not sufficient by themselves for behavior-changing tasks. For any task that changes runtime behavior, UI behavior, data behavior, API behavior, permissions, validation, scoring, timing, persistence, or error handling, include behavior-specific verification steps.

For each important behavior introduced or changed by the task, include at least one matching verification item.

A good verification section should answer:

- What user-visible or system-visible behavior changed?
- How was that behavior checked?
- What important edge cases were checked?
- Were both the success path and relevant failure or empty states checked?
- Was the check automated, manual, or verified by the user?

Prefer concrete, reproducible verification steps.

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

If a behavior was not verified, say so honestly and explain why.

Example:

```text
Verification:
- Ran `npm run test`.
- Manually verified that invalid login credentials show an error message.
- Manually verified that valid login credentials redirect to the dashboard.
- Not verified: password-reset email delivery, because the local environment does not have email service credentials.
```

Do not claim that tests, builds, migrations, or manual checks were performed unless they were actually performed.

### Verification guidance by change type

For UI changes, include the specific screen, state, and interaction that were checked.

Examples:

```text
Verification:
- Manually verified the empty leaderboard state.
- Manually verified the leaderboard state with saved scores.
- Manually verified that the Save button is disabled until a name is entered.
- Manually verified keyboard submission with Enter.
```

For API or data-model changes, include request, response, migration, compatibility, and error-state checks where relevant.

Examples:

```text
Verification:
- Added API tests for successful profile updates.
- Added API tests for missing required fields.
- Manually verified that existing profile records still load after the migration.
- Ran `npm run migrate:test`.
```

For randomness, timers, generated data, or asynchronous behavior, explicitly cover the relevant condition.

Examples:

```text
Verification:
- Manually verified that the bonus item disappears after its timeout.
- Manually verified that the loading state is shown before the API response resolves.
- Added a test with a fixed random seed to verify deterministic item placement.
- Added a test with fake timers to verify timeout behavior.
```

For accessibility changes, include the accessibility behavior checked.

Examples:

```text
Verification:
- Manually verified that the dialog receives focus when opened.
- Manually verified that the dialog can be closed with Escape.
- Manually verified that the submit button has an accessible name.
- Ran the relevant accessibility tests.
```

For refactors, include tests or checks that support behavioral equivalence.

Examples:

```text
Verification:
- Ran `npm test`.
- Ran `npm run build`.
- Manually verified that the settings page still loads and saves changes.
- No behavior change intended.
```

For formatting-only or mechanical commits, general project-health checks may be sufficient, but the task must explicitly state that no behavior change is intended.

Example:

```text
Verification:
- Ran `npm run format`.
- Ran `npm run lint`.
- Ran `npm test`.
- No behavior change intended.
```

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
4. Identify the observable behaviors that the task should add, change, preserve, or fix.
5. Summarize the implementation plan before making substantial changes.
6. Ask the user before taking a materially different direction from the task request.

If exploration reveals that the original task description is incomplete, misleading, or likely to require a different approach, stop and notify the user with:

- what was discovered;
- why it matters;
- the realistic implementation options;
- the recommended next step.

### Defining observable behavior

Before or during implementation, convert the task goal into observable behaviors that can be verified later.

Do not track only implementation goals.

Weak example:

```text
Add bonus-food state.
```

Better example:

```text
A yellow apple can appear during gameplay, awards 2 points when eaten, expires after its timeout, never overlaps other food, and is cleared when the game ends.
```

Use these observable behaviors to guide implementation, tests, manual checks, and the final `Verification:` section.

### Code editing

When editing code, preserve task traceability.

Include related historical commits in the current task's `Links:` section when they provide meaningful context for the changed code. Prefer commits that introduced or significantly changed the relevant behavior, data model, API, UI, or tests.

Do not include every blamed commit mechanically if doing so would create noise. For large changes, include the most relevant commits and explain their relevance.

If a task modifies code whose blame history points to a formatting-only or mechanical commit, look past that commit to the meaningful earlier task where possible.

Avoid unrelated cleanup. If cleanup is necessary to complete the task safely, mention it in the `Implementation:` section.

Preserve existing behavior unless the task explicitly changes it. If existing behavior changes as a side effect, call it out and confirm that it is intended.

### Scope control

Keep each task atomic.

If implementation reveals a separate problem that is not part of the current task, do not silently fold it into the same task. Either:

1. leave it unchanged;
2. ask the user whether to expand the current task;
3. create a separate task and commit for it.

A separate issue may belong in the same task only when it is necessary to complete or verify the requested change safely.

Examples of changes that usually require a separate task:

- unrelated UI cleanup;
- unrelated formatting;
- broad renaming;
- dependency updates not required by the task;
- opportunistic refactoring;
- fixing a different bug discovered during testing.

### Finalizing a task

When the user says `Finalize the task`, create a task description suitable for a commit message.

Before writing the final task description:

1. Inspect the final diff.
2. Review the relevant task context from the current conversation.
3. Review related historical commits that should be included in `Links:`.
4. Identify the concrete behaviors that were added, changed, preserved, or fixed.
5. Check which verification steps were actually performed.
6. Make sure every important changed behavior has a matching verification item.

The final task description should describe the completed task, not the entire conversation. Do not include intermediate steps unless they explain an important decision, rejected alternative, constraint, or discovery.

The `Verification:` section must not be limited to general commands such as linting, typechecking, building, or smoke testing unless the task is purely mechanical.

For behavior-changing tasks, include behavior-specific checks. These may be automated tests, manual checks, or user-verified checks. Label them accurately.

Use this pattern when helpful:

```text
Verification:
- Ran `<command>`.
- Added/updated automated tests covering <specific behavior>.
- Manually verified that <specific action> causes <specific result>.
- Manually verified that <specific edge case> behaves as expected.
- User verified <specific behavior> in <environment>.
- Not verified: <specific behavior>, because <reason>.
```

Do not claim that a behavior was verified unless it was actually checked.

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

## Handling special task types

### Bug fixes

For bug fixes, the `Context:` section should explain:

- the incorrect behavior;
- the expected behavior;
- the cause, if known;
- the affected user flow, API, data path, or system behavior.

The `Implementation:` section should explain how the fix addresses the cause.

The `Verification:` section should include a regression test when practical. If no regression test was added, explain how the behavior was otherwise verified.

Example:

```text
Verification:
- Added a regression test for duplicate leaderboard entries.
- Manually verified that submitting the same score twice does not create duplicate rows.
```

### Refactors

For refactors, the `Context:` section should explain why the refactor was needed.

The `Implementation:` section should explicitly state whether behavior is intended to remain unchanged.

The `Verification:` section should include tests or checks that support behavioral equivalence.

Example:

```text
Implementation:
- Extracted score formatting into a shared helper.
- Reused the helper in the leaderboard and final-score views.
- No behavior change intended.

Verification:
- Ran `npm test`.
- Ran `npm run build`.
- Manually verified that score formatting is unchanged in the leaderboard.
- Manually verified that score formatting is unchanged on the final screen.
```

### Reverts

For reverts, the `Links:` section should include the reverted commit.

The `Context:` section should explain why the revert is needed.

The `Implementation:` section should describe whether the revert is clean or whether additional adjustments were required.

The `Verification:` section should describe how the restored behavior was checked.

Example:

```text
Title: Revert optimistic leaderboard saves

Links:
- <reverted-commit> — introduced optimistic leaderboard saves that caused duplicate rows

Context:
Optimistic leaderboard saves can create duplicate rows when the server responds after a retry.
The safest immediate fix is to restore the previous submit-after-response behavior.

Implementation:
- Reverted the optimistic save path.
- Restored the previous disabled-submit state while a save is in progress.
- Kept unrelated leaderboard rendering changes from later commits.

Verification:
- Ran `npm test`.
- Manually verified that saving a score creates only one leaderboard row.
- Manually verified that the Save button is disabled while the request is pending.
```

### Formatting-only or mechanical commits

Formatting-only and mechanical commits should be rare.

They must not be mixed with behavior changes.

If they affect many lines and reduce the usefulness of normal blame output, add the commit hash to `.git-blame-ignore-revs` when the repository uses that file.

The `Context:` section should explain why the mechanical change was necessary.

The `Implementation:` section should state that no behavior change is intended.

The `Verification:` section should include appropriate formatting, linting, build, or test commands.

Example:

```text
Title: Format source files with the project formatter

Context:
The repository had files formatted with inconsistent whitespace and line wrapping.
This task applies the existing project formatter without changing behavior.

Implementation:
- Ran the project formatter across source files.
- Added this commit to `.git-blame-ignore-revs`.
- No behavior change intended.

Verification:
- Ran `npm run format`.
- Ran `npm run lint`.
- Ran `npm test`.
```

### Dependency updates

For dependency updates, the `Context:` section should explain why the update is needed.

The `Implementation:` section should mention changed packages, migration work, configuration changes, and compatibility adjustments.

The `Verification:` section should include checks that prove the affected behavior still works.

Example:

```text
Verification:
- Ran `npm test`.
- Ran `npm run build`.
- Manually verified that the date picker still opens and saves selected dates.
- Manually verified that existing saved dates still render correctly.
```

### Database or schema changes

For database or schema changes, the `Context:` section should explain why the data shape needs to change.

The `Implementation:` section should mention migrations, schema changes, model changes, backfills, and compatibility behavior.

The `Verification:` section should cover migration, rollback, existing data, and new data where practical.

Example:

```text
Verification:
- Ran the migration against the local test database.
- Verified that existing records receive the expected default value.
- Verified that new records save the new field.
- Not verified: production-sized backfill performance, because no production-like dataset is available locally.
```

### Test-only changes

For test-only changes, the `Context:` section should explain what risk, behavior, or regression the tests cover.

The `Implementation:` section should describe the new or updated tests.

The `Verification:` section should include the exact test command that was run.

Example:

```text
Verification:
- Ran `npm test -- leaderboard`.
- Confirmed that the new regression test fails before the fix and passes after the fix.
```