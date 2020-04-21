const RequiredIdDocument = require('./required.id.document');
const RequiredDocumentFilter = require('./required.document.filter');
const Validation = require('../../../../yoti_common/validation');

class RequiredIdDocumentBuilder {
  /**
   * @param {RequiredDocumentFilter} filter
   *
   * @returns {this}
   */
  withFilter(filter) {
    Validation.instanceOf(filter, RequiredDocumentFilter, 'filter');
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
