## Lore Coding in manual mode

**NOTE:** This long text describes a usage mode called `manual mode`, where users need to interact frequently with an agent. It provides a very detailed overview of the methodology usage from the very beginning. Closer to the end, it shows a typical development loop. `Automated mode`, where less human interaction is required, is also supported and is described in another section.

The sequence of prompts and outputs below will help you get the idea. I would strongly encourage you to create a toy project to see how it works in action.

### Task 1. Initial commit
---
It is assumed that you copied the latest version of the Lore Coding `AGENTS.md` file, set up the commit validation hook, and ready to start your journey.

Open your favorite AI agent UI and type:

### 👨 >
> I added a new `AGENTS.md` file in this repository.
> Please finalize the task.

### 🤖 🤔
> > I’ll inspect the repo context and the current diff so the task description reflects what actually changed, not just the high-level note. Then I’ll generate a unique Lore ID and include any meaningful historical links if the new file relates to prior project-memory or workflow work.

### 🤖 >
> Docs: Add repository agent instructions
> 
> Context:
The repository did not yet have an `AGENTS.md` file defining shared development expectations for future coding tasks. Agents needed durable project-level guidance for safe implementation, verification, task traceability, Lore commit formatting, and project memory handling.
> 
> Implementation:
Added root `AGENTS.md` with Agentic Lore Coding instructions.
> 
> The file defines software development best practices, the Lore Coding task protocol, required structured commit-message sections, allowed task types, Lore trailer handling, finalization rules, and project memory management guidance for `README.md` and `MEMORY.md` files.
> 
> Verification:
Verified `AGENTS.md` exists and is non-empty.
> 
> Verified the document includes the expected top-level sections for software development best practices, Agentic Lore Coding protocol, and project memory management.
> 
> No runtime tests were run because this is a documentation-only repository instruction addition with no application code changes.
> 
> Lore-ID: LC-20260604-R8N4

Now stage the file, use the provided description, and commit the changes. Alternatively, the agent can make a commit on your behalf.

### Task 2. Bootstrapping the repository
---

Next step: open a new chat session.

### 👨 >
> Start a new task:
> 
> Set up a new web project in this repository. I'd like to use the following:
> - Node.js
> - npm
> - Vite
> - TypeScript
> - React
> - Tailwind CSS
> - shadcn/ui

### 🤖 🤔
> > Here’s the implementation shape I’m going to follow: scaffold a Vite React TypeScript app at the root, wire Tailwind through the current Vite plugin path, initialize shadcn-compatible config and starter components, add README/MEMORY project context, then install/build/run and browser-check the default screen.

### 🤖 🤔
> > Set up the new web project at the repository root with Vite, React, TypeScript, Tailwind CSS 4, npm, and shadcn/ui.
> > 
> > Key files added include `package.json`
> >
> > ...
> >
> > Verified:
> > - `npm run lint` passes.
> > - `npm run build` passes.
> > - `git diff --check` passes.
> > - In-app browser loaded [http://127.0.0.1:5173/](http://127.0.0.1:5173/), found the starter page and button, saw no console errors, and confirmed the `d` dark/light toggle works.

### 👨 >
> Please finalize the task and commit the changes on my behalf.

### 🤖 🤔
> >I’ll finalize this as a Lore task commit now: first I’m stopping the dev server, then I’ll inspect the final staged content, generate a unique Lore ID, and commit with the required structured message.

### 🤖 >
> Feature: Scaffold Vite React web project
> 
> Context:
> 
> The repository only had the shared AGENTS.md instructions and did not yet contain an application scaffold. The task was to set up a new web project using Node.js, npm, Vite, TypeScript, React, Tailwind CSS, and shadcn/ui.
> 
> The desired outcome was a root-level app scaffold that can install, develop, build, lint, and accept future shadcn/ui components without adding unrelated product behavior.
> 
> Implementation:
> 
> Scaffolded a Vite React TypeScript app at the repository root with npm-managed dependencies and a package-lock.json lockfile.
> 
> Configured Tailwind CSS 4 through @tailwindcss/vite, shadcn/ui through components.json using the radix-nova style with Lucide icons and the @/* alias, and Vite alias resolution for src imports.
> 
> Added the starter React entrypoint, theme provider, shadcn Button component, cn() utility, global shadcn/Tailwind theme CSS, TypeScript configs, ESLint and Prettier configs, public assets, and a root .gitignore.
> 
> Added README.md with human-facing setup, build, lint, format, and shadcn component commands. Added MEMORY.md with durable architecture, source layout, and development context for future tasks.
> 
> Scoped an ESLint override to src/components/ui so generated shadcn component helper exports such as buttonVariants can remain available while the rest of the app keeps the Vite React Refresh rule.
> 
> Verification:
> - Ran npm run lint; ESLint passed after the scoped shadcn UI override while preserving the exported Button and buttonVariants API.
> - Ran npm run build; TypeScript project build and Vite production build > completed successfully.
> - Loaded http://127.0.0.1:5173/ in the in-app browser and verified the starter page rendered the Project ready text and shadcn Button with no browser console errors.
> - Pressed d in the rendered app and verified the document theme class toggled from dark to light with no browser console errors.
> 
> Lore-ID: LC-20260604-K7Q2
> 
> Lore-Link: LC-20260604-R8N4 — establishes the repository Lore protocol and project memory requirements followed by this scaffold.

### Task 3. Minimum Viable Product
---

Next step: open a new chat session and type this prompt.

### 👨 >
> Start a new task.
> Create a classic Snake game in this repository.
> - Use a rectangular game board made of cells.
> - Use schematic graphics only, with no textures for now.
> - At any given time, the board must have exactly one red apple reward.
> - Make sure the reward does not spawn on cells occupied by the snake.
> - Do not spawn apples too close to the snake’s head.
> - Let the snake grow when it picks up an apple.
> - Each apple picked up gives +1 score.
> - Display the score at the top.
> - After every 6 apples eaten, the snake’s speed must increase.
> - Let the snake be controlled with WASD and the arrow keys.
> - The game must have a clear "Game Over" state with possibility to restart.

### 🤖 🤔
> > ...
> >
> > Plan before edits:
> > 1.  Replace the starter screen with a playable Snake app in  src/App.tsx: board constants, movement/input handling, apple spawning rules, scoring, speed tiers every 6 apples, game-over and restart.
> > 2.  Keep the visuals schematic: CSS grid board, square snake cells, one red apple cell, compact score/status header, keyboard-friendly restart button.
> > 3.  Update global CSS only where the app needs page-level polish and stable rendering.
> > 4.  Verify with  npm run lint,  npm run build, and browser checks for movement, apple count/spawn constraints, score/growth/speed text, game over, and restart.
> >
> > I’m about to edit the app files. One important conflict I’m handling: the starter theme provider used d as a dark-mode shortcut, which would clash with the required Snake D movement key, so I’ll disable that shortcut at the provider boundary while leaving theme application itself intact.
> >
> > ...

### 🤖 >
> Implemented the Snake game in `src/App.tsx`: rectangular 24x16 cell board, schematic snake/apple rendering, one red apple, apple spawning off the snake and away from the head, growth, +1 scoring, speed increase every 6 apples, WASD/arrow controls, and Game Over with restart.
> 
> I also disabled the starter `D` theme shortcut so it does not conflict with moving right in `theme-provider.tsx` and `main.tsx`, then updated `README.md` and `MEMORY.md`.
> 
> Verified with:
>- `npm run lint`
>- `npm run build`
>- `git diff --check`
>- Browser QA: movement with `D`/arrows, six apple pickups to confirm score 6, snake length 9, speed 2, exactly one apple after each spawn, Game Over on wall hit, Restart reset, and mobile viewport at 390x844 with no overflow.

### 👨 >
> It works well.
>
> Please finalize the task.

### 🤖 >
> Feature(snake): Add classic Snake game
> 
> Context:
The app still showed the starter Vite/shadcn surface, while the requested product behavior was a playable classic Snake game.
> 
> The game needed a rectangular cell board with schematic-only visuals, exactly one red apple reward at a time, apple placement that avoids the snake and avoids spawning too close to the snake head, growth and +1 score per apple, speed increases every 6 apples, WASD and arrow-key controls, and a clear Game Over state with restart.
> 
> Implementation:
Replaced the starter `src/App.tsx` surface with a React Snake game state machine and board renderer. The game uses a 24x16 cell board, tracks snake segments and queued direction, advances on a speed-scaled interval, rejects direct reverse turns, detects wall and self collisions, grows on apple pickup, increments score, and derives speed level from apples eaten.
> 
> Implemented apple spawning from free board cells only, preferring cells at least 5 Manhattan-distance steps from the snake head and falling back to any free cell only if needed.
> 
> Rendered the board as a schematic CSS grid with visible cells, green snake cells, a red apple, score/speed/next-speed counters at the top, and a Game Over overlay with a shadcn Button restart action.
> 
> Added an optional `enableKeyboardShortcut` prop to `src/components/theme-provider.tsx` and disabled it from `src/main.tsx` so the starter `D` dark-mode shortcut does not conflict with Snake movement.
> 
> Updated `README.md` with the game behavior and `MEMORY.md` with the durable ownership notes for the Snake surface and disabled theme shortcut.
> 
> Verification:
> - Loaded the app in the in-app browser and verified the initial board renders 384 cells, exactly one red apple, three snake cells, score 0, speed 1, next 6, and no premature Game Over.
> - Verified keyboard movement with `D` and `ArrowDown`; the snake moved as expected, the apple count stayed exactly one, and pressing `D` no longer changed the document theme class.
> - Drove the snake through six apple pickups in the browser and verified score reached 6, snake length grew from 3 to 9, exactly one apple remained after each pickup, and displayed speed increased from 1 to 2.
> - Verified wall collision shows the Game Over overlay with final score and Restart, then verified Restart resets to score 0, speed 1, three snake cells, one apple, and no Game Over overlay.
> - Checked a 390x844 mobile viewport and verified the header and board fit without horizontal overflow while preserving the schematic cell board.
> 
> Lore-ID: LC-20260604-S9M2
> Lore-Link: LC-20260604-K7Q2 — provides the Vite React, Tailwind, shadcn/ui, theme-provider, README, and MEMORY scaffold that this task turns into the Snake game surface.

Commit it yourself or ask the agent.

### Task 4. New feature
---

Next step: open a new chat session and type this prompt.

### 👨 >
> Start a new task.
>
>Let's add a new type of timed food called "Golden Apple":
>- In this version, it must look like a yellow circle to match the current style.
>- It gives +2 points.
>- It appears once every 5–15 seconds and lasts 5–10 seconds.

### 🤖 🤔
> > ...
> >
> >I’ll treat this as a fresh Lore task boundary. I’m going to read the project memory/README first, then inspect the food/game loop code and its history before touching the implementation.
> >
> > ...
> >
> >There are only two relevant commits and **no existing test files**, so I’m going to lean on the current component and build/lint/browser checks. I’m also reading the Snake task commit message so any new behavior links cleanly to the existing Lore history.
> >
> > ...
> >
> >There are only two relevant commits and no existing test files, so I’m going to lean on the current component and build/lint/browser checks. I’m also reading the Snake task commit message so any new behavior links cleanly to the existing Lore history.
> >
> > ...
> >
> >The prior Snake commit introduced the one-red-apple rule and the placement constraints, which are directly relevant. My plan is to add a separate optional timed-food slot, keep regular apples unchanged, and reuse the same free-cell placement rules while excluding both food types from overlapping each other.
> >
> > ...
> >
> > Here’s the concrete path I’m taking:
> > 
> > 1.  Add golden-apple timing constants and state: optional golden apple position, expiry timestamp, and next spawn timestamp.
> > 2.  Keep regular red apples at +1 and the existing speed progression; golden apples will be an extra timed bonus worth +2 and will use the same one-cell growth behavior as food.
> > 3.  Reuse the existing spawn constraints, extended so regular and golden apples never overlap each other or the snake.
> > 4.  Render golden apples as yellow circular cells in the same schematic board style.
> > 5.  Update README/MEMORY for the new durable game rule, then run build/lint and browser-check the rendered behavior.

### 🤖 >
> Implemented the Golden Apple task.
> 
> It’s in `src/App.tsx`: Golden Apples now spawn on a 5-15 second schedule, expire after 5-10 seconds, render as yellow circular food, avoid the snake/red apple, and award `+2` when eaten. I treated it as actual Snake food, so it also grows the snake by one cell; speed progression still only counts regular red apples.
> 
> Updated the public rule in `README.md` and durable project memory in `MEMORY.md`.
> 
> Verification passed:
> 
> ...
>
> - Browser QA at `http://localhost:5173/`: initial board had 384 cells, 1 red apple, 0 Golden Apples, 3 snake cells, no console warnings/errors.
> - Browser QA saw a Golden Apple spawn at 11.6s as `border-yellow-500 bg-yellow-400`.
> - Browser QA collected a Golden Apple: score changed `0 -> 2`, Golden Apple cleared, snake length changed `3 -> 4`.

### 👨 >
> I checked it, and it works well.
> I want to change when yellow apples can appear for the first time.
> Allow yellow apples to be created only after the player has picked up at least two red apples, so players get a sense of progression and don’t see all the features right from the beginning.

### 🤖 🤔
>> I’ll fold this into the existing Golden Apple work. I’m going to make the timing gate depend on red-apple pickups, so no spawn timer starts until applesEaten >= 2, then I’ll re-run build/lint and a quick browser check.

### 🤖 >
> **Summary**  
> Updated the Golden Apple progression gate in src/App.tsx (line 15). Yellow apples now stay completely disabled until the player has eaten 2 red apples; after the second red apple, the normal 5-15 second spawn timer starts.
> 
>  ...

### 👨 >
> Finalize the task.

### 🤖 >
> Feature(snake): Add gated Golden Apples
> 
> Context:
The Snake game only had regular red apples worth 1 point. The requested new behavior was a timed Golden Apple bonus that matches the existing schematic food style, awards 2 points, appears on a 5-15 second cadence, and expires after 5-10 seconds.
> 
> Golden Apples should also feel like progression instead of appearing immediately, so their spawn timing should not begin until the player has eaten at least 2 regular red apples.
> 
> Implementation:
> Updated `src/App.tsx` with Golden Apple state, timing constants, spawn scheduling, expiry handling, and +2 scoring. Golden Apples reuse the board-cell food presentation as yellow circular cells, avoid snake and regular apple cells when spawning, clear on game over, and are removed after being eaten or expiring.
> 
> Kept regular red apples as the source of speed progression by continuing to increment `applesEaten` only when red apples are eaten. Added a 2-red-apple gate so Golden Apple scheduling remains disabled with no pending timer until the threshold is reached; eating the second red apple starts the normal randomized 5-15 second spawn delay.
> 
> Updated `README.md` with the player-facing Golden Apple rule and `MEMORY.md` with the durable implementation note that timed Golden Apple spawning is owned by `src/App.tsx` and gated behind 2 regular red apples.
> 
> Verification:
> - Ran a deterministic local state check covering Golden Apple gating: 0 red apples and 1 red apple both kept `goldenApple` and `nextGoldenAppleAt` null.
> - Verified the deterministic second-red-apple pickup path reached score 2, `applesEaten` 2, and scheduled a Golden Apple timer inside the 5-15 second range.
> - Verified a due Golden Apple timer after 2 red apples spawned a Golden Apple with a lifetime inside the 5-10 second range.
> - Loaded the app in the in-app browser and verified the reset board renders 384 cells, exactly one red apple, zero Golden Apples, three snake cells, score 0, speed 1, next 6, no Game Over overlay, no horizontal overflow, and no console warnings or errors.
> 
> Lore-ID: LC-20260604-GA7P
> Lore-Link: LC-20260604-S9M2 — introduced the Snake game loop, red apple spawning, scoring, speed progression, and schematic board rendering that Golden Apples extend.

Commit it yourself or ask the agent.

### Task 5. Adding tests
---

At some point, an agent will likely offer to create deterministic tests to reduce the growing verification effort. But you can do it sooner. Highly recommended next step: let's add some tests.

Open a new chat session and type this prompt.

### 👨 >
> I would like to have deterministic tests in this project. What options would you suggest? I want to cover as much of the logic as possible.

### 🤖 >
> I’d suggest three realistic options, with **Option 2** as the sweet spot.
> 
> **Option 1: Minimal Vitest Coverage**
Add Vitest and test exported helpers from `src/App.tsx`.
> 
> This is quickest, but the file currently keeps most game logic private and uses `Math.random()`, so coverage would either be shallow or require awkward module exposure.
> 
> Good for:
> - `getTickDelay`
> - simple state transitions if exported
> - a few golden-apple timing cases
> 
> **Option 2: Extract A Pure Game Engine**
> Move Snake rules from `src/App.tsx` into something like `src/game/snake-engine.ts`, then test it with Vitest.
> 
> This gives the most deterministic coverage with a small, healthy refactor. The React component becomes mostly rendering and event wiring; the engine owns board constants, movement, spawning, scoring, collision, speed, and golden-apple state.
> 
> I’d inject randomness and time, for example:
> 
> ```ts
> type GameRuntime = {
>   now: () => number
>   random: () => number
> }
> ```
> 
> Then tests can use fixed `now()` values and seeded or scripted random numbers.
> 
> Cover:
> - initial snake/board/apple state
> - regular apple spawn avoids snake and prefers distance from head
> - fallback apple spawn when preferred cells are unavailable
> - movement without food
> - wall collision
> - self collision, including tail-vacating edge cases
> - red apple growth, +1 score, apple replacement
> - speed level after every 6 red apples
> - reverse-direction rejection
> - golden apples disabled before 2 red apples
> - second red apple schedules golden timer
> - due timer spawns golden apple
> - golden apple avoids snake and red apple
> - golden apple expires
> - golden apple pickup gives +2 but does not affect speed progression
> - game over clears golden apple state
> - no free cell ends game cleanly
> 
> **Option 3: Full Pyramid**
Use Option 2, then add a thin React Testing Library layer and maybe one Playwright smoke test.
> 
> Recommended layers:
> - **Vitest unit tests:** most logic, fast and deterministic.
> - **React Testing Library:** keyboard handling, rendered counters, game-over > overlay, restart button.
> - **Playwright:** one browser smoke test for “board renders, keyboard starts movement, restart works.”
> 
> I would not put most game rules in browser tests. They’ll be slower, more fragile, and harder to make deterministic than pure engine tests.
> 
> My recommendation: **Option 2 first**, with a small dependency addition for `vitest`, then optionally add React Testing Library for the keyboard/rendering boundary. That should cover almost all meaningful logic without turning the test suite into a maze.

### 👨 >
> Sounds good.
> I like the Option 2. Please start a new task and implement it.

### 🤖 🤔
> > I’ll start this as a new Lore task and implement Option 2: extract the game rules into a deterministic engine module, add Vitest coverage around that module, then wire the React app back to the engine. I’ll keep the UI behavior unchanged and focus the diff on testability plus tests.
> >
> > ...
> >
> > Plan for the edit: create `src/game/snake-engine.ts` as the pure rules module, let `App.tsx` import only engine state/helpers plus the UI keyboard map, and add `src/game/snake-engine.test.ts` for deterministic movement, spawning, scoring, speed, collision, and Golden Apple timing. I’ll also update the npm scripts and memory/README notes so the new test command is discoverable.
> >
> > ...
> >
> >   Great, the deterministic suite passes on the first run: 21 engine tests. I’m running build and lint now to catch integration or static-analysis fallout from the extraction.

### 🤖 >
> Implemented Option 2.
> 
> I extracted the Snake rules into `src/game/snake-engine.ts` with injectable `now()` and `random()` runtime hooks, then rewired `src/App.tsx` to use the engine for ticking, initial state, and direction queuing.
> 
> I added Vitest plus `npm test` in `package.json` and wrote 21 deterministic engine tests in `src/game/snake-engine.test.ts` covering setup, apple placement, movement, tail-vacating collision behavior, wall/self collision, red apple scoring/progression, board-fill game over, Golden Apple gating, spawn, expiry, rescheduling, and scoring. README and MEMORY now document the new test command and engine boundary.
> 
> Verification passed:
> - `npm test` — 21 tests passed
> - `npm run build`
> - `npm run lint`
> - `git diff --check`
> 
> Task is implemented and ready for `Finalize the task` when you want the Lore commit message.

### 👨 > 
> Finalize the task.

### 🤖 >
> Test(snake): Add deterministic engine coverage
> 
> Context:
> The Snake game rules lived inside `src/App.tsx`, where movement, spawning, > scoring, speed progression, collision handling, and Golden Apple timing were > coupled to React rendering and direct `Date.now()` / `Math.random()` calls.
> 
> The desired outcome was broad deterministic test coverage for the game logic without making browser or component tests carry the full rules surface.
> 
> Implementation:
> Extracted the pure Snake rules into `src/game/snake-engine.ts`, including board constants, state types, initial state creation, direction queuing, tick advancement, apple placement, red apple scoring, speed delay derivation, collision handling, and Golden Apple scheduling, expiry, spawning, and scoring.
> 
> Added a `GameRuntime` injection point for `now()` and `random()` so tests can drive time and random placement deterministically while the app still defaults to system time and `Math.random()`.
> 
> Updated `src/App.tsx` to import the engine and remain focused on keyboard input, interval ticking, restart wiring, display counters, and board rendering.
> 
> Added Vitest, an `npm test` script, and deterministic engine tests in `src/game/snake-engine.test.ts`. Updated `README.md` with the test command and `MEMORY.md` with the new engine/component ownership boundary.
> 
> Verification:
> - Added 21 deterministic Vitest tests covering initial state, speed delay, apple placement preferences and fallback, no-free-cell placement, direction queuing, non-running no-op behavior, movement, tail-vacating self-collision behavior, body collision, wall collision, red apple growth/scoring/respawn, final-board game over, Golden Apple gating, due spawn, no-cell rescheduling, expiry, and bonus scoring without red-apple speed progression.
> - Ran `npm test`; all 21 tests passed.
> 
> Lore-ID: LC-20260604-Q8N4
> Lore-Link: LC-20260604-S9M2 — introduced the Snake game loop, movement, apple spawning, scoring, speed progression, controls, and rendering now covered by deterministic engine tests.
> Lore-Link: LC-20260604-GA7P — introduced Golden Apple gating, timing, expiry, placement, and scoring now covered by deterministic engine tests.

Commit it yourself or ask the agent.

### Task 6. Continuous Integration
---

The next logical step is to add a CI that will make production build and run tests.
Open a new chat session and type this prompt.

### 👨 > 
> Start a new task.
> 
> Now that we have tests, it’s time to set up CI and make the build fail if the tests fail. Implement CI using GitHub Actions workflows.

### 🤖 🤔 
> > I’ll treat this as a fresh Lore task boundary. I’m going to read the project memory/README first, then inspect the test/build scripts and any existing workflow shape before editing.
> > 
> > ...
> >
> > The README and memory agree on pm/Vite/Vitest, and `npm test` is the behavior gate the user specifically wants enforced. I’m going to read the recent task history around the scripts and tests now, then I’ll add a minimal workflow that installs from the lockfile and runs the existing checks.
> > 
> > ...
> >
> > History points to `LC-20260604-Q8N4` as the task that introduced `npm test` and the deterministic engine coverage, so that should be the main Lore link for this CI task. I’m going to keep the workflow intentionally narrow: lockfile install, test, and build, on pushes/PRs.

### 🤖 >
> 
> Implemented GitHub Actions CI in `CI workflow`. It runs on pushes and pull requests with Node 22, installs via `npm ci`, then runs `npm test` before `npm run build`, so failed tests fail the CI job before the build step.
> 
> Also updated `README.md` and `MEMORY.md` with the new CI contract.
> 
> Verification: `npm ci` passed, `npm test` passed with 21 tests, `npm run build` passed, and `git diff --check` passed. I also tried `actionlint`, but it is not installed locally and the sandbox blocked fetching it from npm.

### Task 7. Tests coverage
---

It’s optional, but after you add tests and CI, it is highly recommended to set up test coverage and make the CI build fail when coverage falls below certain thresholds. This will prevent the agent from removing tests or adding large chunks of code without verification.

Recommended values for the core logic:
| Statements | Branches | Functions | Lines |
|---:|---:|---:|---:|
| 90% | 85% | 90% | 90% |


Open a new chat session and type this prompt.

### 👨 > 
> I’d like to set up test coverage in this project and make the CI build fail when coverage is below these thresholds:
> 
> - statements: 90%
> - branches: 85%
> - functions: 90%
> - lines: 90%
> 
> What is the best way to achieve this?

### 🤖 >
> Best fit here: use Vitest’s built-in coverage support with the V8 provider, then make CI run the coverage script instead of plain `npm test`.
> 
> I’d do this:
> 
> 1. Install the coverage provider:
> 
> ...
> 
> 2. Add a coverage script to `package.json`:
> 
> ...
> 
> 3. Configure thresholds in `vite.config.ts`, switching `defineConfig` to `vitest/config`:
> 
> ...
> 
> 4. Update `.github/workflows/ci.yml`:
> 
> ...

### 👨 > 
> Sounds good.
> Start a new task and implement this.

### 🤖 🤔 
> > Got it. I’m treating this as a fresh Lore task boundary, so I’ll re-check the repo context, inspect the relevant history, then make the coverage/CI changes and verify the coverage gate actually fails or passes as configured.
> >
> > Relevant history points at `LC-20260604-Q8N4`, which added the existing deterministic Vitest engine tests. Plan: add the V8 coverage provider, put the threshold gate in Vite/Vitest config, keep normal `npm test` available, add a dedicated `npm run test:coverage`, and make CI use that gate.

### 🤖 >
> Implemented the coverage gate.
> 
> Added Vitest V8 coverage config in `vite.config.ts`, with thresholds:
> 
> - statements: 90%
> - branches: 85%
> - functions: 90%
> - lines: 90%
> 
> CI now runs `npm run test:coverage` in `.github/workflows/ci.yml`, so the build fails if coverage drops below those thresholds. I also added `@vitest/coverage-v8`, `jsdom`, focused app/theme/util tests, ignored generated `coverage/`, and updated README/MEMORY with the new command.
> 
> Verification passed:
> 
> ```text
> npm run test:coverage
> 30 tests passed
> Statements 97.86%, Branches 90%, Functions 100%, Lines 97.84%
> ```

### 👨 > 
> Finalize the task.

### 🤖 >
> CI: Enforce Vitest coverage thresholds
> 
> Context:
> The project had deterministic Vitest coverage for the Snake engine, but `npm test` did not produce a coverage report and CI did not fail when coverage dropped below the requested project thresholds.
> 
> The desired behavior is for CI to fail when app-owned source coverage falls below 90% statements, 85% branches, 90% functions, or 90% lines. The gate also needed an explicit source include because Vitest coverage can otherwise measure only files imported by tests, which would miss untested app-owned React and utility files.
> 
> Implementation:
Added `@vitest/coverage-v8` and `jsdom` dev dependencies and updated `package-lock.json`.
> 
> Added `npm run test:coverage` and configured Vitest coverage in `vite.config.ts` with the V8 provider, text/html/lcov reporters, explicit inclusion for `src/**/*.{ts,tsx}`, exclusions for test files, `src/main.tsx`, and generated `src/components/ui/` source, and the requested global thresholds.
> 
> Updated the GitHub Actions workflow so CI runs `npm run test:coverage` before the production build, making coverage failures fail the CI job.
>
> Added jsdom-backed tests for `src/App.tsx` covering initial board rendering, counters, keyboard input, game-over display, Enter restart, and button restart. Added theme-provider tests covering stored themes, system theme changes, keyboard shortcut guards, disabled shortcuts, storage-event sync, invalid storage fallback, and the missing-provider error. Added a `cn()` utility test for class merging and Tailwind conflict resolution.
> 
> Ignored generated coverage output in `.gitignore` and ESLint global ignores. Updated `README.md` and `MEMORY.md` with the coverage command, thresholds, CI behavior, and durable coverage-scope notes.
> 
> Verification:
> - Added focused tests for the previously unmeasured app shell, theme provider, and utility code so the coverage gate measures app-owned source instead of only the Snake engine.
> - Ran `npm run test:coverage`; all 30 tests passed and coverage exceeded the configured gate with 97.86% statements, 90% branches, 100% functions, and 97.84% lines.
> 
> Lore-ID: LC-20260604-CV8G
> Lore-Link: LC-20260604-Q8N4 — introduced Vitest and deterministic Snake engine tests that this task extends into a CI coverage gate.
> Lore-Link: LC-20260604-S9M2 — introduced the Snake app surface, keyboard controls, game-over restart flow, and theme shortcut behavior now covered by jsdom tests.
> Lore-Link: LC-20260604-K7Q2 — introduced the Vite, npm, ESLint, README, MEMORY, shadcn, theme-provider, and utility scaffold that this task configures for coverage enforcement.

### Task 8+. Refactoring and beyond
---

It's important to make periodic refactoring sessions to keep the codebase healthy. Start a new AI agent session and type:

### 👨 > 
> Pease analyze the code base thoroughly and research whether some refactoring or code cleanup is needed.

### 🤖 🤔 
> > I’ll do a proper repo audit rather than guessing from the file tree: first the project memory and README, then the main source/test surface, then relevant history where it explains why things are shaped this way. After that I’ll separate “worth refactoring now” from “leave alone unless you’re already touching it.”

### 🤖 >
>I audited the repo and history. Short version: the codebase is healthy; I would not do a broad refactor right now. The useful cleanup is small and targeted.
>
>**Findings**
> 1. Starter Vite branding is still shipped. `index.html` still uses `/vite.svg`, `index.html` still says `vite-app`, and `src/assets/react.svg` appears unused. I’d update the title/favicon and remove unused scaffold assets.
> 2. Board accessibility semantics could be cleaned up. `App.tsx` puts an `aria-label` on a plain `div`, while all cells are `aria-hidden`. Consider `role="img"` or a named game-board region, plus clearer game-over announcement semantics around `App.tsx`.
> 3. Formatting/tooling misses CSS. `npm exec prettier -- --check src/index.css` fails, while TS/TSX files pass. The script at `package.json` only formats TS/TSX, and `src/index.css` has non-Prettier indentation. If expanding the format script to CSS, also add `dist/` to `.prettierignore`.
> 4. `resolveGoldenAppleState` has a long positional argument list and relies on callers passing an already-active Golden Apple. It is tested and working, but an object parameter or narrower internal helper would make future food/timer changes safer.
> 
> I checked the relevant Lore history too. The engine extraction was intentional in `LC-20260604-Q8N4`, so I would not split `snake-engine.ts` further unless new game mechanics make it painful.

### 👨 > 
> Start a new task.
> Implement the item 2 from the list above.

### 👨 > 
> Finalize the task.

### 👨 > 
> Start a new task.
> Implement the item 4 from the list above.

...
And so on.
In fact, refactoring tasks fit very well into `automatic mode`. This is described in the neighboring document.

At this point, you should understand the process, and only your imagination can stop you from implementing your next groundbreaking project.

Good luck!