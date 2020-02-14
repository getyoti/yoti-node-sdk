'use strict';

const Validation = require('../../../yoti_common/validation');
const GeneratedTextDataCheckResponse = require('./generated.text.data.check.response');
const GeneratedMedia = require('./generated.media');
const DocScanConstants = require('../../doc.scan.constants');

class TaskResponse {
  constructor(task) {
    if (new.target === TaskResponse) {
      throw TypeError(`${new.target.name} cannot be instantiated`);
    }

    Validation.isString(task.id, 'id', true);
    this.id = task.id;

    Validation.isString(task.state, 'state', true);
    this.state = task.state;

    Validation.isString(task.created, 'created', true);
    this.created = task.created;

    Validation.isString(task.last_updated, 'last_updated', true);
    this.lastUpdated = task.last_updated;

    if (task.generated_checks) {
      Validation.isArray(task.generated_checks, 'generated_checks');
      this.generatedChecks = task.generated_checks
        .map((check) => {
          switch (check.type) {
            case DocScanConstants.ID_DOCUMENT_TEXT_DATA_CHECK:
              return new GeneratedTextDataCheckResponse(check);
            default:
              return null;
          }
        })
        .filter(check => check !== null);
    }

    if (task.generated_media) {
      Validation.isArray(task.generated_media, 'generated_media');
      this.generatedMedia = task.generated_media.map(media => new GeneratedMedia(media));
    }
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
   * @returns {string}
   */
  getCreated() {
    return this.created;
  }

  /**
   * @returns {string}
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
   * @returns {GeneratedMedia[]}
   */
  getGeneratedMedia() {
    return this.generatedMedia;
  }
}

module.exports = TaskResponse;
