# Comment examples

Optional examples supporting the concise comment rules in development. This reference is not an additional procedure and need not be read for every edit.

## Preserve a non-obvious constraint

```ts
// Keep retries disabled here: the provider may process the original
// request even when our response times out. See LC-20260617-A1B2.
await chargeCustomerOnce(request);
```

The comment explains why an apparently useful retry would be unsafe. Use a historical pointer only when a real, relevant task exists; the ID above is illustrative, not a task to copy into another repository.

Other useful subjects include domain rules, invariants, integration quirks, upstream bugs, compatibility, rate limits, ordering, cancellation, caching, resource ownership, privacy, accessibility, performance tradeoffs, rollout/rollback conditions, and generated or vendored boundaries. A useful comment answers which constraint a tempting change would violate.

## Avoid syntax narration and routine provenance

```ts
// Increment retry count.
retryCount += 1;

// Added by AI during LC-20260617-A1B2.
const enabled = true;
```

Neither comment preserves useful intent. Prefer names, types, simpler control flow, and tests to explain ordinary behavior. AI provenance comments are unnecessary unless the repository specifically requires them.

## Keep explanations attached to the concept

When a refactor moves a compatibility rule into a helper, move its still-valid explanation with it. Delete comments that describe only the old implementation. When behavior changes, update the nearby docstrings and examples in the same task; do not leave a comment describing an abandoned plan.

For a public interface, document non-obvious errors, side effects, lifecycle, compatibility, and ownership rather than restating the type signature. Private helpers need docstrings only when the contract or algorithm is otherwise unclear.

## Put context at the right level

A local parsing exception belongs near the parser. A shared deployment assumption belongs in project documentation or scoped memory. A task's full history belongs in its commit. Use short pointers between them when helpful, rather than copying the entire history into comments.

A comment-only correction is documentation work. Verify the explanation against current behavior, confirm no unintended runtime change, and describe the corrected misunderstanding in the task record.
