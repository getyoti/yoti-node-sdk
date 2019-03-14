'use strict';

module.exports = class MultiValue {
  /**
   * MultiValue constructor.
   *
   * @param {array} items
   */
  constructor(items) {
    this.originalItems = items;
    this.items = items;
    this.filterInstances = [];
    this.filterTypes = [];
  }

  /**
   * Filter values by their instance type.
   *
   * @param {*} type
   *
   * @returns {MultiValue}
   */
  filterInstance(type) {
    this.filterInstances.push(type);
    return this;
  }

  /**
   * Filter values by their constructor name.
   *
   * @param {String} type
   *
   * @returns {MultiValue}
   */
  filterType(type) {
    this.filterTypes.push(type);
    return this;
  }

  /**
   * Apply all filters.
   */
  applyFilters() {
    this.items = this.originalItems;

    if (this.hasFilters()) {
      this.items = this
        .items
        .filter(value => this.allowedType(value) || this.allowedInstance(value));
    }

    // Apply filters on all nested MultiValue items.
    this.items.forEach((value) => {
      if (value instanceof MultiValue) {
        this.filterInstances.forEach(type => value.filterInstance(type));
        this.filterTypes.forEach(type => value.filterType(type));
        value.applyFilters();
      }
    });
  }

  /**
   * Check if this MultiValue has been filtered.
   */
  hasFilters() {
    return this.filterInstances.length > 0 || this.filterTypes.length > 0;
  }

  /**
   * Check instance.
   *
   * @param {*} value
   */
  allowedInstance(value) {
    let allowedInstance = false;
    if (this.filterInstances.length > 0) {
      allowedInstance = this.filterInstances.find(type => value instanceof type);
    }
    return allowedInstance;
  }

  /**
   * Check constructor name (class).
   *
   * @param {*} value
   */
  allowedType(value) {
    let allowedType = false;
    if (this.filterTypes.length > 0) {
      allowedType = this.filterTypes.find(type => value.constructor.name === type);
    }
    return allowedType;
  }

  /**
   * Reset to original values.
   */
  resetFilters() {
    this.filterInstances = [];
    this.filterTypes = [];
  }

  /**
   * @returns {Array} List of filtered items.
   */
  getItems() {
    this.applyFilters();
    return this.items;
  }
};
