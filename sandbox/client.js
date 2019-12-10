
const { RequestBuilder } = require('../src/request/request.builder');
const TokenResponse = require('./profile/response/token');
const { Payload } = require('../src/request/payload');
const Validation = require('../src/yoti_common/validation');

/**
 * @class SandboxClient
 */
class SandboxClient {
  /**
   * @param {string} appId
   * @param {string} pem
   * @param {string} sandboxUrl
   */
  constructor(appId, pem, sandboxUrl) {
    Validation.isString(appId, 'appId');
    this.appId = appId;
    this.endpoint = `/apps/${appId}/tokens`;

    Validation.isString(pem, 'pem');
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

module.exports = SandboxClient;
