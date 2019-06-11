const fs = require('fs');
const expect = require('chai').expect;
const { ApplicationProfile } = require('../../src/profile_service/application.profile');
const { Attribute } = require('../../src/data_type/attribute');

let profileData = fs.readFileSync('./tests/sample-data/profile-service/application.profile.json', 'utf8');
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

  describe('#getAttributes', () => {
    it('should return all attributes', () => {
      const attributes = profileObj.getAttributes();
      expect(attributes.length).to.be.equal(4);
      attributes.forEach((attribute) => {
        expect(attribute).to.instanceOf(Attribute);
      });
      expect(attributes[0].getName()).to.equal('application_name');
      expect(attributes[0].getValue()).to.equal('TEST APPLICATION');
    });
  });
});
