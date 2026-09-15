import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const DataProductId = z.string();
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
const LineageNodeType = z.enum(['source', 'transform', 'product', 'consumer']);
const LineageNode = z
  .object({
    nodeId: z.string(),
    label: z.string(),
    nodeType: z.enum(['source', 'transform', 'product', 'consumer']),
    system: z.string().optional(),
  })
  .passthrough();
const LineageEdge = z
  .object({
    fromNodeId: z.string(),
    toNodeId: z.string(),
    relationship: z.enum(['feeds', 'derives', 'consumes']).optional(),
    qualityRuleId: z.string().optional(),
  })
  .passthrough();
const LineageGraph = z
  .object({
    dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
    nodes: z.array(
      z
        .object({
          nodeId: z.string(),
          label: z.string(),
          nodeType: z.enum(['source', 'transform', 'product', 'consumer']),
          system: z.string().optional(),
        })
        .passthrough()
    ),
    edges: z.array(
      z
        .object({
          fromNodeId: z.string(),
          toNodeId: z.string(),
          relationship: z.enum(['feeds', 'derives', 'consumes']).optional(),
          qualityRuleId: z.string().optional(),
        })
        .passthrough()
    ),
    coveragePercent: z.number().gte(0).lte(100).optional(),
    generatedAt: z.string().datetime({ offset: true }).optional(),
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
const LineageGraphResponse = z
  .object({
    data: z
      .object({
        dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
        nodes: z.array(
          z
            .object({
              nodeId: z.string(),
              label: z.string(),
              nodeType: z.enum(['source', 'transform', 'product', 'consumer']),
              system: z.string().optional(),
            })
            .passthrough()
        ),
        edges: z.array(
          z
            .object({
              fromNodeId: z.string(),
              toNodeId: z.string(),
              relationship: z.enum(['feeds', 'derives', 'consumes']).optional(),
              qualityRuleId: z.string().optional(),
            })
            .passthrough()
        ),
        coveragePercent: z.number().gte(0).lte(100).optional(),
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

export const schemas: any = {
  DataProductId,
  Problem,
  LineageNodeType,
  LineageNode,
  LineageEdge,
  LineageGraph,
  ResponseMeta,
  LineageGraphResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/lineage/:dataProductId',
    alias: 'getLineage',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dataProductId',
        type: 'Path',
        schema: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            dataProductId: z.string().regex(/^dpr_[0-9A-HJKMNP-TV-Z]{26}$/),
            nodes: z.array(
              z
                .object({
                  nodeId: z.string(),
                  label: z.string(),
                  nodeType: z.enum([
                    'source',
                    'transform',
                    'product',
                    'consumer',
                  ]),
                  system: z.string().optional(),
                })
                .passthrough()
            ),
            edges: z.array(
              z
                .object({
                  fromNodeId: z.string(),
                  toNodeId: z.string(),
                  relationship: z
                    .enum(['feeds', 'derives', 'consumes'])
                    .optional(),
                  qualityRuleId: z.string().optional(),
                })
                .passthrough()
            ),
            coveragePercent: z.number().gte(0).lte(100).optional(),
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
