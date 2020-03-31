const RequiredDocument = require('./required.document');
const DocScanConstants = require('../../../doc.scan.constants');

class RequiredIdentityDocument extends RequiredDocument {
  constructor(filter) {
    super(DocScanConstants.ID_DOCUMENT, filter);
  }
}

module.exports = RequiredIdentityDocument;
