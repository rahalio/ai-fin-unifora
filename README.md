# Unifora

AI-readiness data unification ops control plane for banks — cut the 80% data tax; hit quarter TTV.

Product specs: [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md)

## Monorepo layout

```
packages/openapi-core/   # One OpenAPI YAML per domain (+ common/)
packages/core/           # Generated + shared domain core (@unifora/core)
platform/services/       # Use cases, ports, DTOs
platform/adapters/       # Persistence / sandbox adapters
platform/api-server/     # Fastify API
platform/webapp/         # Next.js console (@unifora/webapp)
platform/tests/
.codegen/                # Local zero-codegen tool — NEVER commit
```

Package scope: `@unifora/*` (no `ai-` / `zero-` prefixes).

## Domains

`identity` · `use-cases` · `data-products` · `shares` · `readiness` · `pipelines` · `escalations` · `lineage` · `audits` · `capacity` · `security-attestations`

OpenAPI source of truth: `packages/openapi-core/src/{domain}.yaml` (+ `.schemas.yaml`).

## Quick start

```bash
# If .codegen is missing, copy from zero-apps-codegen-scaffold, then:
pnpm install
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
pnpm build
pnpm dev:api    # http://127.0.0.1:4000/health
pnpm dev:web    # http://127.0.0.1:3000
```

Demo login (sandbox): `admin@demo.local` / `sandbox-admin-8`

## Codegen

| Mode | When | Command |
|------|------|---------|
| A — new domain | First scaffold | `PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main generate --domain X --config .codegen/.zero-codegen-merged.json --skip-build` |
| B — YAML edit | Existing domain | `pnpm lint:openapi && pnpm bundle:openapi && pnpm codegen:core` then handwrite platform |

**Never commit `.codegen/`** — see `.cursor/rules/codegen-no-commit.mdc` and `.cursor/skills/unifora-codegen-hygiene/`.

## Docs

- [docs/CODEGEN.md](./docs/CODEGEN.md)
- [docs/DYNAMO-LOCAL.md](./docs/DYNAMO-LOCAL.md)
