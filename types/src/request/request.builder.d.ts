/**
 * Builds a request.
 *
 * @class RequestBuilder
 */
export class RequestBuilder {
    /** @private */
    private headers;
    /** @private */
    private queryParams;
    /**
     * @param {string} baseUrl Base URL without trailing slashes.
     *
     * @returns {RequestBuilder}
     */
    withBaseUrl(baseUrl: string): RequestBuilder;
    baseUrl: string;
    /**
     * @param {string} endpoint Endpoint with a single leading slash.
     *
     * @returns {RequestBuilder}
     */
    withEndpoint(endpoint: string): RequestBuilder;
    endpoint: string;
    /**
     * @param {string} pem
     *
     * @returns {RequestBuilder}
     */
    withPemString(pem: string): RequestBuilder;
    pem: string;
    /**
     * @param {string} filePath
     *
     * @returns {RequestBuilder}
     */
    withPemFilePath(filePath: string): RequestBuilder;
    /**
     * @param {string} name
     * @param {string} value
     *
     * @returns {RequestBuilder}
     */
    withHeader(name: string, value: string): RequestBuilder;
    /**
     * @param {string} method
     *
     * @returns {RequestBuilder}
     */
    withMethod(method: string): RequestBuilder;
    method: string;
    /**
     * @returns {RequestBuilder}
     */
    withGet(): RequestBuilder;
    /**
     * @returns {RequestBuilder}
     */
    withPost(): RequestBuilder;
    /**
     * @returns {RequestBuilder}
     */
    withPut(): RequestBuilder;
    /**
     * @param {import('./payload').Payload} payload
     *
     * @returns {RequestBuilder}
     */
    withPayload(payload: import('./payload').Payload): RequestBuilder;
    payload: import("./payload").Payload;
    /**
     * @param {string} name
     * @param {string|boolean|number} value
     *
     * @returns {RequestBuilder}
     */
    withQueryParam(name: string, value: string | boolean | number): RequestBuilder;
    /**
     * Default request headers.
     *
     * @param {string} messageSignature
     */
    getDefaultHeaders(messageSignature: string): {
        'X-Yoti-Auth-Digest': string;
        'X-Yoti-SDK': string;
        'X-Yoti-SDK-Version': string;
        Accept: string;
    };
    /**
     * @returns {YotiRequest}
     */
    build(): YotiRequest;
}
import { YotiRequest } from "./request";
