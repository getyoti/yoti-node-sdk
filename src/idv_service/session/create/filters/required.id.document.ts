import RequiredDocument = require('./required.document');
import DocumentFilter = require('./document.filter');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');

class RequiredIdDocument extends RequiredDocument {
  /**
   * @param {DocumentFilter} filter
   */
  constructor(filter) {
    super(IDVConstants.ID_DOCUMENT);

    if (filter) {
      Validation.instanceOf(filter, DocumentFilter, 'filter');
      /** @private */
      this.filter = filter;
    }
  }

  toJSON() {
    const json = super.toJSON();
    json.filter = this.filter;
    return json;
  }
}

export default RequiredIdDocument;
