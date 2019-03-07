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
   */
  filterInstance(type) {
    this.filterInstances.push(type);
    return this;
  }

  /**
   * Filter values by their constructor name.
   *
   * @param {String} type
   */
  filterType(type) {
    this.filterTypes.push(type);
    return this;
  }

  /**
   * Apply all filters.
   */
  applyFilters() {
    this.items = this.originalItems.filter((value) => {
      // Allow value if no filters have been applied.
      if (this.filterInstances.length === 0 && this.filterTypes.length === 0) {
        return true;
      }

      // Check instance.
      let allowedInstance = false;
      if (this.filterInstances.length > 0) {
        allowedInstance = this.filterInstances.find(type => value instanceof type);
      }

      // Check constructor name (class).
      let allowedType = false;
      if (this.filterTypes.length > 0) {
        allowedType = this.filterTypes.find(type => value.constructor.name === type);
      }

      return allowedType || allowedInstance;
    });

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
