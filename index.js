'use strict';

const { YotiClient, DocScanClient } = require('./src/client');
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
  DocScanConstants,
  RequiredIdDocumentBuilder,
  RequiredSupplementaryDocumentBuilder,
  DocumentRestrictionsFilterBuilder,
  DocumentRestrictionBuilder,
  OrthogonalRestrictionsFilterBuilder,
  ProofOfAddressObjectiveBuilder,
} = require('./src/doc_scan_service');

module.exports = {
  Client: YotiClient,
  DocScanClient,
  DocScanConstants,
  AmlAddress,
  AmlProfile,
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
