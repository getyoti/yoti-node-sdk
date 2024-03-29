/**
 * Represents a HTTP request message.
 *
 * @class YotiRequest
 */
export class YotiRequest {
    constructor(method: any, url: any, headers: any, payload?: any);
    /** @private */
    private method;
    /** @private */
    private payload;
    /** @private */
    private url;
    /** @private */
    private headers;
    /**
     * @returns {string}
     */
    getMethod(): string;
    /**
     * @returns {string}
     */
    getUrl(): string;
    /**
     * @returns {import('./payload').Payload|null}
     */
    getPayload(): import('./payload').Payload | null;
    /**
     * @returns {Object.<string, string>}
     */
    getHeaders(): {
        [x: string]: string;
    };
    /**
     * Executes the request.
     *
     * @param {boolean} buffer Return the response as a Buffer.
     *
     * @returns {Promise} Resolves {YotiResponse}
     */
    execute(buffer?: boolean): Promise<any>;
}
