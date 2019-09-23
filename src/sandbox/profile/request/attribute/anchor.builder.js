const { SandboxAnchor } = require('./anchor');

/**
 * @class SandboxAnchorBuilder
 */
class SandboxAnchorBuilder {
  /**
   * Setup initial property values.
   */
  constructor() {
    this.anchors = [];
  }

  /**
   * @param {string} type
   */
  withType(type) {
    this.type = type;
    return this;
  }

  /**
   * @param {string} value
   */
  withValue(value) {
    this.value = value;
    return this;
  }

  /**
   * @param {string} subType
   */
  withSubType(subType) {
    this.subType = subType;
    return this;
  }

  /**
   * @param {DateTime} timestamp
   */
  withTimestamp(timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * @returns SandboxAnchor
   */
  build() {
    return new SandboxAnchor(this.type, this.value, this.subType, this.timestamp);
  }
}

module.exports = {
  SandboxAnchorBuilder,
};
