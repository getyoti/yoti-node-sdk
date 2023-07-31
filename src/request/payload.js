'use strict';

const FormData = require('form-data');
const UploadFaceCaptureImagePayload = require('../idv_service/session/create/face_capture/upload.face.capture.image.payload');
const { ContentType } = require('./constants');

module.exports.Payload = class Payload {
  constructor(data) {
    if (data instanceof UploadFaceCaptureImagePayload) {
      const formData = new FormData();

      formData.append('binary-content', data.getImageContents(), {
        filename: 'face-capture-image',
        contentType: data.getImageContentType(),
      });

      this.data = formData;
      this.contentType = `${ContentType.FORM_DATA}; boundary=${formData.getBoundary()}`;
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
   * Get payload as a Buffer.
   *
   * @returns {Buffer}
   */
  getPayloadDataFormBuffer() {
    return this.data.getBuffer();
  }

  /**
   * Get payload as a Base64 string.
   *
   * @returns {string}
   */
  getBase64Payload() {
    if (this.contentType.includes(ContentType.FORM_DATA)) {
      return this.data.getBuffer().toString('base64');
    }
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
