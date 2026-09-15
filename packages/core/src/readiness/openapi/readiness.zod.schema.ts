import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const UseCaseId = z.string();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const ReadinessPillarEvidence = z
  .object({
    score: z.number().gte(0).lte(100),
    satisfied: z.boolean(),
    notes: z.string(),
    evidenceUris: z.array(z.string().url()),
  })
  .partial()
  .passthrough();
const ReadinessChecklistEvidence = z
  .object({
    siloRemoval: z
      .object({
        score: z.number().gte(0).lte(100),
        satisfied: z.boolean(),
        notes: z.string(),
        evidenceUris: z.array(z.string().url()),
      })
      .partial()
      .passthrough(),
    lineage: z
      .object({
        score: z.number().gte(0).lte(100),
        satisfied: z.boolean(),
        notes: z.string(),
        evidenceUris: z.array(z.string().url()),
      })
      .partial()
      .passthrough(),
    pipelineOps: z
      .object({
        score: z.number().gte(0).lte(100),
        satisfied: z.boolean(),
        notes: z.string(),
        evidenceUris: z.array(z.string().url()),
      })
      .partial()
      .passthrough(),
  })
  .passthrough();
const ReadinessScore = z
  .object({
    useCaseId: z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/),
    score: z.number().gte(0).lte(100),
    siloRemovalProgress: z.number().gte(0).lte(1).optional(),
    lineageCoverage: z.number().gte(0).lte(1).optional(),
    pipelineOpsReady: z.boolean().optional(),
    checklist: z
      .object({
        siloRemoval: z
          .object({
            score: z.number().gte(0).lte(100),
            satisfied: z.boolean(),
            notes: z.string(),
            evidenceUris: z.array(z.string().url()),
          })
          .partial()
          .passthrough(),
        lineage: z
          .object({
            score: z.number().gte(0).lte(100),
            satisfied: z.boolean(),
            notes: z.string(),
            evidenceUris: z.array(z.string().url()),
          })
          .partial()
          .passthrough(),
        pipelineOps: z
          .object({
            score: z.number().gte(0).lte(100),
            satisfied: z.boolean(),
            notes: z.string(),
            evidenceUris: z.array(z.string().url()),
          })
          .partial()
          .passthrough(),
      })
      .passthrough(),
    computedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const ReadinessScoreResponse = z
  .object({
    data: z
      .object({
        useCaseId: z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/),
        score: z.number().gte(0).lte(100),
        siloRemovalProgress: z.number().gte(0).lte(1).optional(),
        lineageCoverage: z.number().gte(0).lte(1).optional(),
        pipelineOpsReady: z.boolean().optional(),
        checklist: z
          .object({
            siloRemoval: z
              .object({
                score: z.number().gte(0).lte(100),
                satisfied: z.boolean(),
                notes: z.string(),
                evidenceUris: z.array(z.string().url()),
              })
              .partial()
              .passthrough(),
            lineage: z
              .object({
                score: z.number().gte(0).lte(100),
                satisfied: z.boolean(),
                notes: z.string(),
                evidenceUris: z.array(z.string().url()),
              })
              .partial()
              .passthrough(),
            pipelineOps: z
              .object({
                score: z.number().gte(0).lte(100),
                satisfied: z.boolean(),
                notes: z.string(),
                evidenceUris: z.array(z.string().url()),
              })
              .partial()
              .passthrough(),
          })
          .passthrough(),
        computedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  UseCaseId,
  Problem,
  ReadinessPillarEvidence,
  ReadinessChecklistEvidence,
  ReadinessScore,
  ResponseMeta,
  ReadinessScoreResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/readiness/:useCaseId',
    alias: 'getReadinessScore',
    requestFormat: 'json',
    parameters: [
      {
        name: 'useCaseId',
        type: 'Path',
        schema: z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            useCaseId: z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/),
            score: z.number().gte(0).lte(100),
            siloRemovalProgress: z.number().gte(0).lte(1).optional(),
            lineageCoverage: z.number().gte(0).lte(1).optional(),
            pipelineOpsReady: z.boolean().optional(),
            checklist: z
              .object({
                siloRemoval: z
                  .object({
                    score: z.number().gte(0).lte(100),
                    satisfied: z.boolean(),
                    notes: z.string(),
                    evidenceUris: z.array(z.string().url()),
                  })
                  .partial()
                  .passthrough(),
                lineage: z
                  .object({
                    score: z.number().gte(0).lte(100),
                    satisfied: z.boolean(),
                    notes: z.string(),
                    evidenceUris: z.array(z.string().url()),
                  })
                  .partial()
                  .passthrough(),
                pipelineOps: z
                  .object({
                    score: z.number().gte(0).lte(100),
                    satisfied: z.boolean(),
                    notes: z.string(),
                    evidenceUris: z.array(z.string().url()),
                  })
                  .partial()
                  .passthrough(),
              })
              .passthrough(),
            computedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/readiness/:useCaseId',
    alias: 'recomputeReadiness',
    requestFormat: 'json',
    parameters: [
      {
        name: 'useCaseId',
        type: 'Path',
        schema: z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            useCaseId: z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/),
            score: z.number().gte(0).lte(100),
            siloRemovalProgress: z.number().gte(0).lte(1).optional(),
            lineageCoverage: z.number().gte(0).lte(1).optional(),
            pipelineOpsReady: z.boolean().optional(),
            checklist: z
              .object({
                siloRemoval: z
                  .object({
                    score: z.number().gte(0).lte(100),
                    satisfied: z.boolean(),
                    notes: z.string(),
                    evidenceUris: z.array(z.string().url()),
                  })
                  .partial()
                  .passthrough(),
                lineage: z
                  .object({
                    score: z.number().gte(0).lte(100),
                    satisfied: z.boolean(),
                    notes: z.string(),
                    evidenceUris: z.array(z.string().url()),
                  })
                  .partial()
                  .passthrough(),
                pipelineOps: z
                  .object({
                    score: z.number().gte(0).lte(100),
                    satisfied: z.boolean(),
                    notes: z.string(),
                    evidenceUris: z.array(z.string().url()),
                  })
                  .partial()
                  .passthrough(),
              })
              .passthrough(),
            computedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
