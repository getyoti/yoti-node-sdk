'use strict';

const AttributeIssuanceDetails = require('../../data_type/attribute.issuance.details');

/**
 *
 * @param {Object[]} dataEntries
 * @returns {AttributeIssuanceDetails}
 */
function getAttributeIssuanceDetails(dataEntries) {
  return dataEntries.find((element) => element instanceof AttributeIssuanceDetails);
}

class ExtraData {
  /**
   * @param {Object[]} dataEntries
   */
  constructor(dataEntries = []) {
    /** @private */
    this.attributeIssuanceDetails = getAttributeIssuanceDetails(dataEntries);
  }

  /**
   * @returns {AttributeIssuanceDetails}
   */
  getAttributeIssuanceDetails() {
    return this.attributeIssuanceDetails;
  }
}

module.exports = ExtraData;
