const AmlResultClass = require('../request/aml.result').AmlResult;
const Payload = require('../request/payload').Payload;
import constants = require('../yoti_common/constants');
import config = require('../../config');
import Validation = require('../yoti_common/validation');
import { RequestBuilder } from '../request/request.builder';

const DEFAULT_API_URL = config.yoti.connectApi;

const AmlResult = function main(rawResult) {
  this.isOnPepList = rawResult[constants.ON_PEP_LIST_ATTR];
  this.isOnFraudList = rawResult[constants.ON_FRAUD_LIST_ATTR];
  this.isOnWatchList = rawResult[constants.ON_WATCH_LIST_ATTR];
};

AmlResult.prototype = {
  /**
   * Get result data.
   *
   * @returns {{}}
   */
  getData() {
    const data = {};
    data[constants.ON_PEP_LIST_ATTR] = this.isOnPepList;
    data[constants.ON_FRAUD_LIST_ATTR] = this.isOnFraudList;
    data[constants.ON_WATCH_LIST_ATTR] = this.isOnWatchList;

    return data;
  },

  toString() {
    return JSON.stringify(this.getData());
  },
};

/**
 * Service Class to handle interactions with the aml API
 *
 * @class AmlService
 */
class AmlService {
  private sdkId: string;
  private pem: string | Buffer;
  private apiUrl: string;

  /**
   * @param {string} sdkId
   * @param {string|Buffer} pem
   * @param {{apiUrl?: string}} options
   */
  constructor(sdkId: string, pem: string | Buffer, { apiUrl = DEFAULT_API_URL } = {}) {
    Validation.isString(sdkId, 'sdkId');
    Validation.notNullOrEmpty(pem, 'pem');

    this.sdkId = sdkId;
    this.pem = pem;
    this.apiUrl = apiUrl;
  }

  performAmlCheck(amlProfile) {
    if (!amlProfile) {
      throw new Error('Error - AmlProfile should be an object of Type/AmlProfile');
    }

    const payload = new Payload(amlProfile.getData());

    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withPemString(this.pem.toString())
      .withEndpoint('/aml-check')
      .withQueryParam('appId', this.sdkId)
      .withMethod('POST')
      .withPayload(payload);

    const request = requestBuilder.build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response: any) => {
          try {
            const parsedResponse = response.getParsedResponse();
            AmlResultClass.checkAttributes(parsedResponse);
            return resolve(new AmlResult(parsedResponse));
          } catch (err) {
            console.log(`Error getting response data : ${err.message}`);
            return reject(err);
          }
        })
        .catch((err) => {
          console.log(`Error retrieving request data : ${err}`);
          const errorMessage = AmlResultClass.processAmlError(err);
          return reject(new Error(errorMessage));
        });
    });
  }
}

function performAmlCheck(amlProfile, pem, sdkId) {
  const amlService = new AmlService(sdkId, pem);
  return amlService.performAmlCheck(amlProfile);
}

export {
  performAmlCheck,
  AmlService,
};
