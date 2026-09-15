/**
 * Use Cases Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/use-cases.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DataProductId = components["schemas"]["DataProductId"];
export type ProgrammePulse = components["schemas"]["ProgrammePulse"];
export type UseCase = components["schemas"]["UseCase"];
export type UseCaseId = components["schemas"]["UseCaseId"];
export type UseCaseListData = components["schemas"]["UseCaseListData"];
export type UseCaseStatus = components["schemas"]["UseCaseStatus"];
export type LinkDataProductRequest = components["schemas"]["LinkDataProductRequest"];
export type TTVGateUpdateRequest = components["schemas"]["TTVGateUpdateRequest"];
export type UseCaseCreateRequest = components["schemas"]["UseCaseCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateUseCaseRequestInput = NonNullable<operations["createUseCase"]["requestBody"]>["content"]["application/json"];
export type SetTTVGateRequestInput = NonNullable<operations["setTTVGate"]["requestBody"]>["content"]["application/json"];
export type LinkDataProductRequestInput = NonNullable<operations["linkDataProduct"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListUseCasesParams = NonNullable<operations["listUseCases"]["parameters"]["query"]>;
export type GetUseCaseParams = operations["getUseCase"]["parameters"]["path"];
export type SetTTVGateParams = operations["setTTVGate"]["parameters"]["path"];
export type LinkDataProductParams = operations["linkDataProduct"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListUseCasesResponse = operations["listUseCases"]["responses"]["200"]["content"]["application/json"];
export type CreateUseCaseResponse = operations["createUseCase"]["responses"]["201"]["content"]["application/json"];
export type GetProgrammePulseResponse = operations["getProgrammePulse"]["responses"]["200"]["content"]["application/json"];
export type GetUseCaseResponse = operations["getUseCase"]["responses"]["200"]["content"]["application/json"];
export type SetTTVGateResponse = operations["setTTVGate"]["responses"]["200"]["content"]["application/json"];
export type LinkDataProductResponse = operations["linkDataProduct"]["responses"]["200"]["content"]["application/json"];


