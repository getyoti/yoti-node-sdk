'use strict';

const Validation = require('../../../../yoti_common/validation');
const RequestedTypeListSources = require('./requested.type.list.sources');

/**
 * Builder to assist the creation of {@link RequestedTypeListSources}.
 *
 * @class RequestedTypeListSourcesBuilder
 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["build"] }] */
class RequestedTypeListSourcesBuilder {
  /**
   * Sets types used for sources
   *
   * @param types {string[]}
   *
   * @returns {this}
   */
  withTypes(types) {
    Validation.isArrayOfStrings(types, 'types');
    this.types = types;
    return this;
  }

  build() {
    return new RequestedTypeListSources(this.types);
  }
}

module.exports = RequestedTypeListSourcesBuilder;
