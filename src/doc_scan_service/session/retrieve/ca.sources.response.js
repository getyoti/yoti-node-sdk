'use strict';

const { PROFILE, TYPE_LIST } = require('../../doc.scan.constants');
const Validation = require('../../../yoti_common/validation');

const types = {
  PROFILE,
  TYPE_LIST,
};

class CaSourcesResponse {
  constructor(sources) {
    const currentClass = new.target;
    if (currentClass === CaSourcesResponse) {
      throw new Error('CaSourcesResponse can not be instantiated');
    }

    Validation.isString(sources.type, 'type');
    Validation.oneOf(sources.type, Object.keys(types), 'type');
    this.type = sources.type;
  }

  /**
   *
   * @return {string}
   */
  getType() {
    return this.type;
  }
}

CaSourcesResponse.types = types;

module.exports = CaSourcesResponse;
