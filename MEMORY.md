# Repository memory

This repository distributes Agentic Lore Coding: the root `AGENTS.md`, deferred procedures in `.lore-coding/`, and the Git commit-message validator in `.githooks/lore-coding.mjs`. README and `docs/manual_mode.md` explain adoption and use. This memory describes the methodology repository, not an application template.

Keep the version marker in the root only. Historical task records use `Context:`, `Implementation:`, `Verification:`, `Lore-ID`, and optional `Lore-Link` trailers; see `.lore-coding/references/commit-format.md`. Loading instructions never grants edit or Git-write authority.

Discovery verifies task-critical claims and the applicability of historical decisions. Development captures decision context and reconciles task-relevant memory before user review; finalization rechecks later changes. Preserve those boundaries when extending the workflow. Sources: `AGENTS.md` and `.lore-coding/instructions/`.

Task briefs live in the task conversation or existing task record, not a required new file. Development defines brief preparation and revisions; verification defines completion reports, including recovery without an earlier brief. The brief summarizes supported requirements and cannot override them. Task-specific limits are not automatically durable policy.

`node --test tests/task-brief-contract.test.mjs` checks selected instruction wording, routing, and preserved boundaries. `tests/task-brief-scenarios.md` describes separate live trials; a passing prose test is not evidence of live agent compliance.
