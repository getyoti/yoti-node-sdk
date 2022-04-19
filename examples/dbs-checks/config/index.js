const fs = require('fs');

const environment = process.env.ENVIRONMENT || 'staging1';

const clientSdkIds = {
  staging1: 'd3dcf947-bb1c-42b2-880b-254129d82595',
  preprod1: '85237def-2aa8-4330-8bcf-95ca3e1191fb',
  live: 'a0e949a2-0acf-4c54-bd03-03e64cc55314',
};

const shareClientScripts = {
  staging1: 'https://www.public.stg1.dmz.yoti.com/share/client/',
  preprod1: 'https://www.public.ppd1.dmz.yoti.com/share/client/',
  live: 'https://www.yoti.com/share/client/',
};

const CLIENT_SDK_ID = clientSdkIds[environment];
const PEM = fs.readFileSync(`${__dirname}/../keys/${environment}/application.pem`);
const SHARE_CLIENT = shareClientScripts[environment];
const ENVIRONMENT = environment;

module.exports = {
  CLIENT_SDK_ID,
  PEM,
  SHARE_CLIENT,
  ENVIRONMENT,
};
