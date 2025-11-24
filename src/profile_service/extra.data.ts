import AttributeIssuanceDetails = require('../data_type/attribute.issuance.details');

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
  private attributeIssuanceDetails: any;

  /**
   * @param {Object[]} dataEntries
   */
  constructor(dataEntries: any[] = []) {
    this.attributeIssuanceDetails = getAttributeIssuanceDetails(dataEntries);
  }

  /**
   * @returns {AttributeIssuanceDetails}
   */
  getAttributeIssuanceDetails() {
    return this.attributeIssuanceDetails;
  }
}

export = ExtraData;
