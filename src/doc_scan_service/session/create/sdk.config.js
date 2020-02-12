'use strict';

const Validation = require('../../../yoti_common/validation');

class SdkConfig {
  /**
   * @param {string} allowedCaptureMethods
   *   The allowed capture methods from the SDK configuration
   * @param {string} primaryColour
   *   The primary colour from the SDK configuration
   * @param {string} secondaryColour
   *   The secondary colour from the SDK configuration
   * @param {string} fontColour
   *   The font colour from the SDK configuration
   * @param {string} locale
   *   The locale from the SDK configuration
   * @param {string} presetIssuingCountry
   *   The preset issuing country from the SDK configuration
   * @param {string} successUrl
   *   The success URL from the SDK configuration
   * @param {string} errorUrl
   *   The error URL from the SDK configuration
   */
  constructor(
    allowedCaptureMethods,
    primaryColour,
    secondaryColour,
    fontColour,
    locale,
    presetIssuingCountry,
    successUrl,
    errorUrl
  ) {
    Validation.isString(allowedCaptureMethods, 'allowedCaptureMethods', true);
    this.allowedCaptureMethods = allowedCaptureMethods;

    Validation.isString(primaryColour, 'primaryColour', true);
    this.primaryColour = primaryColour;

    Validation.isString(secondaryColour, 'secondaryColour', true);
    this.secondaryColour = secondaryColour;

    Validation.isString(fontColour, 'fontColour', true);
    this.fontColour = fontColour;

    Validation.isString(locale, 'locale', true);
    this.locale = locale;

    Validation.isString(presetIssuingCountry, 'presetIssuingCountry', true);
    this.presetIssuingCountry = presetIssuingCountry;

    Validation.isString(successUrl, 'successUrl', true);
    this.successUrl = successUrl;

    Validation.isString(errorUrl, 'errorUrl', true);
    this.errorUrl = errorUrl;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      allowed_capture_methods: this.allowedCaptureMethods,
      primary_colour: this.primaryColour,
      secondary_colour: this.secondaryColour,
      font_colour: this.fontColour,
      locale: this.locale,
      preset_issuing_country: this.presetIssuingCountry,
      success_url: this.successUrl,
      error_url: this.errorUrl,
    };
  }
}

module.exports = SdkConfig;
