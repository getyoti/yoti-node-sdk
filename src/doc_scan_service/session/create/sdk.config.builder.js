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
   * Sets the allowed capture method to "CAMERA"
   *
   * @returns {this}
   */
  withAllowsCamera() {
    return this.withAllowedCaptureMethods(DocScanConstants.CAMERA);
  }

  /**
   * Sets the allowed capture method to "CAMERA_AND_UPLOAD"
   *
   * @returns {this}
   */
  withAllowsCameraAndUpload() {
    return this.withAllowedCaptureMethods(DocScanConstants.CAMERA_AND_UPLOAD);
  }

  /**
   * Sets the allowed capture method
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
   * Sets the primary colour to be used by the web/native client
   *
   * @param {string} primaryColour
   *   The primary colour, hexadecimal value e.g. #ff0000
   *
   * @returns {this}
   */
  withPrimaryColour(primaryColour) {
    Validation.isString(primaryColour, 'primaryColour');
    this.primaryColour = primaryColour;
    return this;
  }

  /**
   * Sets the secondary colour to be used by the web/native client (used on the button)
   *
   * @param {string} secondaryColour
   *   The secondary colour, hexadecimal value e.g. #ff0000
   *
   * @returns {this}
   */
  withSecondaryColour(secondaryColour) {
    Validation.isString(secondaryColour, 'secondaryColour');
    this.secondaryColour = secondaryColour;
    return this;
  }

  /**
   * Sets the font colour to be used by the web/native client (used on the button)
   *
   * @param {string} fontColour
   *   The font colour
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
   * @param {string} locale
   *   The locale, e.g. "en"
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
   * Sets the success URL for the redirect that follows the web/native client
   * uploading documents successfully
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
   * Sets the error URL for the redirect that follows the web/native client
   * uploading documents unsuccessfully
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
   * Sets the privacy policy URL
   *
   * @param {string} privacyPolicyUrl the privacy policy URL
   *
   * @returns {this}
   */
  withPrivacyPolicyUrl(privacyPolicyUrl) {
    Validation.isString(privacyPolicyUrl, 'privacyPolicyUrl');
    this.privacyPolicyUrl = privacyPolicyUrl;
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
      this.errorUrl,
      this.privacyPolicyUrl
    );
  }
}

module.exports = SdkConfigBuilder;
