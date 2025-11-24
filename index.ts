import { YotiClient, IDVClient, DigitalIdentityClient } from './src/client';
import { AmlAddress, AmlProfile } from './src/aml_type';
import { RequestBuilder } from './src/request/request.builder';
import { Payload } from './src/request/payload';
import { YotiDate } from './src/data_type/date';
import constants = require('./src/yoti_common/constants');

import {
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
} from './src/dynamic_sharing_service';

import {
  DigitalIdentityBuilders,
} from './src/digital_identity_service';

import {
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

} from './src/idv_service';

import YotiCommon = require('./src/yoti_common');
import { YotiRequest } from './src/request/request';
import IDVError = require('./src/idv_service/idv.error');

export const internals = {
  IDVService,
  YotiCommon,
  YotiRequest,
  IDVError,
};

export { YotiClient as Client };
export {
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
