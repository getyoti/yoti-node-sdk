'use strict';

const fs = require('fs');

const yotiCommon = require('../yoti_common');
const { YotiRequest } = require('./request');
const Validation = require('../yoti_common/validation');
const yotiPackage = require('../../package.json');
const { ContentType } = require('./constants');
const SignedRequestStrategy = require('../auth/signed.request.strategy');

const SDK_IDENTIFIER = 'Node';

/**
 * Build a query string.
 *
 * @param {Object.<string, string|number|boolean>} queryParams
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
    /** @private */
    this.headers = {};
    /** @private */
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
   * @param {Object} authStrategy
   *
   * @returns {RequestBuilder}
   */
  withAuthStrategy(authStrategy) {
    this.authStrategy = authStrategy;
    return this;
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
   * @param {string} method
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
   * @returns {RequestBuilder}
   */
  withPut() {
    return this.withMethod('PUT');
  }

  /**
   * @param {import('./payload').Payload} payload
   *
   * @returns {RequestBuilder}
   */
  withPayload(payload) {
    this.payload = payload;
    return this;
  }

  /**
   * @param {string} name
   * @param {string|boolean|number} value
   *
   * @returns {RequestBuilder}
   */
  withQueryParam(name, value) {
    this.queryParams[name] = value;
    return this;
  }

  /**
   * @returns {YotiRequest}
   */
  build() {
    if (!this.baseUrl) {
      throw new Error('Base URL must be specified');
    }

    let strategy;
    if (this.authStrategy) {
      strategy = this.authStrategy;
    } else if (this.pem) {
      strategy = new SignedRequestStrategy(this.pem);
    } else {
      throw new Error('PEM or auth strategy must be provided');
    }

    const queryString = buildQueryString(Object.assign(
      {},
      this.queryParams,
      strategy.createQueryParams()
    ));
    // Build endpoint and url.
    const endpointPath = `${this.endpoint}?${queryString}`;

    // Check if this method can include payload data in the request body
    let payloadBase64 = '';
    if (this.payload && yotiCommon.requestCanSendPayload(this.method)) {
      payloadBase64 = `&${this.payload.getBase64Payload()}`;
    }

    const authHeaders = strategy.createAuthHeaders(
      this.method,
      endpointPath,
      payloadBase64
    );

    const sdkHeaders = {
      'X-Yoti-SDK': SDK_IDENTIFIER,
      'X-Yoti-SDK-Version': `${SDK_IDENTIFIER}-${yotiPackage.version}`,
      Accept: ContentType.JSON,
    };

    if (this.payload) {
      if (this.payload.getContentType() === ContentType.FORM_DATA) {
        sdkHeaders['Content-Type'] = `${ContentType.FORM_DATA}; boundary=${this.payload.getRawData().getBoundary()}`;
      } else {
        sdkHeaders['Content-Type'] = this.payload.getContentType();
      }
    }

    const headers = Object.assign(sdkHeaders, authHeaders, this.headers);
    const url = `${this.baseUrl}${endpointPath}`;

    return new YotiRequest(this.method, url, headers, this.payload);
  }
}

module.exports = {
  RequestBuilder,
};
