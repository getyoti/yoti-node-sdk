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
  getArtifactSignature() { this.artifactSignature; },
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
    const anchorsData = [];
    anchorsData['sources'] = [];
    anchorsData['verifiers'] = [];
    let originAnchorObj = {
      'value': '',
      'artifactSignature': '',
      'subType': '',
      'signedTimeStamp': '',
      'originServerCerts': '',
      'associatedSource': '',
    };

    for (let i = 0; i < anchors.length; i++) {
      let anchor = anchors[i];
      let certificatesList = anchor.originServerCerts;
      originAnchorObj = Object.assign(originAnchorObj, anchor);

      for (let n = 0; n < certificatesList.length; n++) {
        let certArrayBuffer = certificatesList[n];
        let certificateObj = AnchorProcessor.convertCertToX509(certArrayBuffer);
        let extensionsData = certificateObj.extensions;
        let anchorTypes = AnchorProcessor.getAnchorTypes();

        Object.keys(anchorTypes).forEach(function(key) {
          let oidIndex = AnchorProcessor.findOidIndex(extensionsData, {id: anchorTypes[key]});
          if (oidIndex !== -1) {
            let anchorObj = extensionsData[oidIndex];
            let anchorValue = anchorObj.value;
            // Convert Anchor value from ASN.1 format to an object
            let anchorValueAsn1 = forge.asn1.fromDer(anchorValue.toString('binary'));
            if (anchorValueAsn1) {
              originAnchorObj.value = anchorValueAsn1.value[0].value;
              originAnchorObj.originServerCerts = AnchorProcessor.convertCertsListToX509(originAnchorObj.originServerCerts);
              anchorsData[key].push(new AttributeAnchor(originAnchorObj));
            }
          }
        }, anchorsData);
      } // End for loop
    } // End for loop
    return anchorsData;
  }

  /**
   * Convert certificate list to a list of X509 certificates.
   *
   * @param certificatesList
   *
   * @returns {Array}
   */
  static convertCertsListToX509(certificatesList) {
    let X509Certificates = [];
    for (let c = 0; c < certificatesList.length; c++) {
      let certificateObj = AnchorProcessor.convertCertToX509(certificatesList[c]);
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
    let certBuffer = certArrayBuffer.toBuffer();
    let anchorAsn1Obj = forge.asn1.fromDer(certBuffer.toString('binary'));
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
    array.forEach(function(el, index) {
      let match = Object.keys(anchorOidObj).reduce(function(soFar, key) {
        return soFar && el[key] === anchorOidObj[key];
      }, true);
      if(match) {

        result = index;
      }
    });
    return result;
  }

  static getAnchorTypes() {
    const types = {};
    types['sources'] = '1.3.6.1.4.1.47127.1.1.1';
    types['verifiers'] = '1.3.6.1.4.1.47127.1.1.2';

    return types;
  }
};