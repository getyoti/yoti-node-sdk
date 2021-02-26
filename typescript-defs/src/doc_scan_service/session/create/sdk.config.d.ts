export = SdkConfig;
declare class SdkConfig {
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
    constructor(allowedCaptureMethods: string, primaryColour: string, secondaryColour: string, fontColour: string, locale: string, presetIssuingCountry: string, successUrl: string, errorUrl: string, privacyPolicyUrl: string);
    allowedCaptureMethods: string;
    primaryColour: string;
    secondaryColour: string;
    fontColour: string;
    locale: string;
    presetIssuingCountry: string;
    successUrl: string;
    errorUrl: string;
    privacyPolicyUrl: string;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
