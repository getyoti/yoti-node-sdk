const CompanyProfileResponse = require('../../../../src/idv_service/session/retrieve/company.profile.response');

describe('CompanyProfileResponse', () => {
  let companyProfileResponse;

  beforeEach(() => {
    companyProfileResponse = new CompanyProfileResponse({
      company_name: 'some-company-name',
    });
  });

  describe('#getCompanyName', () => {
    it('should return company name', () => {
      expect(companyProfileResponse.getCompanyName()).toBe('some-company-name');
    });
  });
});
