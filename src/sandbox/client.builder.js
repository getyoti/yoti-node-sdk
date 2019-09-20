
const { SandboxClient } = require('./client');
const fs = require('fs');

/**
 * @class SandboxClientBuilder
 */
class SandboxClientBuilder {
  constructor() {
    this.sdkId = null;
    this.pem = null;
    this.sandboxUrl = null;
  }

  forApplication(sdkId) {
    this.sdkId = sdkId;
    return this;
  }

  withPem(pem) {
    this.pem = pem;
    return this;
  }

  withPemString(pemString) {
    return this.withPem(Buffer.from(pemString, 'utf8'));
  }

  withPemFile(pemFile) {
    return this.withPem(fs.readFileSync(pemFile, 'utf8'));
  }

  withSandboxUrl(sandboxUrl) {
    this.sandboxUrl = sandboxUrl;
    return this;
  }

  build() {
    return new SandboxClient(this.sdkId, this.pem, this.sandboxUrl);
  }
}

module.exports = {
  SandboxClientBuilder,
};
