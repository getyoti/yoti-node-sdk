'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 *
 * @class CreateSessionOverviewPdfPayload
 */
class CreateSessionOverviewPdfPayload {
  /**
   * @param {boolean} [includeImages]
   * @param {boolean} [includeExtractedText]
   * @param {boolean} [includeDeviceTracking]
   */
  constructor(includeImages, includeExtractedText, includeDeviceTracking) {
    Validation.isBoolean(includeImages, 'includeImages', true);
    /** @private */
    this.includeImages = includeImages;

    Validation.isBoolean(includeExtractedText, 'includeExtractedText', true);
    /** @private */
    this.includeExtractedText = includeExtractedText;

    Validation.isBoolean(includeDeviceTracking, 'includeDeviceTracking', true);
    /** @private */
    this.includeDeviceTracking = includeDeviceTracking;
  }

  /**
   * Returns serialized data for JSON.stringify()
   */
  toJSON() {
    return {
      options: {
        include_images: this.includeImages,
        include_extracted_text: this.includeExtractedText,
        include_device_tracking: this.includeDeviceTracking,
      },
    };
  }
}

module.exports = CreateSessionOverviewPdfPayload;
