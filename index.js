'use strict';

const Client = require('./src/client').YotiClient;
const { AmlAddress } = require('./src/aml_type');
const { AmlProfile } = require('./src/aml_type');
const { RequestBuilder } = require('./src/request/request.builder');
const { Payload } = require('./src/request/payload');

const {
  DynamicScenarioBuilder,
  DynamicPolicyBuilder,
  WantedAttributeBuilder,
  ExtensionBuilder,
  LocationConstraintExtensionBuilder,
  TransactionalFlowExtensionBuilder,
  WantedAnchorBuilder,
  ConstraintsBuilder,
  SourceConstraintBuilder,
} = require('./src/dynamic_sharing_service');

module.exports = {
  Client,
  AmlAddress,
  AmlProfile,
  DynamicScenarioBuilder,
  DynamicPolicyBuilder,
  WantedAttributeBuilder,
  ExtensionBuilder,
  LocationConstraintExtensionBuilder,
  TransactionalFlowExtensionBuilder,
  WantedAnchorBuilder,
  ConstraintsBuilder,
  SourceConstraintBuilder,
  RequestBuilder,
  Payload,
};
