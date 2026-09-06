# Repository memory

## Purpose and ownership

This repository distributes Agentic Lore Coding instructions and a Git commit-message validator. It is not an application runtime or agent orchestrator.

- `AGENTS.md` is the small always-loaded contract and operation-routing table.
- `.lore-coding/instructions/` contains required procedures loaded before their operations.
- `.lore-coding/references/` contains the commit-writing specification and optional comment examples.
- `.githooks/lore-coding.mjs` validates structured task messages and reachable Lore links.
- `.githooks/install-lore-coding-hooks.mjs` configures the local hook path conservatively.
- `README.md` is the adoption and installation entry point.
- `docs/modular-instructions.md` is a compact module map and loading reference; setup belongs in README.
- `docs/manual_mode.md` is the historical longer walkthrough; its transcripts predate the modular bundle.

## Invariants

Record the bundle version only in `AGENTS.md`; instruction/reference modules are unversioned. Install the entire `.lore-coding/` directory and root file from the same Git revision. Project-specific memory belongs in the adopting project's root/scoped memory files, not inside the reusable instruction bundle; do not copy this repository's memory into another project.

Preserve the existing message schema unless a separate task intentionally changes it: typed subject, Context/Implementation/Verification sections, one Lore-ID, and optional semantic Lore-Link trailers. Instruction loading is not action authorization. Read-only discovery must not create memory, and verification requirements must be available before implementation.

Memory-maintenance criteria must load before deciding whether updates are needed, including finalization reviews with no edits. README-authoring rules belong in development; complete assumption-reporting rules belong in verification so completion-only sessions do not depend on having implemented the task. Preserve v21 modal strength, conditions, and exceptions when relocating rules.

## Verification

`node scripts/check-instruction-bundle.mjs` checks required files, root routing, the root bundle version, UTF-8 byte budgets, instruction references, and accidental eager imports. `node --test scripts/check-instruction-bundle.test.mjs` exercises the checker with negative fixtures. These are static checks, not proof that a coding agent follows the protocol or detection of every partial upgrade.

The existing `.githooks/install-lore-coding-hooks.test.mjs` imports Vitest, not the Node test runner; this repository does not supply a package manifest for that dependency. The commit validator's CLI is documented by `node .githooks/lore-coding.mjs --help`.

`node --test scripts/*.test.mjs` also runs the targeted instruction-contract regressions. They pin selected audited wording and decision-time loading paths, not general semantic equivalence. The linked-but-optional memory-route mutation must fail those targeted tests even though it passes the structural checker.

Live workflow evaluations are separate from the static tests. Record actual tool/model versions and observed reads, writes, and verification; never present unexecuted scenarios as test results.
