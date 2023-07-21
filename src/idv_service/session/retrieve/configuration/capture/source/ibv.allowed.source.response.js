const IDVConstants = require('../../../../../idv.constants');
const AllowedSourceResponse = require('./allowed.source.response');

class IbvAllowedSourceResponse extends AllowedSourceResponse {
  constructor() {
    super(IDVConstants.IBV);
  }
}

module.exports = IbvAllowedSourceResponse;
