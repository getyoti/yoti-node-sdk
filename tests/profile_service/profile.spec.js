const fs = require('fs');
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
 * Load sample profile data.
 */
const loadProfileData = () => {
  const profileDataPath = './tests/sample-data/profile-service/profile.json';
  const profileData = JSON.parse(fs.readFileSync(profileDataPath, 'utf8'));

  Object.keys(profileData).forEach((attrName) => {
    // Convert anchor data into an Anchor Objects.
    ['sources', 'verifiers'].forEach((anchorKey) => {
      if (profileData[attrName][anchorKey].length > 0) {
        const anchors = JSON.parse(JSON.stringify(profileData[attrName][anchorKey]));
        profileData[attrName][anchorKey] = [new YotiAnchor(anchors[0])];
      }
    });
  });

  return profileData;
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

const profileData = loadProfileData();

describe('Profile', () => {
  const profileObj = new Profile(profileData);

  describe('#getFullName', () => {
    const expectedValue = 'TEST FULL_NAME';
    it('should return full_name value', () => {
      expect(profileObj.getFullName().getValue()).toBe(expectedValue);
    });
  });

  describe('#getGivenNames', () => {
    const expectedValue = 'TEST GIVEN_NAMES';
    it('should return given_names value', () => {
      expect(profileObj.getGivenNames().getValue()).toBe(expectedValue);
    });
  });

  describe('#getFamilyName', () => {
    const expectedValue = 'TEST FAMILY_NAME';
    it('should return family_name value', () => {
      expect(profileObj.getFamilyName().getValue()).toBe(expectedValue);
    });
  });

  describe('#getGender', () => {
    const expectedValue = 'TEST MALE';
    it('should return gender value', () => {
      expect(profileObj.getGender().getValue()).toBe(expectedValue);
    });
  });

  describe('#getEmailAddress', () => {
    const expectedValue = 'example@yoti.com';
    it('should return email_address value', () => {
      expect(profileObj.getEmailAddress().getValue()).toBe(expectedValue);
    });
  });

  describe('#getAgeVerified', () => {
    const expectedValue = 'true';
    it('should return age_verified value', () => {
      expect(profileObj.getAgeVerified().getValue()).toBe(expectedValue);
    });
  });

  describe('#getFullName#getSources#getValue', () => {
    it('should return full_name first source value', () => {
      const expectedValue = 'PASSPORT';
      const sourceValue = profileObj.getFullName().getSources()[0].getValue();
      expect(sourceValue).toBe(expectedValue);
    });
  });

  describe('#getFullName#getVerifiers#getValue', () => {
    it('should return full_name first verifier value', () => {
      const expectedValue = 'YOTI_ADMIN';
      const verifierValue = profileObj.getFullName().getVerifiers()[0].getValue();
      expect(verifierValue).toBe(expectedValue);
    });
  });

  describe('#getPostalAddress', () => {
    describe('when postal address is available', () => {
      it('should return postal_address value', () => {
        const expectedValue = 'TEST ADDRESS';
        expect(profileObj.getPostalAddress().getValue()).toBe(expectedValue);
      });
    });
    describe('when postal address is null', () => {
      const expectedValue = 'SOME FORMATTED ADDRESS';
      const expectedName = 'postal_address';
      const expectedSources = [new YotiAnchor({
        value: 'SOME SOURCE',
        subType: '',
        signedTimeStamp: '',
        originServerCerts: [],
      })];
      const expectedVerifiers = [new YotiAnchor({
        value: 'SOME VERIFIER',
        subType: '',
        signedTimeStamp: '',
        originServerCerts: [],
      })];

      const profileDataNoAddress = loadProfileData();

      // Remove postal address from profile data.
      delete profileDataNoAddress.postal_address;

      // Set formatted address and anchors.
      Object.assign(profileDataNoAddress.structured_postal_address, {
        value: {
          formatted_address: expectedValue,
        },
        sources: expectedSources,
        verifiers: expectedVerifiers,
      });

      const profileNoAddress = new Profile(profileDataNoAddress);

      it('should return formatted address with structured address anchors', () => {
        const postalAddressAttr = profileNoAddress.getPostalAddress();
        expect(postalAddressAttr.getName()).toBe(expectedName);
        expect(postalAddressAttr.getValue()).toBe(expectedValue);
        expect(postalAddressAttr.getSources()).toBe(expectedSources);
        expect(postalAddressAttr.getVerifiers()).toBe(expectedVerifiers);
      });
    });
    describe('when both postal address and structured address are null', () => {
      const profileDataNoAddress = loadProfileData();
      delete profileDataNoAddress.postal_address;
      delete profileDataNoAddress.structured_postal_address;
      const profileNoAddress = new Profile(profileDataNoAddress);
      it('should return null', () => {
        expect(profileNoAddress.getPostalAddress()).toBe(null);
      });
    });
  });

  describe('#getStructuredPostalAddress', () => {
    it('should return structured_postal_address value', () => {
      expect(profileObj.getStructuredPostalAddress().getValue())
        .toBe(profileData.structured_postal_address.value);
    });
  });

  describe('#getDocumentImages', () => {
    it('should return document_images value', () => {
      expect(profileObj.getDocumentImages().getValue()).toBe(profileData.document_images.value);
    });
  });

  describe('#getAttributes', () => {
    it('should return all attributes', () => {
      const attributes = profileObj.getAttributes();
      expect(Object.keys(attributes).length).toBe(16);
      Object.keys(attributes).forEach((attributeName) => {
        expect(attributes[attributeName]).toBeInstanceOf(Attribute);
      });
      expect(attributes.gender.getName()).toBe('gender');
      expect(attributes.gender.getValue()).toBe('TEST MALE');
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

      expect(ageVerifications).toBeInstanceOf(Array);
      expect(ageVerifications).toHaveLength(4);

      ageVerifications.forEach((ageVerification) => {
        expect(expectedAgeAttributes).toContainEqual(ageVerification.getAttribute());
      });
    });

    it('should return an empty array when there are no age verifications', () => {
      const emptyProfile = new Profile();
      const ageVerifications = emptyProfile.getAgeVerifications();
      expect(ageVerifications).toBeInstanceOf(Array);
      expect(ageVerifications).toHaveLength(0);
    });
  });
  describe('#findAgeUnderVerification', () => {
    it('should find unsuccessful age under verification', () => {
      const verification = profileObj.findAgeUnderVerification(18);
      expect(verification.getAge()).toBe(18);
      expect(verification.getCheckType()).toBe('age_under');
      expect(verification.getResult()).toBe(false);
    });
    it('should find successful age under verification', () => {
      const verification = profileObj.findAgeUnderVerification(21);
      expect(verification.getAge()).toBe(21);
      expect(verification.getCheckType()).toBe('age_under');
      expect(verification.getResult()).toBe(true);
    });
    it('should return NULL for no match', () => {
      const verification = profileObj.findAgeUnderVerification(100);
      expect(verification).toBe(null);
    });
  });
  describe('#findAgeOverVerification', () => {
    it('should find successful age over verification', () => {
      const verification = profileObj.findAgeOverVerification(18);
      expect(verification.getAge()).toBe(18);
      expect(verification.getCheckType()).toBe('age_over');
      expect(verification.getResult()).toBe(true);
    });
    it('should find unsuccessful age over verification', () => {
      const verification = profileObj.findAgeOverVerification(21);
      expect(verification.getAge()).toBe(21);
      expect(verification.getCheckType()).toBe('age_over');
      expect(verification.getResult()).toBe(false);
    });
    it('should return NULL for no match', () => {
      const verification = profileObj.findAgeOverVerification(100);
      expect(verification).toBe(null);
    });
  });
});
