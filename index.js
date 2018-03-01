'use strict';

const Client = require('./src/client').YotiClient;
const AmlAddress = require('./src/aml_type').AmlAddress;
const AmlProfile = require('./src/aml_type').AmlProfile;

module.exports = {
  Client,
  AmlAddress,
  AmlProfile,
};
