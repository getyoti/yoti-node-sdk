'use strict';

module.exports = {
  decodeExtraData(binaryData) {
    return this.builder.lookup('sharepubapi_v1.ExtraData').decode(Buffer.from(binaryData, 'base64'));
  },
};
