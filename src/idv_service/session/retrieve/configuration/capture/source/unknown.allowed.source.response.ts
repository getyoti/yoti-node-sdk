import AllowedSourceResponse = require('./allowed.source.response');

class UnknownAllowedSourceResponse extends AllowedSourceResponse {
  constructor() {
    super('');
  }
}

export default UnknownAllowedSourceResponse;
