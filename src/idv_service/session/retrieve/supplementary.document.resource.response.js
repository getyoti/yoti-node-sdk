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
    /** @private */
    this.documentType = resource.document_type;

    Validation.isString(resource.issuing_country, 'issuing_country', true);
    /** @private */
    this.issuingCountry = resource.issuing_country;

    if (resource.pages) {
      Validation.isArray(resource.pages, 'pages');
      /** @private */
      this.pages = resource.pages.map((page) => new PageResponse(page));
    } else {
      /** @private */
      this.pages = [];
    }

    if (resource.document_fields) {
      /** @private */
      this.documentFields = new DocumentFieldsResponse(resource.document_fields);
    }

    if (resource.file) {
      /** @private */
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
