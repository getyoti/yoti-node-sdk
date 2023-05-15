const fs = require('fs');
const ApplicationProfile = require('../../../src/digital_identity_service/receipts/application.profile');
const { Attribute } = require('../../../src/data_type/attribute');

const profileContentJSON = fs.readFileSync('./tests/sample-data/profile-service/application.profile.json', 'utf8');
const profileContent = JSON.parse(profileContentJSON);

describe('ApplicationProfile', () => {
  const applicationProfile = new ApplicationProfile(profileContent);

  describe('#getName', () => {
    it('should return application_name value', () => {
      const expectedValue = 'TEST APPLICATION';
      expect(applicationProfile.getName().getValue()).toBe(expectedValue);
    });
  });

  describe('#getUrl', () => {
    it('should return application_url value', () => {
      const expectedValue = 'https://www.example.com';
      expect(applicationProfile.getUrl().getValue()).toBe(expectedValue);
    });
  });

  describe('#getReceiptBgColor', () => {
    it('should return application_receipt_bgcolor value', () => {
      const expectedValue = '#ffffff';
      expect(applicationProfile.getReceiptBgColor().getValue()).toBe(expectedValue);
    });
  });

  describe('#getLogo', () => {
    it('should return application_logo value', () => {
      const expectedValue = 'image_content';
      expect(applicationProfile.getLogo().getValue()).toBe(expectedValue);
    });
  });

  describe('#getAttributes', () => {
    it('should return all attributes', () => {
      const attributes = applicationProfile.getAttributesList();
      expect(attributes).toHaveLength(4);
      attributes.forEach((attribute) => {
        expect(attribute).toBeInstanceOf(Attribute);
      });
    });
  });
});
