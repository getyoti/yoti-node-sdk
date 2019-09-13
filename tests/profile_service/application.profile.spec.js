const fs = require('fs');
const { ApplicationProfile } = require('../../src/profile_service/application.profile');
const { Attribute } = require('../../src/data_type/attribute');

let profileData = fs.readFileSync('./tests/sample-data/profile-service/application.profile.json', 'utf8');
profileData = JSON.parse(profileData);

describe('ApplicationProfile', () => {
  const profileObj = new ApplicationProfile(profileData);

  describe('#getName', () => {
    it('should return application_name value', () => {
      expect(profileObj.getName().getValue())
        .toBe(profileData.application_name.value);
    });
  });

  describe('#getUrl', () => {
    it('should return application_url value', () => {
      expect(profileObj.getUrl().getValue())
        .toBe(profileData.application_url.value);
    });
  });

  describe('#getReceiptBgColor', () => {
    it('should return application_receipt_bgcolor value', () => {
      expect(profileObj.getReceiptBgColor().getValue())
        .toBe(profileData.application_receipt_bgcolor.value);
    });
  });

  describe('#getLogo', () => {
    it('should return application_logo value', () => {
      expect(profileObj.getLogo().getValue())
        .toBe(profileData.application_logo.value);
    });
  });

  describe('#getAttributes', () => {
    it('should return all attributes', () => {
      const attributes = profileObj.getAttributes();
      expect(Object.keys(attributes).length).toBe(4);
      Object.keys(attributes).forEach((attributeName) => {
        expect(attributes[attributeName]).toBeInstanceOf(Attribute);
      });
      expect(attributes.application_name.getName()).toBe('application_name');
      expect(attributes.application_name.getValue()).toBe('TEST APPLICATION');
    });
  });
});
