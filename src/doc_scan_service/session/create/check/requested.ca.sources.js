'use strict';

const Validation = require('../../../../yoti_common/validation');
/**
 *
 * @class RequestedCaSources
 */
class RequestedCaSources {
  constructor(type) {
    if (new.target === RequestedCaSources) {
      throw TypeError('RequestedCaSources cannot be instantiated');
    }

    Validation.notNullOrEmpty(type, 'type');
    Validation.isString(type, 'type');
    this.type = type;
  }
}

module.exports = RequestedCaSources;
