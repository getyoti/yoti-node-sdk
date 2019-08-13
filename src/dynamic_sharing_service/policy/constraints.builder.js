'use strict';

const Validation = require('../../yoti_common/validation');
const SourceConstraint = require('./source.constraint');
const Constraints = require('./constraints');

/**
 * Builder for Constraints.
 *
 * @class ConstraintsBuilder
 */
module.exports = class ConstraintsBuilder {
  /**
   * Set default properties.
   */
  constructor() {
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
