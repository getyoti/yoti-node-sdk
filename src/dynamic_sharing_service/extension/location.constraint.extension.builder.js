'use strict';

const Extension = require('./extension');
const LocationConstraintExtensionContent = require('./location.constraint.extension.content');

const LOCATION_CONSTRAINT = 'LOCATION_CONSTRAINT';

/**
 * Builds location constraint Extension.
 *
 * @class LocationConstraintExtensionBuilder
 */
module.exports = class LocationConstraintExtensionBuilder {
  /**
   * @param {Number} latitude
   */
  withLatitude(latitude) {
    this.latitude = latitude;
    return this;
  }

  /**
   * @param {Number} longitude
   */
  withLongitude(longitude) {
    this.longitude = longitude;
    return this;
  }

  /**
   * @param {Number} radius
   */
  withRadius(radius) {
    this.radius = radius;
    return this;
  }

  /**
   * @param {Number} maxUncertainty
   */
  withMaxUncertainty(maxUncertainty) {
    this.maxUncertainty = maxUncertainty;
    return this;
  }

  /**
   * @returns {Extension} Extension with LocationConstraintExtensionContent content
   */
  build() {
    const content = new LocationConstraintExtensionContent(
      this.latitude,
      this.longitude,
      this.radius,
      this.maxUncertainty
    );
    return new Extension(LOCATION_CONSTRAINT, content);
  }
};
