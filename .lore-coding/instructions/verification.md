# Verification

Read before planning verification, implementing a change, running checks, or reporting completion. In particular, bug-fix regression rules apply before the fix, not only at the end. This module does not authorize code edits or Git writes.

## Plan acceptance evidence

For each important behavior introduced, changed, fixed, or intentionally preserved, plan at least one matching verification step. Prefer automated behavioral tests when the project supports them. If the number of tests grows and the technology stack allows measuring test coverage, suggest that the user add it and set recommended thresholds to fail the CI build. Do not treat a coverage percentage as proof of correctness or meaningful assertions.

Use deterministic controls for randomness, timers, generated data, concurrency, retries, and asynchronous behavior when practical. Test observable behavior rather than the private implementation. Prefer complete meaningful output comparisons when they give clearer failures.

## Bug investigation and regression tests

For bug-fix tasks, investigate the test gap before implementing the fix. The investigation must identify why existing tests, checks, fixtures, mocks, assertions, or manual verification allowed the bug to reach the current state. Classify the gap when possible, such as missing coverage, weak assertions, unrealistic fixtures, incorrect mocks, untested integration boundaries, nondeterminism, environment mismatch, or a behavior that was intentionally unspecified.

When a suitable automated harness exists and reproduction is deterministic, prefer this red-green sequence:

1. Reproduce or characterize the bug at the smallest meaningful behavioral boundary.
2. Add or update a regression test that describes the expected behavior.
3. Run it against the current code and observe failure for the expected reason.
4. Implement the smallest fix addressing the cause.
5. Run the targeted test again and observe it pass.
6. Run appropriate broader checks to detect regressions.

An existing failing test can satisfy the initial red step. Do not codify broken behavior, overfit implementation details, or merely assert that the patched line ran. Do not claim red-green evidence when a test was first run only after the fix.

A regression test may be skipped when impractical or misleading: reproduction is unavailable, no suitable harness exists, an external dependency cannot be isolated, only visual/manual verification is reliable, or the user explicitly requests an emergency fix. Document the reason and use the strongest practical alternative. Skipping a regression test does not remove the obligation to report verification limits.

## Match checks to the task

- UI: check the actual screen, state, and interaction. DOM classes, counts, pixels, screenshots, or console output count only when they demonstrate acceptance behavior. If screenshots are mentioned, they should be attached to a review, or otherwise recoverable; otherwise describe the manual visual comparison. Use meaningful tolerances, not false precision.
- APIs, schemas, and data: check request/response behavior, errors, compatibility, migrations, documentation, and generated clients or schemas when affected. For database tasks, cover migration, rollback, existing data, and new data where practical.
- Accessibility: check relevant focus, keyboard interaction, semantics, labels, contrast, reduced motion, and screen-reader-visible behavior.
- Performance: obtain measurements or before/after evidence where practical. Do not infer a performance improvement from code shape alone.
- Configuration, dependencies, CI, and builds: check defaults and overrides, lockfiles, generated metadata, build files, affected workflows, produced artifacts, and compatibility.
- Refactors, formatting, and mechanical work: verify the behavior intended to remain unchanged and confirm no unrelated changes were introduced.
- Test-only work: describe the regression/risk covered and record the exact command and result.
- Documentation and comments: compare explanations with relevant source and inspect rendered output when applicable. Comment-only work must not change runtime behavior. Confirm no unintended changes to code, generated artifacts, or behavior-bearing configuration. The distinct Docs-task exception for documentation generation affecting runtime artifacts does not turn behavior-changing work into a comment-only task. A server starting is not by itself documentation or UI verification.

## Standard development checks

Standard development checks are expected during development, but they are not a substitute for behavior-specific verification. Examples appropriate to the repository and changed files include linting, typechecking, building, formatting, dependency/lockfile checks, generated-file consistency, `git diff --check`, or a smoke start. These do not replace behavior-specific acceptance evidence.

A check is expected when the repository documentation, scripts, task type, changed files, or user request make it the normal validation path. Do not invent an exhaustive list of every possible unrun check.

In a final task record, omit routine passing checks unless the task is about that check/tooling, the check is the only meaningful verification, or its outcome affected the task. Include failed checks and expected checks not run, with reasons. Starting a server or receiving HTTP 200 is meaningful only when it actually proves a relevant behavior.

## Honest evidence and completion reports

Only report tests, builds, migrations, browser/manual checks, or user verification actually executed and observed. Read command output and wait for completion. Report timeouts, interruption, missing tools, sandbox restrictions, unavailable services, and their impact instead of silently treating them as success.

Keep behavior-to-evidence notes available for review and finalization, including commands, observed outcomes, and limitations. A previous task's reported result is historical evidence, not a check performed in this task. Distinguish static structural checks from live agent behavior or end-to-end tests.

Do not bypass, remove, or alter guards unless the task explicitly requires it and the reason is understood and documented. Report unresolved failures and whether the task is safe to proceed.

### Assumptions in completion reports

When reporting completed work to the user, mention any material assumptions that shaped the solution, unless they were already disclosed in an earlier final/task-completion report for the same task and have not changed. This is an exemption from repeating unchanged disclosures, not a prohibition.

Assumptions disclosed only in planning notes, progress updates, or pre-edit checkpoints do not count as task-completion-report disclosure. Repeat task-shaping assumptions in the final report when they affected behavior, UX, APIs, data, architecture, tests, or user-facing meaning.

Do not include trivial assumptions that did not shape the implementation. If an assumption changed during the work, briefly state both the earlier assumption and the final one. These rules apply to completion-only sessions and reports after handoff or context loss as well as reports immediately following implementation.

Stop for user review after reporting, unless the user explicitly requests a different workflow.
