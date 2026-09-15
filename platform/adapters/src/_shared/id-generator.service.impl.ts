/**
 * ID Generator Service Implementation — Unifora prefixes.
 */

import type { DomainCode } from '@unifora/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@unifora/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@unifora/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  ucsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.useCases);
  }
  dprId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.dataProducts);
  }
  shrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.shares);
  }
  rdyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.readiness);
  }
  pipId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.pipelines);
  }
  escId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.escalations);
  }
  linId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.lineage);
  }
  audId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.audits);
  }
  capId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.capacity);
  }
  secId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.securityAttestations);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
