'use strict';

module.exports = class Validation {
  /**
   * @param {*} value
   * @param {*} type
   * @param {string} name
   *
   * @throws {TypeError}
   */
  static instanceOf(value, type, name) {
    if (!(value instanceof type)) {
      throw TypeError(`${name} must be instance of ${type.name}`);
    }
  }

  /**
   * @param {*} value
   * @param {string} name
   *
   * @throws {TypeError}
   */
  static isString(value, name) {
    if ((typeof value) !== 'string') {
      throw TypeError(`${name} must be a string`);
    }
  }

  /**
   * @param {*} value
   * @param {string} name
   *
   * @throws {TypeError}
   */
  static isBoolean(value, name) {
    if ((typeof value) !== 'boolean') {
      throw TypeError(`${name} must be a boolean`);
    }
  }

  /**
   * @param {*} value
   * @param {string} name
   *
   * @throws {TypeError}
   */
  static isArray(value, name) {
    if (!Array.isArray(value)) {
      throw TypeError(`${name} must be an array`);
    }
  }

  /**
   * @param {*} value
   * @param {string} name
   *
   * @throws {TypeError}
   */
  static isInteger(value, name) {
    if (!Number.isInteger(value)) {
      throw TypeError(`${name} must be an integer`);
    }
  }

  /**
   * @param {*} value
   * @param {string} name
   *
   * @throws {TypeError}
   */
  static isNumber(value, name) {
    if (Number.isNaN(value)) {
      throw TypeError(`${name} must be a number`);
    }
  }

  /**
   * @param {*} value
   * @param {string} name
   *
   * @throws {TypeError}
   */
  static notNull(value, name) {
    if (value == null) {
      throw TypeError(`${name} cannot be null`);
    }
  }

  /**
   * @param {*} values
   * @param {*} type
   * @param {string} name
   *
   * @throws {TypeError}
   */
  static isArrayOfType(values, type, name) {
    this.isArray(values, name);
    values.forEach((value) => {
      this.instanceOf(value, type, name);
    });
  }

  /**
   * @param {*} values
   * @param {Array} types
   * @param {string} name
   *
   * @throws {TypeError}
   */
  static isArrayOfTypes(values, types, name) {
    this.isArray(values, name);
    values.forEach((value) => {
      if (!types.some(type => value instanceof type)) {
        const allowedTypes = types.map(type => type.name).join(', ');
        throw TypeError(`${name} must be an array containing any of the following types: ${allowedTypes}`);
      }
    });
  }

  /**
   * @param {*} values
   * @param {string} name
   *
   * @throws {TypeError}
   */
  static isArrayOfIntegers(values, name) {
    this.isArray(values, name);
    values.forEach((value) => {
      this.isInteger(value, 'authType');
    });
  }

  /**
   * @param {*} value
   * @param {*} limit
   * @param {string} name
   *
   * @throws {RangeError}
   */
  static notGreaterThan(value, limit, name) {
    this.isNumber(value, name);
    if (value > limit) {
      throw new RangeError(`'${name}' value '${value}' is greater than '${limit}'`);
    }
  }

  /**
   * @param {*} value
   * @param {*} limit
   * @param {string} name
   *
   * @throws {RangeError}
   */
  static notLessThan(value, limit, name) {
    this.isNumber(value, name);
    if (value < limit) {
      throw new RangeError(`'${name}' value '${value}' is less than '${limit}'`);
    }
  }

  /**
   * @param {string} value
   * @param {RegExp} regexp
   * @param {string} name
   *
   * @throws {TypeError}
   */
  static matchesPattern(value, regexp, name) {
    this.instanceOf(regexp, RegExp, 'regexp');
    if (value === null || !regexp.test(value)) {
      throw new TypeError(`'${name}' value '${value}' does not match format '${regexp.toString()}'`);
    }
  }

  /**
   * @param {*} value
   * @param {*} minLimit
   * @param {*} maxLimit
   * @param {string} name
   *
   * @throws {RangeError}
   */
  static withinRange(value, minLimit, maxLimit, name) {
    this.notLessThan(value, minLimit, name);
    this.notGreaterThan(value, maxLimit, name);
  }
};
