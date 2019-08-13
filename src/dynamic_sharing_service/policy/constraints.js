'use strict';

/**
 * List of constraints to apply to a wanted attribute.
 *
 * @class Constraints
 */
module.exports = class Constraints {
  /**
   * Set default properties.
   */
  constructor(constraints) {
    this.constraints = constraints;
  }

  /**
   * @param {SourceConstraint} constraint
   */
  withSourceConstraint(constraint) {
    this.constraints.push(constraint);
    return this;
  }

  /**
   * @returns {Array}
   */
  toJSON() {
    return this.constraints;
  }
};
