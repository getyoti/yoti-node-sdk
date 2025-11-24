import IDVConstants = require('../../../../../idv.constants');
import AllowedSourceResponse = require('./allowed.source.response');

class RelyingBusinessAllowedSourceResponse extends AllowedSourceResponse {
  constructor() {
    super(IDVConstants.RELYING_BUSINESS);
  }
}

export default RelyingBusinessAllowedSourceResponse;
