import Validation = require('../yoti_common/validation');
import constants = require('../yoti_common/constants');

/**
 * Based on an 'Age Verify/Condition' attribute name and value, provides behaviour specific
 * to verifying someone's age.
 *
 * @class AgeVerification
 */
class AgeVerification {
  private checkType: string;
  private age: number;
  private ageBuffer?: number;
  private result: boolean;

  static isAttributeNameMatchingAgeVerification(name: string) {
    return name.startsWith(constants.ATTR_AGE_OVER)
      || name.startsWith(constants.ATTR_AGE_UNDER);
  }

  constructor(name: string, value: string) {
    Validation.isString(name, 'name');
    Validation.oneOf(value, ['true', 'false'], 'value');
    Validation.matchesPattern(name, /^[^:]+:[0-9]+(?::[0-9]+)?$/, 'attribute.name');

    const [type, age, ageBuffer] = name.split(':');
    this.checkType = type;
    this.age = parseInt(age, 10);
    this.ageBuffer = ageBuffer ? parseInt(ageBuffer, 10) : undefined;
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

export {
  AgeVerification,
};
