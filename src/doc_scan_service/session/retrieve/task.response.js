'use strict';

const Validation = require('../../../yoti_common/validation');
const GeneratedCheckResponse = require('./generated.check.response');
const GeneratedTextDataCheckResponse = require('./generated.text.data.check.response');
const GeneratedSupplementaryDocumentTextDataCheckResponse = require('./generated.supplementary.document.text.data.check.response');
const GeneratedMedia = require('./generated.media');
const DocScanConstants = require('../../doc.scan.constants');
const { YotiDate } = require('../../../data_type/date');

class TaskResponse {
  constructor(task) {
    Validation.isString(task.type, 'type', true);
    this.type = task.type;

    Validation.isString(task.id, 'id', true);
    this.id = task.id;

    Validation.isString(task.state, 'state', true);
    this.state = task.state;

    if (task.created) {
      Validation.isString(task.created, 'created');
      this.created = YotiDate.fromDateString(task.created);
    }

    if (task.last_updated) {
      Validation.isString(task.last_updated, 'last_updated');
      this.lastUpdated = YotiDate.fromDateString(task.last_updated);
    }

    if (task.generated_checks) {
      Validation.isArray(task.generated_checks, 'generated_checks');
      this.generatedChecks = task.generated_checks
        .map((check) => {
          switch (check.type) {
            case DocScanConstants.ID_DOCUMENT_TEXT_DATA_CHECK:
              return new GeneratedTextDataCheckResponse(check);
            case DocScanConstants.SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK:
              return new GeneratedSupplementaryDocumentTextDataCheckResponse(check);
            default:
              return new GeneratedCheckResponse(check);
          }
        });
    } else {
      this.generatedChecks = [];
    }

    if (task.generated_media) {
      Validation.isArray(task.generated_media, 'generated_media');
      this.generatedMedia = task.generated_media.map((media) => new GeneratedMedia(media));
    } else {
      this.generatedMedia = [];
    }
  }

  /**
   * @returns {string}
   */
  getType() {
    return this.type;
  }

  /**
   * @returns {string}
   */
  getId() {
    return this.id;
  }

  /**
   * @returns {string}
   */
  getState() {
    return this.state;
  }

  /**
   * @returns {YotiDate}
   */
  getCreated() {
    return this.created;
  }

  /**
   * @returns {YotiDate}
   */
  getLastUpdated() {
    return this.lastUpdated;
  }

  /**
   * @returns {GeneratedCheckResponse[]}
   */
  getGeneratedChecks() {
    return this.generatedChecks;
  }

  /**
   * @deprecated this method is now implemented on subclasses.
   *
   * @returns {GeneratedTextDataCheckResponse[]}
   */
  getGeneratedTextDataChecks() {
    return this
      .getGeneratedChecks()
      .filter((check) => check instanceof GeneratedTextDataCheckResponse);
  }

  /**
   * @returns {GeneratedMedia[]}
   */
  getGeneratedMedia() {
    return this.generatedMedia;
  }
}

module.exports = TaskResponse;
