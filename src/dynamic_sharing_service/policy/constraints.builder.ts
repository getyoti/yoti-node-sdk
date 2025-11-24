import Validation = require('../../yoti_common/validation');
import SourceConstraint = require('./source.constraint');
import Constraints = require('./constraints');

/**
 * Builder for Constraints.
 *
 * @class ConstraintsBuilder
 */
export default class ConstraintsBuilder {
  /**
   * Set default properties.
   */
  constructor() {
    /** @private */
    this.constraints = [];
  }

  /**
   * @param {SourceConstraint} sourceConstraint
   */
  withSourceConstraint(sourceConstraint) {
    Validation.instanceOf(sourceConstraint, SourceConstraint, 'constraint');
    this.constraints.push(sourceConstraint);
    return this;
  }

  /**
   * @returns {Constraints}
   */
  build() {
    return new Constraints(this.constraints);
  }
};
