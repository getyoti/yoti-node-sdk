'use strict';

const forge = require('node-forge');
const protoRoot = require('../proto-root');

const YotiAnchor = function main(anchorObj) {
  this.value = anchorObj.value;
  this.subType = anchorObj.subType;
  this.signedTimeStamp = anchorObj.signedTimeStamp;
  this.originServerCerts = anchorObj.originServerCerts;
};

YotiAnchor.prototype = {
  getValue() { return this.value; },
  getSubType() { return this.subType; },
  getSignedTimeStamp() { return this.signedTimeStamp; },
  getOriginServerCerts() { return this.originServerCerts; },
};

const YotiSignedTimeStamp = function main (timeStampObj) {
  this.version = timeStampObj.version;
  this.timestamp = timeStampObj.timestamp;
};

YotiSignedTimeStamp.prototype = {
  getVersion() { return this.version; },
  getTimestamp() { return this.timestamp; }
};

module.exports.AnchorProcessor = class AnchorProcessor {
  /**
   * Extract matching Attribute Anchors from list.
   *
   * @param anchors
   *
   * @returns {Array}
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
   * @returns {Array}
   */
  static processSingleAnchor(anchorObj) {
    let anchorsList = this.getResultFormat();

    if (!anchorObj instanceof Object) {
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
   * @param yotiSignedTimeStamp
   * @param X509Certs
   *
   * @returns {Array}
   */
  static getAnchorsByCertificate(certArrayBuffer, subType, yotiSignedTimeStamp, X509Certs) {
    const anchorsList = this.getResultFormat();

    if (!certArrayBuffer) {
      return anchorsList;
    }

    const certificateObj = AnchorProcessor.convertCertToX509(certArrayBuffer);
    const extensionsData = certificateObj.extensions;
    const anchorTypes = this.getAnchorTypes();
    const anchorTypesMap = this.getAnchorTypesMap();

    // Find anchor value for each anchor type => oid
    for (let x = 0; x < anchorTypes.length; x += 1) {
      const anchorType = anchorTypes[x];
      const oid = anchorTypesMap[anchorType];
      const yotiAnchor = this.getAnchorByOid(
        extensionsData,
        subType,
        yotiSignedTimeStamp,
        X509Certs,
        oid
      );

      if (yotiAnchor !== null) {
        anchorsList[anchorType].push(yotiAnchor);
      }
    }
    return anchorsList;
  }

  /**
   * Return YotiAnchor object.
   *
   * @param extensionsData
   * @param subTypeParam
   * @param yotiSignedTimeStamp
   * @param serverX509Certs
   * @param oid
   *
   * @returns {*}
   */
  static getAnchorByOid(extensionsData, subTypeParam, yotiSignedTimeStamp, serverX509Certs, oid) {
    let yotiAnchor = null;
    if (extensionsData && oid) {
      const anchorValue = this.getAnchorValueByOid(extensionsData, oid);
      if (anchorValue !== null) {
        yotiAnchor = new YotiAnchor({
          value: anchorValue,
          subType: subTypeParam,
          signedTimeStamp: yotiSignedTimeStamp,
          originServerCerts: serverX509Certs,
        });
      }
    }
    return yotiAnchor;
  }

  /**
   * Return Anchor value.
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
      const anchorExtension = extensionsData[oidIndex];
      const anchorEncodedValue = anchorExtension.value;
      // Convert Anchor value from ASN.1 format to an object
      const extensionObj = forge.asn1.fromDer(anchorEncodedValue.toString('binary'));
      if (extensionObj) {
        anchorValue = extensionObj.value[0].value;
      }
    }
    return anchorValue;
  }

  /**
   * Return Yoti signedTimeStamp.
   *
   * @param signedTimeStampByteBuffer
   *
   * @returns {main}
   */
  static processSignedTimeStamp(signedTimeStampByteBuffer) {
    const yotiSignedTimeStamp = new YotiSignedTimeStamp({ version: 0, timestamp: 0 });
    const protoInst = protoRoot.initializeProtoBufObjects();

    if (signedTimeStampByteBuffer) {
      const signedTimeStampBuffer = signedTimeStampByteBuffer.toBuffer();
      const signedTimeStamp = protoInst.decodeSignedTimeStamp(signedTimeStampBuffer);
      const strTs = signedTimeStamp.timestamp.toString();
      const tsMicro = Number(strTs);
      const tsMilliSeconds = Math.round(tsMicro/1000);
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
   * @returns {*}
   */
  static mergeAnchorsLists(targetList, sourceList) {
    const anchorTypes = this.getAnchorTypes();

    for (let i = 0; i < anchorTypes.length; i += 1) {
      const anchorType = anchorTypes[i];
      sourceList[anchorType].forEach(yotiAnchorObj => {
        targetList[anchorType].push(yotiAnchorObj);
      });
    }
    return targetList;
  }

  /**
   * Convert certificate list to a list of X509 certificates.
   *
   * @param certificatesList
   *
   * @returns {Array}
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
   * @returns {the|*}
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
      const match = Object.keys(anchorOidObj).reduce(function (soFar, key) {
        return soFar && el[key] === anchorOidObj[key];
      }, true);
      if (match) {
        result = index;
      }
    });
    return result;
  }

  /**
   * @returns {Array}
   */
  static getResultFormat() {
    const resultData = [];
    resultData.sources = [];
    resultData.verifiers = [];
    return resultData;
  }

  static getAnchorTypesMap() {
    return {
      sources: '1.3.6.1.4.1.47127.1.1.1',
      verifiers: '1.3.6.1.4.1.47127.1.1.2',
    };
  }

  /**
   * @returns {string[]}
   */
  static getAnchorTypes() {
    return [
      'sources',
      'verifiers',
    ];
  }
};
