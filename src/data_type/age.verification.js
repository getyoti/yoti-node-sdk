'use strict';

const Validation = require('../yoti_common/validation');
const constants = require('../yoti_common/constants');

/**
 * Based on an 'Age Verify/Condition' attribute name and value, provides behaviour specific
 * to verifying someone's age.
 *
 * @class AgeVerification
 */
class AgeVerification {
  static isAttributeNameMatchingAgeVerification(name) {
    return name.startsWith(constants.ATTR_AGE_OVER)
      || name.startsWith(constants.ATTR_AGE_UNDER);
  }

  constructor(name, value) {
    Validation.isString(name, 'name');
    Validation.oneOf(value, ['true', 'false'], 'value');
    Validation.matchesPattern(name, /^[^:]+:[0-9]+(?::[0-9]+)?$/, 'attribute.name');

    const [type, age, ageBuffer] = name.split(':');
    /** @private */
    this.checkType = type;

    /** @private */
    this.age = parseInt(age, 10);
    /** @private */
    this.ageBuffer = ageBuffer ? parseInt(ageBuffer, 10) : undefined;
    /** @private */
    this.result = value === 'true';
  }

  /**
   * The type of age check performed, as specified on Yoti Hub.
   *
   * Among the possible values are 'age_over' and 'age_under'.
   *
   * @returns {string}
   */
  getCheckType() {
    return this.checkType;
  }

  /**
   * The age that was that checked, as specified on Yoti Hub.
   *
   * @returns {number}
   */
  getAge() {
    return this.age;
  }

  /**
   * The age buffer allowed
   *
   * @returns {number|undefined}
   */
  getAgeBuffer() {
    return this.ageBuffer;
  }

  /**
   * Whether the profile passed the age check.
   *
   * @returns {boolean}
   */
  getResult() {
    return this.result;
  }
}

module.exports = {
  AgeVerification,
};
