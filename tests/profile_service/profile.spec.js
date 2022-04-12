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
 * Load sample profile data as Object keyed by attribute name.
 *
 * @returns {Object.<string, Object>}
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
 * Load sample data as Array of Object.
 *
 * @returns {Object[]}
 */
const loadProfileDataArray = () => {
  const profileData = loadProfileData();
  return Object
    .keys(profileData)
    .map((key) => profileData[key]);
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

const profileDataAsObject = loadProfileData();
const profileDataAsArrayWithSameAttributes = [...loadProfileDataArray(), ...loadProfileDataArray()]
  .map((attr, index) => {
    if (['selfie', 'document_images'].includes(attr.name)) {
      return Object.assign({}, attr, { id: `${attr.name}-${index}` });
    }
    return attr;
  });

describe('Profile', () => {
  [
    {
      describe: 'When profile data is provided as Object keyed by attribute name',
      profileData: profileDataAsObject,
    },
    {
      describe: 'When profile data is provided as an Array (with attributes sharing names)',
      // (here each attribute are duplicated, so to check handling of several with the same name)
      profileData: profileDataAsArrayWithSameAttributes,
      profileDataAsArray: true,
    },
  ].forEach((testItem) => {
    describe(testItem.describe, () => {
      const profileObj = new Profile(testItem.profileData);

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
          const profileData = loadProfileData();
          expect(profileObj.getStructuredPostalAddress().getValue())
            .toStrictEqual(profileData.structured_postal_address.value);
        });
      });

      describe('#getDocumentImages', () => {
        it('should return document_images value', () => {
          const profileData = loadProfileData();
          expect(profileObj.getDocumentImages().getValue())
            .toStrictEqual(profileData.document_images.value);
        });
      });

      describe('#getAttributes', () => {
        it('should return all attributes keyed by name', () => {
          const attributes = profileObj.getAttributes();
          expect(Object.keys(attributes).length).toBe(17);
          Object.keys(attributes).forEach((attributeName) => {
            expect(attributes[attributeName]).toBeInstanceOf(Attribute);
          });
          expect(attributes.gender.getName()).toBe('gender');
          expect(attributes.gender.getValue()).toBe('TEST MALE');
        });
      });

      describe('#getAttributesList', () => {
        it('should return all attributes as an array', () => {
          const attributes = profileObj.getAttributesList();
          expect(attributes).toBeInstanceOf(Array);
          expect(attributes.length).toBe(testItem.profileDataAsArray ? 34 : 17);
          attributes.forEach((attribute) => {
            expect(attribute).toBeInstanceOf(Attribute);
          });
        });
      });

      describe('#getAttributesByName', () => {
        it('should return all attributes with that name as an array', () => {
          const attributes = profileObj.getAttributes();
          const allGenderAttributes = profileObj.getAttributesByName('gender');

          if (!testItem.profileDataAsArray) {
            expect(allGenderAttributes.length).toBe(1);
            expect(allGenderAttributes[0]).toBe(attributes.gender);
          } else {
            expect(allGenderAttributes.length).toBe(2);
            expect(allGenderAttributes[0]).toBe(attributes.gender);
            expect(allGenderAttributes[1]).not.toBe(attributes.gender);
            expect(allGenderAttributes[1].getName()).toBe(attributes.gender.getName());
            expect(allGenderAttributes[1].getValue()).toBe(attributes.gender.getValue());
          }
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

      describe('#getIdentityProfileReport', () => {
        it('should return identity_profile_report value', () => {
          let expectedSource = testItem.profileData.identity_profile_report;
          if (testItem.profileDataAsArray) {
            expectedSource = testItem.profileData.find((item) => item.name === 'identity_profile_report');
          }
          expect(profileObj.getIdentityProfileReport().getValue())
            .toEqual(expectedSource.value);
        });
      });

      describe('#getAttributeById', () => {
        it('should return corresponding attributes', () => {
          if (testItem.profileDataAsArray) {
            const selfies = profileObj.getAttributesByName('selfie');
            expect(selfies.length).toBe(2);
            expect(selfies[0].getId()).not.toBe(selfies[1].getId());
            expect(profileObj.getAttributeById(selfies[0].getId())).toBe(selfies[0]);
            expect(profileObj.getAttributeById(selfies[1].getId())).toBe(selfies[1]);

            const documentImages = profileObj.getAttributesByName('document_images');
            expect(documentImages.length).toBe(2);
            expect(documentImages[0].getId()).not.toBe(documentImages[1].getId());
            expect(profileObj.getAttributeById(documentImages[0].getId())).toBe(documentImages[0]);
            expect(profileObj.getAttributeById(documentImages[1].getId())).toBe(documentImages[1]);
          }
        });
      });
    });
  });
});
