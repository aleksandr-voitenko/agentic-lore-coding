# Agentic Lore Coding

**Agentic Lore Coding** is an issue-aware, Git-native development approach built around a structured protocol for AI-assisted software work.

It turns structured task commits and repository history into an **intent graph**: a durable record of why code changed, how it changed, how it was verified, and which earlier decisions matter.

The short name is **Lore Coding**.

## Why this exists

AI coding agents can produce useful code quickly, but they often lose the historical context that maintainers rely on:

- why a piece of code exists;
- which constraints shaped it;
- which alternatives were rejected;
- which related commits should be read before changing it;
- which behavior was actually verified.

Normal commit history usually briefly answers **what changed**. Lore Coding tries to make Git history answer **why it changed** and **how future agents should reason about it**.

The goal is not to replace code review, tests, issues, ADRs, or documentation. Instead, Agentic Lore Coding makes the ordinary development loop preserve enough structured context for the next human or AI agent to continue without rediscovering the same decisions.

A common problem in AI-assisted development is that context compaction in AI-agent sessions can increase the risk of later hallucinations, especially when important details are omitted, compressed too aggressively, or distorted. Context compaction is usually a lossy summarization process: older conversation history is replaced by a shorter generated summary, so the agent may later rely on incomplete or slightly altered information.

Lore Coding reduces this risk by moving durable task context out of the live chat and into repository history. Each meaningful change is recorded as a structured task commit with context, implementation details, verification evidence, and, when useful, links to related commits. This makes it practical to start new work in a fresh agent session with minimal task-specific context, then detailed historical context can be recovered from Git history, `MEMORY.md`, and the relevant source files when needed. As a result, ordinary tasks are less likely to require context compaction, although very large or complex tasks may still need it.

## Core idea

Every meaningful change is treated as a task.

Each task ends with a structured commit message:

```text
<Type>(optional-scope): concise task subject

Links:
- <commit> — <reason this historical commit matters>

Context:
...

Implementation:
...

Verification:
...
```

Over time, these commits form an intent graph:

```text
Current code
   ↓ git blame / git log
Task commit
   ↓ Links
Related task commits
   ↓ Context / Implementation / Verification
Recovered project intent
```

## Core Principles
Lore Coding depends on a few practices:

- **Preserve intent.** Explain why the change exists, not only what changed.
- **Keep changes atomic.** One task should have one coherent purpose.
- **Read history before editing.** Existing code often carries decisions that are not obvious from the current file alone.
- **Link related commits.** Make dependencies between decisions explicit.
- **Verify behavior.** Tests and manual checks should map to the behavior that matters.
- **Avoid noisy logs.** Routine passing checks should not drown out acceptance evidence.
- **Maintain project memory.** Use `MEMORY.md` for compact durable context, not chronological task history.

The graph is stored in Git itself. No database, SaaS product, or dedicated CLI is required.

## What makes it agentic

Lore Coding is designed for AI agents that can read files, inspect Git history, edit code, run checks, and prepare commit messages.

The minimal interaction pattern is intentionally simple:

```text
Start a new task:

<goal or description>
```

The agent explores the repository, reads relevant history, proposes a plan, implements the change, and verifies the behavior.

Then:

```text
Finalize the task.
```

The agent produces a commit-message-ready task description with context, implementation, verification, and links to related commits.

Finally:
you can review, possibly edit and commit the task description by yourself, or ask an agent to do this.

## What this repository contains

This repository is the home of the Agentic Lore Coding.

The main operational file is [`AGENTS.md`](AGENTS.md). It contains:

- general software development practices for AI agents;
- the Agentic Lore Coding task method;
- commit message rules;
- task lifecycle rules;
- project memory management rules.

The README explains the approach for humans. `AGENTS.md` instructs AI agents how to apply it.

## Task commit sections

### Subject

The first line uses a task type and optional scope:

```text
Feature(snake): Add timed yellow apples
Improvement(tetris): Center next-piece preview
Bug fix(leaderboard): Prevent duplicate submissions
Refactor(scores): Extract shared formatting helper
```

The subject should describe the completed outcome, preferably as user-visible or system-visible behavior.

### Links

`Links:` contains related commit hashes with reasons.

Use links for semantic dependencies, not every nearby line from `git blame`.

Good links explain inherited behavior, constraints, design decisions, or test strategy:


> Links:
> - 93ff88bf7320dc9487f303951ce7f6bf35939e38 — introduced persistent obstacle islands that now influence yellow-apple placement
> - ed8617874209f09f7eb3bbbe6d3c15898be6276b — created the deterministic Snake engine and tests used to verify timed-food placement

### Context

`Context:` explains why the task exists.

It focuses on:
- current state;
- problem or opportunity;
- desired behavior or outcome;
- important constraints;
- alternatives only when they clarify the decision.

Implementation details must be out of `Context:` unless they explain a constraint or rejected direction.

Example:

> Context:
The Tetris sidebar preview rendered the next tetromino inside a visible 4x4 grid using the tetromino's source coordinates. That made most next pieces appear aligned toward the top-left of the preview box, and the empty grid cells made odd- and even-sized pieces feel inconsistently placed.
> 
> The desired behavior is for the next-piece preview to look visually centered while preserving the existing tetromino definitions and gameplay behavior.


### Implementation

`Implementation:` explains what changed.

It is specific enough that a future reader can understand the solution without reading the whole diff. Implementation may include design rationale when the chosen layer or approach matters.

Example:

> Implementation:
> Updated `src/components/tetris-game.tsx` so the next-piece preview computes the bounding box of the current next tetromino, normalizes its cells to that local box, and positions the four rendered blocks around the center of the preview square.
>  
> Kept the change local to the sidebar preview instead of changing `getTetrominoPreviewCells`, because the piece definitions were already correct and only the presentation needed different positioning.


### Verification

`Verification:` explains how the completed task was checked.

It is honest, concrete, reproducible, and behavior-specific. 

Example:
> Verification:
> - Opened Classic Tetris in the browser and verified the next-piece preview renders on a plain background with exactly four visible tetromino blocks.
> - Verified that the preview no longer shows empty board cells and that the measured piece center is aligned with the preview center within sub-pixel tolerance.
> - Compared desktop and mobile-width views and verified the preview stayed centered in both layouts.

## Task types

| Type | Use for |
|---|---|
| `Feature:` | New user-visible or system-visible capability |
| `Improvement:` | Better existing behavior without a distinct new capability |
| `Bug fix:` | Broken, incorrect, or unintended behavior |
| `Refactor:` | Implementation restructuring with no intended behavior change |
| `Revert:` | Undoing a previous change |
| `Formatting:` | Formatting-only change |
| `Mechanical:` | Minor mechanical change with no intended behavior change |
| `Dependency:` | Dependency addition, removal, or update |
| `Database:` | Schema, migration, index, backfill, or data-shape change |
| `CI:` | CI/CD, release automation, or automated checks |
| `Build:` | Build tooling, bundling, compilation, or build scripts |
| `Test:` | Test-only change |
| `Docs:` | Documentation-only change |
| `Config:` | Project, environment, tool, or runtime configuration |
| `Security:` | Security, privacy, permissions, or abuse resistance |
| `Performance:` | Speed, memory, bundle size, latency, or scalability |
| `Accessibility:` | Accessibility behavior or semantics |
| `Chore:` | Repository maintenance that does not fit another type |

When a task touches several categories, the primary purpose is chosen. Optionally, an agent my offer to make several commits.

## Relationship to similar ideas

Lore Coding combines several existing ideas, but optimizes for a lightweight, prompt-native AI-agent workflow.

| Related idea | Similarity | Difference |
|---|---|---|
| [Lore Protocol][lore-protocol] | Also preserves decision context in Git commit messages for AI agents. | Lore Protocol uses Git trailers, stable Lore IDs, validation, and CLI query/trace commands. Lore Coding uses human-readable task sections and a simple `Start a new task` / `Finalize the task` prompt workflow. It less relies on tools. |
| [Conventional Commits][conventional-commits] | Uses typed commit subjects to make history explicit. | Lore Coding uses typed subjects too, but the main value is the structured body: context, implementation, verification, and related commits. |
| [Architecture Decision Records][adr] | Preserves decision context and rationale. | ADRs are best for significant architectural decisions. Lore Coding records routine task-level rationale directly in commits. |
| [Requirements traceability][requirements-traceability] | Connects intent, implementation, and verification. | Lore Coding creates a lightweight Git-native trace through task commits and links instead of a separate traceability matrix. |
| [Docs as Code][docs-as-code] | Keeps knowledge in plain text and version control. | Docs as Code focuses on documentation artifacts. Lore Coding focuses on task history attached to code changes. |
| [Git trailers][git-trailers] and [Git notes][git-notes] | Provide Git-native mechanisms for structured or attached metadata. | Lore Coding can adopt such mechanisms later, but does not require them. |
| [Issue-driven development][issue-driven-development] and [IssueOps][issueops] | Start work from explicit issues or use issues as workflow interfaces. | Lore Coding can start from issues, but its durable source of truth is the structured Git history. |
| [Spec-driven development][spec-driven-development] | Uses explicit written intent to guide implementation. | Lore Coding is lighter and task-local: it records intent and verification in commits rather than making a full specification the primary artifact. |
| [Vibe coding][vibe-coding] | Uses natural language to guide AI-assisted coding. | Lore Coding adds traceability, verification, and historical memory so AI-generated changes remain understandable later. |

## Lore Coding vs. Lore Protocol

Lore Protocol is the closest related idea.

Both approaches use Git history to preserve context for AI coding agents.

The difference is emphasis:

- **Lore Protocol** is more toolable and schema-oriented. It uses structured Git trailers, stable IDs, and CLI commands for querying, validation, and tracing.
- **Lore Coding** is more workflow-oriented and prompt-native. It uses ordinary Git commands, human-readable commit sections, linked commits, and agent instructions in `AGENTS.md`.

The trade-off is deliberate.

Lore Protocol is stronger when teams want machine-validated metadata and dedicated query tooling. Lore Coding is easier to adopt when a team wants a low-friction method that works with ordinary Git and an AI agent that follows repository instructions.

## Limitations and trade-offs

Lore Coding is intentionally lightweight, which means:

- it relies on agent discipline and review rather than strict schema validation;
- commit hashes in `Links:` can change after rebases or cherry-picks;
- the intent graph is easy to inspect manually, but less queryable than a dedicated metadata system;
- the quality of the graph depends on task size, commit-message quality, and verification discipline.

Projects with heavier needs can add stable task IDs, Git trailers, validation scripts, or visualization tooling later.

## Project status

Agentic Lore Coding is an experimental development protocol.

It is intended to be practical rather than academic: simple enough to use with ordinary Git and current AI coding agents, but structured enough to preserve meaningful project intent over time.

## License

MIT License. See [`LICENSE`](LICENSE).

[lore-protocol]: https://github.com/Ian-stetsenko/lore-protocol
[lore-paper]: https://arxiv.org/abs/2603.15566
[conventional-commits]: https://www.conventionalcommits.org/en/v1.0.0/
[adr]: https://martinfowler.com/bliki/ArchitectureDecisionRecord.html
[requirements-traceability]: https://www.jamasoftware.com/requirements-management-guide/requirements-traceability/what-is-traceability/
[docs-as-code]: https://www.writethedocs.org/guide/docs-as-code/
[git-trailers]: https://git-scm.com/docs/git-interpret-trailers
[git-notes]: https://git-scm.com/docs/git-notes
[issue-driven-development]: https://www.foonathan.net/2016/05/issue-driven-development/
[issueops]: https://github.blog/engineering/issueops-automate-ci-cd-and-more-with-github-issues-and-actions/
[spec-driven-development]: https://arxiv.org/html/2602.00180v1
[vibe-coding]: https://simonwillison.net/2025/Mar/19/vibe-coding/
