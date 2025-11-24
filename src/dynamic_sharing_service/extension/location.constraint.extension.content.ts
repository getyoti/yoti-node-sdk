import DeviceLocation = require('./device.location');

/**
 * Defines an expected device location constraint.
 *
 * @class LocationConstraintContent
 */
export default class LocationConstraintContent {
  constructor(latitude, longitude, radius, maxUncertainty) {
    /** @private */
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
