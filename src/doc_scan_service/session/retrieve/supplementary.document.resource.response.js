'use strict';

const FileResponse = require('./file.response');
const SupplementaryDocumentTextExtractionTaskResponse = require('./supplementary.document.text.extraction.task.response');
const ResourceResponse = require('./resource.response');
const PageResponse = require('./page.response');
const DocumentFieldsResponse = require('./document.fields.response');
const Validation = require('../../../yoti_common/validation');

class SupplementaryDocumentResourceResponse extends ResourceResponse {
  constructor(resource) {
    super(resource);

    Validation.isString(resource.document_type, 'document_type', true);
    this.documentType = resource.document_type;

    Validation.isString(resource.issuing_country, 'issuing_country', true);
    this.issuingCountry = resource.issuing_country;

    if (resource.pages) {
      Validation.isArray(resource.pages, 'pages');
      this.pages = resource.pages.map((page) => new PageResponse(page));
    } else {
      this.pages = [];
    }

    if (resource.document_fields) {
      this.documentFields = new DocumentFieldsResponse(resource.document_fields);
    }

    if (resource.file) {
      this.file = new FileResponse(resource.file);
    }
  }

  /**
   * @returns {SupplementaryDocumentTextExtractionTaskResponse[]}
   */
  getTextExtractionTasks() {
    return this
      .getTasks()
      .filter((task) => task instanceof SupplementaryDocumentTextExtractionTaskResponse);
  }

  /**
   * @returns {string}
   */
  getDocumentType() {
    return this.documentType;
  }

  /**
   * @returns {string}
   */
  getIssuingCountry() {
    return this.issuingCountry;
  }

  /**
   * @returns {PageResponse[]}
   */
  getPages() {
    return this.pages;
  }

  /**
   * @returns {DocumentFieldsResponse}
   */
  getDocumentFields() {
    return this.documentFields;
  }

  /**
   * @returns {FileResponse}
   */
  getDocumentFile() {
    return this.file;
  }
}

module.exports = SupplementaryDocumentResourceResponse;
