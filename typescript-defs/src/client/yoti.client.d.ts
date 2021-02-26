export = YotiClient;
/**
 * @class YotiClient
 */
declare class YotiClient {
    /**
     * @param {string} sdkId
     * @param {string} pem
     */
    constructor(sdkId: string, pem: string);
    sdkId: string;
    pem: string;
    /** @deprecated replaced by this.sdkId */
    applicationId: string;
    /**
     * Get the activity details for a token. Amongst others contains the user profile with
     * the user's attributes you have selected in your application configuration.
     *
     * Note: encrypted tokens should only be used once. You should not invoke this method
     * multiple times with the same token.
     *
     * @param {string} encryptedConnectToken
     *   Encrypted Yoti token (can be only decrypted with your application's private key).
     *   Note that this token must only be used once.
     *
     * @returns {Promise} Resolving ActivityDetails instance holding the user's attributes
     */
    getActivityDetails(encryptedConnectToken: string): Promise<any>;
    /**
     * Request an AML check for the given profile.
     *
     * @param amlProfile
     *   Details of the profile to search for when performing the AML check
     *
     * @returns {Promise} resolving AmlResult with the results of the check
     */
    performAmlCheck(amlProfile: any): Promise<any>;
    /**
     * Given a dynamic scenario, get a custom QR code denoted by the dynamic policy
     * provided in the request.
     *
     * @param {DynamicScenario} dynamicScenario - defines the wanted attribute list
     *
     * @returns {Promise} containing a ShareUrlResult
     */
    createShareUrl(dynamicScenario: any): Promise<any>;
}
