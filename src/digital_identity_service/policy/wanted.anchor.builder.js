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
   * @returns {WantedAnchor}
   */
  build() {
    return new WantedAnchor(this.value, this.subType);
  }
};
