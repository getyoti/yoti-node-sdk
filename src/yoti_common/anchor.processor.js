'use strict';

const forge = require('node-forge');
const protoRoot = require('../proto-root');
const { YotiAnchor } = require('../data_type/anchor');
const { YotiSignedTimeStamp } = require('../data_type/signed.timestamp');
const { YotiDate } = require('../data_type/date');

/**
 * Mapping of anchor types.
 */
const ANCHOR_TYPES = Object.freeze({
  SOURCE: '1.3.6.1.4.1.47127.1.1.1',
  VERIFIER: '1.3.6.1.4.1.47127.1.1.2',
  UNKNOWN: '',
});

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
   * @returns {Object.<string, YotiAnchor[]>}
   */
  static getAnchorsByCertificate(certArrayBuffer, subType, signedTimestamp, originServerCerts) {
    const anchorsList = this.getResultFormat();

    if (!certArrayBuffer) {
      return anchorsList;
    }

    const extensionsData = AnchorProcessor.convertCertToX509(certArrayBuffer).extensions;

    let yotiAnchor = null;

    const anchorTypes = Object.values(ANCHOR_TYPES);
    for (let x = 0; x < anchorTypes.length; x += 1) {
      const oid = anchorTypes[x];
      yotiAnchor = this.getAnchorByOid(
        extensionsData,
        subType,
        signedTimestamp,
        originServerCerts,
        oid
      );
      if (yotiAnchor !== null) {
        break;
      }
    }

    if (yotiAnchor == null) {
      yotiAnchor = new YotiAnchor('UNKNOWN', '', subType, signedTimestamp, originServerCerts);
    }

    const key = this.getAnchorListKeyByType(yotiAnchor.getType());
    anchorsList[key].push(yotiAnchor);

    return anchorsList;
  }

  /**
   * Return YotiAnchor object for provided oid.
   *
   * @param extensionsData
   * @param subType
   * @param signedTimestamp
   * @param originServerCerts
   * @param oid
   *
   * @returns {*}
   */
  static getAnchorByOid(extensionsData, subType, signedTimestamp, originServerCerts, oid) {
    let yotiAnchor = null;
    if (extensionsData && oid) {
      const extension = this.findExtensionByOid(extensionsData, oid);
      if (extension !== null) {
        yotiAnchor = new YotiAnchor(
          this.getAnchorTypeByOid(oid),
          this.getExtensionValue(extension),
          subType,
          signedTimestamp,
          originServerCerts
        );
      }
    }
    return yotiAnchor;
  }

  /**
   * Return extension for given oid.
   *
   * @param extensionsData
   * @param oid
   *
   * @returns {*}
   */
  static findExtensionByOid(extensionsData, oid) {
    const oidIndex = AnchorProcessor.findOidIndex(extensionsData, { id: oid });
    if (oidIndex !== -1) {
      const anchorExtension = extensionsData[oidIndex];
      const anchorEncodedValue = anchorExtension.value;
      // Convert Anchor value from ASN.1 format to an object
      const extensionObj = forge.asn1.fromDer(anchorEncodedValue.toString('binary'));
      return extensionObj;
    }
    return null;
  }

  /**
   * Return extension value.
   *
   * @param extension
   *
   * @returns {string}
   */
  static getExtensionValue(extension) {
    return extension.value[0].value;
  }

  /**
   * Return Anchor value.
   *
   * @deprecated no longer in use.
   *
   * @param extensionsData
   * @param oid
   *
   * @returns {string}
   */
  static getAnchorValueByOid(extensionsData, oid) {
    let anchorValue = null;

    const extension = this.getExtensionByOid(extensionsData, oid);
    if (extension) {
      anchorValue = this.getExtensionValue(extension);
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
      version = signedTimestamp.getVersion();
      timestamp = new YotiDate(Number(signedTimestamp.timestamp.toString()));
    }
    return new YotiSignedTimeStamp(version, timestamp);
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
      .find(key => oid === ANCHOR_TYPES[key]);
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
