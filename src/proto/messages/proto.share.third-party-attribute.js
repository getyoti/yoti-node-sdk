'use strict';

const { ThirdPartyAttribute } = require('../types');

/**
 * @typedef {import('protobufjs').Message} Message
 */

module.exports = {

  /**
   * @typedef {{expiryDate:string,definitions:{name:string}[]}} IssuingAttributes
   *
   * @returns {Message<{issuanceToken:Buffer, issuingAttributes: IssuingAttributes[]}>}
   */
  decodeThirdPartyAttribute(binaryData) {
    return ThirdPartyAttribute.decode(Buffer.from(binaryData, 'base64'));
  },
};
