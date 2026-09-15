/**
 * Readiness Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/readiness.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ReadinessChecklistEvidence = components["schemas"]["ReadinessChecklistEvidence"];
export type ReadinessPillarEvidence = components["schemas"]["ReadinessPillarEvidence"];
export type ReadinessScore = components["schemas"]["ReadinessScore"];
export type UseCaseId = components["schemas"]["UseCaseId"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetReadinessScoreParams = operations["getReadinessScore"]["parameters"]["path"];
export type RecomputeReadinessParams = operations["recomputeReadiness"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetReadinessScoreResponse = operations["getReadinessScore"]["responses"]["200"]["content"]["application/json"];
export type RecomputeReadinessResponse = operations["recomputeReadiness"]["responses"]["200"]["content"]["application/json"];


