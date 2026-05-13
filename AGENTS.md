<!-- Agentic Lore Coding v2 -->

# General workflow

## Common work principles
Never guess; ask questions.
Always start with a research or planning phase. Your goal as a useful assistant is to turn possibly vague inputs into a concrete implementation plan that is useful both for a human developer as a roadmap and for an AI agent as a historical reference.
When researching how to implement something, consider several possible alternatives. Present them to the user and describe their pros and cons.
Let the user decide which way to go or, alternatively, ask for any additional input and repeat the planning phase.

## Tasks

### Essence
This repository is developed in a task-based manner.
Each task is an atomic unit of development effort applied to the project.
This means that for nearly every line of code in the project, there is an associated task.

A task represents a historical entity used by a human developer and an AI agent. It contains all relevant high-level information required to execute it and verify its completeness.

### Location
Task descriptions are located in commit messages. Always read them completely.

### Code mapping
Almost every line of code must be represented by a task description in the commit message.
By executing `git blame` for a certain portion of code, it is always possible to get context from the task description.

### Structure
Tasks contain markdown text.

The first line should have the following form:
`# Title: concise but useful task title`

Then there is an optional section, `# Links: `. If it is present, it contains one or more related commit hashes. The purpose of the `Links` section is to provide any additional context outside the current task that is worth considering.

Example 1:
```
# Title: Implement the initial version of the user login form.

# Links: e876f30f26473edad0e21384fa7e5e8f91bfb2f1, 7f5ef1510dd84282344d662055b2b92496013d55, f54d4c0a9be1d21caa4d671f6c13183b245e6a60
```

Example 2:
```
# Title: Add global user rank to the user profile page.
```

After this header, there are exactly three mandatory sections:
- `# Context`
- `# Implementation`
- `# Verification`

The `Context` section contains general information related to the task.
For instance, it can describe the current state of something and explain why it is a problem or why this task is needed. If this section is unclear to you as a helpful AI agent, ask the user.
It might contain references to useful sources that were used during research, such as documentation links, books, libraries, etc.
This section might also contain other considered alternatives and explain why they are not suitable.

The `# Implementation` section describes the changes that are necessary to transition from the current project state to the desired project state.
It can contain references to components, classes, functions, source files, and other related parts.

The `# Verification` section describes the acceptance criteria. It can contain general information about which automated tests were created or what manual work should be performed to check the required result. It is important for all steps in this section to be reproducible.

### Tasks workflow

#### Starting a new task
When the user says, "Start a new task," you must treat this as a marker for a new task, even if there was a previous conversation. When a task is finalized, you must gather all required information from the latest such message onward.

#### Title and context sections
If the user starts a new task using this form:
"Start a new task: implement something useful"
Use the text after `Start a new task:` to infer the task title. Otherwise, ask the user for a task description and context.

#### Exploration
When deciding what code needs to be changed, read the task descriptions from the commit messages for the candidate lines to get more context. It is crucial that you fully understand previously made changes. Because many tasks will have a non-empty `# Links:` section, it is worth investigating the change history more deeply. If reading the context leads to new discoveries and a need to change the initial plan, stop and notify the user with a detailed summary and possible next steps.

#### Code editing
Every commit hash from the lines of changed code should be present in the `# Links:` section of the current task. This approach creates a sort of dependency tree for further exploration, if required.

#### Finalization
When the user says, "Finalize the task," your goal is to create a task description according to the rules described above, in a format suitable for putting in a commit message. Do not include any intermediate steps that were taken during the work on the task unless they are genuinely useful.