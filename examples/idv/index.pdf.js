const fs = require('fs');
require('dotenv').config();

const {
  IDVClient,
  CreateSessionOverviewPdfPayloadBuilder,
} = require('yoti');
const config = require('./config');

async function main() {
  const sessionId = 'insert-your-session-id';

  const idvClient = new IDVClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  const payload = new CreateSessionOverviewPdfPayloadBuilder()
    .withIncludeImages(true)
    .withIncludeExtractedText(true)
    .withIncludeDeviceTracking(true)
    .build();

  const media = await idvClient.createSessionOverviewPdf(sessionId, payload);

  fs.writeFileSync(`session-${sessionId}.pdf`, media.getContent());
}

main().catch(console.error);
