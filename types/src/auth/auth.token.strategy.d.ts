export = AuthTokenStrategy;
/**
 * Bearer token authentication strategy.
 *
 * @class AuthTokenStrategy
 */
declare class AuthTokenStrategy {
    /**
     * @param {string} token
     */
    constructor(token: string);
    /** @private */
    private token;
    createAuthHeaders(): {
        Authorization: string;
    };
    createQueryParams(): {};
}
