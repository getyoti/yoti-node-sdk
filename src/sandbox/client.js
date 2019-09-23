
const { RequestBuilder } = require('../request/request.builder');
const { TokenResponse } = require('./profile/response/token');
const { Payload } = require('../request/payload');
const Validation = require('../yoti_common/validation');

/**
 * @class SandboxClient
 */
class SandboxClient {
  /**
   * @param {string} sdkId
   * @param {Buffer} pem
   * @param {string} sandboxUrl
   */
  constructor(sdkId, pem, sandboxUrl) {
    Validation.isString(sdkId, 'sdkId');
    this.sdkId = sdkId;
    this.endpoint = `/apps/${sdkId}/tokens`;

    Validation.instanceOf(pem, Buffer, 'pem');
    this.pem = pem;

    Validation.isString(sandboxUrl, 'sandboxUrl');
    this.sandboxUrl = sandboxUrl;
  }

  /**
   * @param {TokenRequest} tokenRequest
   *
   * @returns {Promise}
   */
  setupSharingProfile(tokenRequest) {
    const request = (new RequestBuilder())
      .withBaseUrl(this.sandboxUrl)
      .withEndpoint(this.endpoint)
      .withPemString(this.pem)
      .withPayload(new Payload(tokenRequest))
      .withPost()
      .build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            return resolve(new TokenResponse(response.getParsedResponse()));
          } catch (err) {
            console.log(`Error getting response data: ${err}`);
            return reject(err);
          }
        })
        .catch((err) => {
          console.log(`Error retrieving requested data: ${err}`);
          return reject(err);
        });
    });
  }
}

module.exports = {
  SandboxClient,
};
