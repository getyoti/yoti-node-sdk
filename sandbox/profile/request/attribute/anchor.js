const Validation = require('../../../../src/yoti_common/validation');
const { YotiDate } = require('../../../../');

/**
 * @class SandboxAnchor
 */
class SandboxAnchor {
  /**
   * @param {string} type
   * @param {string} value
   * @param {string} subType
   * @param {YotiDate} timestamp
   */
  constructor(type, value, subType, timestamp) {
    Validation.isString(type, 'type');
    this.type = type;

    Validation.isString(value, 'value');
    this.value = value;

    Validation.isString(subType, 'subType');
    this.subType = subType;

    Validation.instanceOf(timestamp, YotiDate, 'timestamp');
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
   * @returns {YotiDate}
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
      timestamp: this.getTimestamp().getMicrosecondUnixTimestamp(),
    };
  }
}

module.exports = SandboxAnchor;
