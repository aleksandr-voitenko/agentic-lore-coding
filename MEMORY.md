# Repository memory

## Purpose and ownership

This repository distributes Agentic Lore Coding instructions and a Git commit-message validator. It is not an application runtime or agent orchestrator.

- `AGENTS.md` is the small always-loaded contract and operation-routing table.
- `.lore-coding/instructions/` contains required procedures loaded before their operations.
- `.lore-coding/references/` contains the commit-writing specification and optional comment examples.
- `.githooks/lore-coding.mjs` validates structured task messages and reachable Lore links.
- `.githooks/install-lore-coding-hooks.mjs` configures the local hook path conservatively.
- `README.md` is the adoption and installation entry point.
- `docs/modular-instructions.md` explains the module boundaries, migration, and evaluation scenarios.
- `docs/manual_mode.md` is the historical longer walkthrough; its transcripts predate the modular bundle.

## Invariants

Keep the root and all instruction/reference files on the same version marker. Install the entire `.lore-coding/` directory with its matching root file. Project-specific memory belongs in the adopting project's root/scoped memory files, not inside the reusable instruction bundle; do not copy this repository's memory into another project.

Preserve the existing message schema unless a separate task intentionally changes it: typed subject, Context/Implementation/Verification sections, one Lore-ID, and optional semantic Lore-Link trailers. Instruction loading is not action authorization. Read-only discovery must not create memory, and verification requirements must be available before implementation.

## Verification

`node scripts/check-instruction-bundle.mjs` checks required files, root routing, version consistency, UTF-8 byte budgets, instruction references, and accidental eager imports. `node --test scripts/check-instruction-bundle.test.mjs` exercises the checker with negative fixtures. These are static checks, not proof that a coding agent follows the protocol.

The existing `.githooks/install-lore-coding-hooks.test.mjs` imports Vitest, not the Node test runner; this repository does not supply a package manifest for that dependency. The commit validator's CLI is documented by `node .githooks/lore-coding.mjs --help`.

Live workflow evaluations in the modular-instructions guide are manual scenarios. Record actual tool/model versions and observed reads, writes, and verification; never present unexecuted scenarios as test results.
