'use strict';

const yoti = {
  connectApi: process.env.YOTI_CONNECT_API || 'https://api.yoti.com/api/v1',
  docScanApi: process.env.YOTI_DOC_SCAN_API || 'https://api.yoti.com/idverify/v1',
};

module.exports = yoti;
