'use strict';

const FormData = require('form-data');
const { ContentType } = require('./constants');

module.exports.Payload = class Payload {
  constructor(data, type = ContentType.JSON) {
    const supportedContentTypes = [ContentType.JSON, ContentType.FORM_DATA];
    if (!supportedContentTypes.includes(type)) {
      throw new Error(`Payload content type must be specified and one of [${supportedContentTypes.join(',')}]`);
    }

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
    switch (this.contentType) {
      case ContentType.FORM_DATA:
        return this.data.getBuffer();
      case ContentType.JSON:
        return JSON.stringify(this.data);
      default:
        console.warn('Unexpected content type!');
        return '';
    }
  }

  /**
   * Get payload as a Base64 string.
   *
   * @returns {string}
   */
  getBase64Payload() {
    let payloadData = this.getPayloadData();
    if (!(payloadData instanceof Buffer)) payloadData = Buffer.from(payloadData);
    return payloadData.toString('base64');
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
