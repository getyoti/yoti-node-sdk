const { LocationConstraintExtensionBuilder } = require('../../..');
const Extension = require('../../../src/dynamic_sharing_service/extension/extension');

const LOCATION_CONSTRAINT = 'LOCATION_CONSTRAINT';

const expectExtensionJson = (extension, expectedJsonData) => {
  expect(extension).toBeInstanceOf(Extension);
  expect(JSON.stringify(extension)).toBe(JSON.stringify(expectedJsonData));
};

describe('LocationConstraintExtensionBuilder', () => {
  it('should fail for latitude too low', () => {
    const builder = new LocationConstraintExtensionBuilder()
      .withLatitude(-91);
    expect(() => builder.build()).toThrow(new RangeError("'latitude' value '-91' is less than '-90'"));
  });

  it('should fail for latitude too high', () => {
    const builder = new LocationConstraintExtensionBuilder()
      .withLatitude(91);
    expect(() => builder.build()).toThrow(new RangeError("'latitude' value '91' is greater than '90'"));
  });

  it('should fail for longitude too low', () => {
    const builder = new LocationConstraintExtensionBuilder()
      .withLatitude(0)
      .withLongitude(-181);
    expect(() => builder.build()).toThrow(new RangeError("'longitude' value '-181' is less than '-180'"));
  });

  it('should fail for longitude too high', () => {
    const builder = new LocationConstraintExtensionBuilder()
      .withLatitude(0)
      .withLongitude(181);
    expect(() => builder.build()).toThrow(new RangeError("'longitude' value '181' is greater than '180'"));
  });

  it('should fail for radius less than zero', () => {
    const builder = new LocationConstraintExtensionBuilder()
      .withLatitude(0)
      .withLongitude(0)
      .withRadius(-1);
    expect(() => builder.build()).toThrow(new RangeError("'radius' value '-1' is less than '0'"));
  });

  it('should fail for uncertainty less than zero', () => {
    const builder = new LocationConstraintExtensionBuilder()
      .withLatitude(0)
      .withLongitude(0)
      .withMaxUncertainty(-1);
    expect(() => builder.build()).toThrow(new RangeError("'maxUncertainty' value '-1' is less than '0'"));
  });

  it('should build constraint with given values', () => {
    const extension = new LocationConstraintExtensionBuilder()
      .withLatitude(50.8169)
      .withLongitude(0.1367)
      .withRadius(30.0)
      .withMaxUncertainty(40.0)
      .build();

    expectExtensionJson(extension, {
      type: LOCATION_CONSTRAINT,
      content: {
        expected_device_location: {
          latitude: 50.8169,
          longitude: 0.1367,
          radius: 30.0,
          max_uncertainty_radius: 40.0,
        },
      },
    });
  });

  it('should build constraint with default values', () => {
    const extension = new LocationConstraintExtensionBuilder()
      .withLatitude(50.8169)
      .withLongitude(0.1367)
      .build();

    expectExtensionJson(extension, {
      type: LOCATION_CONSTRAINT,
      content: {
        expected_device_location: {
          latitude: 50.8169,
          longitude: 0.1367,
          radius: 150,
          max_uncertainty_radius: 150,
        },
      },
    });
  });
});
