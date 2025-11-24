import RequiredIdDocument = require('./required.id.document');
import DocumentFilter = require('./document.filter');
import Validation = require('../../../../yoti_common/validation');

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

export default RequiredIdDocumentBuilder;
