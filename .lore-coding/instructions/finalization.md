# Finalization

Read when finalizing a task or preparing its final task record. Load `.lore-coding/references/commit-format.md` before writing or validating that record. Do not load this module merely to read historical commits.

## Separate the requested output from authorization

`Finalize the task`, `commit it`, or an explicit equivalent authorizes a structured task record, staging only this task's files, and creating its commit. It does not authorize pushing, tagging, amending, merging, or rewriting history. Honor explicit user requests for other operations separately. A request to draft or explain a message does not authorize staging or committing.

Loading this module is not authorization. If only a record is requested, prepare it without Git writes. Preserve unrelated staged and unstaged work; do not reset another task's index or include its changes. If the task's changes cannot be isolated safely, explain the conflict before proceeding.

## Recover the task evidence

Use evidence from the latest task boundary, material decisions and assumptions retained during work, relevant repository history, and the final diff. Do not summarize the whole conversation or include every intermediate step.

In a fresh session or after a handoff, re-establish current repository context using `.lore-coding/instructions/discovery.md` if necessary. Inspect available diffs, records, and check outputs. Do not claim to have run checks from another session; identify prior evidence and any gaps. Before planning/running checks or reporting completion, use `.lore-coding/instructions/verification.md`. Before additional implementation or documentation edits, use `.lore-coding/instructions/development.md`.

## Final review

1. Inspect the final diff and ensure its files belong to this task. Confirm the outcome and any intended behavior change.
2. Review material assumptions, rejected alternatives that matter, constraints, and relevant historical tasks. Keep useful Lore links, not every nearby edit.
3. Match each important added, changed, fixed, or preserved behavior to actual verification evidence. Include expected checks not run and unresolved failures; do not invent results.
4. Check touched comments, docstrings, and examples against final code, not an abandoned plan.
5. Read `.lore-coding/instructions/memory-writing.md` before deciding whether README or memory needs changes, including stale or oversized memory. Apply its update criteria even when the decision is to make no changes. Before any README edits, load `.lore-coding/instructions/development.md` for the authoring rules. Do not update memory simply to log task completion. A draft-only request authorizes review and disclosure of gaps, not edits.
6. After any final edits, inspect the diff again and rerun affected verification when needed. Be honest about any remaining limitations.
7. Choose the primary task type and a concise subject, preferably as a user-visible or system-visible outcome. Generate or confirm a unique Lore ID using the commit-format rules.
8. Write the record: `Context:` explains why; `Implementation:` explains the solution; `Verification:` maps behavior to observed evidence. Record material assumptions in the appropriate sections. Omit trivial assumptions, routine passing checks unless relevant, and unnecessary chronology.
9. Check the complete message against the format. Follow repository-required validation and commit hooks; do not bypass a failing hook. A draft-only request does not itself require executing the validator. Message validation does not establish the truth of its prose.
10. Only when authorized, stage this task's files and create the commit. Confirm success and report the resulting commit, or report the failure without claiming finalization succeeded.

The supplied validator can be inspected with `node .githooks/lore-coding.mjs --help`; use its supported mode for the message/history being checked. API-based commit creation does not execute a local Git hook. When repository instructions require validator execution, run equivalent validation explicitly or report the environment limitation rather than claiming the hook ran. Do not silently weaken repository requirements.

A durable task ID does not reconstruct discarded history. Do not rewrite or squash task records merely to satisfy a link check. Resolve missing/unreachable links using actual available history and report unresolved limitations.
