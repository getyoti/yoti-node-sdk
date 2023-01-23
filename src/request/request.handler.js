'use strict';

const superagent = require('superagent');
const { YotiResponse } = require('./response');
const yotiCommon = require('../yoti_common');

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

  if (yotiCommon.requestCanSendPayload(yotiRequest.getMethod())) {
    request.send(yotiRequest.getPayload().getPayloadJSON());
  }

  if (buffer === true) {
    request.buffer(buffer);
  }

  if (yotiRequest.getHeaders()) {
    request.set(yotiRequest.getHeaders());
  }

  request
    .then(({
      body: rawBody, headers, statusCode, text,
    }) => {
      let parsedResponse = null;
      let receipt = null;
      let body = null;

      if (body instanceof Buffer) {
        body = rawBody;
        parsedResponse = rawBody;
      } else if (text) {
        body = text;
        parsedResponse = headers['content-type'] ? rawBody : JSON.parse(text);
        receipt = parsedResponse.receipt || null;
      }
      return resolve(new YotiResponse(
        parsedResponse,
        statusCode,
        receipt,
        body,
        headers
      ));
    })
    .catch((err) => {
      const { response: { text } = {} } = err;
      console.log(`Error getting data from Yoti API: ${err.message}(${text})`);
      return reject(err);
    });
});
