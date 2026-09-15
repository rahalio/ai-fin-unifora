import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createUniforaAuditExport_Body = z
  .object({
    periodFrom: z.string().datetime({ offset: true }),
    periodTo: z.string().datetime({ offset: true }),
    scope: z
      .object({
        includeShares: z.boolean().default(true),
        includeLineage: z.boolean().default(true),
        includePipelines: z.boolean().default(true),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const AuditExportCreateRequest = z
  .object({
    periodFrom: z.string().datetime({ offset: true }),
    periodTo: z.string().datetime({ offset: true }),
    scope: z
      .object({
        includeShares: z.boolean().default(true),
        includeLineage: z.boolean().default(true),
        includePipelines: z.boolean().default(true),
      })
      .partial()
      .passthrough()
      .optional(),
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
const AuditExportId = z.string();
const AuditExportStatus = z.enum(['pending', 'ready', 'failed']);
const AuditExport = z
  .object({
    auditExportId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['pending', 'ready', 'failed']),
    periodFrom: z.string().datetime({ offset: true }),
    periodTo: z.string().datetime({ offset: true }),
    downloadUri: z.string().url().optional(),
    scope: z
      .object({
        includeShares: z.boolean(),
        includeLineage: z.boolean(),
        includePipelines: z.boolean(),
      })
      .partial()
      .passthrough()
      .optional(),
    failureReason: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    completedAt: z.string().datetime({ offset: true }).optional(),
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
const AuditExportResponse = z
  .object({
    data: z
      .object({
        auditExportId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['pending', 'ready', 'failed']),
        periodFrom: z.string().datetime({ offset: true }),
        periodTo: z.string().datetime({ offset: true }),
        downloadUri: z.string().url().optional(),
        scope: z
          .object({
            includeShares: z.boolean(),
            includeLineage: z.boolean(),
            includePipelines: z.boolean(),
          })
          .partial()
          .passthrough()
          .optional(),
        failureReason: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        completedAt: z.string().datetime({ offset: true }).optional(),
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
  createUniforaAuditExport_Body,
  AuditExportCreateRequest,
  Problem,
  AuditExportId,
  AuditExportStatus,
  AuditExport,
  ResponseMeta,
  AuditExportResponse,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/audits/exports',
    alias: 'createUniforaAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createUniforaAuditExport_Body,
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
            auditExportId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['pending', 'ready', 'failed']),
            periodFrom: z.string().datetime({ offset: true }),
            periodTo: z.string().datetime({ offset: true }),
            downloadUri: z.string().url().optional(),
            scope: z
              .object({
                includeShares: z.boolean(),
                includeLineage: z.boolean(),
                includePipelines: z.boolean(),
              })
              .partial()
              .passthrough()
              .optional(),
            failureReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/audits/exports/:auditExportId',
    alias: 'getAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'auditExportId',
        type: 'Path',
        schema: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            auditExportId: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['pending', 'ready', 'failed']),
            periodFrom: z.string().datetime({ offset: true }),
            periodTo: z.string().datetime({ offset: true }),
            downloadUri: z.string().url().optional(),
            scope: z
              .object({
                includeShares: z.boolean(),
                includeLineage: z.boolean(),
                includePipelines: z.boolean(),
              })
              .partial()
              .passthrough()
              .optional(),
            failureReason: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
