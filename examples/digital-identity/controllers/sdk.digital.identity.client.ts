import {
  DigitalIdentityClient,
} from 'yoti';

import config = require('../config');

const digitalIdentityClient = new DigitalIdentityClient(
  config.CLIENT_SDK_ID,
  config.PEM_KEY,
);

export default digitalIdentityClient;
