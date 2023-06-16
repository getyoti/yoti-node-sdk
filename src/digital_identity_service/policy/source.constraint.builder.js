'use strict';

const SourceConstraint = require('./source.constraint');
const WantedAnchorBuilder = require('./wanted.anchor.builder');

const ANCHOR_VALUE_PASSPORT = 'PASSPORT';
const ANCHOR_VALUE_DRIVING_LICENSE = 'DRIVING_LICENCE';
const ANCHOR_VALUE_NATIONAL_ID = 'NATIONAL_ID';
const ANCHOR_VALUE_PASSCARD = 'PASS_CARD';

/**
 * Builder for SourceConstraint.
 *
 * @class SourceConstraintBuilder
 */
module.exports = class SourceConstraintBuilder {
  /**
   * Set default properties.
   */
  constructor() {
    this.anchors = [];
    this.softPreference = false;
  }

  /**
   * @param {WantedAnchor} anchor
   */
  withAnchor(anchor) {
    this.anchors.push(anchor);
    return this;
  }

  /**
   * @param {boolean} softPreference
   */
  withSoftPreference(softPreference = true) {
    this.softPreference = softPreference;
    return this;
  }

  /**
   * @param {string} value
   * @param {string} subType
   */
  withAnchorByValue(value, subType = '') {
    const anchor = new WantedAnchorBuilder()
      .withValue(value)
      .withSubType(subType)
      .build();
    this.anchors.push(anchor);
    return this;
  }

  /**
   * @param {string} subType
   */
  withPassport(subType = '') {
    return this.withAnchorByValue(ANCHOR_VALUE_PASSPORT, subType);
  }

  /**
   * @param {string} subType
   */
  withDrivingLicence(subType = '') {
    return this.withAnchorByValue(ANCHOR_VALUE_DRIVING_LICENSE, subType);
  }

  /**
   * @param {string} subType
   */
  withNationalId(subType = '') {
    return this.withAnchorByValue(ANCHOR_VALUE_NATIONAL_ID, subType);
  }

  /**
   * @param {string} subType
   */
  withPasscard(subType = '') {
    return this.withAnchorByValue(ANCHOR_VALUE_PASSCARD, subType);
  }

  /**
   * @returns {SourceConstraint}
   */
  build() {
    return new SourceConstraint(this.anchors, this.softPreference);
  }
};
