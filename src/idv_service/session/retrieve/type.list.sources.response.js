'use strict';

const Validation = require('../../../yoti_common/validation');
const CaSourcesResponse = require('./ca.sources.response');

class TypeListSourcesResponse extends CaSourcesResponse {
  constructor(sources) {
    super(sources);

    Validation.isArrayOfStrings(sources.types, 'types');
    this.types = sources.types;
  }

  /**
   *
   * @return {string[]}
   */
  getTypes() {
    return this.types;
  }
}

module.exports = TypeListSourcesResponse;
