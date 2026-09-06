# Instruction modules

[`AGENTS.md`](../AGENTS.md) holds the permanent rules, authorization boundaries, and module-loading table. Detailed procedures live in `.lore-coding/`; project knowledge remains in root and scoped `MEMORY.md` files.

## Module map

| Module | Purpose | Read before |
|---|---|---|
| [Discovery](../.lore-coding/instructions/discovery.md) | Read relevant memory, source, and Lore history. | Repository investigation, review, or planning. |
| [Development](../.lore-coding/instructions/development.md) | Handle assumptions, plan changes, implement, write README, and retain task evidence. | Implementation planning or file edits. |
| [Verification](../.lore-coding/instructions/verification.md) | Define acceptance checks, investigate test gaps, and report observed results. | Planning verification, implementing changes, running checks, or reporting completion. |
| [Memory writing](../.lore-coding/instructions/memory-writing.md) | Maintain compact, scoped project knowledge. | Reviewing memory maintenance, or creating, updating, splitting, or compacting memory. |
| [Finalization](../.lore-coding/instructions/finalization.md) | Review the final diff and evidence; stage and commit only when authorized. | Finalizing a task or preparing its final record. |
| [Commit format](../.lore-coding/references/commit-format.md) | Specify task types, sections, IDs, and trailers. | Writing or validating a Lore commit message. |
| [Comment examples](../.lore-coding/references/comment-examples.md) | Illustrate useful comments and common mistakes. | Optional: when examples clarify the development rules. |

## Loading rules

Load modules by operation, not all at startup. Several may apply at once; verification must be available before implementation, not only afterward.

Reading history does not require commit-authoring instructions. Simply reading memory does not require memory-writing instructions; deciding whether memory needs changes does. Finalization loads the maintenance criteria before that decision. Completion reports use the full assumption-reporting rules in verification. Keep task evidence throughout development; defer only its final formatting and commit procedure.

Read required modules completely. Reload after changes or lost context; report missing or unreadable modules and stop the dependent operation. Loading instructions never grants permission to edit or commit.
