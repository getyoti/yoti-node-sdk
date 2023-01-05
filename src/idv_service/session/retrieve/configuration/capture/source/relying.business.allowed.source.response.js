const IDVConstants = require('../../../../../idv.constants');
const AllowedSourceResponse = require('./allowed.source.response');

class RelyingBusinessAllowedSourceResponse extends AllowedSourceResponse {
  constructor() {
    super(IDVConstants.RELYING_BUSINESS);
  }
}

module.exports = RelyingBusinessAllowedSourceResponse;
