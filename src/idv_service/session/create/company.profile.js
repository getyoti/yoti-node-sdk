'use strict';

const Validation = require('../../../yoti_common/validation');

class CompanyProfile {
  /**
   * @param {string} companyName
   *   The company name
   */
  constructor(
    companyName
  ) {
    Validation.isString(companyName, 'companyName');
    /** @private */
    this.companyName = companyName;
  }

  /**
   * Returns serialized data for JSON.stringify()
   */
  toJSON() {
    return {
      company_name: this.companyName,
    };
  }
}

module.exports = CompanyProfile;
