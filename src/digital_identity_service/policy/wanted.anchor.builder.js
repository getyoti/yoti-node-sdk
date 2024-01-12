'use strict';

const WantedAnchor = require('./wanted.anchor');

/**
 * Builder for WantedAnchor.
 *
 * @class WantedAnchorBuilder
 */
module.exports = class WantedAnchorBuilder {
  /**
   * @param {string} value
   * @returns this
   */
  withValue(value) {
    this.value = value;
    return this;
  }

  /**
   * @param {string} subType
   * @returns this
   */
  withSubType(subType) {
    this.subType = subType;
    return this;
  }

  /**
   * @returns {WantedAnchor}
   */
  build() {
    return new WantedAnchor(this.value, this.subType);
  }
};
