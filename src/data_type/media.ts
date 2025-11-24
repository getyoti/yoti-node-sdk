import Validation = require('../yoti_common/validation');

class Media {
  private content: Buffer;
  private mimeType: string;

  /**
   * @param {Buffer} content
   * @param {string} mimeType
   */
  constructor(content: Buffer, mimeType: string) {
    if (Buffer.isBuffer(content)) {
      this.content = content;
    } else {
      throw new TypeError('content must be of type Buffer');
    }

    Validation.isString(mimeType, 'mimeType');
    this.mimeType = mimeType;
  }

  /**
   * Get the raw image content.
   *
   * @returns {Buffer}
   */
  getContent() {
    return this.content;
  }

  /**
   * Get the base64 image content.
   *
   * @returns {string}
   */
  getBase64Content() {
    return `data:${this.getMimeType()};base64,${this.content.toString('base64')}`;
  }

  /**
   * Get the image mime type.
   *
   * @returns {string}
   */
  getMimeType() {
    return this.mimeType;
  }
}

export default Media;
