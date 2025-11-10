const DeviceDescriptionResponse = require('../../../../../src/idv_service/session/retrieve/devices/device.description.response');

const payloadResponse = {
  ip_address: '123.123.123.123',
  ip_iso_country_code: 'GBR',
  manufacture_name: 'Apple',
  model_name: 'IphoneX',
  os_name: 'iOS',
  os_version: '10.13.14',
  browser_name: 'Chrome',
  browser_version: '72.0.3626.119',
  locale: 'en-GB',
  client_version: '2.12.0',
};

describe('DeviceDescriptionResponse', () => {
  let deviceDescriptionResponse;

  beforeEach(() => {
    deviceDescriptionResponse = new DeviceDescriptionResponse(payloadResponse);
  });

  describe('#getIpAddress', () => {
    it('Should return the ip address', () => {
      expect(deviceDescriptionResponse.getIpAddress()).toBe('123.123.123.123');
    });
  });

  describe('#getIpISOCountryCode', () => {
    it('Should return the ip ISO country code', () => {
      expect(deviceDescriptionResponse.getIpISOCountryCode()).toBe('GBR');
    });
  });

  describe('#getManufactureName', () => {
    it('Should return the manufacture name', () => {
      expect(deviceDescriptionResponse.getManufactureName()).toBe('Apple');
    });
  });

  describe('#getModelName', () => {
    it('Should return the model name', () => {
      expect(deviceDescriptionResponse.getModelName()).toBe('IphoneX');
    });
  });

  describe('#getOSName', () => {
    it('Should return the OS name', () => {
      expect(deviceDescriptionResponse.getOSName()).toBe('iOS');
    });
  });

  describe('#getOSVersion', () => {
    it('Should return the OS version', () => {
      expect(deviceDescriptionResponse.getOSVersion()).toBe('10.13.14');
    });
  });

  describe('#getBrowserName', () => {
    it('Should return the browser name', () => {
      expect(deviceDescriptionResponse.getBrowserName()).toBe('Chrome');
    });
  });

  describe('#getBrowserVersion', () => {
    it('Should return the browser version', () => {
      expect(deviceDescriptionResponse.getBrowserVersion()).toBe('72.0.3626.119');
    });
  });

  describe('#getLocale', () => {
    it('Should return the locale', () => {
      expect(deviceDescriptionResponse.getLocale()).toBe('en-GB');
    });
  });

  describe('#getClientVersion', () => {
    it('Should return the client version', () => {
      expect(deviceDescriptionResponse.getClientVersion()).toBe('2.12.0');
    });
  });

  describe('#constructor', () => {
    it.each([
      ['ip_address', 123, 'ip_address must be a string'],
      ['ip_iso_country_code', 123, 'ip_iso_country_code must be a string'],
      ['manufacture_name', 123, 'manufacture_name must be a string'],
      ['model_name', 123, 'model_name must be a string'],
      ['os_name', 123, 'os_name must be a string'],
      ['os_version', 123, 'os_version must be a string'],
      ['browser_name', 123, 'browser_name must be a string'],
      ['browser_version', 123, 'browser_version must be a string'],
      ['locale', 123, 'locale must be a string'],
      ['client_version', 123, 'client_version must be a string'],
    ])('Should error when invalid %s', (propertyName, invalidValue, expectedError) => {
      const invalidPayloadResponse = {
        ...payloadResponse,
        [propertyName]: invalidValue,
      };
      expect(() => new DeviceDescriptionResponse(invalidPayloadResponse)).toThrow(expectedError);
    });
  });
});
