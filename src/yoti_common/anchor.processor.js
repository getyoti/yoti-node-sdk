'use strict';

const forge = require('node-forge');

const AttributeAnchor = function main(anchorObj) {
  this.value = anchorObj.value;
  this.artifactSignature = anchorObj.artifactSignature;
  this.subType = anchorObj.subType;
  this.signature = anchorObj.signature;
  this.signedTimeStamp = anchorObj.signedTimeStamp;
  this.originServerCerts = anchorObj.originServerCerts;
  this.associatedSource = anchorObj.associatedSource;
};

AttributeAnchor.prototype = {
  getValue() { return this.value; },
  getArtifactSignature() { return this.artifactSignature; },
  getSubType() { return this.subType; },
  getSignature() { return this.signature; },
  getSignedTimeStamp() { return this.signedTimeStamp; },
  getOriginServerCerts() { return this.originServerCerts; },
  getAssociatedSource() { return this.associatedSource; },
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

    let originAnchorObj = {
      value: '',
      artifactSignature: '',
      subType: '',
      signedTimeStamp: '',
      originServerCerts: '',
      associatedSource: '',
    };

    for (let i = 0; i < anchors.length; i += 1) {
      const anchor = anchors[i];
      const certificatesList = anchor.originServerCerts;
      originAnchorObj = Object.assign(originAnchorObj, anchor);

      for (let n = 0; n < certificatesList.length; n += 1) {
        const certArrayBuffer = certificatesList[n];
        const certificateObj = AnchorProcessor.convertCertToX509(certArrayBuffer);
        const extensionsData = certificateObj.extensions;
        const anchorTypes = AnchorProcessor.getAnchorTypes();

        Object.keys(anchorTypes).forEach((key) => {
          const oidIndex = AnchorProcessor.findOidIndex(extensionsData, { id: anchorTypes[key] });
          if (oidIndex !== -1) {
            const anchorObj = extensionsData[oidIndex];
            const anchorValue = anchorObj.value;
            // Convert Anchor value from ASN.1 format to an object
            const anchorValueAsn1 = forge.asn1.fromDer(anchorValue.toString('binary'));
            if (anchorValueAsn1) {
              const anchorParsedValue = anchorValueAsn1.value[0].value;
              // Make sure the anchor values are unique
              if (!anchorsData.processedValues[key].includes(anchorParsedValue)) {
                originAnchorObj.value = anchorParsedValue;
                const originServerCerts = originAnchorObj.originServerCerts;
                const serverX509Certs = AnchorProcessor.convertCertsListToX509(originServerCerts);
                originAnchorObj.originServerCerts = serverX509Certs;
                anchorsData[key].push(new AttributeAnchor(originAnchorObj));
                anchorsData.processedValues[key].push(originAnchorObj.value);
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
