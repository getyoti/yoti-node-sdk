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
     * @param {string} biometricConsentFlow
     *   Specifies the biometric consent in flow
     * @param {boolean} allowHandoff
     *   Allows user to handoff to mobile during session
     * @param {object} attemptsConfiguration
     *   The attempts configuration
     * @param {string} brandId
     *   The brandID for the client
     * @param {string[]} suppressedScreens
     *   The list of suppressed screens
     */
    constructor(allowedCaptureMethods: string, primaryColour: string, secondaryColour: string, fontColour: string, locale: string, presetIssuingCountry: string, successUrl: string, errorUrl: string, privacyPolicyUrl: string, biometricConsentFlow: string, allowHandoff: boolean, attemptsConfiguration: object, brandId: string, suppressedScreens: string[]);
    /** @private */
    private allowedCaptureMethods;
    /** @private */
    private primaryColour;
    /** @private */
    private secondaryColour;
    /** @private */
    private fontColour;
    /** @private */
    private locale;
    /** @private */
    private presetIssuingCountry;
    /** @private */
    private successUrl;
    /** @private */
    private errorUrl;
    /** @private */
    private privacyPolicyUrl;
    /** @private */
    private biometricConsentFlow;
    /** @private */
    private allowHandoff;
    /** @private */
    private attemptsConfiguration;
    /** @private */
    private brandId;
    /** @private */
    private suppressedScreens;
    /**
     * Returns serialized data for JSON.stringify()
     */
    toJSON(): {
        allowed_capture_methods: string;
        primary_colour: string;
        secondary_colour: string;
        font_colour: string;
        locale: string;
        preset_issuing_country: string;
        success_url: string;
        error_url: string;
        privacy_policy_url: string;
        biometric_consent_flow: string;
        allow_handoff: boolean;
        attempts_configuration: any;
        brand_id: string;
        suppressed_screens: string[];
    };
}
