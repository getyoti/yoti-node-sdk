const superagent = require('superagent');
const { YotiResponse } = require('./response');
const yotiCommon = require('../yoti_common');

/**
 * Default HTTP request handler.
 *
 * @param {YotiRequest} yotiRequest
 *
 * @returns {Promise} Resolves {YotiResponse}
 */
module.exports.execute = yotiRequest => new Promise((resolve, reject) => {
  const request = superagent(yotiRequest.getMethod(), yotiRequest.getUrl());

  if (yotiCommon.requestCanSendPayload(yotiRequest.getMethod())) {
    request.send(yotiRequest.getPayload().getPayloadJSON());
  }

  if (yotiRequest.getHeaders()) {
    request.set(yotiRequest.getHeaders());
  }

  request
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
