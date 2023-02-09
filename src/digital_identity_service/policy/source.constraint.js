'use strict';

const Validation = require('../../yoti_common/validation');
const WantedAnchor = require('./wanted.anchor');

const CONSTRAINT_TYPE_SOURCE = 'SOURCE';

/**
 * Defines a contraint for wanted attributes.
 *
 * @class SourceConstraint
 */
module.exports = class SourceConstraint {
  /**
   * @param {WantedAnchor[]} anchors
   * @param {boolean} softPreference
   */
  constructor(anchors, softPreference = false) {
    Validation.isArrayOfType(anchors, WantedAnchor, 'anchors');
    this.anchors = anchors;

    Validation.isBoolean(softPreference, 'softPreference');
    this.softPreference = softPreference;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      type: CONSTRAINT_TYPE_SOURCE,
      preferred_sources: {
        anchors: this.anchors,
        soft_preference: this.softPreference,
      },
    };
  }
};
