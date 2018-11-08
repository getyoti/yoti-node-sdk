'use strict';

const Client = require('./src/client').YotiClient;
const AmlAddress = require('./src/aml_type').AmlAddress;
const AmlProfile = require('./src/aml_type').AmlProfile;
const Policy = require('./src/dynamic_policy_service').Policy;
const DynamicPolicyRequest = require('./src/dynamic_policy_service').DynamicPolicyRequest;
const DynamicPolicyResult = require('./src/dynamic_policy_service').DynamicPolicyResult;

module.exports = {
  Client,
  AmlAddress,
  AmlProfile,
  Policy,
  DynamicPolicyRequest,
  DynamicPolicyResult,
};
