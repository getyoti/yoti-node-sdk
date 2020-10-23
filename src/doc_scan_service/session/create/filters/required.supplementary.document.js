'use strict';

const RequiredDocument = require('./required.document');
const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');
const Objective = require('../objective/objective');

class RequiredSupplementaryDocument extends RequiredDocument {
  /**
   * @param {Objective} objective
   * @param {string[]} documentTypes
   * @param {string[]} countryCodes
   */
  constructor(objective, documentTypes, countryCodes) {
    super(DocScanConstants.SUPPLEMENTARY_DOCUMENT);

    Validation.instanceOf(objective, Objective, 'objective');
    this.objective = objective;

    if (documentTypes) {
      Validation.isArrayOfStrings(documentTypes, 'documentTypes');
      this.documentTypes = documentTypes;
    }

    if (countryCodes) {
      Validation.isArrayOfStrings(countryCodes, 'countryCodes');
      this.countryCodes = countryCodes;
    }
  }

  toJSON() {
    return Object.assign(
      super.toJSON(),
      {
        objective: this.objective,
        document_types: this.documentTypes,
        country_codes: this.countryCodes,
      }
    );
  }
}

module.exports = RequiredSupplementaryDocument;
