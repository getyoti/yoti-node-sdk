'use strict';

const CompanyProfile = require('./company.profile');
const Validation = require('../../../yoti_common/validation');

/**
 * Builder to assist in the creation of {@link CompanyProfile}.
 *
 * @class CompanyProfileBuilder
 */
class CompanyProfileBuilder {
  /**
   * Sets the company name
   *
   * @param {string} companyName the company name
   *
   * @returns {this}
   */
  withCompanyName(companyName) {
    Validation.isString(companyName, 'companyName');
    this.companyName = companyName;
    return this;
  }

  /**
   * Builds the {@link CompanyProfile} using the values supplied to the builder
   *
   * @returns {CompanyProfile}
   */
  build() {
    return new CompanyProfile(
      this.companyName
    );
  }
}

module.exports = CompanyProfileBuilder;
