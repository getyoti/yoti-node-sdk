/**
 * Builds a request.
 *
 * @class RequestBuilder
 */
export class RequestBuilder {
    headers: {};
    queryParams: {};
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
     * @param string $method
     *
     * @returns {RequestBuilder}
     */
    withMethod(method: any): RequestBuilder;
    method: any;
    /**
     * @returns {RequestBuilder}
     */
    withGet(): RequestBuilder;
    /**
     * @returns {RequestBuilder}
     */
    withPost(): RequestBuilder;
    /**
     * @param {string} payload
     *
     * @returns {RequestBuilder}
     */
    withPayload(payload: string): RequestBuilder;
    payload: string;
    /**
     * @param string name
     * @param string value
     *
     * @returns {RequestBuilder}
     */
    withQueryParam(name: any, value: any): RequestBuilder;
    /**
     * Default request headers.
     *
     * @param {*} messageSignature
     */
    getDefaultHeaders(messageSignature: any): {
        'X-Yoti-Auth-Digest': any;
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
