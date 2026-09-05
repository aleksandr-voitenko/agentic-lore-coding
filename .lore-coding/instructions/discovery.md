<!-- Agentic Lore Coding v22 -->

# Discovery

Read before substantive repository investigation, review, or planning. This module governs reading context; it does not authorize edits, test execution, or finalization. All `.lore-coding/` paths below are repository-root-relative.

## Establish scope and task context

Identify the user's question or bounded task, the relevant subsystem, and whether work is read-only or implementation is authorized. `Start a new task` starts a new boundary even within an existing conversation. For finalization, evidence belongs to that boundary plus relevant historical context, not the entire conversation.

Do not convert a vague, contradictory, joke-like, or cross-domain request into an invented feature. If the request does not fit the product, explain the inconsistency, offer one or two plausible interpretations, and ask for clarification. A cheap implementation does not make an assumption safe.

## Read current context

Read applicable context in this order:

1. Root `MEMORY.md`, when it exists.
2. `README.md` for human-facing behavior and setup.
3. Each `MEMORY.md` on the path from root to the target file or folder.
4. Relevant source, nearby comments/docstrings, tests, configuration, and examples.
5. Relevant Git history and full task records.

Read memory root-to-leaf. For a task touching several folders, read each applicable chain, not unrelated siblings or descendants. When exploring another folder, check for its memory before editing there. Prefer scoped navigation over reading the whole repository indiscriminately.

If root memory is missing, read available README, structure, source, and history to establish verified context. For read-only work, report the gap if relevant but do not create files. Before authorized implementation, load `.lore-coding/instructions/memory-writing.md` and create compact root memory from verified facts. Do not invent missing project details.

Memory is a current summary, not a chronological task log. Child memory refines parent memory. If memory or comments conflict with code, tests, or recent history, investigate the conflict and prefer verified current evidence. Track any necessary documentation correction for authorized work; do not silently expand a read-only task.

## Read task records without loading the authoring specification

Each meaningful change should be explained by an atomic task commit. The commit hash identifies an exact Git object; `Lore-ID` identifies the logical task. A record's sections mean:

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

Follow renames when appropriate. Look past formatting/mechanical commits to the earlier meaningful task. When available, use `git blame --ignore-revs-file .git-blame-ignore-revs -- <file>`.

Resolve links by searching for the exact `Lore-ID:` trailer. When several commits have the same ID, inspect them and prefer the one reachable from the current branch unless the task requires another branch. Follow legacy `Links:` sections containing commit hashes when useful. Missing or shallow history is a limitation to report, not permission to fabricate a decision or link.

Keep the relevant IDs and inherited constraints available for planning and the eventual task record. Generated files, vendored code, lockfiles, binary assets, and external snapshots may not have meaningful line-level history, but their task-level changes should still be understood.

## Transition out of discovery

If evidence makes the requested approach incomplete, misleading, or unsuitable, explain the discovery, realistic options, and recommendation before proceeding. Before forming an implementation plan or making edits, load `.lore-coding/instructions/development.md`. Load `.lore-coding/instructions/verification.md` before planning or executing checks or implementing a change. Merely reaching the end of discovery does not activate those operations.
