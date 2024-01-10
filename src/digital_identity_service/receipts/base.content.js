'use strict';

const ExtraData = require('./extra.data');

class BaseContent {
  /**
   * @param {{ [k: string]: any }[]} extraData
   */
  constructor(extraData = []) {
    const currentClass = new.target;
    if (currentClass === BaseContent) {
      throw new Error('BaseContent can not be instantiated');
    }
    /** @private */
    this.extraData = new ExtraData(extraData);
  }

  /**
   * Get the user extra data
   * @returns {ExtraData}
   */
  getExtraData() {
    return this.extraData;
  }
}

module.exports = BaseContent;
