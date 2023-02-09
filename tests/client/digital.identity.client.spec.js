const fs = require('fs');
const { v4: uuid } = require('uuid');

const config = require('../../config');
const yoti = require('../../index');

const GENERIC_API_PATH = '/api/v1';
const APP_ID = uuid();
const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

describe.each([
  [
    'default',
    {
      apiUrlDomain: config.yoti.connectApi.replace(GENERIC_API_PATH, ''),
      apiUrlPath: GENERIC_API_PATH,
      useDefaultApiUrl: true,
    },
  ],
  [
    'custom options.apiUrl',
    {
      apiUrlDomain: 'https://some.api.com',
      apiUrlPath: GENERIC_API_PATH,
      useDefaultApiUrl: false,
    },
  ],
])('YotiClient (%s)', (description, { apiUrlDomain, apiUrlPath, useDefaultApiUrl }) => {
  let yotiClient;

  beforeEach(() => {
    if (useDefaultApiUrl) {
      yotiClient = new yoti.DigitalIdentityClient(
        APP_ID,
        privateKeyFile
      );
    } else {
      yotiClient = new yoti.DigitalIdentityClient(
        APP_ID,
        privateKeyFile,
        { apiUrl: apiUrlDomain + apiUrlPath }
      );
    }
  });

  it('placeholder test', () => {
    expect(yotiClient).toBeDefined();
  });
});
