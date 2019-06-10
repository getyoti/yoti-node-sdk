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
   * SignedTimeStamp is the time at which the signature was created.
   * The message associated with the timestamp is the marshaled form of
   * AttributeSigning (i.e. the same message that is signed in the
   * Signature field). This method returns the YotiSignedTimeStamp
   * object, the actual timestamp as a Date object can be called with
   * getTimestamp() on this object.
   *
   * @returns {YotiSignedTimeStamp}
   */
  getSignedTimeStamp() { return this.signedTimeStamp; }

  /**
   * OriginServerCerts are the X.509 certificate chain(DER-encoded ASN.1)
   * from the service that assigned the attribute.
   *
   * The first certificate in the chain holds the public key that can be
   * used to verify the Signature field; any following entries (zero or
   * more) are for intermediate certificate authorities (in order). The
   * last certificate in the chain must be verified against the Yoti root
   * CA certificate.
   *
   * An extension in the first certificate holds the main artifact type,
   * e.g. “PASSPORT”, which can alternatively be retrieved with getValue().
   *
   * @param {Object[]} originServerCerts
   */
  getOriginServerCerts() { return this.originServerCerts; }
}

module.exports = {
  YotiAnchor,
};
