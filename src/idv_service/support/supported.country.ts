import Validation = require('../../yoti_common/validation');
import SupportedDocument = require('./supported.document');

class SupportedCountry {
  private code?: string;
  private supportedDocuments: any[];

  constructor(country: any) {
    Validation.isString(country.code, 'code', true);
    this.code = country.code;

    if (country.supported_documents) {
      this.supportedDocuments = country.supported_documents
        .map((document: any) => new (SupportedDocument as any)(document));
    } else {
      this.supportedDocuments = [];
    }
  }

  getCode() {
    return this.code;
  }

  getSupportedDocuments() {
    return this.supportedDocuments;
  }
}

export default SupportedCountry;
