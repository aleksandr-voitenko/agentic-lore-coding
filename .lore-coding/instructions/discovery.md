# Discovery

Read before substantive repository investigation, review, or planning. This module governs reading context; it does not authorize edits, test execution, or finalization. All `.lore-coding/` paths below are repository-root-relative.

## Establish scope and task context

Identify the user's question or bounded task, the relevant subsystem, and whether work is read-only or implementation is authorized. `Start a new task` starts a new boundary even within an existing conversation. For finalization, evidence belongs to that boundary plus relevant historical context, not the entire conversation. When the user starts a task with `Start a new task: ...`, use the text after the colon to infer a draft subject and task type.

Do not convert a vague, contradictory, joke-like, or cross-domain request into an invented feature. If the request does not fit the product, explain the inconsistency, offer one or two plausible interpretations, and ask for clarification. A cheap implementation does not make an assumption safe.

## Read current context

Read applicable context in this order:

1. Root `MEMORY.md`, when it exists.
2. `README.md` for human-facing behavior and setup.
3. Each `MEMORY.md` on the path from root to the target file or folder.
4. Relevant source, nearby comments/docstrings, tests, configuration, and examples.
5. Relevant Git history and full task records.

Read memory root-to-leaf. For a task touching several folders, read each applicable chain, not unrelated siblings or descendants. A memory file outside the initially touched paths is relevant when it describes an affected concept; a targeted search for that concept or its old/new names can identify it. Read the applicable memory chain for those matches. When exploring another folder, check for its memory before editing there. Prefer scoped navigation over reading the whole repository indiscriminately.

If root memory is missing, read available README, structure, source, and history to establish verified context. For read-only work, report the gap if relevant but do not create files. Before authorized implementation, load `.lore-coding/instructions/memory-writing.md` and create compact root memory from verified facts. Do not invent missing project details.

Memory is a current summary, not a chronological task log. Child memory refines parent memory. Use memory to navigate, then verify the claims that matter to the task.

## Verify memory before relying on it

Before a memory claim guides a material task decision, you must check it against relevant current evidence. Focus on task-critical claims: those whose being wrong could change scope, design, behavior, or verification, such as feature status, ownership, invariants, units, timing, and exceptions. Inspect relevant source, actual test assertions, configuration, assets, and history as applicable. A recent edit, passing test, test title, or resolving source link alone does not establish accuracy. This is a targeted check, not a full memory audit.

Distinguish implemented behavior from intended behavior. Current code and observed results provide evidence of what happens; current user requirements, applicable contracts, and still-relevant historical decisions help establish what should happen. A conflict can indicate stale memory, a code regression, an incorrect test, or a change in intent. Investigate before choosing which artifact to correct; do not automatically rewrite memory or tests to match the implementation.

If a task-critical claim remains unverified or contradictory, make the uncertainty explicit and do not base dependent decisions or expected test results on it. Seek clarification when missing intent or evidence blocks those decisions; continue independent work supported by verified evidence. Retain concise source anchors and unresolved gaps for material decisions. Read-only work reports inconsistencies without editing files.

## Read task records without loading the authoring specification

Each meaningful change must eventually be recorded as an atomic structured task commit, only during explicit finalization. The commit hash identifies an exact Git object; `Lore-ID` identifies the logical task. A record's sections mean:

- `Context:` — problem, desired outcome, constraints, material assumptions and decisions.
- `Implementation:` — what changed and why the implementation approach matters.
- `Verification:` — recorded checks, observed outcomes, and limitations.
- `Lore-ID:` — stable task identity.
- `Lore-Link:` — related task identity and the reason its context matters.

Reading a record does not require the complete commit-writing specification. Do not load finalization or commit-format instructions merely to explore history. Historical verification is evidence of what was recorded then, not proof that checks pass now or that you ran them.

## Find and follow relevant history

Identify the file, symbol, route, schema, test, or configuration first. Use blame/log to find meaningful changes, read their full messages, parse Lore trailers, and follow useful semantic links. Do not collect every nearby edit mechanically.

```bash
git blame -L <start>,<end> -- <file>
git log --follow -- <file>
git show --no-patch --format=fuller <commit>
git show --stat <commit>
git show <commit> -- <file>
git show --no-patch --format=%B <commit> | git interpret-trailers --parse
git log --all --grep="Lore-ID: <lore-id>"
```

Follow renames when appropriate. Look past formatting/mechanical commits to the earlier meaningful task when possible. When available, prefer `git blame --ignore-revs-file .git-blame-ignore-revs -- <file>`.

Resolve links by searching for the exact `Lore-ID:` trailer. When several commits have the same ID, inspect them and prefer the one reachable from the current branch unless the task requires another branch. Follow legacy `Links:` sections containing commit hashes when useful. Missing or shallow history is a limitation to report, not permission to fabricate a decision or link.

Keep the relevant IDs and inherited constraints available for planning and the eventual task record. Generated files, vendored code, lockfiles, binary assets, and external snapshots may not have meaningful line-level history, but their task-level changes should still be understood.

## Check whether historical decisions still apply

Before a historical decision materially guides the task, check its decision context using the evidence and intent checks for memory claims. Apply this to decisions retrieved directly from Git as well as memory summaries.

Look for later relevant records, including incoming Lore links, that revise the decision in the applicable branch history. Search the affected concept and decision, not every task. Read the complete relevant records to establish which decision and scope changed, without treating the whole earlier task as superseded. A newer timestamp or an unexplained code difference does not establish an authorized replacement.

Find incoming links in the current branch with:

```bash
git log HEAD --fixed-strings --grep="Lore-Link: <lore-id> " --format=fuller
```

Replace `<lore-id>` with the exact task ID; use the task's target ref instead of `HEAD` when reviewing another branch. Inspect matching records to determine whether they revise the decision or merely refer to it.

Preserve decisions whose basis still applies. If rationale or relevant history is unavailable, or applicability remains uncertain, disclose material gaps and follow the earlier uncertainty rules for dependent work. Continue independent work supported by verified evidence. This does not require reopening every decision or auditing all history.

## Transition out of discovery

If evidence makes the requested approach incomplete, misleading, or unsuitable, explain the discovery, realistic options, and recommendation before proceeding. Before forming an implementation plan, making edits, or reviewing code, architecture, tests, configuration, or documentation, load `.lore-coding/instructions/development.md`. Load `.lore-coding/instructions/verification.md` before planning or executing checks or implementing a change. Merely reaching the end of discovery does not activate those operations.
