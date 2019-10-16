'use strict';

module.exports = {
  decodeExtraData(binaryData) {
    return this.builder.sharepubapi_v1.ExtraData.decode(binaryData);
  },
};
