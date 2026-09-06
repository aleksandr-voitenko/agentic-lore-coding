# Development

Read before forming an implementation plan or editing code, tests, configuration, or documentation. Use the root contract and completed discovery; if context has not been established, load `.lore-coding/instructions/discovery.md` first. Load `.lore-coding/instructions/verification.md` before planning verification or implementing a change, not after the fix.

## Assumptions and planning

Do not make unsupported guesses. Before making code edits for any non-trivial task, surface a short standalone `Assumptions:` section containing `Safe assumptions:`, `Material assumptions:`, and `Blocking assumptions:`. Say `None` for empty categories. Do not hide assumptions in a general plan.

Safe assumptions are low risk. Material assumptions affect behavior, UX, APIs, data, architecture, tests, or user-facing meaning and must be justified with repository evidence. If the evidence is weak, ambiguous, or based mainly on interpreting the user's intent, treat the assumption as blocking and ask before editing. Treat these as material or blocking assumptions by default: the request seems joke-like, absurd, contradictory, or cross-domain; it adds behavior that does not fit the product; or the implementation is easy but the purpose is unclear. Low implementation risk does not make an assumption safe. If the literal request does not make sense for the product, follow the discovery semantic-sanity gate and proceed only after the user explicitly confirms the oddity is intentional.

Before substantial changes, summarize the implementation plan: relevant current behavior and history, observable outcomes to add/change/preserve, important alternatives, verification strategy, and unresolved questions. Ask for missing task context when no safe assumption is supported. For bug fixes, include a test-gap hypothesis and the applicable red-green regression strategy.

Use observable outcomes to guide implementation, tests, manual checks, and the final task record, rather than implementation-only goals.

## Scope, environment, and tooling

Keep changes atomic and minimize their footprint. Prefer existing abstractions, ownership boundaries, conventions, and integration points. Do not mix unrelated behavior changes, refactors, formatting, dependencies, generated files, or UI cleanup. Report unrelated issues and leave them unchanged unless they must be addressed to complete or verify this task safely.

Preserve existing behavior unless intentional; disclose side effects and confirm them. Do not bypass, remove, or alter environment checks, sandbox checks, feature gates, test guards, CI guards, or safety-related conditions unless the task explicitly requires it and the reason is understood and documented.

While editing code, add or update tests when the project structure supports it.

When changing dependencies, schemas, generated files, lockfiles, snapshots, configuration, or files loaded by build/runtime/tests, update all associated repository artifacts required by the change.

## Architecture and interfaces

Consider alternatives for changes affecting architecture, behavior, public APIs, data models, dependencies, performance, security, accessibility, deployment, tooling, or maintainability. Preserve backward compatibility for migrations, data models, and APIs when zero-downtime deployment matters. In large codebases, use feature flags or toggles when incomplete, large, risky, or behavior-changing work needs to merge safely before being exposed.

Consider an ADR for significant durable architectural, dependency, API, data, deployment, or security decisions. Present a decision that materially changes task direction to the user before proceeding.

Keep module/package/service/layer boundaries and public interfaces explicit. Prefer minimal intentional APIs and private implementation details. Avoid unclear boolean flags, ambiguous null values, positional mode arguments, magic strings, and unexplained numeric literals when clearer alternatives are practical. Make known state handling exhaustive where practical. Avoid catch-all branches when explicit cases would be safer or clearer.

For asynchronous or concurrent interfaces, make cancellation, ordering, retries, timeouts, thread safety, idempotency, ownership, and error propagation explicit when relevant.

## Code quality and mechanical work

Prefer clear, maintainable, idiomatic code over clever code. Use behavior-oriented names matching project vocabulary. Avoid unnecessary abstractions. Add abstractions when they reduce duplication, clarify intent, improve testability, isolate meaningful domain concepts, or make future changes safer. Do not create small helpers referenced only once unless they meaningfully improve readability, isolate complexity, or preserve a clear boundary. Keep implementation details local; avoid large rewrites without a task need. Prefer cohesive extraction over growing large, high-touch modules, without unnecessary restructuring.

Simplify control flow and use idiomatic resource management, formatting, iteration, and error handling. Handle errors gracefully. Do not swallow exceptions silently. Write useful error messages. Include what failed, why it likely failed when that can be inferred safely, and the relevant identifier, request, file path, user action, operation, or external service context. Do not expose secrets or sensitive data in errors or logs. Prefer comparisons of complete meaningful values in tests unless field-level assertions improve failures.

Keep tests, fixtures, examples, and documentation close to the behavior they describe when possible.

For refactors, behavior should remain strictly unchanged unless the task explicitly says otherwise. Keep formatting-only and mechanical changes separate from behavior changes. Mechanical changes include codemods, repetitive path/import updates, renames, and generated refreshes with no intended behavior change. Follow the repository's formatting, naming, and layout conventions. When a large formatting-only or mechanical change obscures blame and the repository uses `.git-blame-ignore-revs`, record its hash there through the authorized workflow.

## Comments and documentation

Code comments preserve local intent and constraints; Lore history preserves task rationale. Prefer clear names, types, state models, and focused tests over comments that excuse confusing code.

- Preserve explanations of surprising behavior, invariants, domain rules, non-obvious edge cases, compatibility, security/privacy/accessibility constraints, integration quirks, concurrency, ownership, and performance tradeoffs.
- Read nearby comments, docstrings, tests, and history before edits. Investigate stale or conflicting explanations. Update comments with changed behavior, preserve valid intent during refactors, and delete obsolete comments with removed code. Move still-relevant context rather than losing it.
- Add concise comments where a future maintainer could make a plausible but wrong inference. Do not narrate syntax, restate obvious code, or duplicate nearby tests or task messages. Do not add routine AI provenance comments unless the repository requires them. Use a Lore ID only when a durable historical pointer materially explains a constraint.
- Do not add speculative TODO/FIXME/HACK/TEMP notes without repository convention and actionable context such as an issue, owner, expiry condition, or removal trigger. Prefer creating a tracked task when follow-up work matters. Never embed secrets, customer data, credentials, or confidential incident details; point to an approved secure source instead.
- Document non-obvious public API parameters, results, errors, side effects, lifecycle, compatibility, and security contracts where repository conventions support docstrings. Do not require a docstring for every private helper.
- Keep relevant user/developer docs, examples, generated documentation, API/configuration descriptions, and deployment notes aligned with the change. Local constraints belong near code; cross-cutting architecture and operational rules belong in appropriate docs, ADRs, or memory.

Before reporting completion, scan the diff for comment-code mismatches and descriptions of abandoned approaches. A comment-only change is documentation work. It must not change runtime behavior. Verify the affected explanation against source or rendered documentation and confirm no unintended code, generated-artifact, or behavior-bearing configuration changes. When correcting a misleading explanation, mention the corrected misunderstanding in `Context:` and state that no runtime behavior changed in `Implementation:` or `Verification:`.

### README authoring

`README.md` should contain public, human-facing information: project description and features; tech stack when useful; install, development, build, and test commands; deployment notes; important environment variables; persistent storage notes; and links to other documentation when useful. Do not turn `README.md` into an agent scratchpad. Keep it understandable without requiring knowledge of the internal task workflow. Avoid long internal file maps unless genuinely useful to human contributors. Update README when a task changes public features, setup/build/run/test commands, deployment behavior, environment variables, storage requirements, or the public project description.

Consult `.lore-coding/references/comment-examples.md` only when examples would clarify these rules. Before reviewing memory maintenance or creating or changing memory, load `.lore-coding/instructions/memory-writing.md`.

## Retain evidence and report for review

Retain task evidence during work as required by the permanent contract.

Before reporting completion, load `.lore-coding/instructions/verification.md` and follow its reporting procedure.

Stop before staging or committing for user review unless the user explicitly authorized those operations. After adjustments, repeat verification and reporting. Only when preparing the final task record or authorized finalization, load `.lore-coding/instructions/finalization.md`.
