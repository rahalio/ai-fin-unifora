/**
 * Shares Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/shares.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DataProductId = components["schemas"]["DataProductId"];
export type ShareDecisionAction = components["schemas"]["ShareDecisionAction"];
export type ShareScope = components["schemas"]["ShareScope"];
export type UseCaseId = components["schemas"]["UseCaseId"];
export type ShareDecisionRequest = components["schemas"]["ShareDecisionRequest"];
export type ShareRequest = components["schemas"]["ShareRequest"];
export type ShareRequestCreateRequest = components["schemas"]["ShareRequestCreateRequest"];
export type ShareRequestId = components["schemas"]["ShareRequestId"];
export type ShareRequestListData = components["schemas"]["ShareRequestListData"];
export type ShareRequestListResponse = components["schemas"]["ShareRequestListResponse"];
export type ShareRequestResponse = components["schemas"]["ShareRequestResponse"];
export type ShareRequestStatus = components["schemas"]["ShareRequestStatus"];
export type Share = operations["listShareRequests"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateShareRequestRequestInput = NonNullable<operations["createShareRequest"]["requestBody"]>["content"]["application/json"];
export type DecideShareRequestRequestInput = NonNullable<operations["decideShareRequest"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListShareRequestsParams = NonNullable<operations["listShareRequests"]["parameters"]["query"]>;
export type DecideShareRequestParams = operations["decideShareRequest"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListShareRequestsResponse = operations["listShareRequests"]["responses"]["200"]["content"]["application/json"];
export type CreateShareRequestResponse = operations["createShareRequest"]["responses"]["201"]["content"]["application/json"];
export type DecideShareRequestResponse = operations["decideShareRequest"]["responses"]["200"]["content"]["application/json"];


