const fs = require('fs');

const yotiConfig = require('yoti/config').yoti;

module.exports = {
  YOTI_CLIENT_SDK_ID: process.env.YOTI_CLIENT_SDK_ID,
  YOTI_PEM: fs.readFileSync(process.env.YOTI_KEY_FILE_PATH),
  YOTI_DOC_SCAN_IFRAME_URL: `${yotiConfig.docScanApi}/web/index.html`,
  YOTI_APP_BASE_URL: process.env.YOTI_APP_BASE_URL || 'https://localhost:3000',
};
