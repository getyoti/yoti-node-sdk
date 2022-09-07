'use strict';

const RequiredIdDocument = require('./required.id.document');
const DocumentFilter = require('./document.filter');
const Validation = require('../../../../yoti_common/validation');

class RequiredIdDocumentBuilder {
  /**
   * @param {DocumentFilter} filter
   *
   * @returns {this}
   */
  withFilter(filter) {
    Validation.instanceOf(filter, DocumentFilter, 'filter');
    this.filter = filter;
    return this;
  }

  /**
   * @returns {RequiredIdDocument}
   */
  build() {
    return new RequiredIdDocument(this.filter);
  }
}

module.exports = RequiredIdDocumentBuilder;
