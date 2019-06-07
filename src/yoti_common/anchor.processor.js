'use strict';

const forge = require('node-forge');
const protoRoot = require('../proto-root');

/**
 * Determines anchor type based on oid.
 *
 * @class AnchorType
 */
class AnchorType {
  constructor(oid) {
    const mappings = this.constructor.getMappings();

    this.key = this.constructor.getKeys()
      .find(key => oid === mappings[key].oid) || 'unknown';

    this.mapping = mappings[this.getKey()];
  }

  /**
   * The oid for this anchor type.
   *
   * @returns {string}
   */
  getOid() { return this.mapping.oid; }

  /**
   * The name for this anchor type.
   *
   * @returns {string} SOURCE, VERIFIER or UNKNOWN
   */
  getName() { return this.mapping.name; }

  /**
   * The key for this anchor type.
   *
   * @returns {string} sources, verifiers or unknown
   */
  getKey() { return this.key; }

  /**
   * List of all anchor types.
   *
   * @returns {AnchorType[]}
   */
  static getAll() {
    return this.getKeys().reduce((acc, current) => {
      acc.push(new AnchorType(this.getMappings()[current].oid));
      return acc;
    }, []);
  }

  /**
   * List of all anchor type keys.
   *
   * @returns {string[]}
   */
  static getKeys() {
    return Object.keys(this.getMappings());
  }

  /**
   * Mapping anchor types to oid and name.
   *
   * @returns {Object} Frozen mapping object.
   */
  static getMappings() {
    return Object.freeze({
      sources: {
        oid: '1.3.6.1.4.1.47127.1.1.1',
        name: 'SOURCE',
      },
      verifiers: {
        oid: '1.3.6.1.4.1.47127.1.1.2',
        name: 'VERIFIER',
      },
      unknown: {
        oid: '',
        name: 'UNKNOWN',
      },
    });
  }
}

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
    const yotiSignedTimeStamp = this.processSignedTimeStamp(anchorObj.getSignedTimeStamp());
    const serverX509Certs = AnchorProcessor.convertCertsListToX509(anchorObj.originServerCerts);
    const subType = anchorObj.getSubType();

    for (let j = 0; j < certificatesList.length; j += 1) {
      const certAnchors = this.getAnchorsByCertificate(
        certificatesList[j],
        subType,
        yotiSignedTimeStamp,
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
   * @param signedTimeStamp
   * @param originServerCerts
   *
   * @returns {YotiAnchor[]}
   */
  static getAnchorsByCertificate(certArrayBuffer, subType, signedTimeStamp, originServerCerts) {
    const anchorsList = this.getResultFormat();

    if (!certArrayBuffer) {
      return anchorsList;
    }

    const certificateObj = AnchorProcessor.convertCertToX509(certArrayBuffer);
    const extensionsData = certificateObj.extensions;

    // Find anchor value for each anchor extension.
    extensionsData.forEach((anchorExtension) => {
      const anchorType = new AnchorType(anchorExtension.id);
      const anchorValue = anchorType.getOid() ? this.getAnchorValue(anchorExtension) : '';
      const yotiAnchor = new YotiAnchor({
        type: anchorType.getName(),
        value: anchorValue,
        subType,
        signedTimeStamp,
        originServerCerts,
      });
      anchorsList[anchorType.getKey()].push(yotiAnchor);
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
   * @param signedTimeStamp
   * @param originServerCerts
   * @param oid
   *
   * @returns {YotiAnchor|null}
   */
  static getAnchorByOid(extensionsData, subType, signedTimeStamp, originServerCerts, oid) {
    let yotiAnchor = null;
    if (extensionsData && oid) {
      const anchorValue = this.getAnchorValueByOid(extensionsData, oid);
      if (anchorValue !== null) {
        yotiAnchor = new YotiAnchor({
          value: anchorValue,
          subType,
          signedTimeStamp,
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
   * Return Yoti signedTimeStamp.
   *
   * @param signedTimeStampByteBuffer
   *
   * @returns {YotiSignedTimeStamp}
   */
  static processSignedTimeStamp(signedTimeStampByteBuffer) {
    const yotiSignedTimeStamp = new YotiSignedTimeStamp({ version: 0, timestamp: 0 });
    const protoInst = protoRoot.initializeProtoBufObjects();

    if (signedTimeStampByteBuffer) {
      const signedTimeStampBuffer = signedTimeStampByteBuffer.toBuffer();
      const signedTimeStamp = protoInst.decodeSignedTimeStamp(signedTimeStampBuffer);
      const strTs = signedTimeStamp.timestamp.toString();
      const tsMicro = Number(strTs);
      const tsMilliSeconds = Math.round(tsMicro / 1000);
      const dateTime = new Date(tsMilliSeconds);

      yotiSignedTimeStamp.version = signedTimeStamp.getVersion();
      yotiSignedTimeStamp.timestamp = dateTime;
    }
    return yotiSignedTimeStamp;
  }

  /**
   * Merge arrays by anchor type.
   *
   * @param targetList
   * @param sourceList
   * @returns {YotiAnchor[]}
   */
  static mergeAnchorsLists(targetList, sourceList) {
    AnchorType.getKeys().forEach((anchorType) => {
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
    return AnchorType.getKeys().reduce((acc, current) => {
      acc[current] = [];
      return acc;
    }, {});
  }

  /**
   * @deprecated replaced by AnchorType class.
   *
   * @returns {Object}
   */
  static getAnchorTypesMap() {
    return AnchorType.getAll().reduce((acc, anchorType) => {
      acc[anchorType.getKey()] = anchorType.getOid();
      return acc;
    }, {});
  }

  /**
   * @deprecated replaced by AnchorType class.
   *
   * @returns {string[]}
   */
  static getAnchorTypes() {
    return AnchorType.getKeys();
  }
}

module.exports = {
  AnchorProcessor,
};
