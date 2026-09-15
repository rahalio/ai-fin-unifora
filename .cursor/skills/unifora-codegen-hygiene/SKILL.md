---
name: unifora-codegen-hygiene
description: >-
  Unifora repo hygiene for zero-codegen: .codegen must never be committed or
  pushed to GitHub. Use when staging files, committing, preparing PRs, or
  copying the codegen tool from the scaffold.
---

# Unifora codegen hygiene

## Hard rule

**Never commit or push `.codegen/` to GitHub.**

| Path | Git policy |
|------|------------|
| `.codegen/` | Local only — gitignored |
| `packages/openapi-core/src/.bundled/` | Regenerated — gitignored |
| `platform/tests/postman/generated/` | Regenerated — gitignored |

## Why

Unifora vendors the Python `zero-codegen` tool under `.codegen/` for local Mode A/B generation. That tree is large, machine-specific (absolute paths in `.zero-codegen-merged.json`), and must not land in the remote.

## Operator checklist

1. Before `git add -A` / commit: confirm `git status` does **not** list `.codegen/`.
2. If `.codegen` appears as untracked, leave it untracked; restore `.gitignore` if the ignore rule was removed.
3. To obtain codegen on a fresh clone: copy from `zero-apps-codegen-scaffold/.codegen`, then run `pnpm codegen:paths` and set `package_scope` to `@unifora`.
4. Package scope for this product is `@unifora` (not `@ddd`, `ai-`, or `zero-` prefixes).

## Related

- Cursor rule: `.cursor/rules/codegen-no-commit.mdc`
- Pipeline skill: `.cursor/skills/ddd-codegen/SKILL.md`
- Platform skill: `.cursor/skills/ddd-platform/SKILL.md`
