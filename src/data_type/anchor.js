'use strict';

/**
 * A class to represent a Yoti anchor. Anchors are metadata associated
 * to the attribute, which describe how an attribute has been provided
 * to Yoti (SOURCE Anchor) and how it has been verified (VERIFIER Anchor).
 *
 * If an attribute has only one SOURCE Anchor with the value set to
 * "USER_PROVIDED" and zero VERIFIER Anchors, then the attribute
 * is a self-certified one.
 *
 * @class YotiAnchor
 */
class YotiAnchor {
  /**
   * @param {string} type
   * @param {string} value
   * @param {string} subType
   * @param {YotiSignedTimeStamp} signedTimeStamp
   * @param {Object[]} originServerCerts
   */
  constructor(type, value, subType, signedTimeStamp, originServerCerts) {
    this.type = type;
    this.value = value;
    this.subType = subType;
    this.signedTimeStamp = signedTimeStamp;
    this.originServerCerts = originServerCerts;
  }

  /**
   * Gets the type of the given anchor
   *
   * @returns {string}
   */
  getType() { return this.type; }

  /**
   * Gets the value of the given anchor.
   *
   * Among possible options for SOURCE are "USER_PROVIDED", "PASSPORT",
   * "DRIVING_LICENCE", "NATIONAL_ID" and "PASSCARD"
   *
   * Among possible options for VERIFIER are "YOTI_ADMIN", "YOTI_IDENTITY",
   * "YOTI_OTP", "PASSPORT_NFC_SIGNATURE", "ISSUING_AUTHORITY" and
   * "ISSUING_AUTHORITY_PKI".
   *
   * @returns {string}
   */
  getValue() { return this.value; }

  /**
   * SubType is an indicator of any specific processing method, or subcategory,
   * pertaining to an artifact.
   *
   * Examples:
   * - For a passport, this would be either "NFC" or "OCR".
   * - For a national ID, this could be "AADHAAR"
   *
   * @returns {string}
   */
  getSubType() { return this.subType; }

  /**
   * Timestamp applied at the time of Anchor creation.
   *
   * @returns {YotiSignedTimeStamp}
   */
  getSignedTimeStamp() { return this.signedTimeStamp; }

  /**
   * Certificate chain generated when this Anchor was created (attribute value was
   * sourced or verified). Securely encodes the Anchor type and value.
   *
   * @param {Object[]} originServerCerts
   */
  getOriginServerCerts() { return this.originServerCerts; }
}

module.exports = {
  YotiAnchor,
};
