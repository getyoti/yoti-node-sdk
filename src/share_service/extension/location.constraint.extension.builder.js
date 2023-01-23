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
   * Allows you to specify the Latitude of the user's expected location
   *
   * @param {Number} latitude
   *
   * @returns {LocationConstraintExtensionBuilder}
   */
  withLatitude(latitude) {
    this.latitude = latitude;
    return this;
  }

  /**
   * Allows you to specify the Longitude of the user's expected location
   *
   * @param {Number} longitude
   *
   * @returns {LocationConstraintExtensionBuilder}
   */
  withLongitude(longitude) {
    this.longitude = longitude;
    return this;
  }

  /**
   * Radius of the circle, centred on the specified location coordinates, where the device is
   * allowed to perform the share.
   *
   * If not provided, a default value of 150m will be used.
   *
   * @param {Number} radius The allowable distance, in metres, from the given lat/long location
   *
   * @returns {LocationConstraintExtensionBuilder}
   */
  withRadius(radius) {
    this.radius = radius;
    return this;
  }

  /**
   * Maximum acceptable distance, in metres, of the area of uncertainty associated with the device
   * location coordinates.
   *
   * If not provided, a default value of 150m will be used.
   *
   * @param {Number} maxUncertainty Maximum allowed measurement uncertainty, in metres
   *
   * @returns {LocationConstraintExtensionBuilder}
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
