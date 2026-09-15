import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const upsertPlatformAttestation_Body = z
  .object({
    cloudOwnershipAcknowledged: z.boolean(),
    controlsChecklist: z
      .array(
        z
          .object({
            controlId: z.string(),
            label: z.string(),
            satisfied: z.boolean(),
            evidenceUri: z.string().url().optional(),
            notes: z.string().optional(),
          })
          .passthrough()
      )
      .min(1),
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
const ControlChecklistItem = z
  .object({
    controlId: z.string(),
    label: z.string(),
    satisfied: z.boolean(),
    evidenceUri: z.string().url().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const UserId = z.string();
const PlatformAttestation = z
  .object({
    cloudOwnershipAcknowledged: z.boolean(),
    controlsChecklist: z.array(
      z
        .object({
          controlId: z.string(),
          label: z.string(),
          satisfied: z.boolean(),
          evidenceUri: z.string().url().optional(),
          notes: z.string().optional(),
        })
        .passthrough()
    ),
    attestedAt: z.string().datetime({ offset: true }),
    attestedBy: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
    attestationVersion: z.number().int().gte(1).optional(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
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
const PlatformAttestationResponse = z
  .object({
    data: z
      .object({
        cloudOwnershipAcknowledged: z.boolean(),
        controlsChecklist: z.array(
          z
            .object({
              controlId: z.string(),
              label: z.string(),
              satisfied: z.boolean(),
              evidenceUri: z.string().url().optional(),
              notes: z.string().optional(),
            })
            .passthrough()
        ),
        attestedAt: z.string().datetime({ offset: true }),
        attestedBy: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
        attestationVersion: z.number().int().gte(1).optional(),
        expiresAt: z.string().datetime({ offset: true }).optional(),
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
const PlatformAttestationUpsertRequest = z
  .object({
    cloudOwnershipAcknowledged: z.boolean(),
    controlsChecklist: z
      .array(
        z
          .object({
            controlId: z.string(),
            label: z.string(),
            satisfied: z.boolean(),
            evidenceUri: z.string().url().optional(),
            notes: z.string().optional(),
          })
          .passthrough()
      )
      .min(1),
  })
  .passthrough();

export const schemas: any = {
  upsertPlatformAttestation_Body,
  Problem,
  ControlChecklistItem,
  UserId,
  PlatformAttestation,
  ResponseMeta,
  PlatformAttestationResponse,
  PlatformAttestationUpsertRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/security/attestation',
    alias: 'getPlatformAttestation',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            cloudOwnershipAcknowledged: z.boolean(),
            controlsChecklist: z.array(
              z
                .object({
                  controlId: z.string(),
                  label: z.string(),
                  satisfied: z.boolean(),
                  evidenceUri: z.string().url().optional(),
                  notes: z.string().optional(),
                })
                .passthrough()
            ),
            attestedAt: z.string().datetime({ offset: true }),
            attestedBy: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
            attestationVersion: z.number().int().gte(1).optional(),
            expiresAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'put',
    path: '/v1/security/attestation',
    alias: 'upsertPlatformAttestation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: upsertPlatformAttestation_Body,
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
            cloudOwnershipAcknowledged: z.boolean(),
            controlsChecklist: z.array(
              z
                .object({
                  controlId: z.string(),
                  label: z.string(),
                  satisfied: z.boolean(),
                  evidenceUri: z.string().url().optional(),
                  notes: z.string().optional(),
                })
                .passthrough()
            ),
            attestedAt: z.string().datetime({ offset: true }),
            attestedBy: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
            attestationVersion: z.number().int().gte(1).optional(),
            expiresAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
