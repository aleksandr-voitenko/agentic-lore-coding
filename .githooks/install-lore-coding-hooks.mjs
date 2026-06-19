#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const DESIRED_HOOKS_PATH = ".githooks";

export function createGitHooksInstallPlan({
  desiredHooksPath = DESIRED_HOOKS_PATH,
  existingHooksPath,
  installDisabled = false,
  isCi = false,
  isGitWorktree = false,
}) {
  if (installDisabled) {
    return {
      action: "skip",
      message: "Lore Coding hook installation skipped by LORE_CODING_INSTALL_HOOKS=0.",
    };
  }

  if (isCi) {
    return {
      action: "skip",
      message: "Lore Coding hook installation skipped in CI.",
    };
  }

  if (!isGitWorktree) {
    return {
      action: "skip",
      message: "Lore Coding hook installation skipped outside a Git worktree.",
    };
  }

  if (!existingHooksPath) {
    return {
      action: "set",
      message: `Configured Git hooks path: ${desiredHooksPath}`,
    };
  }

  if (normalizeHooksPath(existingHooksPath) === normalizeHooksPath(desiredHooksPath)) {
    return {
      action: "noop",
      message: `Git hooks path already configured: ${existingHooksPath}`,
    };
  }

  return {
    action: "skip",
    message: `Lore Coding hook installation skipped because core.hooksPath is already set to ${existingHooksPath}.`,
  };
}

function normalizeHooksPath(hooksPath) {
  return hooksPath.replace(/^\.\//, "").replace(/\/$/, "");
}

function isGitWorktree(cwd) {
  try {
    return runGit(["rev-parse", "--is-inside-work-tree"], cwd).trim() === "true";
  } catch {
    return false;
  }
}

function getExistingHooksPath(cwd) {
  try {
    return runGit(["config", "--local", "--get", "core.hooksPath"], cwd).trim();
  } catch {
    return "";
  }
}

function setHooksPath(cwd, hooksPath) {
  runGit(["config", "--local", "core.hooksPath", hooksPath], cwd);
}

function runGit(args, cwd) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function main() {
  const cwd = process.cwd();
  const plan = createGitHooksInstallPlan({
    existingHooksPath: getExistingHooksPath(cwd),
    installDisabled: process.env.LORE_CODING_INSTALL_HOOKS === "0",
    isCi: process.env.CI === "true",
    isGitWorktree: isGitWorktree(cwd),
  });

  if (plan.action === "set") {
    setHooksPath(cwd, DESIRED_HOOKS_PATH);
  }

  if (plan.action !== "noop") {
    process.stdout.write(`${plan.message}\n`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
