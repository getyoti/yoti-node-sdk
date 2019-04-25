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
   * @returns {string}
   */
  getShareUrl() {
    return this.shareUrl;
  }

  /**
   * @returns {string}
   */
  getRefId() {
    return this.refId;
  }
};
