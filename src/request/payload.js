'use strict';

const Buffer = require('safe-buffer').Buffer;

module.exports.Payload = class Payload {
  constructor(data) {
    this.data = data;
  }

  /**
   * Get payload as a JSON string.
   *
   * @returns {string}
   */
  getPayloadJSON() {
    let data = this.data;
    if (typeof data === 'string') {
      data = Buffer.from(data, 'utf8');
    }
    return JSON.stringify(data);
  }

  /**
   * Get payload as a Base64 string.
   *
   * @returns {string}
   */
  getBase64Payload() {
    return Buffer.from(this.getPayloadJSON()).toString('base64');
  }

  /**
   * Get raw data.
   *
   * @returns {*}
   */
  getRawData() {
    return this.data;
  }
};
