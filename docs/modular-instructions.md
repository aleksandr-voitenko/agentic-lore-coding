# Modular agent instructions

Agentic Lore Coding v22 keeps a small permanent contract in `AGENTS.md` and loads detailed procedures from `.lore-coding/` before the operations they govern. The directory is a project convention, not an automatically discovered agent feature. This guide is for humans maintaining or adopting the bundle; agents do not need to preload it.

## Directory and ownership

```text
AGENTS.md
.lore-coding/
  instructions/
    discovery.md
    development.md
    verification.md
    finalization.md
    memory-writing.md
  references/
    commit-format.md
    comment-examples.md
```

The root defines instruction strength, essential obligations, task/approval boundaries, routing, and loading/recovery behavior. The five instruction modules contain operational procedures. Commit format is a required authoring reference; comment examples are optional explanatory material.

Project knowledge stays in the adopting project's root and scoped `MEMORY.md` files. Do not copy this repository's own memory into another project. `.lore-coding/` contains reusable workflow instructions, not task logs or project-specific memory. Keep possible future tool-specific adapters separate and point them at these canonical files instead of copying the rules.

## What loads when

| Operation | Instructions needed |
|---|---|
| Read-only repository explanation or investigation | Root contract and discovery; relevant project memory, code, and history |
| Implementation planning and changes | Development plus verification before edits; discovery when establishing context |
| Creating/updating memory | Memory writing, only when a memory edit is authorized and necessary |
| Final task record or authorized commit | Finalization and commit format; other modules only if their operations are needed |
| Unclear comment/docstring case | Optional comment examples |

These are operation gates, not rigid phases. A regression test must be planned and observed failing before the fix when red-green applies. A finalization-only session must recover actual evidence rather than claiming another session's checks. Merely reading a module is never authorization to perform its actions.

The root retains the obligation to collect material decisions, relevant Lore IDs, and verification outcomes throughout work. Only formatting that evidence and creating the task commit are deferred. Discovery contains a short reader's guide to historical records, without loading the complete authoring specification.

Read memory root-to-leaf without loading memory-maintenance rules unnecessarily. Missing root memory triggers writing instructions only before authorized implementation; a read-only explanation must not create files.

## Migration from the single-file distribution

Copy `AGENTS.md` and the entire `.lore-coding/` directory from the same revision. Keep the supplied `.githooks/` validator and its installation requirements. Existing structured commits and Lore links need no migration: this change does not alter their schema.

Review existing agent instructions before replacement. Preserve repository-specific safety, build, test, and workflow requirements. Keep permanent additions concise in the entry file; use explicit operation or scope references for larger local procedures. Move factual project context into the appropriate README/memory, not into the reusable modules. Back up the previous instructions until the new bundle has been checked.

Do not add an unconditional import of every module to an agent's startup file. Markdown references are routing pointers, not a request to recursively load every linked file. Install updates as one versioned bundle, preserving local additions deliberately. The version appears both in the root's visible text and in file markers so it remains identifiable when an agent strips HTML comments.

The [manual walkthrough](manual_mode.md) preserves historical transcripts from before this modular distribution. Install the full current bundle, not just the single file shown in those transcripts. The current rule is: finalization authorizes the task commit; a draft-only request does not. Old transcript instructions to commit separately are not the current default.

## Agent setup and limits

For Codex, keep the repository-root `AGENTS.md` in the normal discovery path. The [official instruction guide](https://developers.openai.com/codex/guides/agents-md) documents a default combined project-instruction budget of 32 KiB. The smaller entry file leaves room for other applicable instructions; later tool reads of modules still consume context. Do not use directory-scoped instruction discovery as a substitute for operation-based loading.

For Claude Code, preserve any existing `CLAUDE.md` and add the root import if needed:

```markdown
@AGENTS.md
```

The [official memory guide](https://code.claude.com/docs/en/memory#agentsmd) documents that Claude Code reads `CLAUDE.md`, not `AGENTS.md` directly. Import only the small root file. Its [import documentation](https://code.claude.com/docs/en/memory#import-additional-files) explains that imports load at startup, so importing every procedure would defeat deferred loading.

These setup notes are based on provider documentation, not a claim that this bundle has passed live evaluations on every agent. Check the installed tool's current behavior and record its version during evaluation. Other agents need an equivalent way to load the root instructions and read repository files on demand.

A session may eventually load every module it uses; this design does not promise automatic unloading or a constant context footprint. Recovery rules explicitly require reloading lost or changed instructions after compaction or handoff. A missing, unreadable, or mixed-version required module stops its dependent operation rather than triggering a silent fallback.

## Maintenance checks

From this repository, with Node.js 20 or newer:

```bash
node scripts/check-instruction-bundle.mjs
node --test scripts/check-instruction-bundle.test.mjs
```

The bundle checker verifies the eight declared files, version consistency, root routes, direct instruction references, eager-import syntax, balanced code fences, and UTF-8 byte budgets. It can inspect another installation without modifying it:

```bash
node /path/to/agentic-lore-coding/scripts/check-instruction-bundle.mjs /path/to/project
```

Budgets are maintenance targets for this distribution, not universal agent limits. The root is capped at 6 KiB and discovery at 6 KiB; larger procedures have separate caps. Intentional local extensions may require an explicit budget decision rather than silent growth. Run the checker after moving or renaming a module, and update every root-relative route together.

The existing hook-installer test file imports Vitest and needs an environment providing that dependency; it is not part of these dependency-free Node tests.

The checker does not prove agent obedience, semantic equivalence, or the truth of a commit's verification claims. Its negative tests deliberately remove modules, break versions/routes, add eager imports, and exceed byte budgets. The existing commit-message validator remains a separate check of the final task record.

## Live workflow evaluation scenarios

Run these in disposable repositories with a supported agent. Record tool/model version, installed bundle revision, prompt, observed file reads, actual edits/Git operations, verification output, and pass/fail. These scenarios are not automatically executed by the structural test suite.

| Scenario | Required observation |
|---|---|
| Explain a subsystem; do not change files | Discovery is read; no finalization preload or memory creation |
| Implement a bounded feature | Development and verification are read before edits; assumptions disclosed; stop for review |
| Fix a reproducible bug with a test harness | Test-gap analysis and the expected failing regression precede the fix |
| Implement in a repository without memory | Verified root memory is created under authorized work, using memory-writing rules |
| Finalize an already reviewed task | Finalization/format loaded; correct task-only changes and actual evidence in the commit |
| Draft a task record but do not commit | Record prepared with no staging or commit |
| Resume finalization in a fresh session | Evidence recovered; missing check results disclosed, not invented |
| Remove a required module or install a mismatched version | Exact dependency reported; affected operation stops |
| Resume after compaction or delegate a bounded task | Root contract and lost required modules re-established; no implied Git-write authority |

For retrieval evaluation, include a real earlier Lore record with a constraint that matters to the follow-up task, and inspect whether it affects the implementation. Agent self-reports alone are not evidence of file loading or compliance.

## Mapping from v21

| Earlier content | New authoritative location |
|---|---|
| Instruction strength, atomicity, task boundary and approval rules | Root contract |
| Context reading order, historical exploration, record interpretation | Discovery |
| Assumptions, semantic sanity, planning, architecture, code quality, comments and editing | Development; optional comment examples |
| Test-gap investigation, red-green, task-specific and standard checks | Verification |
| Final diff review, evidence reconciliation, authorized staging/commit | Finalization |
| Exact sections, types, IDs, trailers, writing examples and type reminders | Commit format |
| Memory creation, hierarchy, content, size, updates and compaction | Memory writing |

Long examples are condensed without making them prerequisites for unrelated work. The commit validator and its message schema are unchanged. The root still carries requirements that must influence early decisions; modularity must not delay verification design, assumption disclosure, evidence retention, or authorization boundaries.
