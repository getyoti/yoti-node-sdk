const AllowedSourceResponse = require('./allowed.source.response');

class UnknownAllowedSourceResponse extends AllowedSourceResponse {
  constructor() {
    super('');
  }
}

module.exports = UnknownAllowedSourceResponse;
