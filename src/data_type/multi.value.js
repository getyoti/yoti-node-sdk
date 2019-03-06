'use strict';

module.exports = class MultiValue {
  /**
   * MultiValue constructor.
   *
   * @param {array} values
   */
  constructor(values) {
    this.originalValues = values;
    this.values = values;
    this.filters = [];
  }

  /**
   * Filter values by type.
   *
   * @param {*} filterType
   */
  filter(filterType) {
    this.filters.push(filterType);

    const filteredValues = [];
    this.originalValues.forEach((value) => {
      if (this.filters.find(t => value instanceof t)) {
        filteredValues.push(value);
      }
    });
    this.values = filteredValues;

    return this;
  }

  /**
   * @returns {Array} List of filtered values.
   */
  getValues() {
    return this.values;
  }
};
