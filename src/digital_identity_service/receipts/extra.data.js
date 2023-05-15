'use strict';

const AttributeIssuanceDetails = require('../../data_type/attribute.issuance.details');

/**
 *
 * @param {[]} dataEntries
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
