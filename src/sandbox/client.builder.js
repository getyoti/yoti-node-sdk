
const { SandboxClient } = require('./client');
const Validation = require('../yoti_common/validation');
const fs = require('fs');

/**
 * @class SandboxClientBuilder
 */
class SandboxClientBuilder {
  /**
   * @param {string} appId
   */
  forApplication(appId) {
    this.appId = appId;
    return this;
  }

  /**
   * @param {string} pemString
   *
   * @returns {SandboxClientBuilder}
   */
  withPemString(pem) {
    Validation.isString(pem, 'pem');
    this.pem = pem;
    return this;
  }

  /**
   * @param {string} filePath
   *
   * @returns {SandboxClientBuilder}
   */
  withPemFilePath(filePath) {
    Validation.isString(filePath, 'filePath');
    return this.withPemString(fs.readFileSync(filePath, 'utf8'));
  }

  /**
   * @param {string} sandboxUrl
   *
   * @returns {SandboxClientBuilder}
   */
  withSandboxUrl(sandboxUrl) {
    this.sandboxUrl = sandboxUrl;
    return this;
  }

  /**
   * @returns {SandboxClient}
   */
  build() {
    return new SandboxClient(this.appId, this.pem, this.sandboxUrl);
  }
}

module.exports = {
  SandboxClientBuilder,
};
