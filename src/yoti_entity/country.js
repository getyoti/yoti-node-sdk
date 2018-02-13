'use strict'

exports.Country = class Country {
  constructor (code) {
    this.code = code;
  }

  /**
   * Get country code.
   *
   * @returns {string}
   */
  getCode () {
    return this.code;
  }

  /**
   * Set country code.
   *
   * @param code
   */
  setCode (code) {
    this.code = code;
  }
}