/**
 * Capacity Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/capacity.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CapacityConflict = components["schemas"]["CapacityConflict"];
export type CapacityConflictListData = components["schemas"]["CapacityConflictListData"];
export type CapacityPlan = components["schemas"]["CapacityPlan"];
export type CapacityPlanId = components["schemas"]["CapacityPlanId"];
export type CapacityPlanListData = components["schemas"]["CapacityPlanListData"];
export type CapacityPlanStatus = components["schemas"]["CapacityPlanStatus"];
export type DataProductId = components["schemas"]["DataProductId"];
export type UseCaseId = components["schemas"]["UseCaseId"];
export type CapacityPlanCreateRequest = components["schemas"]["CapacityPlanCreateRequest"];
export type Plan = operations["listCapacityPlans"]["responses"]["200"]["content"]["application/json"]["data"];
export type Conflict = operations["listCapacityConflicts"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateCapacityPlanRequestInput = NonNullable<operations["createCapacityPlan"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCapacityPlansParams = NonNullable<operations["listCapacityPlans"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCapacityPlansResponse = operations["listCapacityPlans"]["responses"]["200"]["content"]["application/json"];
export type CreateCapacityPlanResponse = operations["createCapacityPlan"]["responses"]["201"]["content"]["application/json"];
export type ListCapacityConflictsResponse = operations["listCapacityConflicts"]["responses"]["200"]["content"]["application/json"];


