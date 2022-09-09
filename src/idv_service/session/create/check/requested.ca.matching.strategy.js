'use strict';

const Validation = require('../../../../yoti_common/validation');
/**
 *
 * @class RequestedCaMatchingStrategy
 */
class RequestedCaMatchingStrategy {
  constructor(type) {
    if (new.target === RequestedCaMatchingStrategy) {
      throw TypeError('RequestedCaMatchingStrategy cannot be instantiated');
    }

    Validation.notNullOrEmpty(type, 'type');
    Validation.isString(type, 'type');
    this.type = type;
  }
}

module.exports = RequestedCaMatchingStrategy;
