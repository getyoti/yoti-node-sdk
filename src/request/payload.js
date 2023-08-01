'use strict';

const FormData = require('form-data');
const { ContentType } = require('./constants');

module.exports.Payload = class Payload {
  constructor(data, type = ContentType.JSON) {
    if (type === ContentType.FORM_DATA) {
      const formData = new FormData();

      const fields = data.getFormDataFields();

      fields.forEach(({ name, value, options }) => {
        formData.append(name, value, options);
      });

      this.contentType = ContentType.FORM_DATA;
      this.data = formData;
    } else {
      this.contentType = ContentType.JSON;
      this.data = data;
    }
  }

  /**
   * Get content type.
   *
   * @returns {string}
   */
  getContentType() {
    return this.contentType;
  }

  /**
   * Get payload as a Buffer or as a string.
   *
   * @returns {Buffer | string}
   */
  getPayloadData() {
    if (this.contentType === ContentType.FORM_DATA) {
      return this.data.getBuffer();
    }

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
    if (this.contentType === ContentType.FORM_DATA) {
      return this.data.getBuffer().toString('base64');
    }
    return Buffer.from(this.getPayloadData()).toString('base64');
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
