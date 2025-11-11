const TrackedDeviceEventResponse = require('../../../../../src/idv_service/session/retrieve/devices/tracked.device.event.response');
const DeviceDescriptionResponse = require('../../../../../src/idv_service/session/retrieve/devices/device.description.response');

const payloadResponse = {
  event: 'CONFIG_FIRST_LOADED',
  created: '2021-06-11T11:39:24Z',
  device: {
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
  },
};

describe('TrackedDeviceEventResponse', () => {
  let trackedDeviceEventResponse;

  beforeEach(() => {
    trackedDeviceEventResponse = new TrackedDeviceEventResponse(payloadResponse);
  });

  describe('#getEvent', () => {
    it('Should return the event', () => {
      expect(trackedDeviceEventResponse.getEvent()).toBe('CONFIG_FIRST_LOADED');
    });
  });

  describe('#getCreated', () => {
    it('Should return the created date', () => {
      const created = trackedDeviceEventResponse.getCreated();
      expect(created).toBeInstanceOf(Date);
      expect(new Date(created).toISOString()).toBe('2021-06-11T11:39:24.000Z');
    });
  });

  describe('#getDevice', () => {
    it('Should return the device description', () => {
      expect(trackedDeviceEventResponse.getDevice()).toBeInstanceOf(DeviceDescriptionResponse);
    });
  });

  describe('#constructor', () => {
    it.each([
      ['event', 123, 'event must be a string'],
      ['created', '2021-06-11B11:39.24.000Z', 'created must be a date like string'],
      ['device', 'device-info', 'device must be a plain object'],
      ['device', { client_version: 123 }, 'client_version must be a string'],
    ])('Should error when invalid %s', (propertyName, invalidValue, expectedError) => {
      const invalidPayloadResponse = {
        ...payloadResponse,
        [propertyName]: invalidValue,
      };
      expect(() => new TrackedDeviceEventResponse(invalidPayloadResponse)).toThrow(expectedError);
    });
  });
});
