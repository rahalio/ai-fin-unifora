/**
 * IdGeneratorService Port — Unifora domain prefixes.
 */

import type { DomainCode } from '@unifora/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  ucsId(): string;
  dprId(): string;
  shrId(): string;
  rdyId(): string;
  pipId(): string;
  escId(): string;
  linId(): string;
  audId(): string;
  capId(): string;
  secId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
