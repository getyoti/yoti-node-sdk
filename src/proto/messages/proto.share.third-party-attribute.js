'use strict';

const { ThirdPartyAttribute } = require('../types');

module.exports = {

  /**
   * @typedef {Object} Definition
   * @property {string} name
   *
   * @typedef {Object} IssuingAttributes
   * @property {string} expiryDate
   * @property {Definition[]} definitions
   *
   * @returns {{issuanceToken: Buffer, issuingAttributes:IssuingAttributes }}
   */
  decodeThirdPartyAttribute(binaryData) {
    const { issuanceToken, issuingAttributes } = /** @type {{issuanceToken: Buffer, issuingAttributes:IssuingAttributes }} */(
      /** @type {*} */(ThirdPartyAttribute.decode(Buffer.from(binaryData, 'base64'))));
    return { issuanceToken, issuingAttributes };
  },
};
