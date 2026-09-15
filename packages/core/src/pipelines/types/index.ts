/**
 * Pipelines Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/pipelines.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Pipeline = components["schemas"]["Pipeline"];
export type PipelineId = components["schemas"]["PipelineId"];
export type PipelineListData = components["schemas"]["PipelineListData"];
export type PipelineSLAEventType = components["schemas"]["PipelineSLAEventType"];
export type PipelineStatus = components["schemas"]["PipelineStatus"];
export type UseCaseId = components["schemas"]["UseCaseId"];
export type PipelineCreateRequest = components["schemas"]["PipelineCreateRequest"];
export type PipelineSLAEventRequest = components["schemas"]["PipelineSLAEventRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterPipelineRequestInput = NonNullable<operations["registerPipeline"]["requestBody"]>["content"]["application/json"];
export type RecordPipelineSLAEventRequestInput = NonNullable<operations["recordPipelineSLAEvent"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPipelinesParams = NonNullable<operations["listPipelines"]["parameters"]["query"]>;
export type GetPipelineParams = operations["getPipeline"]["parameters"]["path"];
export type RecordPipelineSLAEventParams = operations["recordPipelineSLAEvent"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPipelinesResponse = operations["listPipelines"]["responses"]["200"]["content"]["application/json"];
export type RegisterPipelineResponse = operations["registerPipeline"]["responses"]["201"]["content"]["application/json"];
export type GetPipelineResponse = operations["getPipeline"]["responses"]["200"]["content"]["application/json"];
export type RecordPipelineSLAEventResponse = operations["recordPipelineSLAEvent"]["responses"]["202"]["content"]["application/json"];


