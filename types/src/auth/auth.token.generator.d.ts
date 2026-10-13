export = AuthTokenGenerator;
/**
 * Generates authentication tokens via OAuth2 client_credentials grant.
 *
 * @class AuthTokenGenerator
 */
declare class AuthTokenGenerator {
    /**
     * @param {string} sdkId
     * @param {string|Buffer} pem
     * @param {{authUrl?: string}} options
     */
    constructor(sdkId: string, pem: string | Buffer, { authUrl }?: {
        authUrl?: string;
    });
    /** @private */
    private sdkId;
    /** @private */
    private pem;
    /** @private */
    private authUrl;
    /**
     * Generate an authentication token with the given scopes.
     *
     * @param {string[]} scopes
     *
     * @returns {Promise<CreateAuthenticationTokenResponse>}
     */
    generate(scopes: string[]): Promise<CreateAuthenticationTokenResponse>;
    /**
     * @private
     * @returns {string}
     */
    private createAssertion;
}
import CreateAuthenticationTokenResponse = require("./create.authentication.token.response");
