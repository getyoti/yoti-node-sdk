'use strict';

const MediaResponse = require('./media.response');
const Validation = require('../../../yoti_common/validation');

class PageInfo {
  constructor(pages) {
    Validation.isString(pages.capture_method, 'capture_method', true);
    this.captureMethod = pages.capture_method;

    if (pages.media) {
      this.media = new MediaResponse(pages.media);
    }
  }

  getCaptureMethod() {
    return this.captureMethod;
  }

  getMedia() {
    return this.media;
  }
}

module.exports = PageInfo;
