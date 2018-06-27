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
    const anchorsData = {
      sources: [],
      verifiers: [],
      processedValues: { // This is used to make sure the anchors values are unique
        sources: [],
        verifiers: [],
      },
    };

    let anchorObj = {
      value: '',
      subType: '',
      signedTimeStamp: '',
      originServerCerts: '',
    };

    for (let i = 0; i < anchors.length; i += 1) {
      const protoAnchor = anchors[i];
      const certificatesList = protoAnchor.originServerCerts;

      anchorObj = Object.assign(anchorObj, protoAnchor);
      anchorObj.signedTimeStamp = this.processSignedTimeStamp(protoAnchor.getSignedTimeStamp());

      for (let n = 0; n < certificatesList.length; n += 1) {
        const certArrayBuffer = certificatesList[n];
        const certificateObj = AnchorProcessor.convertCertToX509(certArrayBuffer);
        const extensionsData = certificateObj.extensions;
        const anchorTypes = AnchorProcessor.getAnchorTypes();

        Object.keys(anchorTypes).forEach((key) => {
          const oidIndex = AnchorProcessor.findOidIndex(extensionsData, { id: anchorTypes[key] });
          if (oidIndex !== -1) {
            const anchorExtension = extensionsData[oidIndex];
            const anchorValue = anchorExtension.value;
            // Convert Anchor value from ASN.1 format to an object
            const extensionObj = forge.asn1.fromDer(anchorValue.toString('binary'));
            if (extensionObj) {
              const anchorParsedValue = extensionObj.value[0].value;
              // Make sure the anchor values are unique
              if (!anchorsData.processedValues[key].includes(anchorParsedValue)) {
                anchorObj.value = anchorParsedValue;
                const originServerCerts = anchorObj.originServerCerts;
                const serverX509Certs = AnchorProcessor.convertCertsListToX509(originServerCerts);
                anchorObj.originServerCerts = serverX509Certs;
                anchorsData[key].push(new YotiAnchor(anchorObj));
                anchorsData.processedValues[key].push(anchorObj.value);
              }
            }
          }
        }, anchorsData);
      }
    }
    const resultData = [];
    resultData.sources = anchorsData.sources;
    resultData.verifiers = anchorsData.verifiers;
    return resultData;
  }

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
   * Convert certificate list to a list of X509 certificates.
   *
   * @param certificatesList
   *
   * @returns {Array}
   */
  static convertCertsListToX509(certificatesList) {
    const X509Certificates = [];
    for (let c = 0; c < certificatesList.length; c += 1) {
      const certificateObj = AnchorProcessor.convertCertToX509(certificatesList[c]);
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

  static getAnchorTypes() {
    const types = {};
    types.sources = '1.3.6.1.4.1.47127.1.1.1';
    types.verifiers = '1.3.6.1.4.1.47127.1.1.2';

    return types;
  }
};
