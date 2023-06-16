'use strict';

const AttributeIssuanceDetails = require('../data_type/attribute.issuance.details');

/**
 * @param {Object[]} dataEntries
 */
function getAttributeIssuanceDetails(dataEntries) {
  const filtered = dataEntries.filter((i) => i instanceof AttributeIssuanceDetails);
  if (filtered.length > 0) {
    return filtered[0];
  }

  return undefined;
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
