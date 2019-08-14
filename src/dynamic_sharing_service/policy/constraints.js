'use strict';

const Validation = require('../../yoti_common/validation');
const SourceConstraint = require('./source.constraint');

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
    Validation.isArrayOfTypes(constraints, [SourceConstraint], 'constraints');
    this.constraints = constraints;
  }

  /**
   * @returns {Array}
   */
  toJSON() {
    return this.constraints;
  }
};
