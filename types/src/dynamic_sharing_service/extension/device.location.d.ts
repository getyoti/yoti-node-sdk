export = DeviceLocation;
/**
 * Defines a device location.
 *
 * @class DeviceLocation
 */
declare class DeviceLocation {
    /**
     * @param {Number} latitude
     * @param {Number} longitude
     * @param {Number} radius
     * @param {Number} maxUncertainty
     */
    constructor(latitude: number, longitude: number, radius?: number, maxUncertainty?: number);
    /** @private */
    private latitude;
    /** @private */
    private longitude;
    /** @private */
    private radius;
    /** @private */
    private maxUncertainty;
    /**
     * @returns {Number} Latitude of the user's expected location
     */
    getLatitude(): number;
    /**
     * @returns {Number} Longitude of the user's expected location
     */
    getLongitude(): number;
    /**
     * @returns {Number} Radius of the circle, centred on the specified location
     *   coordinates, where the device is allowed to perform the share
     */
    getRadius(): number;
    /**
     * @returns {Number} Maximum acceptable distance, in metres, of the area of
     *   uncertainty associated with the device location coordinates.
     */
    getMaxUncertainty(): number;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
