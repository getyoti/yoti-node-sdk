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
    this.allowedInstances = [];
    this.allowedTypes = [];
  }

  /**
   * Allow values by their instance type.
   *
   * @param {*} type
   *
   * @returns {MultiValue}
   */
  allowInstance(type) {
    this.allowedInstances.push(type);
    return this;
  }

  /**
   * Allow values by their constructor name.
   *
   * @param {String} type
   *
   * @returns {MultiValue}
   */
  allowType(type) {
    this.allowedTypes.push(type);
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
        .filter((value) => this.isAllowedType(value) || this.isAllowedInstance(value));
    }

    // Apply filters on all nested MultiValue items.
    this.items.forEach((value) => {
      if (value instanceof MultiValue) {
        this.allowedInstances.forEach((type) => value.allowInstance(type));
        this.allowedTypes.forEach((type) => value.allowType(type));
        value.applyFilters();
      }
    });
  }

  /**
   * Check if this MultiValue has been filtered.
   */
  hasFilters() {
    return this.allowedInstances.length > 0 || this.allowedTypes.length > 0;
  }

  /**
   * Check instance.
   *
   * @param {*} value
   */
  isAllowedInstance(value) {
    let allowedInstance = false;
    if (this.allowedInstances.length > 0) {
      allowedInstance = this.allowedInstances.find((type) => value instanceof type);
    }
    return allowedInstance;
  }

  /**
   * Check constructor name (class).
   *
   * @param {*} value
   */
  isAllowedType(value) {
    let allowedType = false;
    if (this.allowedTypes.length > 0) {
      allowedType = this.allowedTypes.find((type) => value.constructor.name === type);
    }
    return allowedType;
  }

  /**
   * @returns {Array} List of filtered items.
   */
  getItems() {
    this.applyFilters();
    return Object.freeze(this.items);
  }
};
