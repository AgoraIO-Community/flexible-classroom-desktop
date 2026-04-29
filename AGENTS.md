# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Project Overview

Flexible Classroom Desktop is a multi-package monorepo (Yarn workspaces + Lerna) for the Agora Flexible Classroom Electron application. It supports three entry points: classroom, scene (CloudClass), and proctor.

## Common Commands

### Setup
```bash
yarn install:packages   # Fetch submodule code and install dependencies
```

### Development
```bash
yarn dev                # Run demo app (compiled SDK, no HMR)
yarn dev:classroom      # Fcr Classroom debug page (HMR, linked to local source)
yarn dev:scene          # CloudClass debug page (HMR, linked to local source)
yarn dev:proctor        # Proctor debug page (HMR, linked to local source)
yarn dev:electron       # Run Electron client with demo
yarn dev:classroom:electron  # Run Electron with classroom debug page
```

### Building
```bash
yarn ci:build           # Build web resources for production
```

### Packaging (after ci:build)
```bash
yarn pack:electron:mac   # Build Mac client (dmg/zip)
yarn pack:electron:win   # Build Windows client (nsis)
yarn pack:classroom:sdk  # Package agora-classroom-sdk
yarn pack:proctor:sdk    # Package agora-proctor-sdk
yarn pack:scene:sdk      # Package fcr-ui-scene
yarn pack:classroom:plugin  # Package classroom plugins
yarn pack:proctor:plugin    # Package proctor plugins
yarn pack:scene:plugin      # Package scene plugins
```

### UI Kit Development
```bash
yarn dev:ui-kit:classroom   # Storybook for classroom UI components
yarn dev:ui-kit:scene       # Storybook for scene UI components
```

## Package Architecture

This is a Lerna-managed monorepo where most packages are **git submodules**. Key packages:

| Package | Type | Description |
|---------|------|-------------|
| `agora-demo-app` | Main App | Electron desktop app entry point |
| `agora-classroom-sdk` | SDK | CloudClass SDK (Web & Electron) |
| `agora-edu-core` | Submodule | Core classroom APIs and business logic |
| `agora-rte-sdk` | Submodule | Real-time engagement SDK |
| `agora-common-libs` | Submodule | Shared utilities, i18n, Redux presets |
| `agora-plugin-gallery` | Submodule | Widgets (chat, slide, video, etc.) |
| `agora-proctor-sdk` | Submodule | Proctor/exam SDK |
| `fcr-ui-scene` | Submodule | Scene UI components |
| `fcr-ui-kit` | Submodule | Shared UI component library |

The `FCR_ENTRY` environment variable (demo/classroom/scene/proctor) determines which entry point is used during development.

## Technology Stack

- **React 17** with TypeScript
- **MobX** for state management
- **Webpack 5** for bundling
- **Electron 12.0.0** for desktop
- **Tailwind CSS** for styling
- **Babel** for transpilation
- **Lerna** for monorepo management
- **Storybook** for UI kit development

## Commit Convention

Uses commitlint with `config-conventional`. Allowed types: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test, wip.

## Environment Configuration

Configure `.env` before launching debug pages:
```
REACT_APP_AGORA_APP_ID=
REACT_APP_AGORA_APP_CERTIFICATE=
```

