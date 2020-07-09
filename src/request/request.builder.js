'use strict';

const fs = require('fs');
const { v4: uuid } = require('uuid');

const yotiCommon = require('../yoti_common');
const { YotiRequest } = require('./request');
const Validation = require('../yoti_common/validation');
const yotiPackage = require('../../package.json');

const SDK_IDENTIFIER = 'Node';

/**
 * Build a query string.
 *
 * @param {Object.<string, string>} queryParams
 *
 * @returns {string}
 */
const buildQueryString = (queryParams) => Object.keys(queryParams)
  .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(queryParams[k])}`)
  .join('&');

/**
 * Builds a request.
 *
 * @class RequestBuilder
 */
class RequestBuilder {
  /**
   * Set initial properties.
   */
  constructor() {
    this.headers = {};
    this.queryParams = {};
  }

  /**
   * @param {string} baseUrl Base URL without trailing slashes.
   *
   * @returns {RequestBuilder}
   */
  withBaseUrl(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    return this;
  }

  /**
   * @param {string} endpoint Endpoint with a single leading slash.
   *
   * @returns {RequestBuilder}
   */
  withEndpoint(endpoint) {
    this.endpoint = `/${endpoint.replace(/^\/+/, '')}`;
    return this;
  }

  /**
   * @param {string} pem
   *
   * @returns {RequestBuilder}
   */
  withPemString(pem) {
    this.pem = pem;
    return this;
  }

  /**
   * @param {string} filePath
   *
   * @returns {RequestBuilder}
   */
  withPemFilePath(filePath) {
    return this.withPemString(fs.readFileSync(filePath, 'utf8'));
  }

  /**
   * @param {string} name
   * @param {string} value
   *
   * @returns {RequestBuilder}
   */
  withHeader(name, value) {
    Validation.isString(name, 'Header name');
    Validation.isString(value, `'${name}' header`);

    this.headers[name] = value;
    return this;
  }

  /**
   * @param string $method
   *
   * @returns {RequestBuilder}
   */
  withMethod(method) {
    this.method = method;
    return this;
  }

  /**
   * @returns {RequestBuilder}
   */
  withGet() {
    return this.withMethod('GET');
  }

  /**
   * @returns {RequestBuilder}
   */
  withPost() {
    return this.withMethod('POST');
  }

  /**
   * @param {string} payload
   *
   * @returns {RequestBuilder}
   */
  withPayload(payload) {
    this.payload = payload;
    return this;
  }

  /**
   * @param string name
   * @param string value
   *
   * @returns {RequestBuilder}
   */
  withQueryParam(name, value) {
    this.queryParams[name] = value;
    return this;
  }

  /**
   * Default request headers.
   *
   * @param {*} messageSignature
   */
  getDefaultHeaders(messageSignature) {
    const defaultHeaders = {
      'X-Yoti-Auth-Digest': messageSignature,
      'X-Yoti-SDK': SDK_IDENTIFIER,
      'X-Yoti-SDK-Version': `${SDK_IDENTIFIER}-${yotiPackage.version}`,
      Accept: 'application/json',
    };

    if (this.payload) {
      defaultHeaders['Content-Type'] = 'application/json';
    }

    return defaultHeaders;
  }

  /**
   * @returns {YotiRequest}
   */
  build() {
    if (!this.baseUrl) {
      throw new Error('Base URL must be specified');
    }
    if (!this.pem) {
      throw new Error('PEM file path or string must be provided');
    }

    // Merge provided query params with nonce and timestamp.
    const queryString = buildQueryString(Object.assign(
      this.queryParams,
      {
        nonce: uuid(),
        timestamp: Date.now(),
      }
    ));

    // Build endpoint and url.
    const endpointPath = `${this.endpoint}?${queryString}`;

    // Check if this method can include payload data in the request body
    let payloadBase64 = '';
    if (this.payload && yotiCommon.requestCanSendPayload(this.method)) {
      payloadBase64 = `&${this.payload.getBase64Payload()}`;
    }

    // Get message signature.
    const messageSignature = yotiCommon.getRSASignatureForMessage(
      `${this.method}&${endpointPath}${payloadBase64}`,
      this.pem
    );

    // Merge custom headers with default headers.
    const headers = Object.assign(
      this.getDefaultHeaders(messageSignature),
      this.headers
    );

    // Build full url.
    const url = `${this.baseUrl}${endpointPath}`;

    return new YotiRequest(this.method, url, headers, this.payload);
  }
}

module.exports = {
  RequestBuilder,
};
