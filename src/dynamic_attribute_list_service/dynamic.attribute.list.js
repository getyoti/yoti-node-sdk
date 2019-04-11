'use strict';

const constants = require('../yoti_common/constants');

const validateWanted = (wanted) => {
  if (!Array.isArray(wanted)) {
    return false;
  }
  const validAttributes = new Set([
    'name',
    'accept_self_asserted',
    'derivation',
    'optional',
  ]);

  wanted.forEach((item) => {
    const items = Object.keys(item);
    items.forEach((key) => {
      if (!validAttributes.has(key)) {
        throw new Error(`invalid key value attribute supplied ${key}`);
      }
    });
  });
  return null;
};

/**
 * Verify the type of remember-me.
 * @param {*} rememberMe
 */
const validateRememberMe = (isRememberMeWanted) => {
  if (typeof (isRememberMeWanted) !== 'boolean') {
    const errorMessage = `type of attributeList ${constants.WANTED_REMEMBER_ME} should be a boolean`;
    throw new Error(errorMessage);
  }
};

/**
 * @desc validate authType is an array of booleans.
 * @param {*} authTypes
 */
const validateWantedAuthTypes = (authTypes) => {
  if (!Array.isArray(authTypes)) {
    const errorMessage = `type of ${constants.WANTED_AUTH_TYPES} should be an array of numbers`;
    throw new Error(errorMessage);
  }
};

/**
 *
 * @param {*} wanted - wanted is an array of attributes to be requested.
 * @param {*} authTypes - auth types represents the authentication type to be used.
 * @param {*} wantedRememberMe
 */
const AttributeList = (
  wanted,
  authTypes,
  isRememberMeWanted = false,
  extensions = []
) => {
  // Perform some validation
  const attributeList = {};
  // Validate attribute list.
  validateWanted(wanted);
  attributeList[constants.WANTED] = wanted;
  // Assert an array of numbers.
  if (authTypes) {
    validateWantedAuthTypes(authTypes);
  }
  attributeList[constants.WANTED_AUTH_TYPES] = (authTypes) || [];
  // Assert boolean value
  validateRememberMe(isRememberMeWanted);
  attributeList[constants.WANTED_REMEMBER_ME] = isRememberMeWanted;

  attributeList[constants.EXTENSIONS] = extensions;
  return attributeList;
};

class DynamicAttributeListRequest {
  /**
     *
     * @param {*} callbackEndpoint refers to the endpoint to callback to.
     * @param {*} attributeList is the attribute list to be requested,
     * this refers to the attributes used within Yoti.
     *
     */
  constructor(callbackEndpoint, attributeList) {
    this.setCallBackEndpoint(callbackEndpoint);
    this.setPolicy(attributeList);
  }

  /**
     * @param {*} callbackEndpoint sets the callbackEndpoint
     */
  setCallBackEndpoint(callbackEndpoint) {
    this.callbackEndpoint = callbackEndpoint;
  }

  /**
     *
     * @param {*} attributeList sets the attributeList.
     */
  setPolicy(attributeList) {
    const validatedAttributeList = AttributeList(
      attributeList[constants.WANTED],
      attributeList[constants.WANTED_AUTH_TYPES],
      attributeList[constants.WANTED_REMEMBER_ME]
    );
    this.attributeList = validatedAttributeList;
  }

  /**
     * @param {wantedAttributeList} wantedAttributeList is a attribute list to add.
     */
  addWantedAttributeList(wantedAttributeList) {
    validateWanted(wantedAttributeList);
    this.attributeList.wanted.push(wantedAttributeList);
  }

  /**
     *  @returns a json serialised object request.
     */
  getData() {
    const data = {};
    data[constants.CALLBACK_ENDPOINT] = this.callbackEndpoint;
    data[constants.ATTRIBUTE_LIST] = this.attributeList;
    data[constants.EXTENSIONS] = [];
    return data;
  }
}


/**
 * @description is the response object from Yoti.
 * The response will return two values: the QR Code to be passed
 * to the widget, and the reference ID.
 */
class DynamicAttributeListResult {
  constructor(data) {
    this.data = data;
  }

  static checkAttributes(result) {
    const expectedElements = [
      constants.QRCODE,
      constants.REF_ID,
    ];
    expectedElements.forEach((element) => {
      if (!Object.prototype.hasOwnProperty.call(result, element)) {
        throw new Error(`Missing attribute in the result ${element}`);
      }
    });
  }

  getQRCodeLink() {
    return (this.data) ? this.data[constants.QRCODE] : undefined;
  }

  getRefId() {
    return (this.data) ? this.data[constants.REF_ID] : undefined;
  }
}

module.exports = {
  AttributeList,
  DynamicAttributeListResult,
  DynamicAttributeListRequest,
};
