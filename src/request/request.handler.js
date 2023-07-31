'use strict';

const superagent = require('superagent');
const { YotiResponse } = require('./response');
const yotiCommon = require('../yoti_common');
const { ContentType } = require('./constants');

/**
 * Default HTTP request handler.
 *
 * @param {YotiRequest} yotiRequest
 * @param {boolean} buffer Return the response as a Buffer.
 *
 * @returns {Promise} Resolves {YotiResponse}
 */
module.exports.execute = (yotiRequest, buffer = false) => new Promise((resolve, reject) => {
  const request = superagent(yotiRequest.getMethod(), yotiRequest.getUrl());

  const requestCanSendPayload = yotiCommon.requestCanSendPayload(yotiRequest.getMethod());

  const contentType = yotiRequest.getHeaders()['Content-Type'];

  if (requestCanSendPayload) {
    if (contentType === ContentType.JSON) {
      request.send(yotiRequest.getPayload().getPayloadJSON());
    } else if (contentType.includes(ContentType.FORM_DATA)) {
      request.send(yotiRequest.getPayload().getPayloadDataFormBuffer());
    }
  }

  if (buffer === true) {
    request.buffer(buffer);
  }

  if (yotiRequest.getHeaders()) {
    request.set(yotiRequest.getHeaders());
  }

  request
    .then((response) => {
      let parsedResponse = null;
      let body = null;
      let receipt = null;

      if (response.body instanceof Buffer) {
        body = response.body;
        parsedResponse = response.body;
      } else if (response.text) {
        body = response.text;
        parsedResponse = response.headers['content-type'] ? response.body : JSON.parse(response.text);
        receipt = parsedResponse.receipt || null;
      }

      return resolve(new YotiResponse(
        parsedResponse,
        response.statusCode,
        receipt,
        body,
        response.headers
      ));
    })
    .catch((err) => {
      console.log(`Error getting data from Yoti API: ${err.message}`);
      return reject(err);
    });
});
