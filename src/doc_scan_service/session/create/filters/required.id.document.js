const RequiredDocument = require('./required.document');
const RequiredDocumentFilter = require('./required.document.filter');
const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');

class RequiredIdDocument extends RequiredDocument {
  /**
   * @param {RequiredDocumentFilter} filter
   */
  constructor(filter) {
    super(DocScanConstants.ID_DOCUMENT);

    if (filter) {
      Validation.instanceOf(filter, RequiredDocumentFilter, 'filter');
      this.filter = filter;
    }
  }

  toJSON() {
    const json = super.toJSON();
    json.filter = this.filter;
    return json;
  }
}

module.exports = RequiredIdDocument;
