'use strict';

const AttributeIssuanceDetails = require('../data_type/attribute.issuance.details');

/**
 * @param {Object[]} parsedDataEntries
 */
function getAttributeIssuanceDetails(parsedDataEntries) {
  const filtered = parsedDataEntries.filter((i) => i instanceof AttributeIssuanceDetails);
  if (filtered.length > 0) {
    return filtered[0];
  }

  return undefined;
}

class ExtraData {
  /**
   * @param {Object[]} attributeIssuanceDetails
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
