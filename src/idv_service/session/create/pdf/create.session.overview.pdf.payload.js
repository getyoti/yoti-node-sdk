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
  constructor(includeImages = false, includeExtractedText = false, includeDeviceTracking = false) {
    Validation.isBoolean(includeImages, 'includeImages');
    /** @private */
    this.includeImages = includeImages;

    Validation.isBoolean(includeExtractedText, 'includeExtractedText');
    /** @private */
    this.includeExtractedText = includeExtractedText;

    Validation.isBoolean(includeDeviceTracking, 'includeDeviceTracking');
    /** @private */
    this.includeDeviceTracking = includeDeviceTracking;
  }

  /**
   * Returns serialized data for JSON.stringify()
   */
  toJSON() {
    return {
      include_images: this.includeImages,
      include_extracted_text: this.includeExtractedText,
      include_device_tracking: this.includeDeviceTracking,
    };
  }
}

module.exports = CreateSessionOverviewPdfPayload;
