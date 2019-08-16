const fs = require('fs');
const { expect } = require('chai');
const { Profile } = require('../../src/profile_service/profile');
const { Attribute } = require('../../src/data_type/attribute');

const YotiAnchor = function main(anchorObj) {
  this.value = anchorObj.value;
  this.subType = anchorObj.subType;
  this.signedTimeStamp = anchorObj.signedTimeStamp;
  this.originServerCerts = anchorObj.originServerCerts;
};

YotiAnchor.prototype = {
  getValue() { return this.value; },
  getSubType() { return this.subType; },
  getSignedTimeStamp() { return this.signedTimeStamp; },
  getOriginServerCerts() { return this.originServerCerts; },
};

/**
 * Create a test attribute.
 *
 * @param {string} name
 * @param {string} value
 */
const createAttribute = (name, value) => new Attribute({
  name,
  value,
  sources: [],
  verifiers: [],
});

let profileData = fs.readFileSync('./tests/sample-data/profile-service/profile.json', 'utf8');
profileData = JSON.parse(profileData);

// Convert sources data into an Anchor Object
let fullNameSources = profileData.full_name.sources;
fullNameSources = JSON.parse(JSON.stringify(fullNameSources));
profileData.full_name.sources = [new YotiAnchor(fullNameSources[0])];

// Convert verifiers data into an Anchor Object
let fullNameVerifiers = profileData.full_name.verifiers;
fullNameVerifiers = JSON.parse(JSON.stringify(fullNameVerifiers));
profileData.full_name.verifiers = [new YotiAnchor(fullNameVerifiers[0])];

describe('Profile', () => {
  const profileObj = new Profile(profileData);

  describe('#getFullName', () => {
    const expectedValue = 'TEST FULL_NAME';
    it('should return full_name value', () => {
      expect(profileObj.getFullName().getValue()).to.equal(expectedValue);
    });
  });

  describe('#getGivenNames', () => {
    const expectedValue = 'TEST GIVEN_NAMES';
    it('should return given_names value', () => {
      expect(profileObj.getGivenNames().getValue()).to.equal(expectedValue);
    });
  });

  describe('#getFamilyName', () => {
    const expectedValue = 'TEST FAMILY_NAME';
    it('should return family_name value', () => {
      expect(profileObj.getFamilyName().getValue()).to.equal(expectedValue);
    });
  });

  describe('#getGender', () => {
    const expectedValue = 'TEST MALE';
    it('should return gender value', () => {
      expect(profileObj.getGender().getValue()).to.equal(expectedValue);
    });
  });

  describe('#getEmailAddress', () => {
    const expectedValue = 'example@yoti.com';
    it('should return email_address value', () => {
      expect(profileObj.getEmailAddress().getValue()).to.equal(expectedValue);
    });
  });

  describe('#getAgeVerified', () => {
    const expectedValue = 'true';
    it('should return age_verified value', () => {
      expect(profileObj.getAgeVerified().getValue()).to.equal(expectedValue);
    });
  });

  describe('#getFullName#getSources#getValue', () => {
    it('should return full_name first source value', () => {
      const expectedValue = 'PASSPORT';
      const sourceValue = profileObj.getFullName().getSources()[0].getValue();
      expect(sourceValue).to.equal(expectedValue);
    });
  });

  describe('#getFullName#getVerifiers#getValue', () => {
    it('should return full_name first verifier value', () => {
      const expectedValue = 'YOTI_ADMIN';
      const verifierValue = profileObj.getFullName().getVerifiers()[0].getValue();
      expect(verifierValue).to.equal(expectedValue);
    });
  });

  describe('#getPostalAddress', () => {
    const expectedValue = 'TEST ADDRESS';
    it('should return postal_address value', () => {
      expect(profileObj.getPostalAddress().getValue()).to.equal(expectedValue);
    });
  });

  describe('#getStructuredPostalAddress', () => {
    it('should return structured_postal_address value', () => {
      expect(profileObj.getStructuredPostalAddress().getValue())
        .to.eql(profileData.structured_postal_address.value);
    });
  });

  describe('#getDocumentImages', () => {
    it('should return document_images value', () => {
      expect(profileObj.getDocumentImages().getValue()).to.eql(profileData.document_images.value);
    });
  });

  describe('#getAttributes', () => {
    it('should return all attributes', () => {
      const attributes = profileObj.getAttributes();
      expect(Object.keys(attributes).length).to.be.equal(16);
      Object.keys(attributes).forEach((attributeName) => {
        expect(attributes[attributeName]).to.instanceOf(Attribute);
      });
      expect(attributes.gender.getName()).to.equal('gender');
      expect(attributes.gender.getValue()).to.equal('TEST MALE');
    });
  });

  describe('#getAgeVerifications', () => {
    it('should only find age derived attributes', () => {
      const expectedAgeAttributes = [
        createAttribute('age_under:18', 'false'),
        createAttribute('age_under:21', 'true'),
        createAttribute('age_over:18', 'true'),
        createAttribute('age_over:21', 'false'),
      ];
      const ageVerifications = profileObj.getAgeVerifications();

      expect(ageVerifications).to.be.instanceOf(Array);
      expect(ageVerifications).to.be.length(4);

      ageVerifications.forEach((ageVerification) => {
        expect(expectedAgeAttributes).to.include(ageVerification.getAttribute());
      });
    });

    it('should return an empty array when there are no age verifications', () => {
      const emptyProfile = new Profile();
      const ageVerifications = emptyProfile.getAgeVerifications();
      expect(ageVerifications).to.be.instanceOf(Array);
      expect(ageVerifications).to.be.length(0);
    });
  });
  describe('#findAgeUnderVerification', () => {
    it('should find unsuccessful age under verification', () => {
      const verification = profileObj.findAgeUnderVerification(18);
      expect(verification.getAge()).to.equal(18);
      expect(verification.getCheckType()).to.equal('age_under');
      expect(verification.getResult()).to.equal(false);
    });
    it('should find successful age under verification', () => {
      const verification = profileObj.findAgeUnderVerification(21);
      expect(verification.getAge()).to.equal(21);
      expect(verification.getCheckType()).to.equal('age_under');
      expect(verification.getResult()).to.equal(true);
    });
    it('should return NULL for no match', () => {
      const verification = profileObj.findAgeUnderVerification(100);
      expect(verification).to.equal(null);
    });
  });
  describe('#findAgeOverVerification', () => {
    it('should find successful age over verification', () => {
      const verification = profileObj.findAgeOverVerification(18);
      expect(verification.getAge()).to.equal(18);
      expect(verification.getCheckType()).to.equal('age_over');
      expect(verification.getResult()).to.equal(true);
    });
    it('should find unsuccessful age over verification', () => {
      const verification = profileObj.findAgeOverVerification(21);
      expect(verification.getAge()).to.equal(21);
      expect(verification.getCheckType()).to.equal('age_over');
      expect(verification.getResult()).to.equal(false);
    });
    it('should return NULL for no match', () => {
      const verification = profileObj.findAgeOverVerification(100);
      expect(verification).to.equal(null);
    });
  });
});
