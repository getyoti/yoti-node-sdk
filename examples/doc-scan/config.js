const fs = require('fs');

module.exports = {
  YOTI_CLIENT_SDK_ID: process.env.YOTI_CLIENT_SDK_ID,
  YOTI_KEY_FILE_PATH: fs.readFileSync(process.env.YOTI_KEY_FILE_PATH),
  YOTI_DOC_SCAN_IFRAME_URL: process.env.YOTI_DOC_SCAN_IFRAME_URL,
  YOTI_DOC_SCAN_API: process.env.YOTI_DOC_SCAN_API,
};
