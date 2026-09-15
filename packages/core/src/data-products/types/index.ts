/**
 * Data Products Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/data-products.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DataProduct = components["schemas"]["DataProduct"];
export type DataProductId = components["schemas"]["DataProductId"];
export type DataProductListData = components["schemas"]["DataProductListData"];
export type QualityStatus = components["schemas"]["QualityStatus"];
export type SiloSystem = components["schemas"]["SiloSystem"];
export type SiloSystemId = components["schemas"]["SiloSystemId"];
export type SiloSystemListData = components["schemas"]["SiloSystemListData"];
export type DataProductCreateRequest = components["schemas"]["DataProductCreateRequest"];
export type DataProductStewardUpdateRequest = components["schemas"]["DataProductStewardUpdateRequest"];
export type Silo = operations["listDataProductSilos"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateDataProductRequestInput = NonNullable<operations["createDataProduct"]["requestBody"]>["content"]["application/json"];
export type UpdateDataProductStewardRequestInput = NonNullable<operations["updateDataProductSteward"]["requestBody"]>["content"]["application/json"];
export type UpdateDataProductStewardRequest = UpdateDataProductStewardRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDataProductsParams = NonNullable<operations["listDataProducts"]["parameters"]["query"]>;
export type GetDataProductParams = operations["getDataProduct"]["parameters"]["path"];
export type UpdateDataProductStewardParams = operations["updateDataProductSteward"]["parameters"]["path"];
export type ListDataProductSilosParams = operations["listDataProductSilos"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDataProductsResponse = operations["listDataProducts"]["responses"]["200"]["content"]["application/json"];
export type CreateDataProductResponse = operations["createDataProduct"]["responses"]["201"]["content"]["application/json"];
export type GetDataProductResponse = operations["getDataProduct"]["responses"]["200"]["content"]["application/json"];
export type UpdateDataProductStewardResponse = operations["updateDataProductSteward"]["responses"]["200"]["content"]["application/json"];
export type ListDataProductSilosResponse = operations["listDataProductSilos"]["responses"]["200"]["content"]["application/json"];


