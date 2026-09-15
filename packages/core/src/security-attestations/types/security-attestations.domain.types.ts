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
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

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


