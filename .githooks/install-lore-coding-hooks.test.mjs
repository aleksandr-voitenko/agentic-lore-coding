import { describe, expect, it } from "vitest";

import { createGitHooksInstallPlan } from "./install-lore-coding-hooks.mjs";

describe("Git hooks installer", () => {
  it("sets core.hooksPath inside a Git worktree when no hook path is configured", () => {
    expect(
      createGitHooksInstallPlan({
        existingHooksPath: "",
        isGitWorktree: true,
      }),
    ).toEqual({
      action: "set",
      message: "Configured Git hooks path: .githooks",
    });
  });

  it("skips cleanly outside a Git worktree", () => {
    expect(
      createGitHooksInstallPlan({
        existingHooksPath: "",
        isGitWorktree: false,
      }),
    ).toEqual({
      action: "skip",
      message: "Lore Coding hook installation skipped outside a Git worktree.",
    });
  });

  it("skips in CI and when explicitly disabled", () => {
    expect(
      createGitHooksInstallPlan({
        existingHooksPath: "",
        isCi: true,
        isGitWorktree: true,
      }).action,
    ).toBe("skip");
    expect(
      createGitHooksInstallPlan({
        existingHooksPath: "",
        installDisabled: true,
        isGitWorktree: true,
      }).action,
    ).toBe("skip");
  });

  it("does not overwrite an existing custom hooks path", () => {
    expect(
      createGitHooksInstallPlan({
        existingHooksPath: ".custom-hooks",
        isGitWorktree: true,
      }),
    ).toEqual({
      action: "skip",
      message:
        "Lore Coding hook installation skipped because core.hooksPath is already set to .custom-hooks.",
    });
  });

  it("treats existing .githooks path variants as already configured", () => {
    expect(
      createGitHooksInstallPlan({
        existingHooksPath: "./.githooks/",
        isGitWorktree: true,
      }),
    ).toEqual({
      action: "noop",
      message: "Git hooks path already configured: ./.githooks/",
    });
  });
});
