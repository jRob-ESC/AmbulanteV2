---
name: no-linter-check
description: Skip automatic linter checks after edits. Use when the user explicitly asks to avoid running lint or diagnostics on every change and prefers code edits only.
disable-model-invocation: true
---

# No Linter Check

## Instructions

When this skill is active:

1. Do not run `ReadLints` automatically after code edits.
2. Do not run lint commands (`pnpm lint`, `npm run lint`, `eslint`, etc.) unless the user asks for them.
3. Only run lint/diagnostics if:
   - the user explicitly requests linting, or
   - a build/test command fails and lint output is required to unblock.
4. If linting is skipped, finish the task normally and mention briefly that lint checks were omitted by request.
