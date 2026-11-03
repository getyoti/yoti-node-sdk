'use strict';

const CreateSessionOverviewPdfPayload = require('./create.session.overview.pdf.payload');
const Validation = require('../../../../yoti_common/validation');

/**
 *
 * @class CreateSessionOverviewPdfPayloadBuilder
 */
class CreateSessionOverviewPdfPayloadBuilder {
  /**
   * Sets the flag to include images or not
   *
   * @param {boolean} includeImages
   * @return CreateSessionOverviewPdfPayloadBuilder
   */
  withIncludeImages(includeImages) {
    Validation.isBoolean(includeImages, 'includeImages');
    /** @private */
    this.includeImages = includeImages;
    return this;
  }

  /**
   * Sets the flag to include extracted text or not
   *
   * @param {boolean} includeExtractedText
   * @return CreateSessionOverviewPdfPayloadBuilder
   */
  withIncludeExtractedText(includeExtractedText) {
    Validation.isBoolean(includeExtractedText, 'includeExtractedText');
    /** @private */
    this.includeExtractedText = includeExtractedText;
    return this;
  }

  /**
   * Sets the flag to include device tracking or not
   *
   * @param {boolean} includeDeviceTracking
   * @return CreateSessionOverviewPdfPayloadBuilder
   */
  withIncludeDeviceTracking(includeDeviceTracking) {
    Validation.isBoolean(includeDeviceTracking, 'includeDeviceTracking');
    /** @private */
    this.includeDeviceTracking = includeDeviceTracking;
    return this;
  }

  build() {
    return new CreateSessionOverviewPdfPayload(this.includeImages, this.includeExtractedText, this.includeDeviceTracking);
  }
}

module.exports = CreateSessionOverviewPdfPayloadBuilder;
