const Validation = require('../../../../../yoti_common/validation');
const RequiredDocumentFilter = require('../required.document.filter');
const DocumentRestriction = require('./document.restriction');
const DocScanConstants = require('../../../../doc.scan.constants');

class DocumentRestrictionsFilter extends RequiredDocumentFilter {
  constructor(inclusion, documents) {
    super(DocScanConstants.DOCUMENT_RESTRICTIONS);

    Validation.isString(inclusion, 'inclusion');
    this.inclusion = inclusion;

    Validation.isArrayOfType(documents, DocumentRestriction, 'documents');
    this.documents = documents;
  }

  toJSON() {
    const json = super.toJSON();

    json.inclusion = this.inclusion;
    json.documents = this.documents;

    return json;
  }
}

module.exports = DocumentRestrictionsFilter;
