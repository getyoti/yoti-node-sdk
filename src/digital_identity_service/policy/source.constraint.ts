import Validation = require('../../yoti_common/validation');
import WantedAnchor = require('./wanted.anchor');

const CONSTRAINT_TYPE_SOURCE = 'SOURCE';

/**
 * Defines a source constraint for wanted attributes.
 *
 * @class SourceConstraint
 */
export default class SourceConstraint {
  /**
   * @param {WantedAnchor[]} anchors
   * @param {boolean} softPreference
   */
  constructor(anchors, softPreference = false) {
    Validation.isArrayOfType(anchors, WantedAnchor, 'anchors');
    /** @private */
    this.anchors = anchors;

    Validation.isBoolean(softPreference, 'softPreference');
    /** @private */
    this.softPreference = softPreference;
  }

  /**
   * Returns serialized data for JSON.stringify()
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
