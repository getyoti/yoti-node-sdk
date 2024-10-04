'use strict';

const Validation = require('../../../../yoti_common/validation');
const DeviceDescriptionResponse = require('./device.description.response');

class TrackedDeviceEventResponse {
  constructor(payload) {
    Validation.isString(payload.event, 'event');
    /** @private */
    this.event = payload.event;

    Validation.isStringDate(payload.created, 'created');
    /** @private */
    this.created = new Date(payload.created);

    Validation.isPlainObject(payload.device, 'device');
    /** @private */
    this.device = new DeviceDescriptionResponse(payload.device);
  }

  /**
   * Returns the event.
   *
   * @returns {string}
   */
  getEvent() {
    return this.event;
  }

  /**
   * Returns the created date.
   *
   * @returns {Date}
   */
  getCreated() {
    return this.created;
  }

  /**
   * Returns the device description.
   *
   * @returns {DeviceDescriptionResponse}
   */
  getDevice() {
    return this.device;
  }
}

module.exports = TrackedDeviceEventResponse;
