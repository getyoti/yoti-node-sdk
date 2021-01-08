const {
  SdkConfigBuilder,
} = require('../../../../src/doc_scan_service');

describe('SdkConfigBuilder', () => {
  it('should build SdkConfig', () => {
    const sdkConfig = new SdkConfigBuilder()
      .withAllowedCaptureMethods('some-method')
      .withPrimaryColour('some-colour')
      .withSecondaryColour('some-secondary-colour')
      .withFontColour('some-font-colour')
      .withErrorUrl('some-error-url')
      .withSuccessUrl('some-success-url')
      .withLocale('some-url')
      .withPresetIssuingCountry('some-country')
      .withPrivacyPolicyUrl('some-privacy-policy-url')
      .build();

    const expectedJson = JSON.stringify({
      allowed_capture_methods: 'some-method',
      primary_colour: 'some-colour',
      secondary_colour: 'some-secondary-colour',
      font_colour: 'some-font-colour',
      locale: 'some-url',
      preset_issuing_country: 'some-country',
      success_url: 'some-success-url',
      error_url: 'some-error-url',
      privacy_policy_url: 'some-privacy-policy-url',
    });

    expect(JSON.stringify(sdkConfig)).toBe(expectedJson);
  });

  it('should build SdkConfig with allows camera and upload', () => {
    const sdkConfig = new SdkConfigBuilder()
      .withAllowsCameraAndUpload()
      .build();

    const expectedJson = JSON.stringify({
      allowed_capture_methods: 'CAMERA_AND_UPLOAD',
    });

    expect(JSON.stringify(sdkConfig)).toBe(expectedJson);
  });

  it('should build SdkConfig with allows camera', () => {
    const sdkConfig = new SdkConfigBuilder()
      .withAllowsCamera()
      .build();

    const expectedJson = JSON.stringify({
      allowed_capture_methods: 'CAMERA',
    });

    expect(JSON.stringify(sdkConfig)).toBe(expectedJson);
  });
});
