'use strict';

const ResourceResponse = require('./resource.response');
const DocumentFieldsResponse = require('./document.fields.response');
const DocumentIdPhotoResponse = require('./document.id.photo.response');
const TextExtractionTaskResponse = require('./text.extraction.task.response');
const ExpandedDocumentFieldsResponse = require('./expanded.document.fields.response');
const PageResponse = require('./page.response');
const Validation = require('../../../yoti_common/validation');

class IdDocumentResourceResponse extends ResourceResponse {
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

    if (resource.document_id_photo) {
      /** @private */
      this.documentIdPhoto = new DocumentIdPhotoResponse(resource.document_id_photo);
    }

    if (resource.expanded_document_fields) {
      /** @private */
      this.expandedDocumentFields = new ExpandedDocumentFieldsResponse(
        resource.expanded_document_fields
      );
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
   * @returns {ExpandedDocumentFieldsResponse}
   */
  getExpandedDocumentFields() {
    return this.expandedDocumentFields;
  }

  /**
   * @returns {TextExtractionTaskResponse[]}
   */
  getTextExtractionTasks() {
    return this.getTasks().filter((task) => task instanceof TextExtractionTaskResponse);
  }
}

module.exports = IdDocumentResourceResponse;
