'use strict';

const SdkConfig = require('./sdk.config');
const DocScanConstants = require('../../doc.scan.constants');
const Validation = require('../../../yoti_common/validation');

/**
 * Builder to assist in the creation of {@link SdkConfig}.
 *
 * @class SdkConfigBuilder
 */
class SdkConfigBuilder {
  /**
   * Sets the allowed capture method to camera only on the builder
   *
   * @returns {this}
   */
  withAllowsCamera() {
    return this.withAllowedCaptureMethods(DocScanConstants.CAMERA);
  }

  /**
   * Sets the allowed capture method to camera and upload on the builder
   *
   * @returns {this}
   */
  withAllowsCameraAndUpload() {
    return this.withAllowedCaptureMethods(DocScanConstants.CAMERA_AND_UPLOAD);
  }

  /**
   * Sets the allowed capture method to the specified value on the builder
   *
   * @param {string} allowedCaptureMethod the allowed capture method
   *
   * @returns {this}
   */
  withAllowedCaptureMethods(allowedCaptureMethods) {
    Validation.isString(allowedCaptureMethods, 'allowedCaptureMethods');
    this.allowedCaptureMethods = allowedCaptureMethods;
    return this;
  }

  /**
   * Sets the primary colour on the builder
   *
   * @param {string} primaryColour the primary colour
   *
   * @returns {this}
   */
  withPrimaryColour(primaryColour) {
    Validation.isString(primaryColour, 'primaryColour');
    this.primaryColour = primaryColour;
    return this;
  }

  /**
   * Sets the secondary colour on the builder
   *
   * @param {string} secondaryColour the secondary colour
   *
   * @returns {this}
   */
  withSecondaryColour(secondaryColour) {
    Validation.isString(secondaryColour, 'secondaryColour');
    this.secondaryColour = secondaryColour;
    return this;
  }

  /**
   * Sets the font colour on the builder
   *
   * @param {string} fontColour the font colour
   *
   * @returns {this}
   */
  withFontColour(fontColour) {
    Validation.isString(fontColour, 'fontColour');
    this.fontColour = fontColour;
    return this;
  }

  /**
   * Sets the locale on the builder
   *
   * @param {string} locale the locale
   *
   * @returns {this}
   */
  withLocale(locale) {
    Validation.isString(locale, 'locale');
    this.locale = locale;
    return this;
  }

  /**
   * Sets the preset issuing country on the builder
   *
   * @param {string} presetIssuingCountry the preset issuing country
   *
   * @returns {this}
   */
  withPresetIssuingCountry(presetIssuingCountry) {
    Validation.isString(presetIssuingCountry, 'presetIssuingCountry');
    this.presetIssuingCountry = presetIssuingCountry;
    return this;
  }

  /**
   * Sets the success URL on the builder
   *
   * @param {string} successUrl the success URL
   *
   * @returns {this}
   */
  withSuccessUrl(successUrl) {
    Validation.isString(successUrl, 'successUrl');
    this.successUrl = successUrl;
    return this;
  }

  /**
   * Sets the error URL on the builder
   *
   * @param {string} errorUrl the error URL
   *
   * @returns {this}
   */
  withErrorUrl(errorUrl) {
    Validation.isString(errorUrl, 'errorUrl');
    this.errorUrl = errorUrl;
    return this;
  }

  /**
   * Builds the {@link SdkConfig} using the values supplied to the builder
   *
   * @returns {SdkConfig}
   */
  build() {
    return new SdkConfig(
      this.allowedCaptureMethods,
      this.primaryColour,
      this.secondaryColour,
      this.fontColour,
      this.locale,
      this.presetIssuingCountry,
      this.successUrl,
      this.errorUrl
    );
  }
}

module.exports = SdkConfigBuilder;
