'use strict';

const ResourceResponse = require('./resource.response');
const DocumentFieldsResponse = require('./document.fields.response');
const DocumentIdPhotoResponse = require('./document.id.photo.response');
const TextExtractionTaskResponse = require('./text.extraction.task.response');
const PageResponse = require('./page.response');
const Validation = require('../../../yoti_common/validation');

class IdDocumentResourceResponse extends ResourceResponse {
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

    if (resource.document_id_photo) {
      this.documentIdPhoto = new DocumentIdPhotoResponse(resource.document_id_photo);
    }
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
   * @returns {DocumentIdPhotoResponse}
   */
  getDocumentIdPhoto() {
    return this.documentIdPhoto;
  }

  /**
   * @returns {TextExtractionTaskResponse[]}
   */
  getTextExtractionTasks() {
    return this.getTasks().filter((task) => task instanceof TextExtractionTaskResponse);
  }
}

module.exports = IdDocumentResourceResponse;
