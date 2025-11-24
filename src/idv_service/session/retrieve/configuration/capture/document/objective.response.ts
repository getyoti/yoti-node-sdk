import Validation = require('../../../../../../yoti_common/validation');

class ObjectiveResponse {
  /**
   * @param {object} objective
   */
  constructor(objective) {
    Validation.isString(objective.type, 'type');
    /** @private */
    this.type = objective.type;
  }

  /**
   * Returns the objective type as a String
   *
   * @return {string | null}
   */
  getType() {
    return this.type;
  }
}

export default ObjectiveResponse;
