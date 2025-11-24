import IDVConstants = require('../../../../../idv.constants');
import AllowedSourceResponse = require('./allowed.source.response');

class IbvAllowedSourceResponse extends AllowedSourceResponse {
  constructor() {
    super(IDVConstants.IBV);
  }
}

export default IbvAllowedSourceResponse;
