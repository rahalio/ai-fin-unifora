import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createCapacityPlan_Body = z
  .object({
    name: z.string().min(1).max(200),
    useCaseIds: z
      .array(z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/))
      .min(1),
    sourceDataProductIds: z
      .array(z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    notes: z.string().optional(),
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
const CapacityPlanId = z.string();
const UseCaseId = z.string();
const DataProductId = z.string();
const CapacityPlanStatus = z.enum(['draft', 'active', 'superseded']);
const CapacityPlan = z
  .object({
    capacityPlanId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    useCaseIds: z.array(z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)),
    sourceDataProductIds: z
      .array(z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    status: z.enum(['draft', 'active', 'superseded']),
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    notes: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CapacityPlanListData = z
  .object({
    items: z.array(
      z
        .object({
          capacityPlanId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          useCaseIds: z.array(z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)),
          sourceDataProductIds: z
            .array(z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/))
            .optional(),
          status: z.enum(['draft', 'active', 'superseded']),
          periodStart: z.string().datetime({ offset: true }),
          periodEnd: z.string().datetime({ offset: true }),
          notes: z.string().optional(),
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
const CapacityPlanListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              capacityPlanId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              useCaseIds: z.array(
                z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
              ),
              sourceDataProductIds: z
                .array(z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/))
                .optional(),
              status: z.enum(['draft', 'active', 'superseded']),
              periodStart: z.string().datetime({ offset: true }),
              periodEnd: z.string().datetime({ offset: true }),
              notes: z.string().optional(),
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
const CapacityPlanCreateRequest = z
  .object({
    name: z.string().min(1).max(200),
    useCaseIds: z
      .array(z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/))
      .min(1),
    sourceDataProductIds: z
      .array(z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    notes: z.string().optional(),
  })
  .passthrough();
const CapacityPlanResponse = z
  .object({
    data: z
      .object({
        capacityPlanId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        useCaseIds: z.array(z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)),
        sourceDataProductIds: z
          .array(z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/))
          .optional(),
        status: z.enum(['draft', 'active', 'superseded']),
        periodStart: z.string().datetime({ offset: true }),
        periodEnd: z.string().datetime({ offset: true }),
        notes: z.string().optional(),
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
const CapacityConflict = z
  .object({
    dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
    conflictingUseCaseIds: z.array(
      z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
    ),
    conflictingPlanIds: z
      .array(z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    severity: z.enum(['warning', 'blocking']).optional(),
    detectedAt: z.string().datetime({ offset: true }),
    remediationHint: z.string().optional(),
  })
  .passthrough();
const CapacityConflictListData = z
  .object({
    items: z.array(
      z
        .object({
          dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
          conflictingUseCaseIds: z.array(
            z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
          ),
          conflictingPlanIds: z
            .array(z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/))
            .optional(),
          severity: z.enum(['warning', 'blocking']).optional(),
          detectedAt: z.string().datetime({ offset: true }),
          remediationHint: z.string().optional(),
        })
        .passthrough()
    ),
  })
  .passthrough();
const CapacityConflictListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
              conflictingUseCaseIds: z.array(
                z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
              ),
              conflictingPlanIds: z
                .array(z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/))
                .optional(),
              severity: z.enum(['warning', 'blocking']).optional(),
              detectedAt: z.string().datetime({ offset: true }),
              remediationHint: z.string().optional(),
            })
            .passthrough()
        ),
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
  createCapacityPlan_Body,
  Problem,
  CapacityPlanId,
  UseCaseId,
  DataProductId,
  CapacityPlanStatus,
  CapacityPlan,
  CapacityPlanListData,
  ResponseMeta,
  CapacityPlanListResponse,
  CapacityPlanCreateRequest,
  CapacityPlanResponse,
  CapacityConflict,
  CapacityConflictListData,
  CapacityConflictListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/capacity/conflicts',
    alias: 'listCapacityConflicts',
    description: `Highlights use cases contending for the same uncleansed sources
without an active capacity plan.
`,
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  dataProductId: z
                    .string()
                    .regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  conflictingUseCaseIds: z.array(
                    z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
                  ),
                  conflictingPlanIds: z
                    .array(z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .optional(),
                  severity: z.enum(['warning', 'blocking']).optional(),
                  detectedAt: z.string().datetime({ offset: true }),
                  remediationHint: z.string().optional(),
                })
                .passthrough()
            ),
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
    method: 'get',
    path: '/v1/capacity/plans',
    alias: 'listCapacityPlans',
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
                  capacityPlanId: z
                    .string()
                    .regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  useCaseIds: z.array(
                    z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
                  ),
                  sourceDataProductIds: z
                    .array(z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .optional(),
                  status: z.enum(['draft', 'active', 'superseded']),
                  periodStart: z.string().datetime({ offset: true }),
                  periodEnd: z.string().datetime({ offset: true }),
                  notes: z.string().optional(),
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
    path: '/v1/capacity/plans',
    alias: 'createCapacityPlan',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCapacityPlan_Body,
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
            capacityPlanId: z.string().regex(/^cap_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            useCaseIds: z.array(
              z.string().regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            sourceDataProductIds: z
              .array(z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            status: z.enum(['draft', 'active', 'superseded']),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            notes: z.string().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
