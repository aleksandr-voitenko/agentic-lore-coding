# Memory writing

Read before reviewing whether memory needs changes, or creating, updating, splitting, or compacting `MEMORY.md`. Simply reading existing memory does not activate this module. Memory writes require an authorized implementation or documentation task; read-only discovery must not create files.

## Purpose and boundaries

`MEMORY.md` gives agents and maintainers compact durable context before detailed task history. Do not turn any memory file into a chronological task log; commits already record tasks and their relationships. README-authoring rules live in `.lore-coding/instructions/development.md`; the update criteria below also govern the finalization review.

Use verified source, documentation, tests, repository structure, and relevant history. Do not invent architecture or fill knowledge gaps with guesses. Do not store secrets, credentials, sensitive operational details, personal data, temporary agent notes, or private reasoning.

## Root memory and hierarchy

Every implementation task requires root `MEMORY.md`. If absent, establish context from the README, repository structure, and verified source/history, then create a compact root file before implementation. Bootstrap it as part of the authorized work; do not fabricate a complete architecture map or perform a broad rewrite just to populate it.

Root memory holds repository-wide architecture, major source directories and ownership, cross-cutting patterns, global testing strategy, durable constraints, runtime/deployment/storage assumptions, and pointers to important child memory files.

Folder-level memory holds local architecture, ownership, important files and immediate children, reusable patterns, local tests/helpers, invariants, integration points, naming conventions, and recurring pitfalls. Deeper descendants belong there only when needed to explain a local boundary, invariant, or exception; state why.

Prefer scoped memory over one large root file. Child memory refines rather than contradicts parent memory. If memory conflicts with source code or recent task history, trust source code and recent task history. Update the affected memory files during finalization if the conflict matters.

## Content and size

Keep memory compact. Suggested ranges are roughly 150–250 lines for root memory and 80–150 for a folder, not minimum lengths or targets to pad. Smaller repositories need less. If a memory file grows beyond its useful size, split or compact it during task finalization.

Preserve durable architecture, constraints, conventions, current implementation patterns, testing strategy and deterministic helpers, integration assumptions, ownership boundaries, and still-relevant decisions. Avoid generic software advice, obvious filename inventories, copied commit messages, per-task progress logs, and stale detail.

When an entry depends on a particular decision, add a short source pointer such as a Lore ID, commit hash, or file path. Do not copy an entire task record. Compaction must preserve still-relevant constraints and remove stale/duplicate wording and task-specific history rather than merely shortening everything indiscriminately.

## Update at the narrowest scope

Before a task is finalized, review whether the README and relevant memory need changes. If reviewing memory reveals no needed changes, do not mention that in the commit message unless the user explicitly asked for documentation or memory updates.

Update README for changes to public behavior, setup/build/run/test commands, deployment, environment variables, persistent storage, or project description. Before actual README edits, load `.lore-coding/instructions/development.md` for its authoring rules.

Update the lowest relevant memory file for changed local architecture, ownership, reusable patterns, testing strategy, constraints, integrations, or recurring pitfalls. Update parent memory only if its scope also changes. Do not update memory merely to say a task occurred.

Review the new summary against the final source and history. If it changes task artifacts or verification assumptions, revisit the relevant checks before committing. Mention actual memory changes in the task's `Implementation:` section. Historical context that no longer describes the current project stays in Git, not in current memory.
