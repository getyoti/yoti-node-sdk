import IDVConstants = require('../../../../../idv.constants');
import AllowedSourceResponse = require('./allowed.source.response');

class EndUserAllowedSourceResponse extends AllowedSourceResponse {
  constructor() {
    super(IDVConstants.END_USER);
  }
}

export default EndUserAllowedSourceResponse;
