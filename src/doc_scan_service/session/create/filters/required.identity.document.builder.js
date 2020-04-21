const RequiredIdentityDocument = require('./required.identity.document');
const RequiredDocumentFilter = require('./required.document.filter');
const Validation = require('../../../../yoti_common/validation');

class RequiredIdentityDocumentBuilder {
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
   * @returns {RequiredIdentityDocument}
   */
  build() {
    return new RequiredIdentityDocument(this.filter);
  }
}

module.exports = RequiredIdentityDocumentBuilder;
