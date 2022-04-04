'use strict';

const DocScanService = require('./doc.scan.service');
const DocScanConstants = require('./doc.scan.constants');
const SessionSpecificationBuilder = require('./session/create/session.specification.builder');
const NotificationConfigBuilder = require('./session/create/notification.config.builder');
const SdkConfigBuilder = require('./session/create/sdk.config.builder');
const RequestedDocumentAuthenticityCheckBuilder = require('./session/create/check/requested.document.authenticity.check.builder');
const RequestedIdDocumentComparisonCheckBuilder = require('./session/create/check/requested.id.document.comparison.check.builder');
const RequestedThirdPartyIdentityCheckBuilder = require('./session/create/check/requested.third.party.identity.check.builder');
const RequestedWatchlistScreeningCheckBuilder = require('./session/create/check/requested.watchlist.screening.check.builder');
const RequestedWatchlistAdvancedCaCheckBuilder = require('./session/create/check/requested.watchlist.advanced.ca.check.builder');
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
const RequestedYotiAccountWatchlistAdvancedCaConfigBuilder = require('./session/create/check/requested.yoti.account.watchlist.advanced.ca.config.builder');
const RequestedCustomAccountWatchlistAdvancedCaConfigBuilder = require('./session/create/check/requested.custom.account.watchlist.advanced.ca.config.builder');
const RequestedExactMatchingStrategyBuilder = require('./session/create/check/requested.exact.matching.strategy.builder');
const RequestedFuzzyMatchingStrategyBuilder = require('./session/create/check/requested.fuzzy.matching.strategy.builder');
const RequestedTypeListSourcesBuilder = require('./session/create/check/requested.type.list.sources.builder');
const RequestedSearchProfileSourcesBuilder = require('./session/create/check/requested.search.profile.sources.builder');

module.exports = {
  DocScanService,
  DocScanConstants,
  SessionSpecificationBuilder,
  NotificationConfigBuilder,
  SdkConfigBuilder,
  RequestedDocumentAuthenticityCheckBuilder,
  RequestedIdDocumentComparisonCheckBuilder,
  RequestedThirdPartyIdentityCheckBuilder,
  RequestedWatchlistScreeningCheckBuilder,
  RequestedWatchlistAdvancedCaCheckBuilder,
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
  RequestedYotiAccountWatchlistAdvancedCaConfigBuilder,
  RequestedCustomAccountWatchlistAdvancedCaConfigBuilder,
  RequestedExactMatchingStrategyBuilder,
  RequestedFuzzyMatchingStrategyBuilder,
  RequestedSearchProfileSourcesBuilder,
  RequestedTypeListSourcesBuilder,
};
