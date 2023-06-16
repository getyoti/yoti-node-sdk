const {
  DigitalIdentityClient,
} = require('yoti');

const config = require('../config');

const digitalIdentityClient = new DigitalIdentityClient(
  config.CLIENT_SDK_ID,
  config.PEM_KEY,
);

module.exports = digitalIdentityClient;
