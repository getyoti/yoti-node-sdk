const TrackedDeviceEventResponse = require('../../../../../src/idv_service/session/retrieve/devices/tracked.device.event.response');
const SessionTrackedDevicesResponse = require('../../../../../src/idv_service/session/retrieve/devices/session.tracked.devices.response');

const payloadResponse = [
  {
    event: 'CONFIG_FIRST_LOADED',
    created: '2021-06-11T11:39:24Z',
    device: {
      ip_address: '123.123.123.123',
      ip_iso_country_code: 'GBR',
      manufacture_name: 'Apple',
      model_name: 'IphoneX',
      os_name: 'MacOs',
      os_version: '10.13.14',
      browser_name: 'Chrome',
      browser_version: '72.0.3626.119',
      locale: 'en-GB',
      client_version: '2.12.0',
    },
  },
  {
    event: 'RESOURCE_CREATED',
    resource_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    created: '2021-06-11T11:39:24Z',
    device: {
      ip_address: '123.123.123.123',
      ip_iso_country_code: 'GBR',
      manufacture_name: 'Apple',
      model_name: 'IphoneX',
      os_name: 'MacOs',
      os_version: '10.13.14',
      browser_name: 'Chrome',
      browser_version: '72.0.3626.119',
      locale: 'en-GB',
      client_version: '2.12.0',
    },
  },
  {
    event: 'CLIENT_SESSION_TOKEN_DELETED',
    created: '2021-06-11T11:39:24Z',
    device: {
      ip_address: '123.123.123.123',
      ip_iso_country_code: 'GBR',
      manufacture_name: 'Apple',
      model_name: 'IphoneX',
      os_name: 'MacOs',
      os_version: '10.13.14',
      browser_name: 'Chrome',
      browser_version: '72.0.3626.119',
      locale: 'en-GB',
      client_version: '2.12.0',
    },
  },
];

describe('SessionTrackedDevicesResponse', () => {
  let identityProfileResponse;

  beforeEach(() => {
    identityProfileResponse = new SessionTrackedDevicesResponse(payloadResponse);
  });

  describe('#deviceEvents', () => {
    it('Should return the list of device events', () => {
      const deviceEvents = identityProfileResponse.getDeviceEvents();
      expect(deviceEvents).toHaveLength(3);
      deviceEvents.forEach((deviceEvent) => {
        expect(deviceEvent).toBeInstanceOf(TrackedDeviceEventResponse);
      });
      expect(deviceEvents[0].getEvent()).toBe('CONFIG_FIRST_LOADED');
      expect(deviceEvents[1].getEvent()).toBe('RESOURCE_CREATED');
      expect(deviceEvents[2].getEvent()).toBe('CLIENT_SESSION_TOKEN_DELETED');
    });
  });

  describe('#constructor', () => {
    it.each([
      ['type', 123, 'tracked devices must be an array'],
      ['content', [{ not: 'right' }], 'event must be a string'],
    ])('Should error when invalid %s', (propertyName, invalidValue, expectedError) => {
      expect(() => new SessionTrackedDevicesResponse(invalidValue)).toThrow(expectedError);
    });
  });
});
