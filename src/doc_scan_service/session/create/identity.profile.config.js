'use strict';

const Validation = require('../../../yoti_common/validation');
const DocScanConstants = require('../../doc.scan.constants');

const acceptedTrustFrameworks = [DocScanConstants.UK_TFIDA];
const acceptedSchemeTypes = [
  DocScanConstants.DBS,
  DocScanConstants.RTW,
  DocScanConstants.RTR,
  DocScanConstants.DBS_RTW,
];
const acceptedObjectiveTypes = [
  DocScanConstants.BASIC,
  DocScanConstants.STANDARD,
  DocScanConstants.ENHANCED,
];

/**
 * The configuration applied when specifying an identity profile
 *
 * @class IdentityProfileConfig
 */
class IdentityProfileConfig {
  /**
   * @param {string} trustFramework
   *   Defines under which trust framework
   *   this identity profile should be verified.
   * @param {Object} scheme
   *   Defines which scheme this identity profile should satisfy.
   *   The scheme must be supported by the specified trust framework otherwise
   *   the request is considered invalid.
   */
  constructor(trustFramework, scheme) {
    Validation.notNullOrEmpty(trustFramework, 'trustFramework');
    Validation.notNullOrEmpty(scheme, 'scheme');

    Validation.oneOf(trustFramework, acceptedTrustFrameworks, 'trustFramework');
    this.trustFramework = trustFramework;

    Validation.oneOf(scheme.type, acceptedSchemeTypes, 'scheme type');

    switch (scheme.type) {
      case DocScanConstants.DBS:
        Validation.notNullOrEmpty(scheme.objective, 'scheme objective');
        break;
      default:
        break;
    }

    if (scheme.objective) {
      Validation.oneOf(scheme.objective, acceptedObjectiveTypes, 'scheme objective');
    }

    this.scheme = scheme;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      trust_framework: this.trustFramework,
      scheme: this.scheme,
    };
  }
}

module.exports = IdentityProfileConfig;
