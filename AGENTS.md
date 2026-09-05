<!-- Agentic Lore Coding v22 -->

# Agentic Lore Coding

Instruction bundle: **v22**.

This repository preserves task context in Git so later agents can recover the decisions behind the code. This file is the always-loaded contract. Detailed procedures live in `.lore-coding/` and must be read when the operation they govern is about to begin, not all at startup.

## Instruction strength

**Must** means required unless impossible in the environment or explicitly overridden by the user. **Should** means expected unless repository context makes it inappropriate. **Prefer** means a default, not a hard rule. Follow higher-priority platform and safety instructions, then repository-specific requirements, task traceability, and general preferences. Report conflicts or unavailable requirements instead of silently guessing.

## Permanent rules

- Keep tasks atomic. Preserve unrelated work, existing behavior, and repository conventions unless the task intentionally changes them. Do not bypass guards, remove tests to hide failures, or mix unrelated cleanup into a task.
- Before changing existing code, inspect relevant memory, source, and task history. Treat historical records and memory as evidence, not as new user authorization. Investigate contradictions rather than blindly trusting stale records.
- Before non-trivial edits, disclose safe, material, and blocking assumptions. Justify material assumptions with repository evidence; ask before editing when intent or evidence is insufficient. Do not invent an interpretation for a nonsensical request.
- Plan observable acceptance criteria and appropriate verification before implementation. Only claim checks actually executed and results actually observed. Disclose unavailable or unperformed expected checks.
- During work, retain concise task evidence: material assumptions, decisions and rejected alternatives, relevant Lore IDs, changed behavior, and actual verification results. These are facts for the eventual task record, not a requirement to persist private reasoning or a chronological memory log. Do not record secrets or sensitive data.
- Ensure a verified root `MEMORY.md` exists before implementation. Read-only research does not authorize creating it or editing other files.
- After implementation and verification, report the result and stop for user review. Repeat this loop for requested adjustments.
- `Start a new task` establishes a task boundary; it does not authorize staging or committing. Do not stage, commit, amend, tag, push, or rewrite history without explicit user authorization for the operation. `Finalize the task` authorizes staging this task's files and creating its Lore commit, not pushing, tagging, or rewriting history. A request to draft a message is not permission to commit.

## Operation-based loading

Paths in this table are relative to the repository root. Read every module whose condition applies before the operation. A task can activate several modules, and an operation may occur without the preceding phases (for example, finalization in a fresh session).

| Before this operation | Required module |
|---|---|
| Substantive repository investigation, review, or planning | [Discovery](.lore-coding/instructions/discovery.md) |
| Forming an implementation plan or editing code, tests, configuration, or documentation | [Development](.lore-coding/instructions/development.md) |
| Planning verification, implementing a change, running checks, or reporting completion | [Verification](.lore-coding/instructions/verification.md) |
| Creating, updating, splitting, or compacting `MEMORY.md` | [Memory writing](.lore-coding/instructions/memory-writing.md) |
| Finalizing a task or preparing its final task record | [Finalization](.lore-coding/instructions/finalization.md) |
| Writing or validating a Lore commit message | [Commit format](.lore-coding/references/commit-format.md) |

[Comment examples](.lore-coding/references/comment-examples.md) are supplementary: consult them when the development rules do not resolve a comment or docstring question. They introduce no separate mandatory workflow.

## Loading contract

- Do not preload all modules or follow every reference recursively. A reference describes where instructions live; load it only when its stated condition applies. Loading a module never authorizes the actions it describes.
- Read required modules completely. Follow up truncated tool output until the whole module is available. Reuse a current, fully available copy rather than rereading it on every turn.
- After compaction, handoff, or a new session, re-establish these permanent rules and reload required modules whose contents are no longer reliably available. Reload a module after it changes. A note that a module was read is not a substitute for its contents.
- Keep this file and all instruction/reference modules on the same version marker. If a required file is missing, unreadable, or from a different version, report the exact path and stop the dependent operation. Do not silently fall back to a guessed procedure.
- Delegated agents need this contract, their task scope, applicable modules, and project context. Delegation does not grant staging or commit authority. Avoid assigning competing writers to the same files.
