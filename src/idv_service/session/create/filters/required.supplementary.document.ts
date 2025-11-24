import RequiredDocument = require('./required.document');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');
import Objective = require('../objective/objective');

class RequiredSupplementaryDocument extends RequiredDocument {
  /**
   * @param {Objective} objective
   * @param {string[]} documentTypes
   * @param {string[]} countryCodes
   */
  constructor(objective, documentTypes, countryCodes) {
    super(IDVConstants.SUPPLEMENTARY_DOCUMENT);

    Validation.instanceOf(objective, Objective, 'objective');
    /** @private */
    this.objective = objective;

    if (documentTypes) {
      Validation.isArrayOfStrings(documentTypes, 'documentTypes');
      /** @private */
      this.documentTypes = documentTypes;
    }

    if (countryCodes) {
      Validation.isArrayOfStrings(countryCodes, 'countryCodes');
      /** @private */
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

export default RequiredSupplementaryDocument;
