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
    /** @private */
    this.anchors = [];
    /** @private */
    this.softPreference = false;
  }

  /**
   * @typedef {import('./wanted.anchor')} WantedAnchor
   * @param {WantedAnchor} anchor
   * @returns this
   */
  withAnchor(anchor) {
    this.anchors.push(anchor);
    return this;
  }

  /**
   * @param {boolean} softPreference
   * @returns this
   */
  withSoftPreference(softPreference = true) {
    this.softPreference = softPreference;
    return this;
  }

  /**
   * @param {string} value
   * @param {string} subType
   * @returns this
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
   * @returns this
   */
  withPassport(subType = '') {
    return this.withAnchorByValue(ANCHOR_VALUE_PASSPORT, subType);
  }

  /**
   * @param {string} subType
   * @returns this
   */
  withDrivingLicence(subType = '') {
    return this.withAnchorByValue(ANCHOR_VALUE_DRIVING_LICENSE, subType);
  }

  /**
   * @param {string} subType
   * @returns this
   */
  withNationalId(subType = '') {
    return this.withAnchorByValue(ANCHOR_VALUE_NATIONAL_ID, subType);
  }

  /**
   * @param {string} subType
   * @returns this
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
