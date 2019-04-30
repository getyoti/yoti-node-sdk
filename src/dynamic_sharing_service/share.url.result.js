'use strict';

const Validation = require('../yoti_common/validation');

/**
 * The share result, containing the share URL
 * and ref ID.
 *
 * @class ShareUrlResult
 */
module.exports = class ShareUrlResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isString(response.qrcode, 'QR Code URL');
    this.shareUrl = response.qrcode;

    Validation.isString(response.ref_id, 'Ref ID');
    this.refId = response.ref_id;
  }

  /**
   * The URL that the 3rd party should use for the share.
   *
   * @returns {string} The share URL
   */
  getShareUrl() {
    return this.shareUrl;
  }

  /**
   * Get the Yoti reference id for the share.
   *
   * @returns {string} reference id for the share
   */
  getRefId() {
    return this.refId;
  }
};
