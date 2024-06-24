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
  RequestedFaceComparisonCheckBuilder,
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
  CreateFaceCaptureResourcePayloadBuilder,
  UploadFaceCaptureImagePayloadBuilder,
  IDVService,
  AdvancedIdentityProfileSchemeConfigBuilder,
  AdvancedIdentityProfileBuilder,
  AdvancedIdentityProfileSchemeBuilder,
  AdvancedIdentityProfileRequirementsBuilder,

} = require('./src/idv_service');

const YotiCommon = require('./src/yoti_common');
const { YotiRequest } = require('./src/request/request');
const IDVError = require('./src/idv_service/idv.error');

module.exports = {
  internals: {
    IDVService,
    YotiCommon,
    YotiRequest,
    IDVError,
  },
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
  RequestedFaceComparisonCheckBuilder,
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
  CreateFaceCaptureResourcePayloadBuilder,
  UploadFaceCaptureImagePayloadBuilder,
  AdvancedIdentityProfileSchemeConfigBuilder,
  AdvancedIdentityProfileBuilder,
  AdvancedIdentityProfileSchemeBuilder,
  AdvancedIdentityProfileRequirementsBuilder,
};
