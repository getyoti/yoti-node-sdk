'use strict';

const { ThirdPartyAttribute } = require('../types');

/**
 * @typedef {import('protobufjs').Message} Message
 */

module.exports = {

  /**
   * @typedef {{expiryDate:string,definitions:{name:string}[]}} IssuingAttributes
   *
   * @returns {{issuanceToken:Buffer, issuingAttributes: IssuingAttributes[]}}
   */
  decodeThirdPartyAttribute(binaryData) {
    return /** @type {any} */ (ThirdPartyAttribute.decode(Buffer.from(binaryData, 'base64')));
  },
};
