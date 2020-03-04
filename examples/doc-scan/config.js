const fs = require('fs');

module.exports = {
  YOTI_CLIENT_SDK_ID: process.env.YOTI_CLIENT_SDK_ID,
  YOTI_PEM: fs.readFileSync(process.env.YOTI_KEY_FILE_PATH),
  YOTI_DOC_SCAN_IFRAME_URL: process.env.YOTI_DOC_SCAN_IFRAME_URL,
  YOTI_DOC_SCAN_API: process.env.YOTI_DOC_SCAN_API,
  YOTI_APP_BASE_URL: process.env.YOTI_APP_BASE_URL,
};
