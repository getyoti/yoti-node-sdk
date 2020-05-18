'use strict';

const constants = require('../src/yoti_common/constants');

const yoti = {
  connectApi: process.env.YOTI_CONNECT_API || process.env.YOTI_API_URL || `${constants.API_BASE_URL}/api/v1`,
  docScanApi: process.env.YOTI_DOC_SCAN_API || process.env.YOTI_DOC_SCAN_API_URL || `${constants.API_BASE_URL}/idverify/v1`,
};

module.exports = yoti;
