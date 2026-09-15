import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createShareRequest_Body = z
  .object({
    dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z
      .string()
      .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    shareScope: z.enum(['internal', 'thirdParty']),
    purpose: z.string().min(1),
    consentMinimisationSatisfied: z.boolean().optional(),
    escalateAfterAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const decideShareRequest_Body = z
  .object({
    decision: z.enum(['approve', 'deny']),
    rationale: z.string().optional(),
  })
  .passthrough();
const ShareScope = z.enum(['internal', 'thirdParty']);
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
const ShareRequestId = z.string();
const DataProductId = z.string();
const UseCaseId = z.string();
const ShareRequestStatus = z.enum([
  'pending',
  'approved',
  'denied',
  'escalated',
]);
const ShareRequest = z
  .object({
    shareRequestId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
    dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z
      .string()
      .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    shareScope: z.enum(['internal', 'thirdParty']),
    purpose: z.string().min(1),
    status: z.enum(['pending', 'approved', 'denied', 'escalated']),
    decisionRationale: z.string().optional(),
    consentMinimisationSatisfied: z.boolean(),
    escalateAfterAt: z.string().datetime({ offset: true }).optional(),
    decidedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ShareRequestListData = z
  .object({
    items: z.array(
      z
        .object({
          shareRequestId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
          dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
          useCaseId: z
            .string()
            .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          shareScope: z.enum(['internal', 'thirdParty']),
          purpose: z.string().min(1),
          status: z.enum(['pending', 'approved', 'denied', 'escalated']),
          decisionRationale: z.string().optional(),
          consentMinimisationSatisfied: z.boolean(),
          escalateAfterAt: z.string().datetime({ offset: true }).optional(),
          decidedAt: z.string().datetime({ offset: true }).optional(),
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
const ShareRequestListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              shareRequestId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
              dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
              useCaseId: z
                .string()
                .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              shareScope: z.enum(['internal', 'thirdParty']),
              purpose: z.string().min(1),
              status: z.enum(['pending', 'approved', 'denied', 'escalated']),
              decisionRationale: z.string().optional(),
              consentMinimisationSatisfied: z.boolean(),
              escalateAfterAt: z.string().datetime({ offset: true }).optional(),
              decidedAt: z.string().datetime({ offset: true }).optional(),
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
const ShareRequestCreateRequest = z
  .object({
    dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z
      .string()
      .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    shareScope: z.enum(['internal', 'thirdParty']),
    purpose: z.string().min(1),
    consentMinimisationSatisfied: z.boolean().optional(),
    escalateAfterAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ShareRequestResponse = z
  .object({
    data: z
      .object({
        shareRequestId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
        dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
        useCaseId: z
          .string()
          .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        shareScope: z.enum(['internal', 'thirdParty']),
        purpose: z.string().min(1),
        status: z.enum(['pending', 'approved', 'denied', 'escalated']),
        decisionRationale: z.string().optional(),
        consentMinimisationSatisfied: z.boolean(),
        escalateAfterAt: z.string().datetime({ offset: true }).optional(),
        decidedAt: z.string().datetime({ offset: true }).optional(),
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
const ShareDecisionAction = z.enum(['approve', 'deny']);
const ShareDecisionRequest = z
  .object({
    decision: z.enum(['approve', 'deny']),
    rationale: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  createShareRequest_Body,
  decideShareRequest_Body,
  ShareScope,
  Problem,
  ShareRequestId,
  DataProductId,
  UseCaseId,
  ShareRequestStatus,
  ShareRequest,
  ShareRequestListData,
  ResponseMeta,
  ShareRequestListResponse,
  ShareRequestCreateRequest,
  ShareRequestResponse,
  ShareDecisionAction,
  ShareDecisionRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/shares',
    alias: 'listShareRequests',
    requestFormat: 'json',
    parameters: [
      {
        name: 'shareScope',
        type: 'Query',
        schema: z.enum(['internal', 'thirdParty']).optional(),
      },
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
                  shareRequestId: z
                    .string()
                    .regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dataProductId: z
                    .string()
                    .regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  useCaseId: z
                    .string()
                    .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  shareScope: z.enum(['internal', 'thirdParty']),
                  purpose: z.string().min(1),
                  status: z.enum([
                    'pending',
                    'approved',
                    'denied',
                    'escalated',
                  ]),
                  decisionRationale: z.string().optional(),
                  consentMinimisationSatisfied: z.boolean(),
                  escalateAfterAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  decidedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/shares',
    alias: 'createShareRequest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createShareRequest_Body,
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
            shareRequestId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
            dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z
              .string()
              .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            shareScope: z.enum(['internal', 'thirdParty']),
            purpose: z.string().min(1),
            status: z.enum(['pending', 'approved', 'denied', 'escalated']),
            decisionRationale: z.string().optional(),
            consentMinimisationSatisfied: z.boolean(),
            escalateAfterAt: z.string().datetime({ offset: true }).optional(),
            decidedAt: z.string().datetime({ offset: true }).optional(),
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
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
    path: '/v1/shares/:shareRequestId/decide',
    alias: 'decideShareRequest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideShareRequest_Body,
      },
      {
        name: 'shareRequestId',
        type: 'Path',
        schema: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            shareRequestId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
            dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z
              .string()
              .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            shareScope: z.enum(['internal', 'thirdParty']),
            purpose: z.string().min(1),
            status: z.enum(['pending', 'approved', 'denied', 'escalated']),
            decisionRationale: z.string().optional(),
            consentMinimisationSatisfied: z.boolean(),
            escalateAfterAt: z.string().datetime({ offset: true }).optional(),
            decidedAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
