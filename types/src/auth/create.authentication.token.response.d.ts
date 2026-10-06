export = CreateAuthenticationTokenResponse;
/**
 * Response from the authentication token endpoint.
 *
 * @class CreateAuthenticationTokenResponse
 */
declare class CreateAuthenticationTokenResponse {
    /**
     * @param {Object} response
     * @param {string} response.access_token
     * @param {string} response.token_type
     * @param {number} response.expires_in
     * @param {string} response.scope
     */
    constructor(response: {
        access_token: string;
        token_type: string;
        expires_in: number;
        scope: string;
    });
    /** @private */
    private accessToken;
    /** @private */
    private tokenType;
    /** @private */
    private expiresIn;
    /** @private */
    private scope;
    /**
     * @returns {string}
     */
    getAccessToken(): string;
    /**
     * @returns {string}
     */
    getTokenType(): string;
    /**
     * @returns {number}
     */
    getExpiresIn(): number;
    /**
     * @returns {string}
     */
    getScope(): string;
}
