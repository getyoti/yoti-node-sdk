'use strict';

const FrameResponse = require('./frame.response');
const MediaResponse = require('./media.response');
const Validation = require('../../../yoti_common/validation');

class PageResponse {
  constructor(page) {
    Validation.isString(page.capture_method, 'capture_method', true);
    this.captureMethod = page.capture_method;

    if (page.media) {
      this.media = new MediaResponse(page.media);
    }

    if (page.frames) {
      Validation.isArray(page.frames, 'frames');
      this.frames = page.frames.map((frame) => new FrameResponse(frame));
    } else {
      this.frames = [];
    }
  }

  /**
   * @returns {string}
   */
  getCaptureMethod() {
    return this.captureMethod;
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }

  /**
   * @returns {FrameResponse[]}
   */
  getFrames() {
    return this.frames;
  }
}

module.exports = PageResponse;
