'use strict';

const Validation = require('../../yoti_common/validation');

/**
 * Defines a device location.
 *
 * @class DeviceLocation
 */
class DeviceLocation {
  /**
   * @param {Number} latitude
   * @param {Number} longitude
   * @param {Number} radius
   * @param {Number} maxUncertainty
   */
  constructor(latitude, longitude, radius = 150, maxUncertainty = 150) {
    Validation.withinRange(latitude, -90, 90, 'latitude');
    this.latitude = latitude;

    Validation.withinRange(longitude, -180, 180, 'longitude');
    this.longitude = longitude;

    Validation.notLessThan(radius, 0, 'radius');
    this.radius = radius;

    Validation.notLessThan(maxUncertainty, 0, 'maxUncertainty');
    this.maxUncertainty = maxUncertainty;
  }

  /**
   * @returns {Number} Latitude of the user's expected location
   */
  getLatitude() {
    return this.latitude;
  }

  /**
   * @returns {Number} Longitude of the user's expected location
   */
  getLongitude() {
    return this.longitude;
  }

  /**
   * @returns {Number} Radius of the circle, centred on the specified location
   *   coordinates, where the device is allowed to perform the share
   */
  getRadius() {
    return this.radius;
  }

  /**
   * @returns {Number} Maximum acceptable distance, in metres, of the area of
   *   uncertainty associated with the device location coordinates.
   */
  getMaxUncertainty() {
    return this.maxUncertainty;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      latitude: this.getLatitude(),
      longitude: this.getLongitude(),
      radius: this.getRadius(),
      max_uncertainty_radius: this.getMaxUncertainty(),
    };
  }
}

module.exports = DeviceLocation;
