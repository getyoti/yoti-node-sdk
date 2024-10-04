'use strict';

const Validation = require('../../../../yoti_common/validation');

class DeviceDescriptionResponse {
  constructor(payload) {
    Validation.isString(payload.ip_address, 'ip_address', true);
    /** @private */
    this.ipAddress = payload.ip_address;

    Validation.isString(payload.ip_iso_country_code, 'ip_iso_country_code', true);
    /** @private */
    this.ipISOCountryCode = payload.ip_iso_country_code;

    Validation.isString(payload.manufacture_name, 'manufacture_name', true);
    /** @private */
    this.manufactureName = payload.manufacture_name;

    Validation.isString(payload.model_name, 'model_name', true);
    /** @private */
    this.modelName = payload.model_name;

    Validation.isString(payload.os_name, 'os_name', true);
    /** @private */
    this.osName = payload.os_name;

    Validation.isString(payload.os_version, 'os_version', true);
    /** @private */
    this.osVersion = payload.os_version;

    Validation.isString(payload.browser_name, 'browser_name', true);
    /** @private */
    this.browserName = payload.browser_name;

    Validation.isString(payload.browser_version, 'browser_version', true);
    /** @private */
    this.browserVersion = payload.browser_version;

    Validation.isString(payload.locale, 'locale', true);
    /** @private */
    this.locale = payload.locale;

    Validation.isString(payload.client_version, 'client_version');
    /** @private */
    this.clientVersion = payload.client_version;
  }

  /**
   * Returns the device ip address.
   *
   * @returns {string | undefined}
   */
  getIpAddress() {
    return this.ipAddress;
  }

  /**
   * Returns the device ip ISO country code.
   *
   * @returns {string | undefined}
   */
  getIpISOCountryCode() {
    return this.ipISOCountryCode;
  }

  /**
   * Returns the device manufacture name.
   *
   * @returns {string | undefined}
   */
  getManufactureName() {
    return this.manufactureName;
  }

  /**
   * Returns the device model name.
   *
   * @returns {string | undefined}
   */
  getModelName() {
    return this.modelName;
  }

  /**
   * Returns the device OS name.
   *
   * @returns {string | undefined}
   */
  getOSName() {
    return this.osName;
  }

  /**
   * Returns the device OS version.
   *
   * @returns {string | undefined}
   */
  getOSVersion() {
    return this.osVersion;
  }

  /**
   * Returns the device browser name.
   *
   * @returns {string | undefined}
   */
  getBrowserName() {
    return this.browserName;
  }

  /**
   * Returns the device browser version.
   *
   * @returns {string | undefined}
   */
  getBrowserVersion() {
    return this.browserVersion;
  }

  /**
   * Returns the device locale.
   *
   * @returns {string | undefined}
   */
  getLocale() {
    return this.locale;
  }

  /**
   * Returns the client version.
   *
   * @returns {string}
   */
  getClientVersion() {
    return this.clientVersion;
  }
}

module.exports = DeviceDescriptionResponse;
