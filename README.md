# Agentic Lore Coding
Nowadays, it is easy to create a software prototype or minimum viable product (MVP) using AI agents. It can feel surprisingly easy. Keeping the project coherent and not allowing it to fall apart as it grows is a different story.

In my own projects and projects of others, I have seen agents forget earlier product decisions and begin making “dumb” changes. You ask them to fix one thing; they fix it but break another thing. Sometimes in a non-obvious way.

Additional common problem is code duplication in large codebases. An agent creates a tiny helper instead of reusing an existing function. Then another agent, or another session, does something similar elsewhere. Shortly, several implementations are doing almost the same job. GitHub explicitly [calls out](https://github.blog/ai-and-ml/generative-ai/agent-pull-requests-are-everywhere-heres-how-to-review-them) this failure mode.

Researchers have been looking at this too. [More Code, Less Reuse](https://arxiv.org/abs/2601.21276v1) found higher redundancy scores for agent-generated changes than for human changes in its repository case study. [SlopCodeBench](https://arxiv.org/abs/2603.24755v1) considers a similar issue: redundant code and structural complexity arising from repeated extensions made by agents to their implementations.

It does not imply that all projects created by agents will fall into pieces.  But getting today's task to work is not the same as keeping the project ready for tomorrow's changes.


## The context problem

One aspect of the issue is how LLMs use context. Context windows serve as a working memory, and it is limited capacity. But the issue is not only how much information the window can hold: just being present in context doesn't ensure that it will be used. The more the project develops, the more information becomes distracting for its completion.

As Anthropic puts it:

> Context, therefore, must be treated as a finite resource with diminishing marginal returns.
>
> — [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

Two tempting ways to preserve continuity are:

1. **Start most tasks in fresh sessions, but keep adding to `AGENTS.md`.** Previous decisions, exceptions, warnings, and instructions are stored in the same file. It becomes increasingly difficult to maintain consistency and accuracy, with each session being affected by the cost of loading them. This is noted in [Claude Code documentation](https://code.claude.com/docs/en/memory#write-effective-instructions) from Anthropic, as too long and contradictory instructions can be an issue.

2. **Keep one virtually endless session.** This discussion builds upon what has been accomplished so far  and, at some point, requires  compaction. While compaction  is helpful, the summaries used here may leave out certain facts which will be significant  later  on. In the meantime, the older discussions have nothing to do with the present job.

Neither approach is inherently wrong, and they are not the only options. The question is more specific: **how can an agent recover the reasons behind earlier changes without carrying the whole development history into every task?**

Context alone is insufficient as well. The agent still needs to check whether earlier decisions apply, avoid silently inventing requirements, and verify its changes. This is where **Agentic Lore Coding** comes in.

## A fresh session does not have to mean starting over

Imagine opening a new agentic session and typing:

> Start a new task. Improve version strings for Windows.

Sounds vague, right? On its own, it is.
But here is an excerpt from the agent's response after it explored the repository and relevant task history:

> The relevant prior tasks are clear now: LC-20260706-VX7M made shell reports extract compact tokens, while LC-20260701-WPS1 explains why Windows must still invoke the discovered executable path and capture stderr safely. That gives us a fairly small, presentation-focused change.
>
> Assumptions:
> 
> Safe assumptions: The task is scoped to windows.ps1 and its Windows harness, because Windows is the only platform whose version extraction still differs from the latest shell behavior.
> 
> Material assumptions: “Improve version strings” means making Windows match LC-20260706-VX7M: scan successful version output for a compact version-like token instead of reporting noisy first-line banners. Evidence: macos.sh and linux.sh now use extract_version_from_output, while windows.ps1 still returns the first non-empty line in Get-VersionLine.
> 
> Blocking assumptions: None.

This comes from a real task in [AI Agents Toolbox](https://github.com/aleksandr-voitenko/ai-agents-toolbox).

"Wait! What just happened?" you may ask.
I am tempted to say that it is magic, but this is simply how Agentic Lore Coding works.

Over the course of development, you and your AI agents build up the **Lore of your project**: what changed, why it changed, which constraints mattered, and how the result was verified.

That knowledge lives in structured Git commit messages, connected by stable task IDs and links to related tasks. Together, they form a graph of development decisions. Hierarchical `MEMORY.md` files provide compact summaries and starting points for discovery; the detailed reasoning behind earlier changes remains in the task records.

The agent uses those starting points, inspects relevant code, and follows useful links instead of loading the entire history. It must also check whether a historical decision still applies. The Lore is evidence, not an instruction to preserve every old choice forever.

Notice that the Windows example above explicitly labels the proposed interpretation as a **material assumption**. The agent is not pretending that the short prompt contained all those details. It is using earlier work to propose an interpretation you can inspect.

And yes, Lore Coding has its own `AGENTS.md`. The difference is that project history is not supposed to accumulate there. The operating contract, detailed procedures, current project summaries, and historical task records have separate roles, with additional material [loaded](https://github.com/aleksandr-voitenko/agentic-lore-coding/blob/main/AGENTS.md#operation-based-loading) when needed.

Record writing and lookup is done by the agent  as part of the workflow  process. You still require relevant tasks, evaluation, and validation. The goal here is to prevent constantly recreating the same context,  not to eliminate engineering judgment in the  development  process.

## What this looks like in practice

The Windows task is not a single example. In the projects where I use Lore Coding, references to earlier decisions have become a routine part of fresh sessions. Here are a few more excerpts:

1)
> Before editing I'm checking the Lore history for the multiplayer room component so the fix stays inside the boundary that previous task set: server snapshots are authoritative, the component owns presentation and input only.

2)
> The in-repo memory files are unusually valuable here: they describe a consciously layered architecture rather than accidental foldering. I'm checking whether the implementation has kept faith with those boundaries and where the next growth pressure is likely to appear.

3)
> History shows Minesweeper's free board/mine selectors were added as part of the general launcher parameter system, and Simon/Asteroids later moved to single Difficulty selectors. I'm reading those task messages so this change can follow the established “replace launch parameters with difficulty” pattern instead of inventing a one-off.

4)
> The macOS formatter prints the raw first version line as-is, so verbose tools like sqlite3, ffmpeg, and ImageMagick can stretch the row. I'm checking the Lore commits that shaped this output so the cap doesn't accidentally erase intentionally useful fallback text.

5)
> History shows the table is carrying a few recent platform-specific additions, especially rsync and pwsh. I'm reading those task messages now so the draft doesn't accidentally flatten that nuance.

These excerpts only illustrate the workflow. The implementation and verification still matter.

To explore the approach, you can check out the [Classic Games](https://github.com/aleksandr-voitenko/lore-coding-demo-classic-games) demo project and its history. Read the Lore commits on your own to get the idea; at the same time, you can also clone the repository and write a prompt like this and observe your agent logs:
> In the Asteroids game, asteroids currently do not collide with each other. When they collide, they should take damage as if they had been hit, but the player should not receive any points.

Give it a try.

## Practical benefits

- Lore preserves why the code was written that way. Looking up the source code will tell you its function, yet an option discarded or an amendment made during the discussion might not make it into the code at all. Lore Coding makes recording those reasons part of the task, so later agents can recover the intent before deciding what to change.
- Installation is small: copy the protocol files and initialize project memory. Beyond your agent and normal toolchain, Git is the only mandatory dependency. The recommended validation hook adds Node.js. 
- The protocol runs through ordinary files and Git commands. No separate memory service, database, or dedicated CLI is needed. 
- The agent maintains the Lore as part of its work. There is no development journal to keep manually or separate reindexing step. 
- Handoffs are straightforward: clone the repository with its history, set up your project dependencies and you are ready to go. The code and its recorded context travel together, whether another agent or person takes over. 
- The footprint is lightweight and readable: text files and commit messages explaining decisions, changes, and verification. 
- Supplementary rules cover explicit assumptions, task boundaries, preserving existing behavior, and honest verification. 
- Existing projects can adopt it without rewriting their history. Start with current project summaries and build the Lore through new tasks.

## What is the catch?

"Wait! There must be a catch," you may say.
And you are absolutely right! Everything comes at a price.

- **Recording and retrieving the Lore adds token overhead.** Searching history, reading records, and following links all cost tokens. It is getting better, though. A lot of effort has already gone into optimizing this, and the process is still ongoing.

- **Your Git commit messages are no longer entirely free-form.** They become part of the protocol, with required sections, task identities, and links. You can still read them as ordinary commit messages, but their structure matters.

- **History operations need care.** Normal merges and rebases are usable when task records and links remain intact. Squash-style merges that collapse several Lore tasks into one record are discouraged. Cherry-picks can leave references pointing to records missing from the destination branch. It's worth mentioning that the supplied tools help diagnose whether Lore's structure is damaged.

- **The Lore is not absolute truth.** Records may be inaccurate or out-of-date, and an agent may pull the incorrect context. The protocol requires checking important historical claims against current evidence, but those checks still depend on the agent and the review process.

- For the best results, changes should be atomic: one small improvement at a time. Whether or not you use Lore Coding, this approach will benefit your project. Do not try to create a clone of your favourite social network in one Lore commit.

The goal is not to make an agent remember everything. It is to make each new task begin with the context that matters and leave a useful record for the next one.

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

It's important to mention that this process can be automated using subagents. A supervising agent can break down complex work into a set of tasks and hand them off to subagents. Each subagent starts with a fresh context, executes its assigned task, and returns a lore description. The supervising agent then verifies the completed work and commits the changes. More on this later.

## The proposed approach

Lore Coding uses a set of ideas that each have value on their own, but become especially powerful when used together:

- **Atomic changes.** Each meaningful change is treated as a single task, an atomic unit of development effort.
- **Issue-aware commit messages.** Normal commit history usually briefly answers what changed. Lore Coding enhances Git commit messages by adding a mandatory set of sections that describe the work in great detail: why code changed, how it changed, how it was verified.
- **Intent graph.** Lore Coding turns structured task commits and repository history into an intent graph: a long-lasting record of earlier decisions that matter. This is achieved by introducing a special links format that agents follow during codebase exploration. Important decisions preserve what was chosen and why, their scope, and identified conditions that would justify reviewing them as the project evolves.
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

#### 1) Install `AGENTS.md` and `.lore-coding/`

Install and update `AGENTS.md` and the entire `.lore-coding/` directory together from the same version, keeping both in your project root.

#### 1a) If your project does not have an `AGENTS.md` file:

Copy `AGENTS.md` and the entire `.lore-coding/` directory from this repository into your project root.

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
>I added `AGENTS.md`, `.lore-coding/`, and a corresponding git hook.
>
>Finalize it as a task.

or

#### 👨 >
>I added `AGENTS.md`, `.lore-coding/`, Lore Coding memory files and a corresponding git hook.
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

## How does Lore Coding compare with similar projects?
Several projects address the same problems from different directions. Some capture what happens during a session, some make existing knowledge easier to search, and others preserve development decisions in Git.

| Project | What it emphasizes | Where Lore Coding differs | What the alternative adds |
|---|---|---|---|
| **Lore Protocol** | Git-native decision records with typed fields for constraints, rejected alternatives, verification, and relationships. Its CLI provides specialized queries, validation, and history-management commands. | You prefer fewer metadata fields and a broader development workflow around human-readable task records, including assumption handling and hierarchical project memory. | Lore Coding’s core does not provide the same dedicated commands for querying individual decision fields, tracing relationships, or preserving records through squash operations. Both approaches keep knowledge in Git.   |
| **CommitLore** | Selective capture of decisions that the code cannot explain, checked against the session and staged diff. It tracks decision lifecycles and delivers applicable records before edits in supported agents. | You want a structured record for every meaningful task, with intent, implementation, and verification together, rather than a separate workflow focused on selected decisions. You also prefer ordinary Git discovery over an additional CLI and index. | CommitLore provides specialized lifecycle and trust filtering, plus automatic pre-edit delivery in supported integrations. Lore Coding relies more on the agent following its discovery and verification instructions.   |
| **Claude-Mem** | Automatic capture of session activity, generated summaries, and searchable cross-session memory. | You want the shared development record to travel with the code. A clone containing the relevant history carries the Lore, without a separate memory database to transfer or synchronize. Task records are directly associated with the changes they explain. | Lore Coding does not provide Claude-Mem’s broader automatic observation capture or dedicated memory-search interface. Its durable record depends on what the agent preserves during work and finalization.    |
| **XERJ** | Ranked search across indexed code and documents, a reference-coding workflow, and an API for storing agent memories. | You want preserving task intent to be a required part of development, without running a search service or maintaining a separate index. Reasons discussed during the task become part of its Git record. | Lore Coding does not supply XERJ’s ranked retrieval engine or cross-corpus search. XERJ can store and retrieve intent too, but that intent must first be supplied as documents or memories.   |
| **Lore (`withlore.ai`)** | Automatic conversation capture and context management through a local gateway, with curated knowledge shared through `.lore.md` in Git. | You want a task-centered development record without putting another service between your agent and its model provider. Each task records its intent, implementation, and verification together. | Lore Coding does not itself capture the full conversation or manage the active context window. Useful details must reach its task records or memory files. Both approaches can [share project knowledge](https://withlore.ai/docs/architecture/) through Git. |

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
