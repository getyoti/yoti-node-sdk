'use strict';

const Validation = require('../../../yoti_common/validation');

class CompanyProfileResponse {
  constructor(response) {
    Validation.isString(response.company_name, 'company_name');
    /** @private */
    this.companyName = response.company_name;
  }

  /**
   * @returns {string}
   */
  getCompanyName() {
    return this.companyName;
  }
}

module.exports = CompanyProfileResponse;
