const Validation = require('../yoti_common/validation');

class DigitalIdentityService {
  constructor(sdkId, pem, { apiUrl }) {
    Validation.isString(sdkId, 'sdkId');
    Validation.notNullOrEmpty(pem, 'pem');

    this.sdkId = sdkId;
    this.pem = pem;
    this.apiUrl = apiUrl;
  }
}

module.exports = {
  DigitalIdentityService,
};
