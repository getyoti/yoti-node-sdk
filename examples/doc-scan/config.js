const fs = require('fs');

module.exports = {
  YOTI_CLIENT_SDK_ID: process.env.YOTI_CLIENT_SDK_ID,
  YOTI_PEM: fs.readFileSync(process.env.YOTI_KEY_FILE_PATH),
  YOTI_DOC_SCAN_IFRAME_URL: process.env.YOTI_DOC_SCAN_IFRAME_URL || 'https://api.yoti.com/idverify/v1/web/index.html',
  YOTI_APP_BASE_URL: process.env.YOTI_APP_BASE_URL || 'http://localhost:3000',
};
