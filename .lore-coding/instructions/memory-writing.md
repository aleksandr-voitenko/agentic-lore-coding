# Memory writing

Read before reviewing whether memory needs changes, or creating, updating, splitting, or compacting `MEMORY.md`. Simply reading existing memory does not activate this module. Memory writes require an authorized implementation or documentation task; read-only discovery must not create files.

## Purpose and boundaries

`MEMORY.md` gives agents and maintainers compact durable context before detailed task history. Do not turn any memory file into a chronological task log; commits already record tasks and their relationships. README-authoring rules live in `.lore-coding/instructions/development.md`; the update criteria below also govern the finalization review.

Use verified source, documentation, tests, repository structure, and relevant history. Do not invent architecture or fill knowledge gaps with guesses. Do not store secrets, credentials, sensitive operational details, personal data, temporary agent notes, or private reasoning.

## Root memory and hierarchy

Every implementation task requires root `MEMORY.md`. If absent, establish context from the README, repository structure, and verified source/history, then create a compact root file before implementation. Bootstrap it as part of the authorized work; do not fabricate a complete architecture map or perform a broad rewrite just to populate it.

Root memory holds repository-wide architecture, major source directories and ownership, cross-cutting patterns, global testing strategy, durable constraints, runtime/deployment/storage assumptions, and pointers to important child memory files.

Folder-level memory holds local architecture, ownership, important files and immediate children, reusable patterns, local tests/helpers, invariants, integration points, naming conventions, and recurring pitfalls. Deeper descendants belong there only when needed to explain a local boundary, invariant, or exception; state why.

Prefer scoped memory over one large root file. Child memory refines rather than contradicts parent memory. Resolve conflicts using the checks in `.lore-coding/instructions/discovery.md`: distinguish stale summaries from implementation or test regressions, and preserve verified intent. For authorized implementation or documentation work, correct task-relevant inaccuracies before reporting the result ready for review.

## Content and size

Keep memory compact. Suggested ranges are roughly 150–250 lines for root memory and 80–150 for a folder, not minimum lengths or targets to pad. Smaller repositories need less. If a task-relevant memory file grows beyond its useful size, split or compact it as part of that task's authorized memory review.

Preserve durable architecture, constraints, conventions, current implementation patterns, testing strategy and deterministic helpers, integration assumptions, ownership boundaries, and still-relevant decisions. Avoid generic software advice, obvious filename inventories, copied commit messages, per-task progress logs, and stale detail.

When an entry depends on a particular decision, add a short source pointer such as a Lore ID, commit hash, or file path. Do not copy an entire task record. Compaction must preserve still-relevant constraints and remove stale/duplicate wording and task-specific history rather than merely shortening everything indiscriminately.

Preserve decision context and qualifications needed to understand applicability. Summarization and compaction must not turn conditional choices into unconditional rules.

A task brief is temporary task context, not a mandatory memory entry. A task-specific exclusion or preservation requirement does not automatically become repository-wide policy. Retain it in memory only when it represents durable, verified project knowledge, with its actual scope and qualifications; for example, "no new dependency in this task" does not mean "never add dependencies."

Before the task record exists, use available source anchors and retained task evidence. Add its pointer during authorized finalization when useful; do not require or invent a future Lore ID or create a commit solely to supply one.

## Reconcile task-relevant memory

For implementation or documentation tasks, you must reconcile task-relevant memory with verified intent and the final implementation before reporting the result ready for user review. Preserve valid constraints and make unresolved differences explicit; implementation drift does not establish a new requirement. For read-only tasks, report discovered inconsistencies without editing files.

1. Identify existing memory claims that the task changes or invalidates, and claims found inaccurate during discovery or implementation, including asset replacements, completed milestones, temporary arrangements, renamed or moved symbols, ownership, and behavioral exceptions. A claim can need correction even when architecture and runtime interfaces stay unchanged. Include material decisions whose rationale, scope, or assumptions changed even when the implementation did not.
2. Search memory files for the affected concepts and old/new names. Matching references can make memory outside the edited folder relevant; read its applicable memory chain. Correct, remove, or qualify affected claims before adding new context. Review the existing affected paragraphs, not only changed lines: updating one paragraph does not make neighboring claims current. Keep the search scoped to the task; a full repository memory audit is not required.
3. Verify new or materially changed factual claims against final source and actual test assertions where applicable; inspect configuration or assets directly when they establish the fact. Check numbers, units, lifecycle conditions, and words such as "only," "always," and "never" explicitly. For claims about intended behavior or constraints, corroborate test expectations against applicable requirements and decisions; code and tests can agree on a regression. Passing tests, test titles, and resolving source links alone do not establish that the prose is accurate. Corroborate recorded rationale against actual task evidence and decisions.
4. Keep detailed facts at their narrowest owning scope and use parent summaries or pointers to reduce duplication. Correct affected copies at any level, preserving valid constraints, qualifications, and useful historical pointers. After an authorized decision revision, update the current summary and applicable source pointer; leave the historical explanation in Git.
5. Retain concise task evidence: affected memory paths, source anchors, and corrections or a reason no update was needed. Keep unresolved gaps explicit. Do not add memory changes merely to demonstrate compliance or turn memory into a review log.

During finalization, recheck this assessment against the final diff and any subsequent task changes. If earlier evidence is unavailable, perform the assessment then. If reviewing memory reveals no needed changes, do not mention that in the commit message unless the user explicitly asked for documentation or memory updates.

## Update at the narrowest scope

Update README for changes to public behavior, setup/build/run/test commands, deployment, environment variables, persistent storage, or project description. Before actual README edits, load `.lore-coding/instructions/development.md` for its authoring rules.

Update the lowest relevant memory file for changed local architecture, ownership, reusable patterns, testing strategy, constraints, integrations, or recurring pitfalls. Update parent memory when affected information within its scope changes, including duplicated claims. Do not update memory merely to say a task occurred.

Review the new summary against the final source and history before reporting for user review. If later changes affect the summary, task artifacts, or verification assumptions, repeat the affected review and checks before committing. Mention actual memory changes in the task's `Implementation:` section. Historical context that no longer describes the current project stays in Git, not in current memory.
