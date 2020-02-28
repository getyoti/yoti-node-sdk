
const SandboxClient = require('./client');
const Validation = require('../src/yoti_common/validation');
const fs = require('fs');

/**
 * @class SandboxClientBuilder
 */
class SandboxClientBuilder {
  /**
   * @param {string} sdkId
   */
  withClientSdkId(sdkId) {
    this.sdkId = sdkId;
    return this;
  }

  /**
   * @param {string} sdkId
   *
   * @deprecated 4.0.0
   */
  forApplication(sdkId) {
    return this.withClientSdkId(sdkId);
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

module.exports = SandboxClientBuilder;
