'use strict';

const DocScanService = require('./doc.scan.service');
const DocScanConstants = require('./doc.scan.constants');
const SessionSpecificationBuilder = require('./session/create/session.specification.builder');
const NotificationConfigBuilder = require('./session/create/notification.config.builder');
const SdkConfigBuilder = require('./session/create/sdk.config.builder');
const RequestedDocumentAuthenticityCheckBuilder = require('./session/create/check/requested.document.authenticity.check.builder');
const RequestedIdDocumentComparisonCheckBuilder = require('./session/create/check/requested.id.document.comparison.check.builder');
const RequestedThirdPartyIdentityCheckBuilder = require('./session/create/check/requested.third.party.identity.check.builder');
const RequestedFaceMatchCheckBuilder = require('./session/create/check/requested.face.match.check.builder');
const RequestedLivenessCheckBuilder = require('./session/create/check/requested.liveness.check.builder');
const RequestedTextExtractionTaskBuilder = require('./session/create/task/requested.text.extraction.task.builder');
const RequestedSupplementaryDocTextExtractionTaskBuilder = require('./session/create/task/requested.supplementary.doc.text.extraction.task.builder');
const RequiredIdDocumentBuilder = require('./session/create/filters/required.id.document.builder');
const RequiredSupplementaryDocumentBuilder = require('./session/create/filters/required.supplementary.document.builder');
const DocumentRestrictionsFilterBuilder = require('./session/create/filters/document/document.restrictions.filter.builder');
const OrthogonalRestrictionsFilterBuilder = require('./session/create/filters/orthogonal/orthogonal.restrictions.filter.builder');
const DocumentRestrictionBuilder = require('./session/create/filters/document/document.restriction.builder');
const ProofOfAddressObjectiveBuilder = require('./session/create/objective/proof.of.address.objective.builder');

module.exports = {
  DocScanService,
  DocScanConstants,
  SessionSpecificationBuilder,
  NotificationConfigBuilder,
  SdkConfigBuilder,
  RequestedDocumentAuthenticityCheckBuilder,
  RequestedIdDocumentComparisonCheckBuilder,
  RequestedThirdPartyIdentityCheckBuilder,
  RequestedFaceMatchCheckBuilder,
  RequestedLivenessCheckBuilder,
  RequestedTextExtractionTaskBuilder,
  RequestedSupplementaryDocTextExtractionTaskBuilder,
  RequiredIdDocumentBuilder,
  RequiredSupplementaryDocumentBuilder,
  DocumentRestrictionsFilterBuilder,
  DocumentRestrictionBuilder,
  OrthogonalRestrictionsFilterBuilder,
  ProofOfAddressObjectiveBuilder,
};
