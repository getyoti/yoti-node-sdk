'use strict';

const Validation = require('../../../yoti_common/validation');

class SearchConfigResponse {
  constructor(searchConfig) {
    if (searchConfig.categories) {
      Validation.isArrayOfStrings(searchConfig.categories, 'categories');
      this.categories = searchConfig.categories;
    } else {
      this.categories = [];
    }
  }

  /**
   * @returns {string[]}
   */
  getCategories() {
    return this.categories;
  }
}

module.exports = SearchConfigResponse;
