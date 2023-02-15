'use strict';

const { YotiClient, IDVClient, DigitalIdentityClient } = require('./src/client');
const { AmlAddress, AmlProfile } = require('./src/aml_type');
const { RequestBuilder } = require('./src/request/request.builder');
const { Payload } = require('./src/request/payload');
const { YotiDate } = require('./src/data_type/date');
const constants = require('./src/yoti_common/constants');

const {
  DynamicScenarioBuilder,
  DynamicPolicyBuilder,
  WantedAttributeBuilder,
  ExtensionBuilder,
  LocationConstraintExtensionBuilder,
  ThirdPartyAttributeExtensionBuilder,
  TransactionalFlowExtensionBuilder,
  WantedAnchorBuilder,
  ConstraintsBuilder,
  SourceConstraintBuilder,
} = require('./src/dynamic_sharing_service');

const {
  DigitalIdentityBuilders,
} = require('./src/digital_identity_service');

const {
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
  IDVConstants,
  RequiredIdDocumentBuilder,
  RequiredSupplementaryDocumentBuilder,
  DocumentRestrictionsFilterBuilder,
  DocumentRestrictionBuilder,
  OrthogonalRestrictionsFilterBuilder,
  ProofOfAddressObjectiveBuilder,
  RequestedCustomAccountWatchlistAdvancedCaConfigBuilder,
  RequestedYotiAccountWatchlistAdvancedCaConfigBuilder,
  RequestedExactMatchingStrategyBuilder,
  RequestedFuzzyMatchingStrategyBuilder,
  RequestedSearchProfileSourcesBuilder,
  RequestedTypeListSourcesBuilder,
} = require('./src/idv_service');

module.exports = {
  Client: YotiClient,
  IDVClient,
  DigitalIdentityClient,
  IDVConstants,
  AmlAddress,
  AmlProfile,
  DigitalIdentityBuilders,
  DynamicScenarioBuilder,
  DynamicPolicyBuilder,
  WantedAttributeBuilder,
  ExtensionBuilder,
  LocationConstraintExtensionBuilder,
  ThirdPartyAttributeExtensionBuilder,
  TransactionalFlowExtensionBuilder,
  WantedAnchorBuilder,
  ConstraintsBuilder,
  SourceConstraintBuilder,
  RequestBuilder,
  Payload,
  YotiDate,
  constants,
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
  RequestedCustomAccountWatchlistAdvancedCaConfigBuilder,
  RequestedYotiAccountWatchlistAdvancedCaConfigBuilder,
  RequestedExactMatchingStrategyBuilder,
  RequestedFuzzyMatchingStrategyBuilder,
  RequestedSearchProfileSourcesBuilder,
  RequestedTypeListSourcesBuilder,
};
