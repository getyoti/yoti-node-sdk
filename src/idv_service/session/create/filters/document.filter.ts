import Validation = require('../../../../yoti_common/validation');

class DocumentFilter {
  /**
   * @param {string} type
   */
  constructor(type) {
    if (new.target === DocumentFilter) {
      throw TypeError('DocumentFilter cannot be instantiated');
    }

    Validation.isString(type, 'type');
    /** @private */
    this.type = type;
  }

  toJSON() {
    return {
      type: this.type,
    };
  }
}

export default DocumentFilter;
