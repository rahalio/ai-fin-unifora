import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerPipeline_Body = z
  .object({
    name: z.string().min(1).max(200),
    owner: z.string(),
    useCaseId: z
      .string()
      .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    sla: z.string().optional(),
  })
  .passthrough();
const recordPipelineSLAEvent_Body = z
  .object({
    eventType: z.enum(['ok', 'breach', 'patched']),
    detail: z.string().optional(),
    observedAt: z.string().datetime({ offset: true }).optional(),
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
const PipelineId = z.string();
const UseCaseId = z.string();
const PipelineStatus = z.enum([
  'registered',
  'production',
  'breached',
  'retired',
]);
const Pipeline = z
  .object({
    pipelineId: z.string().regex(/^pip_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    owner: z.string(),
    useCaseId: z
      .string()
      .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    status: z.enum(['registered', 'production', 'breached', 'retired']),
    sla: z.string().optional(),
    lastSlaEventAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const PipelineListData = z
  .object({
    items: z.array(
      z
        .object({
          pipelineId: z.string().regex(/^pip_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          owner: z.string(),
          useCaseId: z
            .string()
            .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          status: z.enum(['registered', 'production', 'breached', 'retired']),
          sla: z.string().optional(),
          lastSlaEventAt: z.string().datetime({ offset: true }).optional(),
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
const PipelineListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              pipelineId: z.string().regex(/^pip_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              owner: z.string(),
              useCaseId: z
                .string()
                .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              status: z.enum([
                'registered',
                'production',
                'breached',
                'retired',
              ]),
              sla: z.string().optional(),
              lastSlaEventAt: z.string().datetime({ offset: true }).optional(),
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
const PipelineCreateRequest = z
  .object({
    name: z.string().min(1).max(200),
    owner: z.string(),
    useCaseId: z
      .string()
      .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    sla: z.string().optional(),
  })
  .passthrough();
const PipelineResponse = z
  .object({
    data: z
      .object({
        pipelineId: z.string().regex(/^pip_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        owner: z.string(),
        useCaseId: z
          .string()
          .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        status: z.enum(['registered', 'production', 'breached', 'retired']),
        sla: z.string().optional(),
        lastSlaEventAt: z.string().datetime({ offset: true }).optional(),
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
const PipelineSLAEventType = z.enum(['ok', 'breach', 'patched']);
const PipelineSLAEventRequest = z
  .object({
    eventType: z.enum(['ok', 'breach', 'patched']),
    detail: z.string().optional(),
    observedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();

export const schemas: any = {
  registerPipeline_Body,
  recordPipelineSLAEvent_Body,
  Problem,
  PipelineId,
  UseCaseId,
  PipelineStatus,
  Pipeline,
  PipelineListData,
  ResponseMeta,
  PipelineListResponse,
  PipelineCreateRequest,
  PipelineResponse,
  PipelineSLAEventType,
  PipelineSLAEventRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/pipelines',
    alias: 'listPipelines',
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
                  pipelineId: z.string().regex(/^pip_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  owner: z.string(),
                  useCaseId: z
                    .string()
                    .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  status: z.enum([
                    'registered',
                    'production',
                    'breached',
                    'retired',
                  ]),
                  sla: z.string().optional(),
                  lastSlaEventAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
    path: '/v1/pipelines',
    alias: 'registerPipeline',
    description: `Accepts Bearer JWT (operators) or API key (ML platform connectors).`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerPipeline_Body,
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
            pipelineId: z.string().regex(/^pip_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            owner: z.string(),
            useCaseId: z
              .string()
              .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['registered', 'production', 'breached', 'retired']),
            sla: z.string().optional(),
            lastSlaEventAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/pipelines/:pipelineId',
    alias: 'getPipeline',
    requestFormat: 'json',
    parameters: [
      {
        name: 'pipelineId',
        type: 'Path',
        schema: z.string().regex(/^pip_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            pipelineId: z.string().regex(/^pip_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            owner: z.string(),
            useCaseId: z
              .string()
              .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['registered', 'production', 'breached', 'retired']),
            sla: z.string().optional(),
            lastSlaEventAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/pipelines/:pipelineId/sla-events',
    alias: 'recordPipelineSLAEvent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordPipelineSLAEvent_Body,
      },
      {
        name: 'pipelineId',
        type: 'Path',
        schema: z.string().regex(/^pip_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            pipelineId: z.string().regex(/^pip_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            owner: z.string(),
            useCaseId: z
              .string()
              .regex(/^ucs_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['registered', 'production', 'breached', 'retired']),
            sla: z.string().optional(),
            lastSlaEventAt: z.string().datetime({ offset: true }).optional(),
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
