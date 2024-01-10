'use strict';

const ReportResponse = require('./report.response');
const GeneratedMedia = require('./generated.media');
const Validation = require('../../../yoti_common/validation');
const { YotiDate } = require('../../../data_type/date');

class CheckResponse {
  constructor(check) {
    Validation.isString(check.type, 'type', true);
    /** @private */
    this.type = check.type;

    Validation.isString(check.id, 'id', true);
    /** @private */
    this.id = check.id;

    Validation.isString(check.state, 'state', true);
    /** @private */
    this.state = check.state;

    if (check.resources_used) {
      Validation.isArrayOfStrings(check.resources_used, 'resources_used');
      /** @private */
      this.resourcesUsed = check.resources_used;
    } else {
      /** @private */
      this.resourcesUsed = [];
    }

    if (check.generated_media) {
      Validation.isArray(check.generated_media, 'generated_media');
      /** @private */
      this.generatedMedia = check.generated_media.map((media) => new GeneratedMedia(media));
    } else {
      /** @private */
      this.generatedMedia = [];
    }

    if (check.report) {
      /** @protected */
      this.report = new ReportResponse(check.report);
    }

    if (check.created) {
      Validation.isString(check.created, 'created');
      /** @private */
      this.created = YotiDate.fromDateString(check.created);
    }

    if (check.last_updated) {
      Validation.isString(check.last_updated, 'last_updated');
      /** @private */
      this.lastUpdated = YotiDate.fromDateString(check.last_updated);
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
   * @returns {string[]}
   */
  getResourcesUsed() {
    return this.resourcesUsed;
  }

  /**
   * @returns {GeneratedMedia[]}
   */
  getGeneratedMedia() {
    return this.generatedMedia;
  }

  /**
   * @returns {ReportResponse}
   */
  getReport() {
    return this.report;
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
}

module.exports = CheckResponse;
