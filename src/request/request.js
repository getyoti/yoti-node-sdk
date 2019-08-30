'use strict';

const superagent = require('superagent');
const uuid = require('uuid');
const yotiCommon = require('../yoti_common');
const Validation = require('../yoti_common/validation');
const yotiPackage = require('../../package.json');
const { Payload } = require('./payload');

const SUPPORTED_METHODS = ['POST', 'PUT', 'PATCH', 'GET', 'DELETE'];
const SDK_IDENTIFIER = 'Node';

/**
 * @class YotiResponse
 */
class YotiResponse {
  /**
   * @param {*} parsedResponse
   * @param {int} statusCode
   * @param {Object|null} receipt
   */
  constructor(parsedResponse, statusCode, receipt = null) {
    this.parsedResponse = parsedResponse;
    this.statusCode = statusCode;
    this.receipt = receipt;
  }

  /**
   * @returns {Object|null} Receipt if available.
   */
  getReceipt() {
    return this.receipt;
  }

  /**
   * @returns {*} Parsed API response.
   */
  getParsedResponse() {
    return this.parsedResponse;
  }

  /**
   * @returns {int} Response status code.
   */
  getStatusCode() {
    return this.statusCode;
  }
}

/**
 * Build a query string.
 *
 * @param {Object.<string, string>} queryParams
 *
 * @returns {string}
 */
const buildQueryString = queryParams => Object.keys(queryParams)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(queryParams[k])}`)
  .join('&');

/**
 * Make signed requests to Yoti endpoints.
 *
 * @class Request
 */
class Request {
  /**
   * @param {string} apiUrl
   * @param {string} pem
   */
  constructor(apiUrl, pem) {
    Validation.isString(apiUrl, 'apiUrl');
    this.apiUrl = apiUrl;

    Validation.notNull(pem, 'pem');
    this.pem = pem;
  }

  /**
   * @param {Object.<string, string>} headers
   */
  setHeaders(headers) {
    Object.keys(headers)
      .forEach(name => Validation.isString(headers[name], `'${name}' header`));

    this.headers = headers;
  }

  /**
   * Send a signed request.
   *
   * @param {string} endpoint
   * @param {string} httpMethod
   * @param {Payload} payload
   * @param {Object} queryParams
   *
   * @returns {Promise}
   */
  sendRequest(endpoint, httpMethod, payload, queryParams) {
    // Make sure payload is an object
    if (!payload) {
      throw new Error('Payload should be an object of type Request/Payload');
    }

    // Check if request method is supported
    if (SUPPORTED_METHODS.indexOf(httpMethod) === -1) {
      throw new Error(`HTTP method ${httpMethod} is not supported`);
    }

    // Merge provided query params with nonce and timestamp.
    const queryString = buildQueryString(Object.assign(
      queryParams || {},
      {
        nonce: uuid.v4(),
        timestamp: Date.now(),
      }
    ));

    return new Promise((resolve, reject) => {
      const endpointPath = `${endpoint}?${queryString}`;
      const request = superagent(httpMethod, `${this.apiUrl}${endpointPath}`);

      // Check if this method can include payload data in the request body
      // and in the signed message.
      const payloadJSON = payload.getPayloadJSON();
      let payloadBase64 = '';
      if (yotiCommon.requestCanSendPayload(httpMethod)) {
        payloadBase64 = `&${payload.getBase64Payload()}`;
        request.send(payloadJSON);
      }

      const messageSignature = yotiCommon.getRSASignatureForMessage(
        `${httpMethod}&${endpointPath}${payloadBase64}`,
        this.pem
      );

      if (this.headers) {
        request.set(this.headers);
      }

      request
        .set('X-Yoti-Auth-Key', yotiCommon.getAuthKeyFromPem(this.pem))
        .set('X-Yoti-Auth-Digest', messageSignature)
        .set('X-Yoti-SDK', SDK_IDENTIFIER)
        .set('X-Yoti-SDK-Version', `${SDK_IDENTIFIER}-${yotiPackage.version}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then((response) => {
          try {
            const parsedResponse = JSON.parse(response.text);
            const receipt = parsedResponse.receipt || null;
            return resolve(new YotiResponse(parsedResponse, response.statusCode, receipt));
          } catch (err) {
            return reject(err);
          }
        })
        .catch((err) => {
          console.log(`Error getting data from Connect API: ${err.message}`);
          return reject(err);
        });
    });
  }

  /**
   * Send a signed GET request.
   *
   * @param {string} endpoint
   * @param {Object} queryParams
   *
   * @returns {Promise}
   */
  get(endpoint, queryParams) {
    return this.sendRequest(endpoint, 'GET', new Payload(''), queryParams);
  }

  /**
   * Send a signed POST request.
   *
   * @param {string} endpoint
   * @param {Payload} payload
   * @param {Object} queryParams
   *
   * @returns {Promise}
   */
  post(endpoint, payload, queryParams) {
    return this.sendRequest(endpoint, 'POST', payload, queryParams);
  }
}

module.exports = {
  Request,
};
