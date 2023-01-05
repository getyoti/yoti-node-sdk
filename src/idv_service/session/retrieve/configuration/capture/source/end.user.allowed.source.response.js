const IDVConstants = require('../../../../../idv.constants');
const AllowedSourceResponse = require('./allowed.source.response');

class EndUserAllowedSourceResponse extends AllowedSourceResponse {
  constructor() {
    super(IDVConstants.END_USER);
  }
}

module.exports = EndUserAllowedSourceResponse;
