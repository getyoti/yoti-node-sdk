export = SignedRequestStrategy;
/**
 * Signed request authentication strategy.
 *
 * @class SignedRequestStrategy
 */
declare class SignedRequestStrategy {
    /**
     * @param {string} pem
     */
    constructor(pem: string);
    /** @private */
    private pem;
    /**
     * @param {string} method
     * @param {string} endpointPath
     * @param {string} payloadBase64
     *
     * @returns {Object.<string, string>}
     */
    createAuthHeaders(method: string, endpointPath: string, payloadBase64: string): {
        [x: string]: string;
    };
    /**
     * @returns {Object.<string, string|number>}
     */
    createQueryParams(): {
        [x: string]: string | number;
    };
}
