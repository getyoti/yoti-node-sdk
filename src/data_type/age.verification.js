'use strict';

const Validation = require('../yoti_common/validation');

/**
 * Wraps an 'Age Verify/Condition' attribute to provide behaviour specific
 * to verifying someone's age.
 *
 * @class AgeVerification
 */
class AgeVerification {
  constructor(attribute) {
    Validation.notNull(attribute, 'attribute');
    Validation.matchesPattern(attribute.getName(), /^[^:]+:(?!.*:)[0-9]+$/, 'attribute.name');
    this.attribute = attribute;

    const split = attribute.getName().split(':');
    this.checkType = split[0];

    this.age = parseInt(split[1], 10);
    this.result = attribute.getValue() === 'true';
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
   * @returns {integer}
   */
  getAge() {
    return this.age;
  }

  /**
   * Whether or not the profile passed the age check.
   *
   * @returns {boolean}
   */
  getResult() {
    return this.result;
  }

  /**
   * The wrapped profile attribute.
   *
   * Use this if you need access to the underlying List of Anchors.
   *
   * @returns {Attribute}
   */
  getAttribute() {
    return this.attribute;
  }
}

module.exports = {
  AgeVerification,
};
