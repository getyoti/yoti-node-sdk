'use strict';

const forge = require('node-forge');
const protoRoot = require('../proto-root');

/**
 * Mapping of anchor types.
 */
const ANCHOR_TYPES = Object.freeze({
  SOURCE: '1.3.6.1.4.1.47127.1.1.1',
  VERIFIER: '1.3.6.1.4.1.47127.1.1.2',
  UNKNOWN: '',
});

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
  constructor(anchorObj) {
    this.type = anchorObj.type;
    this.value = anchorObj.value;
    this.subType = anchorObj.subType;
    this.signedTimeStamp = anchorObj.signedTimeStamp;
    this.originServerCerts = anchorObj.originServerCerts;
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
   * For SOURCE this can be "USER_PROVIDED", "PASSPORT",
   * "DRIVING_LICENCE" or "AADHAAR".
   *
   * For VERIFIER this can be "YOTI_ADMIN", "YOTI_IDENTITY", "YOTI_OTP",
   * "YOTI_UIDAI" or "PASSPORT_NFC_SIGNATURE".
   *
   * @returns {string}
   */
  getValue() { return this.value; }


  /**
   * SubType is an indicator of any specific processing method, or subcategory,
   * pertaining to an artifact. For example, for a passport, this would be
   * either "NFC" or "OCR".
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
   */
  getOriginServerCerts() { return this.originServerCerts; }
}

/**
 * SignedTimestamp is a timestamp associated with a message that has a
 * cryptographic signature proving that it was issued by the correct authority.
 *
 * @class YotiSignedTimeStamp
 */
class YotiSignedTimeStamp {
  constructor(timeStampObj) {
    this.version = timeStampObj.version;
    this.timestamp = timeStampObj.timestamp;
  }

  /**
   * Version indicates how the digests within this object are calculated.
   *
   * @returns {number}
   */
  getVersion() { return this.version; }

  /**
   * The actual timestamp with microsecond-level accuracy.
   *
   * @returns {Date}
   */
  getTimestamp() { return this.timestamp; }
}

/**
 * Creates anchor list from certificates.
 *
 * @class AnchorProcessor
 */
class AnchorProcessor {
  /**
   * Extract matching Attribute Anchors from list.
   *
   * @param anchors
   *
   * @returns {YotiAnchor[]}
   */
  static process(anchors) {
    // This will contain a list of anchor values as objects
    let anchorsData = this.getResultFormat();
    for (let i = 0; i < anchors.length; i += 1) {
      const yotiAnchorsList = this.processSingleAnchor(anchors[i]);
      anchorsData = this.mergeAnchorsLists(anchorsData, yotiAnchorsList);
    }
    return anchorsData;
  }

  /**
   * Return YotiAnchors list from a protobuf anchor.
   *
   * @param anchorObj
   *
   * @returns {YotiAnchor[]}
   */
  static processSingleAnchor(anchorObj) {
    let anchorsList = this.getResultFormat();

    if (!(anchorObj instanceof Object)) {
      return anchorsList;
    }

    const certificatesList = anchorObj.originServerCerts;
    const yotiSignedTimestamp = this.processSignedTimeStamp(anchorObj.getSignedTimeStamp());
    const serverX509Certs = AnchorProcessor.convertCertsListToX509(anchorObj.originServerCerts);
    const subType = anchorObj.getSubType();

    for (let j = 0; j < certificatesList.length; j += 1) {
      const certAnchors = this.getAnchorsByCertificate(
        certificatesList[j],
        subType,
        yotiSignedTimestamp,
        serverX509Certs
      );
      anchorsList = this.mergeAnchorsLists(anchorsList, certAnchors);
    }

    return anchorsList;
  }

  /**
   * Get anchors from a single certificate.
   *
   * @param certArrayBuffer
   * @param subType
   * @param signedTimestamp
   * @param originServerCerts
   *
   * @returns {YotiAnchor[]}
   */
  static getAnchorsByCertificate(certArrayBuffer, subType, signedTimestamp, originServerCerts) {
    const anchorsList = this.getResultFormat();

    if (!certArrayBuffer) {
      return anchorsList;
    }

    const certificateObj = AnchorProcessor.convertCertToX509(certArrayBuffer);
    const extensionsData = certificateObj.extensions;

    // Find anchor value for each anchor extension.
    extensionsData.forEach((anchorExtension) => {
      const anchorType = this.getAnchorTypeByOid(anchorExtension.id);
      const anchorValue = ANCHOR_TYPES[anchorType] ? this.getAnchorValue(anchorExtension) : '';
      const yotiAnchor = new YotiAnchor({
        type: anchorType,
        value: anchorValue,
        subType,
        signedTimeStamp: signedTimestamp,
        originServerCerts,
      });

      const anchorListKey = this.getAnchorListKeyByType(anchorType);
      anchorsList[anchorListKey].push(yotiAnchor);
    });

    return anchorsList;
  }

  /**
   * Return YotiAnchor object for provided oid.
   *
   * @deprecated no longer in use.
   *
   * @param extensionsData
   * @param subType
   * @param signedTimestamp
   * @param originServerCerts
   * @param oid
   *
   * @returns {YotiAnchor|null}
   */
  static getAnchorByOid(extensionsData, subType, signedTimestamp, originServerCerts, oid) {
    let yotiAnchor = null;
    if (extensionsData && oid) {
      const anchorValue = this.getAnchorValueByOid(extensionsData, oid);
      if (anchorValue !== null) {
        yotiAnchor = new YotiAnchor({
          value: anchorValue,
          subType,
          signedTimeStamp: signedTimestamp,
          originServerCerts,
        });
      }
    }
    return yotiAnchor;
  }

  /**
   * Return Anchor value for provided oid.
   *
   * @deprecated no longer in use.
   *
   * @param extensionsData
   * @param oid
   *
   * @returns {*}
   */
  static getAnchorValueByOid(extensionsData, oid) {
    let anchorValue = null;

    const oidIndex = AnchorProcessor.findOidIndex(extensionsData, { id: oid });
    if (oidIndex !== -1) {
      anchorValue = this.getAnchorValue(extensionsData[oidIndex]);
    }
    return anchorValue;
  }

  /**
   * Return Anchor value for anchor extension.
   *
   * @param anchorExtension
   *
   * @returns {string}
   */
  static getAnchorValue(anchorExtension) {
    let anchorValue = '';
    // Convert Anchor value from ASN.1 format to an object
    const extensionObj = forge.asn1.fromDer(anchorExtension.value.toString('binary'));
    if (extensionObj) {
      anchorValue = extensionObj.value[0].value;
    }
    return anchorValue;
  }

  /**
   * Return Yoti signedTimestamp.
   *
   * @param signedTimestampByteBuffer
   *
   * @returns {YotiSignedTimeStamp}
   */
  static processSignedTimeStamp(signedTimestampByteBuffer) {
    let version = 0;
    let timestamp = 0;
    const protoInst = protoRoot.initializeProtoBufObjects();

    if (signedTimestampByteBuffer) {
      const signedTimestampBuffer = signedTimestampByteBuffer.toBuffer();
      const signedTimestamp = protoInst.decodeSignedTimeStamp(signedTimestampBuffer);
      const strTs = signedTimestamp.timestamp.toString();
      const tsMicro = Number(strTs);
      const tsMilliSeconds = Math.round(tsMicro / 1000);
      const dateTime = new Date(tsMilliSeconds);

      version = signedTimestamp.getVersion();
      timestamp = dateTime;
    }
    return new YotiSignedTimeStamp({ version, timestamp });
  }

  /**
   * Merge arrays by anchor type.
   *
   * @param targetList
   * @param sourceList
   * @returns {YotiAnchor[]}
   */
  static mergeAnchorsLists(targetList, sourceList) {
    this.getAnchorTypes().forEach((anchorType) => {
      sourceList[anchorType].forEach((yotiAnchorObj) => {
        targetList[anchorType].push(yotiAnchorObj);
      });
    });
    return targetList;
  }

  /**
   * Convert certificate list to a list of X509 certificates.
   *
   * @param certificatesList
   *
   * @returns {Certificate[]}
   */
  static convertCertsListToX509(certificatesList) {
    const X509Certificates = [];
    for (let j = 0; j < certificatesList.length; j += 1) {
      const certificateObj = AnchorProcessor.convertCertToX509(certificatesList[j]);
      if (certificateObj) {
        X509Certificates.push(certificateObj);
      }
    }
    return X509Certificates;
  }

  /**
   * Convert certificate from byte arrays to X509 certificate.
   *
   * @param certArrayBuffer
   *
   * @returns {Certificate}
   */
  static convertCertToX509(certArrayBuffer) {
    const certBuffer = certArrayBuffer.toBuffer();
    const anchorAsn1Obj = forge.asn1.fromDer(certBuffer.toString('binary'));
    return forge.pki.certificateFromAsn1(anchorAsn1Obj);
  }

  /**
   * Returns the elem index or -1 if it doesn't find any.
   *
   * @deprecated no longer in use.
   *
   * @param array
   * @param anchorOidObj
   *
   * @returns {number}
   */
  static findOidIndex(array, anchorOidObj) {
    let result = -1;
    array.forEach((el, index) => {
      const match = Object.keys(anchorOidObj).reduce(
        (soFar, key) => soFar && el[key] === anchorOidObj[key],
        true
      );
      if (match) {
        result = index;
      }
    });
    return result;
  }

  /**
   * @returns {Object}
   */
  static getResultFormat() {
    return this.getAnchorTypes().reduce((acc, current) => {
      acc[current] = [];
      return acc;
    }, {});
  }

  /**
   * Map of anchor list keys to oids.
   *
   * @returns {Object}
   */
  static getAnchorTypesMap() {
    return {
      sources: ANCHOR_TYPES.SOURCE,
      verifiers: ANCHOR_TYPES.VERIFIER,
      unknown: ANCHOR_TYPES.UNKNOWN,
    };
  }

  /**
   * Get anchor list key by type.
   *
   * @param {string} type
   */
  static getAnchorListKeyByType(type) {
    const anchorTypesMap = this.getAnchorTypesMap();
    return Object.keys(anchorTypesMap)
      .find(key => ANCHOR_TYPES[type] === anchorTypesMap[key]);
  }

  /**
   * Get anchor type by oid.
   *
   * @param {string} oid
   */
  static getAnchorTypeByOid(oid) {
    return Object.keys(ANCHOR_TYPES)
      .find(key => oid === ANCHOR_TYPES[key]) || 'UNKNOWN';
  }

  /**
   * List of anchor list keys.
   *
   * @returns {string[]}
   */
  static getAnchorTypes() {
    return Object.keys(this.getAnchorTypesMap());
  }
}

module.exports = {
  AnchorProcessor,
};
