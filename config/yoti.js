'use strict';

const constants = require('../src/yoti_common/constants');

const yoti = {
  connectApi: process.env.YOTI_CONNECT_API || process.env.YOTI_API_URL || `${constants.API_BASE_URL}/api/v1`,
  idvApi: process.env.YOTI_IDV_API || process.env.YOTI_IDV_API_URL || `${constants.API_BASE_URL}/idverify/v1`,
  digitalIdentityApi: process.env.YOTI_DIGITAL_IDENTITY_API_URL || `${constants.API_BASE_URL}/share`,
};

module.exports = yoti;
