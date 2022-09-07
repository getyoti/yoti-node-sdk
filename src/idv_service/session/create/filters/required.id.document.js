'use strict';

const RequiredDocument = require('./required.document');
const DocumentFilter = require('./document.filter');
const IDVConstants = require('../../../idv.constants');
const Validation = require('../../../../yoti_common/validation');

class RequiredIdDocument extends RequiredDocument {
  /**
   * @param {DocumentFilter} filter
   */
  constructor(filter) {
    super(IDVConstants.ID_DOCUMENT);

    if (filter) {
      Validation.instanceOf(filter, DocumentFilter, 'filter');
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
