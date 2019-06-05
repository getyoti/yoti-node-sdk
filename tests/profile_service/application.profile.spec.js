const fs = require('fs');
const expect = require('chai').expect;
const { ApplicationProfile } = require('../../src/profile_service/application.profile');

let profileData = fs.readFileSync('./tests/sample-data/profile-service/profile.json', 'utf8');
profileData = JSON.parse(profileData);

describe('ApplicationProfile', () => {
  const profileObj = new ApplicationProfile(profileData);

  describe('#getName', () => {
    it('should return application_name value', () => {
      expect(profileObj.getName().getValue())
        .to.equal(profileData.application_name.value);
    });
  });

  describe('#getUrl', () => {
    it('should return application_url value', () => {
      expect(profileObj.getUrl().getValue())
        .to.equal(profileData.application_url.value);
    });
  });

  describe('#getReceiptBgColor', () => {
    it('should return application_receipt_bgcolor value', () => {
      expect(profileObj.getReceiptBgColor().getValue())
        .to.equal(profileData.application_receipt_bgcolor.value);
    });
  });

  describe('#getLogo', () => {
    it('should return application_logo value', () => {
      expect(profileObj.getLogo().getValue())
        .to.equal(profileData.application_logo.value);
    });
  });
});
