'use strict'

exports.Country = class Country {
  constructor (code) {
    this.code = code;
  }

  getCode () {
    return this.code;
  }

  setCode (code) {
    this.code = code;
  }
}