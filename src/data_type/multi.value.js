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
    this.filterInstances = [];
    this.filterTypes = [];
  }

  /**
   * Filter values by their type.
   *
   * @param {*} type
   */
  filterInstance(type) {
    this.filterInstances.push(type);
    return this;
  }

  /**
   * Filter values by their constructor name.
   *
   * @param {*} type
   */
  filterType(type) {
    this.filterTypes.push(type);
    return this;
  }

  /**
   * Apply all filters.
   */
  applyFilters() {
    this.values = this.values.filter((value) => {
      let allowedInstance = true;
      let allowedType = true;
      if (this.filterInstances.length > 0) {
        allowedInstance = this.filterInstances.find(type => value instanceof type);
      }
      if (this.filterTypes.length > 0) {
        allowedType = this.filterTypes.find(type => value.constructor.name === type);
      }
      return allowedType && allowedInstance;
    });
  }

  /**
   * Reset to original values.
   */
  resetFilters() {
    this.values = this.originalValues;
    this.filterInstances = [];
    this.filterTypes = [];
  }

  /**
   * @returns {Array} List of filtered values.
   */
  getValues() {
    this.values = this.originalValues;
    this.applyFilters();
    return this.values;
  }
};
