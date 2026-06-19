## What is this?

**Agentic Lore Coding** is a Git-native structured agent workflow (and protocol) for AI-assisted software development.
It enables highly automated software development, where you, as a developer, only need to define high-level constraints and follow simple guidelines.

In essence, this project introduces a single `AGENTS.md` file that changes both how you work with agents and how agents do their work.

## What problems does it solve?

When developing with AI agents out of the box (without using special tools and skills), there are following main issues:
- **Amnesia**. In each new session, agents have to rediscover who they are, where they are, and what year it is. Agents do their best to find all the relevant parts by using context mentioned in a task description, `AGENTS.md` information, file search, regular expressions and sometimes even a shallow git history exploration, but it is not guaranteed that they will discover all the required pieces of the puzzle. They do not know why a piece of code exists, which constraints shaped it and which alternatives were rejected. Using Lore Coding, agents quickly get all the required context for their work.
- **Context bloat**. Blind search leads to rapid context overflow with information that is not always relevant. Additionally, using a single session to tackle the previous problem inevitably causes context compaction, which increases the chance of hallucinations. With Lore Coding, you can safely start each task in a separate agent session without frequently running into context compaction issues.
- **Lack of guidance**. If agents do not have strict operating boundaries, they tend to produce quite creative and unexpected solutions. Very often they duplicate entities without any obvious (from a human perspective) reason, delete tests to bypass build failures, and generate large chunks of unverified code. Deterministic checks, such as unit tests, have proved effective in combating this by forcing agents to verify their own output, but it is possible to go much further. Lore Coding provides a set of strict rules and development practices with very few escape hatches.
- **Undisclosed assumptions**. No matter how well the prompt is written, agents will still find gaps and fill them in according to their own aesthetic preferences and creative judgment. These assumptions often introduce unexpected behavior that remains buried deep in the code, only to emerge later as inconsistencies and bugs. Agentic Lore Coding enables explicit assumption management by requiring agents to surface and document assumptions they make.

## How does it work in a nutshell?

Basically, there are only two commands that trigger complex agentic behavior under the hood. A typical development loop looks like this:

#### 👨 >
> Start a new task.
> 
> [goal or description, the more detail the better]

Optional refinements:

#### 👨 >
> Change ABC.
>
> ...
> 
> Remove XYZ.

When you are happy with the result:

#### 👨 >
> Finalize the task.

Agent will provide a task description in the Lore Coding format. Then...

Commit.
Repeat.
Profit!

## The proposed approach

Lore Coding uses a set of ideas that each have value on their own, but become especially powerful when used together:

- **Atomic changes.** Each meaningful change is treated as a single task, an atomic unit of development effort.
- **Issue-aware commit messages.** Normal commit history usually briefly answers what changed. Lore Coding enhances Git commit messages by adding a mandatory set of sections that describe the work in great detail: why code changed, how it changed, how it was verified.
- **Intent graph.** Lore Coding turns structured task commits and repository history into an intent graph: a long-lasting record of earlier decisions that matter. This is achieved by introducing a special links format that agents follow during codebase exploration.
- **Hierarchical working memory.** Lore Coding uses `README.md` and `MEMORY.md` files for different audiences:
  - `README.md` explains the project for humans
  - `MEMORY.md` files provide compact, durable context for agents before they read detailed task history. The hierarchy of memory files serves as a versioned notebook with up-to-date information about the current state of a project.
- **Emphasis on verification.** Tests are no longer optional. This becomes especially powerful when test coverage is enforced and agents are required to maintain it at a high level.
- **Software development guidelines.** These cover software engineering best practices, handling uncertainty, tool usage, architecture design, and maintaining a reliable project structure.
- **Assumption management.** Instead of silently filling gaps in the prompt, agents must separate safe assumptions from material or blocking ones, justify important decisions with repository evidence, and ask for clarification when the risk is too high.


## Is it a "silver bullet"?

No, because it requires some discipline, and, most importantly, you have to get tasks from somewhere.

The proposed methodology does **not** work **like this**:

#### 👨 >
> Start a new task:
> Create a clone of my favourite product XYZ.

Agents are designed to work on measurable pieces of work. At the moment, you cannot tell them a simple command and expect that after two months of work they return with a meaningful result.

Lore Coding works best when you are able to think top-down: to design a system as a composition of subsystems, and to build those subsystems from individual, possibly shared, components with well-defined responsibilities and boundaries. It does require some skill. Nevertheless, you can ask your favourite LLM in Pro Max Extra High GT mode to create such a breakdown for you.

Each task you work on captures a fragment of how you think. It serves as a log of your preferences: what you like, what you dislike, and how you tend to make decisions. The more tasks you accumulate, the better agents can adapt and approach future tasks with that past experience in mind.

## Project setup

#### 1) Install `AGENTS.md`

#### 1a) If your project does not have an `AGENTS.md` file:

Copy `AGENTS.md` from this repository into your project root.

#### 1b) If your project already has an `AGENTS.md` file:

If it contains some general workflows or principles you want to keep, create a new top-level `#` section at the bottom of Lore Coding `AGENTS.md` with an appropriate heading and append it there. Please make sure that your instructions do not contradict to Lore Coding's.

If it contains only project description, corner cases, implicit assumptions, and any other project-specific details, it is better to move these into `README.md` and `MEMORY.md`. You can ask your favorite AI agent to do this for you.

#### 👨 >
> This repository contains an `old-AGENTS.md` file that was used before introducing Agentic Lore Coding. Please analyze it carefully and move human-facing information to `README.md` and agent-specific data to `MEMORY.md`. If necessary, follow the hierarchical Lore Coding memory rules and create memory files in subfolders. You can remove `old-AGENTS.md` when you are done.

#### 1c) If your project has a large established codebase:

Ask your AI agent to create memory files. They will serve as a starting navigation point until you accumulate some Lore Coding history.

#### 👨 >
> Please analyze this codebase carefully and move human-facing information to `README.md` and agent-specific data to `MEMORY.md`. If necessary, spawn explorer subagents. Follow the hierarchical Agentic Lore Coding memory rules and create memory files in subfolders. 

Review the results and possibliy make more iterations.

#### 2) Set up a git hook that verifies integrity of commit messages

Lore Coding relies on commit messages keeping the required structure, so it is crucial to add a local `commit-msg` hook that validates every commit.

Requirements:
- Node.js available on `PATH`; Node.js 20 or newer is enough for the current validator

Copy the `.githooks` folder into your project root:

```text
.githooks/
  commit-msg
  install-lore-coding-hooks.mjs
  install-lore-coding-hooks.test.mjs
  lore-coding.mjs
```

After adding the files, configure Git once per clone:

> Note: On Windows use Git Bash

```bash
git config --local core.hooksPath .githooks
chmod +x .githooks/commit-msg .githooks/lore-coding.mjs
```

Verify the hook path:

```bash
git config --get core.hooksPath
```

Expected output:

```text
.githooks
```

(Optional)
For npm projects, add a prepare script that configures the hook automatically after install:

```json
{
  "scripts": {
    "prepare": "node .githooks/install-lore-coding-hooks.mjs"
  }
}
```

Hook's script can be launched manually. You can see how by executing:
```bash
node .githooks/lore-coding.mjs --help
```

#### 3) Make the first lore coding commit

#### 👨 >
>I added `AGENTS.md` and a corresponding git hook.
>
>Finalize it as a task.

or

#### 👨 >
>I added `AGENTS.md`, Lore Coding memory files and a corresponding git hook.
>
>Finalize it as a task.

## Start using Agentic Lore Coding

There are basically two modes of operation for Agentic Lore Coding: `manual` and `automatic`.

[Manual mode](/docs/manual_mode.md) requires constant interaction with agents but provides better results, especially at the beginning, when agents do not yet know your preferences.

Automatic mode requires careful planning and detailed specs. It involves using subagents, which allow you to accomplish a lot (hours and possibly days) of work without interruptions.

It is highly recommended that you bootstrap your project in the `manual` mode, then start doing refactoring tasks in `automatic` mode (see below), and finally start using agentic planning mode to create tasks and execute them with subagents that follow Lore Coding rules.

## Development loops

There are two development loops involved in Agentic Lore Coding.

1) The `inner loop` is built around a single AI agent session, and comprises one or several pairs of `Start a new task`, `Finilize the task` commands.

2) The `outer loop` is about your project health:
 - Implement 3-10 feature tasks
 - Make a broad QA session. Yes, someone must check your application to ensure that everything is aligned with your vision
 - If required, make a small session of bugfixes/improvements tasks
 - Ask an agent whether some refactoring is needed
 - Implement 1-3 refactoring tasks
 - Repeat

The fun part is that you do not necessarily have to execute this `outer loop` yourself; a coordinating agent can do it for you.

## Relationship to similar ideas

Lore Coding combines several existing ideas, but optimizes for a lightweight, prompt-native AI-agent workflow.

| Related idea | Similarity | Difference |
|---|---|---|
| [Lore Protocol][lore-protocol] | Also preserves decision context in Git history for AI agents and uses stable task identity. | Lore Protocol is more schema- and CLI-oriented. Lore Coding uses a smaller trailer set, human-readable task sections, repository instructions, and a simple `Start a new task` / `Finalize the task` prompt workflow. |
| [Conventional Commits][conventional-commits] | Uses typed commit subjects to make history explicit. | Lore Coding uses typed subjects too, but the main value is the structured body plus `Lore-ID:` and `Lore-Link:` trailers for task identity and traceability. |
| [Architecture Decision Records][adr] | Preserves decision context and rationale. | ADRs are best for significant architectural decisions. Lore Coding records routine task-level rationale directly in commits. |
| [Requirements traceability][requirements-traceability] | Connects intent, implementation, and verification. | Lore Coding creates a lightweight Git-native trace through task commits and Lore trailers instead of a separate traceability matrix. |
| [Docs as Code][docs-as-code] | Keeps knowledge in plain text and version control. | Docs as Code focuses on documentation artifacts. Lore Coding focuses on task history attached to code changes. |
| [Git trailers][git-trailers] and [Git notes][git-notes] | Provide Git-native mechanisms for structured or attached metadata. | Lore Coding uses Git trailers for task identity and links, but keeps the explanatory task record in ordinary human-readable commit sections. |
| [Issue-driven development][issue-driven-development] and [IssueOps][issueops] | Start work from explicit issues or use issues as workflow interfaces. | Lore Coding can start from issues, but its durable source of truth is the structured Git history. |
| [Spec-driven development][spec-driven-development] | Uses explicit written intent to guide implementation. | Lore Coding is lighter and task-local: it records intent and verification in commits rather than making a full specification the primary artifact. |
| [Vibe coding][vibe-coding] | Uses natural language to guide AI-assisted coding. | Lore Coding adds traceability, verification, and historical memory so AI-generated changes remain understandable later. |

## Lore Coding vs. Lore Protocol

Lore Protocol is the closest related idea.

Both approaches use Git history to preserve context for AI coding agents.

The difference is emphasis:

- **Lore Protocol** is more toolable and schema-oriented. It emphasizes structured metadata, validation, and CLI commands for querying and tracing.
- **Lore Coding** is more workflow-oriented and prompt-native. It uses a minimal trailer set for identity and links, while keeping the explanatory task record in human-readable commit sections guided by `AGENTS.md`.

The trade-off is deliberate.

Lore Protocol is stronger when teams want machine-validated metadata and dedicated query tooling. Lore Coding is easier to adopt when a team wants a low-friction method that works with ordinary Git and an AI agent that follows repository instructions.

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
