const RequiredIdentityDocument = require('./required.identity.document');
const RequiredDocumentBuilder = require('./required.document.builder');

class RequiredIdentityDocumentBuilder extends RequiredDocumentBuilder {
  build() {
    return new RequiredIdentityDocument(this.filter);
  }
}

module.exports = RequiredIdentityDocumentBuilder;
