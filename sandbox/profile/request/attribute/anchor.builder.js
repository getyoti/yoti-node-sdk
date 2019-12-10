const SandboxAnchor = require('./anchor');

/**
 * @class SandboxAnchorBuilder
 */
class SandboxAnchorBuilder {
  /**
   * @param {string} type
   *
   * @returns {SandboxAnchorBuilder}
   */
  withType(type) {
    this.type = type;
    return this;
  }

  /**
   * @param {string} value
   *
   * @returns {SandboxAnchorBuilder}
   */
  withValue(value) {
    this.value = value;
    return this;
  }

  /**
   * @param {string} subType
   *
   * @returns {SandboxAnchorBuilder}
   */
  withSubType(subType) {
    this.subType = subType;
    return this;
  }

  /**
   * @param {DateTime} timestamp
   *
   * @returns {SandboxAnchorBuilder}
   */
  withTimestamp(timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * @returns {SandboxAnchor}
   */
  build() {
    return new SandboxAnchor(this.type, this.value, this.subType, this.timestamp);
  }
}

module.exports = SandboxAnchorBuilder;
