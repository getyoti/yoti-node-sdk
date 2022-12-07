const IDVConstants = require('../../../../../idv.constants');
const AllowedSourceResponse = require('./allowed.source.response');

class IbvAllowedSourceResponse extends AllowedSourceResponse {
  constructor() {
    super();
    this.type = IDVConstants.IBV;
  }
}

module.exports = IbvAllowedSourceResponse;
