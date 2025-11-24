import Validation = require('../../yoti_common/validation');
import SourceConstraint = require('./source.constraint');

/**
 * List of constraints to apply to a wanted attribute.
 *
 * @class Constraints
 */
export default class Constraints {
  /**
   * Set default properties.
   */
  constructor(constraints) {
    Validation.isArrayOfTypes(constraints, [SourceConstraint], 'constraints');
    /** @private */
    this.constraints = constraints;
  }

  /**
   * Returns serialized data for JSON.stringify()
   */
  toJSON() {
    return this.constraints;
  }
};
