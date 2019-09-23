
const { SandboxClient } = require('./client');
const Validation = require('../yoti_common/validation');
const fs = require('fs');

/**
 * @class SandboxClientBuilder
 */
class SandboxClientBuilder {
  /**
   * Setup default property values.
   */
  constructor() {
    this.sdkId = null;
    this.pem = null;
    this.sandboxUrl = null;
  }

  /**
   * @param {string} sdkId
   */
  forApplication(sdkId) {
    this.sdkId = sdkId;
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
    return new SandboxClient(this.sdkId, this.pem, this.sandboxUrl);
  }
}

module.exports = {
  SandboxClientBuilder,
};
