'use strict';

const { TYPE_LIST } = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');
const RequestedCaSources = require('./requested.ca.sources');

/**
 *
 * @class RequestedSearchProfileSources
 */
class RequestedTypeListSources extends RequestedCaSources {
  /**
   * @param types {string[]}
   *
   */
  constructor(types = []) {
    super(TYPE_LIST);
    Validation.isArrayOfStrings(types, 'types');
    this.types = types;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      type: this.type,
      types: this.types,
    };
  }
}

module.exports = RequestedTypeListSources;
