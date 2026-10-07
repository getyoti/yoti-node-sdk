const {
  CompanyProfileBuilder,
} = require('../../../../src/idv_service');

describe('CompanyProfileBuilder', () => {
  it('should build CompanyProfile (with options)', () => {
    const sdkConfig = new CompanyProfileBuilder()
      .withCompanyName('My Company')
      .build();

    const expectedJson = JSON.stringify({
      company_name: 'My Company',
    });

    expect(JSON.stringify(sdkConfig)).toBe(expectedJson);
  });
});
