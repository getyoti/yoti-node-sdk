'use strict';

const forge = require('node-forge');

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
    for (let i = 0; i < anchors.length; i++) {
      let anchor = anchors[i];
      let certificateList = anchor.originServerCerts;

      for (let n = 0; n < certificateList.length; n++) {
        let certArrayBuffer = certificateList[n];
        let certBuffer = certArrayBuffer.toBuffer();
        let anchorAsn1Obj = forge.asn1.fromDer(certBuffer.toString('binary'));
        let certificateObj = forge.pki.certificateFromAsn1(anchorAsn1Obj);
        let extensionsData = certificateObj.extensions;
        let anchorTypes = this.getAnchorTypes();

        Object.keys(anchorTypes).forEach(function(key) {
          let oidIndex = AnchorProcessor.findOidIndex(extensionsData, {id: anchorTypes[key]});
          if (oidIndex !== -1) {
            let anchorObj = extensionsData[oidIndex];
            let anchorValue = anchorObj.value;
            // Convert Anchor value from ASN.1 format to a binary
            let anchorValueAsn1 = forge.asn1.fromDer(anchorValue.toString('binary'));
            /*if (anchorsData[key] === undefined) {
              anchorsData[key] = [];
            }*/
            if (anchorValueAsn1) {
              anchorsData[key].push(anchorValueAsn1.value[0].value);
            }
          }
        }, anchorsData);
      } // End for loop
    } // End for loop

    return anchorsData;
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