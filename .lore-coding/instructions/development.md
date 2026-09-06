# Development

Read before forming an implementation plan or editing code, tests, configuration, or documentation. Use the root contract and completed discovery; if context has not been established, load `.lore-coding/instructions/discovery.md` first. Load `.lore-coding/instructions/verification.md` before planning verification or implementing a change, not after the fix.

## Assumptions and planning

Do not make unsupported guesses. Before non-trivial code edits, surface a short standalone `Assumptions:` section containing `Safe assumptions:`, `Material assumptions:`, and `Blocking assumptions:`. Say `None` for empty categories. Do not hide assumptions in a general plan.

Safe assumptions are low risk. Material assumptions affect behavior, UX, APIs, data, architecture, tests, or user-facing meaning and must be justified with repository evidence. Weak or ambiguous evidence, especially an interpretation of intent, makes an assumption blocking: ask before editing. Treat nonsensical or cross-domain requests as blocking even when implementation seems easy. Proceed only after the user confirms the intended meaning.

Before substantial changes, summarize the implementation plan: relevant current behavior and history, observable outcomes to add/change/preserve, important alternatives, verification strategy, and unresolved questions. Ask for missing task context when no safe assumption is supported. For bug fixes, include a test-gap hypothesis and the applicable red-green regression strategy.

Use observable outcomes rather than implementation-only goals: a timed bonus appears only after its progression gate, awards the specified points, expires, avoids occupied cells, and clears on game over. These outcomes guide code, tests, review, and the eventual task record.

## Scope, environment, and tooling

Keep changes atomic and minimize their footprint. Prefer existing abstractions, ownership boundaries, conventions, and integration points. Do not mix unrelated behavior changes, refactors, formatting, dependencies, generated files, or UI cleanup. Report unrelated issues and leave them unchanged unless they must be addressed to complete or verify this task safely.

Preserve existing behavior unless intentional; disclose side effects and confirm them. Do not bypass or remove environment checks, sandbox checks, feature gates, test/CI guards, or safety conditions without an explicitly authorized task and understood, documented reason.

Check required tools and use documented setup where possible. Report unavailable tools rather than silently skipping work. Do not claim a command succeeded without observing it. Give long-running commands time to complete; stop only when unsafe, clearly hung, or blocking progress. Report interruption or timeout accurately.

When changing dependencies, schemas, generated files, lockfiles, snapshots, configuration, or files loaded by build/runtime/tests, update all associated repository artifacts required by the change.

## Architecture and interfaces

Consider alternatives for changes affecting architecture, public APIs, data models, dependencies, performance, security, accessibility, deployment, tooling, or maintainability. Preserve backward compatibility for migrations, data models, and APIs when zero-downtime deployment matters. Use feature flags when large, incomplete, risky, or behavior-changing work must merge before exposure.

Consider an ADR for significant durable architectural, dependency, API, data, deployment, or security decisions. Present a decision that materially changes task direction to the user before proceeding.

Keep module/package/service/layer boundaries and public interfaces explicit. Prefer minimal intentional APIs and private implementation details. Avoid unclear boolean flags, ambiguous null values, positional mode arguments, magic strings, and unexplained numeric literals when clearer alternatives are practical. Make known state handling exhaustive where useful.

For asynchronous or concurrent interfaces, make cancellation, ordering, retries, timeouts, thread safety, idempotency, ownership, and error propagation explicit when relevant.

## Code quality and mechanical work

Prefer clear, maintainable, idiomatic code over clever code. Use behavior-oriented names matching project vocabulary. Avoid abstractions or one-use helpers unless they improve readability, testability, cohesion, or a meaningful boundary. Keep implementation details local; avoid large rewrites without a task need. Prefer cohesive extraction over growing large, high-touch modules, without unnecessary restructuring.

Simplify control flow and use idiomatic resource management, formatting, iteration, and error handling. Do not swallow exceptions. Errors should identify what failed and useful context without leaking secrets or sensitive data. Prefer comparisons of complete meaningful values in tests unless field-level assertions improve failures.

For refactors, preserve behavior strictly unless the task explicitly includes an approved behavior change. Keep formatting-only and mechanical changes separate from behavior changes. Mechanical changes include codemods, repetitive path/import updates, renames, and generated refreshes with no intended behavior change. Follow the repository's formatting, naming, and layout conventions. When a large mechanical change obscures blame and the repository uses `.git-blame-ignore-revs`, record its hash there through the authorized workflow.

## Comments and documentation

Code comments preserve local intent and constraints; Lore history preserves task rationale. Prefer clear names, types, state models, and focused tests over comments that excuse confusing code.

- Preserve explanations of surprising behavior, invariants, domain rules, non-obvious edge cases, compatibility, security/privacy/accessibility constraints, integration quirks, concurrency, ownership, and performance tradeoffs.
- Read nearby comments, docstrings, tests, and history before edits. Investigate stale or conflicting explanations. Update comments with changed behavior, preserve valid intent during refactors, and delete obsolete comments with removed code. Move still-relevant context rather than losing it.
- Add concise comments where a future maintainer could make a plausible but wrong inference. Do not narrate syntax, restate obvious code, duplicate full task records, or add routine AI provenance comments. Use a Lore ID only when a durable historical pointer materially explains a constraint.
- Do not add speculative TODO/FIXME/HACK/TEMP notes without repository convention and actionable context such as an issue, owner, expiry condition, or removal trigger. Never embed secrets, customer data, credentials, or confidential incident details; point to an approved secure source instead.
- Document non-obvious public API parameters, results, errors, side effects, lifecycle, compatibility, and security contracts where repository conventions support docstrings. Do not require a docstring for every private helper.
- Keep relevant user/developer docs, examples, generated documentation, API/configuration descriptions, and deployment notes aligned with the change. Local constraints belong near code; cross-cutting architecture and operational rules belong in appropriate docs, ADRs, or memory.

Before reporting completion, scan the diff for comment-code mismatches and descriptions of abandoned approaches. Comment-only work must not unintentionally change behavior-bearing code or configuration; verify the affected explanation against source or rendered documentation. Describe any corrected misunderstanding in the final task context.

Consult `.lore-coding/references/comment-examples.md` only when examples would clarify these rules. Before creating or changing memory, load `.lore-coding/instructions/memory-writing.md`.

## Retain evidence and report for review

During implementation, keep concise factual records of relevant Lore IDs, material assumptions, rejected alternatives that matter, changed/preserved behaviors, and actual verification results. Do not wait for finalization to recover information that was never retained. Do not turn memory into a task-progress log or persist private reasoning.

Report the completed work, behavior-specific verification, limitations, and task-shaping assumptions, including changes to earlier assumptions. Assumptions disclosed only in planning or progress still belong in the completion report; do not repeat them in another completion report for the same task unless they changed. Omit trivial assumptions.

Stop before staging or committing for user review unless the user explicitly authorized those operations. After adjustments, repeat verification and reporting. Only when preparing the final task record or authorized finalization, load `.lore-coding/instructions/finalization.md`.
