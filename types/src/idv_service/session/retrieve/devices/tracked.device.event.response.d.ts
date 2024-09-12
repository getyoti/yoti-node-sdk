export = TrackedDeviceEventResponse;
declare class TrackedDeviceEventResponse {
    constructor(payload: any);
    /** @private */
    private event;
    /** @private */
    private created;
    /** @private */
    private device;
    /**
     * Returns the event.
     *
     * @returns {string}
     */
    getEvent(): string;
    /**
     * Returns the created date.
     *
     * @returns {Date}
     */
    getCreated(): Date;
    /**
     * Returns the device description.
     *
     * @returns {DeviceDescriptionResponse}
     */
    getDevice(): DeviceDescriptionResponse;
}
import DeviceDescriptionResponse = require("./device.description.response");
