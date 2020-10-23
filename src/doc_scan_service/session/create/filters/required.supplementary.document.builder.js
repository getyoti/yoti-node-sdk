'use strict';

const RequiredSupplementaryDocument = require('./required.supplementary.document');
const Validation = require('../../../../yoti_common/validation');
const Objective = require('../objective/objective');

class RequiredSupplementaryDocumentBuilder {
  /**
   * @param {string[]} countryCodes
   *
   * @returns {this}
   */
  withCountryCodes(countryCodes) {
    Validation.isArrayOfStrings(countryCodes, 'countryCodes');
    this.countryCodes = countryCodes;
    return this;
  }

  /**
   * @param {string[]} documentTypes
   *
   * @returns {this}
   */
  withDocumentTypes(documentTypes) {
    Validation.isArrayOfStrings(documentTypes, 'documentTypes');
    this.documentTypes = documentTypes;
    return this;
  }

  /**
   * @param {Objective} objective
   *
   * @returns {this}
   */
  withObjective(objective) {
    Validation.instanceOf(objective, Objective, 'objective');
    this.objective = objective;
    return this;
  }

  /**
   * @returns {RequiredSupplementaryDocument}
   */
  build() {
    return new RequiredSupplementaryDocument(
      this.objective,
      this.documentTypes,
      this.countryCodes
    );
  }
}

module.exports = RequiredSupplementaryDocumentBuilder;
