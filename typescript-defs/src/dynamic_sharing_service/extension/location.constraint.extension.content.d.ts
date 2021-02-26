export = LocationConstraintContent;
declare class LocationConstraintContent {
    constructor(latitude: any, longitude: any, radius: any, maxUncertainty: any);
    expectedDeviceLocation: DeviceLocation;
    /**
     * @returns {DeviceLocation}
     */
    getExpectedDeviceLocation(): DeviceLocation;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import DeviceLocation = require("./device.location");
