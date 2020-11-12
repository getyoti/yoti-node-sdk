'use strict';

const Validation = require('../../../yoti_common/validation');

class SdkConfig {
  /**
   * @param {string} allowedCaptureMethods
   *   The methods allowed for capturing document images
   * @param {string} primaryColour
   *   The primary colour
   * @param {string} secondaryColour
   *   The secondary colour
   * @param {string} fontColour
   *   The font colour
   * @param {string} locale
   *   The locale
   * @param {string} presetIssuingCountry
   *   The preset issuing country
   * @param {string} successUrl
   *   The success URL
   * @param {string} errorUrl
   *   The error URL
   * @param {string} privacyPolicyUrl
   *   The privacy policy URL
   */
  constructor(
    allowedCaptureMethods,
    primaryColour,
    secondaryColour,
    fontColour,
    locale,
    presetIssuingCountry,
    successUrl,
    errorUrl,
    privacyPolicyUrl
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

    Validation.isString(privacyPolicyUrl, 'privacyPolicyUrl', true);
    this.privacyPolicyUrl = privacyPolicyUrl;
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
      privacy_policy_url: this.privacyPolicyUrl,
    };
  }
}

module.exports = SdkConfig;
