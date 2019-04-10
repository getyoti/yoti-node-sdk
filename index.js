'use strict';

const Client = require('./src/client').YotiClient;
const AmlAddress = require('./src/aml_type').AmlAddress;
const AmlProfile = require('./src/aml_type').AmlProfile;
const AttributeList = require('./src/dynamic_attribute_list_service').AttributeList;
const DynamicAttributeListRequest = require('./src/dynamic_attribute_list_service').DynamicAttributeListRequest;
const DynamicAttributeListResult = require('./src/dynamic_attribute_list_service').DynamicAttributeListResult;

module.exports = {
  Client,
  AmlAddress,
  AmlProfile,
  AttributeList,
  DynamicAttributeListRequest,
  DynamicAttributeListResult,
};
