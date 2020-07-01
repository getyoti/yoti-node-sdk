'use strict';

const DeviceLocation = require('./device.location');

/**
 * Defines an expected device location constraint.
 *
 * @class LocationConstraintContent
 */
module.exports = class LocationConstraintContent {
  constructor(latitude, longitude, radius, maxUncertainty) {
    this.expectedDeviceLocation = new DeviceLocation(latitude, longitude, radius, maxUncertainty);
  }

  /**
   * @returns {DeviceLocation}
   */
  getExpectedDeviceLocation() {
    return this.expectedDeviceLocation;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      expected_device_location: this.getExpectedDeviceLocation(),
    };
  }
};
