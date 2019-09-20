
const { RequestBuilder } = require('../request/request.builder');
const { TokenResponse } = require('./profile/response/token');
const { Payload } = require('../request/payload');

/**
 * @class SandboxClient
 */
class SandboxClient {
  constructor(sdkId, pem, sandboxUrl) {
    this.sdkId = sdkId;
    this.pem = pem;
    this.sandboxUrl = sandboxUrl;
    this.endpoint = `/apps/${sdkId}/tokens`;
  }

  async setupSharingProfile(tokenRequest) {
    const response = await (new RequestBuilder())
      .withBaseUrl(this.sandboxUrl)
      .withEndpoint(this.endpoint)
      .withPem(this.pem)
      .withPayload(new Payload(tokenRequest))
      .withPost()
      .build()
      .execute();

    const tokenResponse = new TokenResponse(response.getParsedResponse());
    return tokenResponse.getToken();
  }
}

module.exports = {
  SandboxClient,
};
