export = DeviceDescriptionResponse;
declare class DeviceDescriptionResponse {
    constructor(payload: any);
    /** @private */
    private ipAddress;
    /** @private */
    private ipISOCountryCode;
    /** @private */
    private manufactureName;
    /** @private */
    private modelName;
    /** @private */
    private osName;
    /** @private */
    private osVersion;
    /** @private */
    private browserName;
    /** @private */
    private browserVersion;
    /** @private */
    private locale;
    /** @private */
    private clientVersion;
    /**
     * Returns the device ip address.
     *
     * @returns {string | undefined}
     */
    getIpAddress(): string | undefined;
    /**
     * Returns the device ip ISO country code.
     *
     * @returns {string | undefined}
     */
    getIpISOCountryCode(): string | undefined;
    /**
     * Returns the device manufacture name.
     *
     * @returns {string | undefined}
     */
    getManufactureName(): string | undefined;
    /**
     * Returns the device model name.
     *
     * @returns {string | undefined}
     */
    getModelName(): string | undefined;
    /**
     * Returns the device OS name.
     *
     * @returns {string | undefined}
     */
    getOSName(): string | undefined;
    /**
     * Returns the device OS version.
     *
     * @returns {string | undefined}
     */
    getOSVersion(): string | undefined;
    /**
     * Returns the device browser name.
     *
     * @returns {string | undefined}
     */
    getBrowserName(): string | undefined;
    /**
     * Returns the device browser version.
     *
     * @returns {string | undefined}
     */
    getBrowserVersion(): string | undefined;
    /**
     * Returns the device locale.
     *
     * @returns {string | undefined}
     */
    getLocale(): string | undefined;
    /**
     * Returns the client version.
     *
     * @returns {string}
     */
    getClientVersion(): string;
}
