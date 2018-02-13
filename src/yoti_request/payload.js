'use strict'

exports.Payload = class Payload {
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
    if(typeof data === 'string') {
      data = new Buffer(data).toString('utf8');
    }
    return JSON.stringify(data);
  }

  /**
   * Get payload as a Base64 string.
   *
   * @returns {String}
   */
  getBase64Payload() {
    return new Buffer(this.getPayloadJSON()).toString('base64');
  }

  /**
   * Get raw data.
   *
   * @returns {*}
   */
  getRawData() {
    return this.data;
  }
}