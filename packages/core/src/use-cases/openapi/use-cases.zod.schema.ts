import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createUseCase_Body = z
  .object({
    name: z.string().min(1).max(200),
    domain: z.string().optional(),
    sponsor: z.string().optional(),
  })
  .passthrough();
const setTTVGate_Body = z
  .object({
    ttvDueAt: z.string().datetime({ offset: true }),
    targetWranglingShare: z.number().gte(0).lte(1).optional(),
  })
  .passthrough();
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
const UseCaseId = z.string();
const UseCaseStatus = z.enum([
  'proposed',
  'ready',
  'building',
  'live',
  'stalled',
]);
const DataProductId = z.string();
const UseCase = z
  .object({
    useCaseId: z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    domain: z.string().optional(),
    sponsor: z.string().optional(),
    status: z.enum(['proposed', 'ready', 'building', 'live', 'stalled']),
    linkedDataProductIds: z.array(
      z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/)
    ),
    wranglingTimeShare: z.number().gte(0).lte(1).optional(),
    ttvDueAt: z.string().datetime({ offset: true }).optional(),
    ttvHit: z.boolean().optional(),
    targetWranglingShare: z.number().gte(0).lte(1).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const UseCaseListData = z
  .object({
    items: z.array(
      z
        .object({
          useCaseId: z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          domain: z.string().optional(),
          sponsor: z.string().optional(),
          status: z.enum(['proposed', 'ready', 'building', 'live', 'stalled']),
          linkedDataProductIds: z.array(
            z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/)
          ),
          wranglingTimeShare: z.number().gte(0).lte(1).optional(),
          ttvDueAt: z.string().datetime({ offset: true }).optional(),
          ttvHit: z.boolean().optional(),
          targetWranglingShare: z.number().gte(0).lte(1).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
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
const UseCaseListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              useCaseId: z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              domain: z.string().optional(),
              sponsor: z.string().optional(),
              status: z.enum([
                'proposed',
                'ready',
                'building',
                'live',
                'stalled',
              ]),
              linkedDataProductIds: z.array(
                z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/)
              ),
              wranglingTimeShare: z.number().gte(0).lte(1).optional(),
              ttvDueAt: z.string().datetime({ offset: true }).optional(),
              ttvHit: z.boolean().optional(),
              targetWranglingShare: z.number().gte(0).lte(1).optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
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
const UseCaseCreateRequest = z
  .object({
    name: z.string().min(1).max(200),
    domain: z.string().optional(),
    sponsor: z.string().optional(),
  })
  .passthrough();
const UseCaseResponse = z
  .object({
    data: z
      .object({
        useCaseId: z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        domain: z.string().optional(),
        sponsor: z.string().optional(),
        status: z.enum(['proposed', 'ready', 'building', 'live', 'stalled']),
        linkedDataProductIds: z.array(
          z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/)
        ),
        wranglingTimeShare: z.number().gte(0).lte(1).optional(),
        ttvDueAt: z.string().datetime({ offset: true }).optional(),
        ttvHit: z.boolean().optional(),
        targetWranglingShare: z.number().gte(0).lte(1).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
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
const ProgrammePulse = z
  .object({
    wranglingTaxMedian: z.number().gte(0).lte(1),
    ttvHitRate: z.number().gte(0).lte(1),
    missedTtvCount: z.number().int().gte(0),
    escalationOverdueCount: z.number().int().gte(0),
    pipelineBreachCount: z.number().int().gte(0),
    generatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ProgrammePulseResponse = z
  .object({
    data: z
      .object({
        wranglingTaxMedian: z.number().gte(0).lte(1),
        ttvHitRate: z.number().gte(0).lte(1),
        missedTtvCount: z.number().int().gte(0),
        escalationOverdueCount: z.number().int().gte(0),
        pipelineBreachCount: z.number().int().gte(0),
        generatedAt: z.string().datetime({ offset: true }).optional(),
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
const TTVGateUpdateRequest = z
  .object({
    ttvDueAt: z.string().datetime({ offset: true }),
    targetWranglingShare: z.number().gte(0).lte(1).optional(),
  })
  .passthrough();
const LinkDataProductRequest = z
  .object({ dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/) })
  .passthrough();

export const schemas: any = {
  createUseCase_Body,
  setTTVGate_Body,
  Problem,
  UseCaseId,
  UseCaseStatus,
  DataProductId,
  UseCase,
  UseCaseListData,
  ResponseMeta,
  UseCaseListResponse,
  UseCaseCreateRequest,
  UseCaseResponse,
  ProgrammePulse,
  ProgrammePulseResponse,
  TTVGateUpdateRequest,
  LinkDataProductRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/use-cases',
    alias: 'listUseCases',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  useCaseId: z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  domain: z.string().optional(),
                  sponsor: z.string().optional(),
                  status: z.enum([
                    'proposed',
                    'ready',
                    'building',
                    'live',
                    'stalled',
                  ]),
                  linkedDataProductIds: z.array(
                    z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/)
                  ),
                  wranglingTimeShare: z.number().gte(0).lte(1).optional(),
                  ttvDueAt: z.string().datetime({ offset: true }).optional(),
                  ttvHit: z.boolean().optional(),
                  targetWranglingShare: z.number().gte(0).lte(1).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
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
    ],
  },
  {
    method: 'post',
    path: '/v1/use-cases',
    alias: 'createUseCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createUseCase_Body,
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
            name: z.string().min(1).max(200),
            domain: z.string().optional(),
            sponsor: z.string().optional(),
            status: z.enum([
              'proposed',
              'ready',
              'building',
              'live',
              'stalled',
            ]),
            linkedDataProductIds: z.array(
              z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            wranglingTimeShare: z.number().gte(0).lte(1).optional(),
            ttvDueAt: z.string().datetime({ offset: true }).optional(),
            ttvHit: z.boolean().optional(),
            targetWranglingShare: z.number().gte(0).lte(1).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
        status: 400,
        description: `Malformed request`,
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
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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
    method: 'get',
    path: '/v1/use-cases/:useCaseId',
    alias: 'getUseCase',
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
            name: z.string().min(1).max(200),
            domain: z.string().optional(),
            sponsor: z.string().optional(),
            status: z.enum([
              'proposed',
              'ready',
              'building',
              'live',
              'stalled',
            ]),
            linkedDataProductIds: z.array(
              z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            wranglingTimeShare: z.number().gte(0).lte(1).optional(),
            ttvDueAt: z.string().datetime({ offset: true }).optional(),
            ttvHit: z.boolean().optional(),
            targetWranglingShare: z.number().gte(0).lte(1).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/use-cases/:useCaseId/data-products',
    alias: 'linkDataProduct',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({
            dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
          })
          .passthrough(),
      },
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
            name: z.string().min(1).max(200),
            domain: z.string().optional(),
            sponsor: z.string().optional(),
            status: z.enum([
              'proposed',
              'ready',
              'building',
              'live',
              'stalled',
            ]),
            linkedDataProductIds: z.array(
              z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            wranglingTimeShare: z.number().gte(0).lte(1).optional(),
            ttvDueAt: z.string().datetime({ offset: true }).optional(),
            ttvHit: z.boolean().optional(),
            targetWranglingShare: z.number().gte(0).lte(1).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
        status: 400,
        description: `Malformed request`,
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
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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
    method: 'put',
    path: '/v1/use-cases/:useCaseId/ttv-gates',
    alias: 'setTTVGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: setTTVGate_Body,
      },
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
            name: z.string().min(1).max(200),
            domain: z.string().optional(),
            sponsor: z.string().optional(),
            status: z.enum([
              'proposed',
              'ready',
              'building',
              'live',
              'stalled',
            ]),
            linkedDataProductIds: z.array(
              z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            wranglingTimeShare: z.number().gte(0).lte(1).optional(),
            ttvDueAt: z.string().datetime({ offset: true }).optional(),
            ttvHit: z.boolean().optional(),
            targetWranglingShare: z.number().gte(0).lte(1).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
        status: 400,
        description: `Malformed request`,
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
    method: 'get',
    path: '/v1/use-cases/programme-pulse',
    alias: 'getProgrammePulse',
    description: `Aggregated wrangling tax, TTV hit rate, missed gates, overdue escalations,
and pipeline SLA breaches for the CDO control tower.
`,
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            wranglingTaxMedian: z.number().gte(0).lte(1),
            ttvHitRate: z.number().gte(0).lte(1),
            missedTtvCount: z.number().int().gte(0),
            escalationOverdueCount: z.number().int().gte(0),
            pipelineBreachCount: z.number().int().gte(0),
            generatedAt: z.string().datetime({ offset: true }).optional(),
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
