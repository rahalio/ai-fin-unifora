/**
 * Security Attestations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/security-attestations.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ControlChecklistItem = components["schemas"]["ControlChecklistItem"];
export type PlatformAttestation = components["schemas"]["PlatformAttestation"];
export type PlatformAttestationUpsertRequest = components["schemas"]["PlatformAttestationUpsertRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type UpsertPlatformAttestationRequestInput = NonNullable<operations["upsertPlatformAttestation"]["requestBody"]>["content"]["application/json"];



// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetPlatformAttestationResponse = operations["getPlatformAttestation"]["responses"]["200"]["content"]["application/json"];
export type UpsertPlatformAttestationResponse = operations["upsertPlatformAttestation"]["responses"]["200"]["content"]["application/json"];


