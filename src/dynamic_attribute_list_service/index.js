'use strict';

const httpRequest = require('../request');
const { Payload } = require('../request/payload');

const {
  DynamicAttributeListRequest,
  DynamicAttributeListResult,
  AttributeList,
} = require('./dynamic.attribute.list');

const getDynamicAttributeList = (dynamicSharingRequest, pem, appId) => {
  const endPoint = `/qrcodes/apps/${appId}`;
  const httpMethod = 'POST';

  if (!dynamicSharingRequest) {
    throw new Error('Error - dynamic attribute list request should not be empty');
  }

  const payload = new Payload(dynamicSharingRequest.getData());

  return new Promise((resolve, reject) => {
    httpRequest.makeRequest(httpMethod, endPoint, pem, appId, payload)
      .then((response) => {
        try {
          const parsedResponse = response.getParsedResponse();
          DynamicAttributeListResult.checkAttributes(parsedResponse);
          return resolve(new DynamicAttributeListResult(parsedResponse));
        } catch (err) {
          console.log(`Error getting response data :: ${err}`);
          return reject(err);
        }
      })
      .catch((err) => {
        console.log(`Error retrieving requested data: ${err}`);
        return reject(err);
      });
  });
};

module.exports = {
  DynamicAttributeListRequest,
  DynamicAttributeListResult,
  AttributeList,
  getDynamicAttributeList,
};
