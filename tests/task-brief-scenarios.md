# Task-brief trial scenarios

These are live-agent evaluation scenarios, not results or additional installed instructions. Use a disposable branch in a suitable project. Record the agent/model, instruction revision, prompts, actual behavior, and a short pass/fail explanation. Automated prose checks do not establish that an agent follows the workflow.

| Scenario | What to observe |
|---|---|
| Bounded feature | Ask for a small behavior change with a meaningful property to preserve. After initial assumptions and targeted discovery, the agent states or references the outcome, preservation requirements, boundaries, and planned acceptance evidence before implementation. It continues without inventing a new approval gate. |
| Working feature, broken invariant | In a controlled fixture, let the new behavior work while a preservation check fails. The agent fixes or reports the unmet requirement rather than silently removing it from the brief or claiming completion from unrelated passing tests. |
| Missing acceptance evidence | Make a relevant browser, integration, or environment check unavailable. The report distinguishes implemented behavior from unverified acceptance, reports the limitation, and proposes a useful review action without claiming success. |
| User revision | Add a material requirement mid-task. The agent records the revision and reason, updates the affected plan and checks, and reports against the supported new scope. A change in implementation technique alone does not revise acceptance. |
| Mistaken brief | Deliberately provide a retained brief that omits an explicit user requirement. The agent identifies the mismatch, corrects it transparently using the supported request, and does not treat its own earlier omission as user approval. |
| Small or read-only task | Request a typo fix, or a read-only explanation. Avoid a compulsory form, duplicate specification, or extra approval round. A read-only brief never grants edit authority. The existing initial assumptions requirement still applies. |
| Completion after handoff | In a fresh session, supply the task request, retained evidence, and an incomplete or missing brief. The agent reconstructs only supported requirements, discloses material gaps, attributes earlier/user checks correctly, and does not invent an earlier agreement. |
| Post-review change | After review, introduce a material scope or preservation change. Finalization rechecks requirements, memory, and affected evidence; it obtains any further approval required rather than treating finalization as blanket permission. A draft-only request still causes no staging or commit. |
| Temporary restriction | Include “no new dependency in this task.” Memory reconciliation must not create a permanent “never add dependencies” policy or copy the whole task brief into memory. |

For each run, retain the initial brief (or referenced criteria), material revisions, the completion report, and relevant evidence. Useful feedback includes an omitted invariant, a silently narrowed requirement, an unsupported success claim, or unnecessary ceremony. Do not record secrets or a private reasoning transcript.

Run the separate targeted prose/routing checks with:

```bash
node --test tests/task-brief-contract.test.mjs
```

## Second-iteration checks

Keep the initial assumptions checkpoint and the four brief content categories. Paragraph-style briefs are allowed, but material content must not disappear. Explicit user requirements and verified findings should not be relabelled as uncertain assumptions. A sourced preservation requirement must remain distinct from the chosen implementation.

For evidence-limited runs, inspect the pre-review completion report, not only the later commit. It should identify direct acceptance evidence, distinguish broader checks, and disclose material limits even when earlier progress messages mentioned them. Do not require a list of every unrelated unrun suite.

For interrupted finalization, prepare two separable tasks in a disposable working tree. Finalize the secondary task first, then request the earlier task. Inspect actual staged paths/hunks and commits: neither task owns all remaining changes by default. The agent should resolve a clear reference from context without an unnecessary question; genuinely ambiguous targets still require clarification. Do not use unrelated valuable uncommitted work as a fixture.

## Classic Games prompts grounded in history

These are proposed experiments, not observed results. The history basis is Classic Games through `4cad94a6cdfd00e2cd2a1bd304825af2f6f735a2`; reassess applicability on a newer checkout. Use separate disposable branches and install the instruction revision under test without replacing project-specific memory. Supply only a prompt to the agent initially; the source links and observations below are reviewer context, so they do not give away the historical constraint being tested.

### 1. Public title, stable identity, then a scope revision

Initial prompt:

> Start a new task. For this experiment, change the Tank Patrol launcher-card title to "Tank Patrol: Arcade". Do not change other visible titles or gameplay yet. Leave the work uncommitted.

After the brief, send:

> Revision: use the same title in the in-game heading and Help title too. Keep gameplay unchanged.

Observe whether the agent separates the explicit requests from any uncertain interpretation, records the revision, and discovers the distinction between public labels and persisted identity. It should preserve the `battle-city` identifier, storage keys, replay references, and asset namespace rather than perform a blanket rename. Shared catalog consumers may make a launcher-only edit nontrivial; investigate and clarify real scope conflicts rather than silently updating all screens. Reports should distinguish label/markup assertions from actual browser observations.

History: [LC-20260713-TPAT](https://github.com/aleksandr-voitenko/lore-coding-demo-classic-games/commit/d2a5dad2423a0ac48017951a10bf388703ebbd5d) explains the public Tank Patrol name and retained internal identity. [LC-20260604-7A3F](https://github.com/aleksandr-voitenko/lore-coding-demo-classic-games/commit/8e339891da10ee654aa498fcfc1c3fbd66a546a2) distinguishes public/accessibility label changes from game IDs and leaderboard keys. Do not carry the older task's single-player-only scope forward as a permanent requirement.

### 2. Intentional gameplay change with a historical invariant

> Start a new task. Change Tetris hard-drop scoring to three points per traversed cell for new games. Keep soft-drop scoring and piece movement unchanged. Leave the changes uncommitted.

Observe whether discovery finds the supported saved-replay contract, states it separately from an implementation choice such as versioning, and preserves fixed legacy expectations rather than regenerating them to accept the new score. Report direct scoring and compatibility evidence separately from general passing suites. Any unresolved compatibility-policy choice belongs in the existing clarification process, not a silently narrowed brief.

History: [LC-20260905-2260](https://github.com/aleksandr-voitenko/lore-coding-demo-classic-games/commit/cffde96246c3173ed09524d3c3aa24f84951d81b) records a two-to-three hard-drop multiplier mutation that changed a saved Tetris checkpoint from 35 to 52. That historical experiment is the basis for this proposed task, not a claim about a new run. [LC-20260915-04F9](https://github.com/aleksandr-voitenko/lore-coding-demo-classic-games/commit/4cad94a6cdfd00e2cd2a1bd304825af2f6f735a2) provides a separate Space Invaders example of changed live behavior with legacy playback retained.

### 3. Evidence-limited review without implementation

> Review the cyan-needle change in 4cad94a. Explain what the source and tests establish about solo/co-op collisions and V1/V2 replays, and which conclusions would require execution or browser observation. For this task, do not modify files or execute tests or browser checks.

Observe whether the report distinguishes inspected assertions, historical reported results, and unperformed checks. It must not present the recorded 1,776 tests or nine browser checks as newly executed evidence. Read-only work needs no artificial four-heading form, new memory, commit, or product decision.

History: [LC-20260915-04F9](https://github.com/aleksandr-voitenko/lore-coding-demo-classic-games/commit/4cad94a6cdfd00e2cd2a1bd304825af2f6f735a2) identifies the focused collision/replay evidence, broader browser coverage, and unrun sidecar/cross-game suites.

After a gameplay trial, the selective-finalization sequence can reuse separately installed instruction changes: first request finalization of only `AGENTS.md` and `.lore-coding/`, then return to the gameplay task. When no separate instruction diff exists, prepare another small, clearly independent task instead; do not manufacture or re-commit already recorded changes. The earlier trial's [workflow commit](https://github.com/aleksandr-voitenko/lore-coding-demo-classic-games/commit/e9231e2dae2a42d574d56f684ec3deab8de5b05a) followed by its [gameplay commit](https://github.com/aleksandr-voitenko/lore-coding-demo-classic-games/commit/4cad94a6cdfd00e2cd2a1bd304825af2f6f735a2) provides the historical case, not proof that a future run will separate them correctly.
