'use strict';

module.exports = {
  decodeThirdPartyAttribute(binaryData) {
    return this.builder.sharepubapi_v1.ThirdPartyAttribute.decode(binaryData);
  },
};
