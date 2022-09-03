'use strict';

module.exports = {
  decodeThirdPartyAttribute(binaryData) {
    return this.builder.lookup('sharepubapi_v1.ThirdPartyAttribute').decode(Buffer.from(binaryData, 'base64'));
  },
};
