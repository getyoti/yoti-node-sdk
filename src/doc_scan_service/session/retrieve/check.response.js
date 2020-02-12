'use strict';

const ReportResponse = require('./report.response');
const GeneratedMedia = require('./generated.media');
const Validation = require('../../../yoti_common/validation');

class CheckResponse {
  constructor(check) {
    if (new.target === CheckResponse) {
      throw TypeError(`${new.target.name} cannot be instantiated`);
    }

    Validation.isString(check.id, 'id', true);
    this.id = check.id;

    Validation.isString(check.state, 'state', true);
    this.state = check.state;

    if (check.resources_used) {
      Validation.isArrayOfStrings(check.resources_used, 'resources_used');
      this.resourcesUsed = check.resources_used;
    }

    if (check.generated_media) {
      Validation.isArray(check.generated_media, 'generated_media');
      this.generatedMedia = check.generated_media.map(media => new GeneratedMedia(media));
    }

    if (check.report) {
      this.report = new ReportResponse(check.report);
    }

    Validation.isString(check.created, 'created', true);
    this.created = check.created;

    Validation.isString(check.last_updated, 'last_updated', true);
    this.lastUpdated = check.last_updated;
  }

  getId() {
    return this.id;
  }

  getState() {
    return this.state;
  }

  getResourcesUsed() {
    return this.resourcesUsed;
  }

  getGeneratedMedia() {
    return this.generatedMedia;
  }

  getReport() {
    return this.report;
  }

  getCreated() {
    return this.created;
  }

  getLastUpdated() {
    return this.lastUpdated;
  }
}

module.exports = CheckResponse;
