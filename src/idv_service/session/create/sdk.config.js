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
   * @param {string} biometricConsentFlow
   *   Specifies the biometric consent in flow
   * @param {boolean} allowHandoff
   *   Allows user to handoff to mobile during session
   * @param {object} attemptsConfiguration
   *   The attempts configuration
   * @param {string} brandId
   *   The brandID for the client
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
    privacyPolicyUrl,
    biometricConsentFlow,
    allowHandoff,
    attemptsConfiguration,
    brandId
  ) {
    Validation.isString(allowedCaptureMethods, 'allowedCaptureMethods', true);
    /** @private */
    this.allowedCaptureMethods = allowedCaptureMethods;

    Validation.isString(primaryColour, 'primaryColour', true);
    /** @private */
    this.primaryColour = primaryColour;

    Validation.isString(secondaryColour, 'secondaryColour', true);
    /** @private */
    this.secondaryColour = secondaryColour;

    Validation.isString(fontColour, 'fontColour', true);
    /** @private */
    this.fontColour = fontColour;

    Validation.isString(locale, 'locale', true);
    /** @private */
    this.locale = locale;

    Validation.isString(presetIssuingCountry, 'presetIssuingCountry', true);
    /** @private */
    this.presetIssuingCountry = presetIssuingCountry;

    Validation.isString(successUrl, 'successUrl', true);
    /** @private */
    this.successUrl = successUrl;

    Validation.isString(errorUrl, 'errorUrl', true);
    /** @private */
    this.errorUrl = errorUrl;

    Validation.isString(privacyPolicyUrl, 'privacyPolicyUrl', true);
    /** @private */
    this.privacyPolicyUrl = privacyPolicyUrl;

    Validation.isString(biometricConsentFlow, 'biometricConsentFlow', true);
    /** @private */
    this.biometricConsentFlow = biometricConsentFlow;

    Validation.isBoolean(allowHandoff, 'allowHandoff', true);
    /** @private */
    this.allowHandoff = allowHandoff;

    if (attemptsConfiguration) {
      Validation.isPlainObject(attemptsConfiguration, 'attemptsConfiguration');
      /** @private */
      this.attemptsConfiguration = attemptsConfiguration;
    }

    Validation.isString(brandId, 'brandId', true);
    /** @private */
    this.brandId = brandId;
  }

  /**
   * Returns serialized data for JSON.stringify()
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
      biometric_consent_flow: this.biometricConsentFlow,
      allow_handoff: this.allowHandoff,
      attempts_configuration: this.attemptsConfiguration,
      brand_id: this.brandId,
    };
  }
}

module.exports = SdkConfig;
