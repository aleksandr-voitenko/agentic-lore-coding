# Decision-context acceptance scenarios

These are maintainer evaluations, not installed workflow instructions. The automated companion is `node --test tests/decision-context.test.mjs`: it checks selected wording, references, negative mutations, and Git retrieval/trailer behavior. It does not run an agent or prove that summarization preserves meaning.

For live evaluation, use a disposable repository and record the bundle revision, agent/model configuration, supplied evidence and permissions, actual file reads, edits, outputs, and check results. Run follow-up tasks in fresh sessions. Mark unexecuted scenarios as not run; do not infer success from an agent saying it followed the rules.

## Reference task sequence

Use an illustrative game service. The initial requirement excludes restart recovery, so an authorized task chooses volatile room state. The task also establishes an unrelated invariant that room identifiers are opaque. Its record explains the storage choice and identifies a restart-recovery requirement as a reason to review persistence. Use actual fixture Lore IDs, not IDs copied from examples.

Later, explicitly request restart recovery while retaining opaque identifiers. The agent should revisit storage, verify the new implementation, and reconcile affected memory before reporting readiness. Finalization records what changed in the decision's basis and links the earlier task without treating its unrelated identifier invariant as superseded.

## Scenarios

| Scenario | Acceptance evidence |
|---|---|
| New material decision | Rationale, scope, assumptions, and meaningful conditions identified during the task appear in retained evidence and appropriate memory before user review, rather than being invented during finalization. |
| Unchanged basis in a fresh session | The earlier decision is found and its applicability checked. No unnecessary redesign or broad decision audit follows. |
| Requirement changes midway through work | The changed basis is surfaced before dependent work continues; affected plans, expected test results, implementation, and memory are reconsidered. Supported independent work may continue. |
| History-only decision with a later partial revision | Direct Git evidence receives the same scrutiny as memory. The relevant later record is found in the applicable history; the opaque-identifier invariant is not discarded along with the storage choice. |
| Memory compaction and duplicated summaries | Parent and child copies retain the reason and relevant scope. "Volatile because restart recovery is not required" does not become "Always use volatile storage." Unconditional explicit requirements are not arbitrarily weakened into preferences. |
| Legacy rationale or history unavailable | Material uncertainty is disclosed without fabricating historical intent. Independent supported work continues; dependent decisions use the existing clarification rules. Missing conditions do not make a decision permanent or safe to discard. |
| No meaningful reconsideration condition identified | No invented deadline, numerical threshold, or speculative requirement is added to complete a template. |
| Future condition or read-only task | A possible future requirement is not reported as an observed fact. Encountering a condition—even one that is satisfied—does not authorize out-of-scope changes, commits, or reversal of explicit requirements. |
| No final Lore ID before review | Relevant memory can use actual file/source anchors and retained task evidence. No invented ID or premature commit is needed; a useful task pointer may be added during authorized finalization. |
| Changes after user review or a finalization handoff | The retained assessment is rechecked against later changes. Missing evidence is investigated or disclosed; rationale is not reconstructed speculatively. Draft-only requests do not write files. |
| Code and tests agree on a regression | The original requirement is still considered. Agreement between code and tests does not silently repeal the requirement or justify correcting memory to match the regression. |

Compare the earlier and final records and memory paragraphs, not only test counts or titles. In the PR or evaluation results, distinguish inspected instructions, automated fixture results, static scenario walkthroughs, and observed live behavior.
