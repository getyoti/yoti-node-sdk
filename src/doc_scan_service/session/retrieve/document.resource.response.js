'use strict';

const ResourceResponse = require('./resource.response');
const DocumentFieldsResponse = require('./document.fields.response');
const PageInfo = require('./page.info');
const Validation = require('../../../yoti_common/validation');

class DocumentResourceResponse extends ResourceResponse {
  constructor(resource) {
    super(resource);

    Validation.isString(resource.document_type, 'document_type', true);
    this.documentType = resource.document_type;

    Validation.isString(resource.issuing_country, 'issuing_country', true);
    this.issuingCountry = resource.issuing_country;

    if (resource.pages) {
      Validation.isArray(resource.pages, 'pages');
      this.pages = resource.pages.map(page => new PageInfo(page));
    }

    if (resource.document_fields) {
      this.documentFields = new DocumentFieldsResponse(resource.document_fields);
    }
  }

  getDocumentType() {
    return this.documentType;
  }

  getIssuingCountry() {
    return this.issuingCountry;
  }

  getPages() {
    return this.pages;
  }

  getDocumentFields() {
    return this.documentFields;
  }
}

module.exports = DocumentResourceResponse;
