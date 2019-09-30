/**
 * @class SandboxAnchor
 */
class SandboxAnchor {
  /**
   * @param {string} type
   * @param {string} value
   * @param {*} subType
   * @param {DateTime} timestamp
   */
  constructor(type, value, subType, timestamp) {
    this.type = type;
    this.value = value;
    this.subType = subType;
    this.timestamp = timestamp;
  }

  /**
   * @returns {string}
   */
  getType() {
    return this.type;
  }

  /**
   * @returns {string}
   */
  getValue() {
    return this.value;
  }

  /**
   * @returns {*}
   */
  getSubType() {
    return this.subType;
  }

  /**
   * @returns {DateTime}
   */
  getTimestamp() {
    return this.timestamp;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      type: this.getType(),
      value: this.getValue(),
      sub_type: this.getSubType(),
      timestamp: this.getTimestamp(),
    };
  }
}

module.exports = SandboxAnchor;
