const fs = require('fs');
const {
  ATTR_SELFIE,
  ATTR_GENDER,
  ATTR_DATE_OF_BIRTH,
  ATTR_POSTAL_ADDRESS,
  ATTR_STRUCTURED_POSTAL_ADDRESS,
  ATTR_AGE_OVER,
  ATTR_AGE_UNDER,
  ATTR_DOCUMENT_IMAGES,
  ATTR_IDENTITY_PROFILE_REPORT,
} = require('../../src/yoti_common/constants');
const { Profile } = require('../../src/profile_service/profile');
const { Attribute } = require('../../src/data_type/attribute');
const { YotiAnchor } = require('../../src/data_type/anchor');
const { AgeVerification } = require('../../src/data_type/age.verification');

const buildYotiAnchorFromJsonAnchor = (jsonAnchor) => {
  const {
    type, value, subType, signedTimeStamp, originServerCerts,
  } = jsonAnchor;
  return new YotiAnchor(type, value, subType, signedTimeStamp, originServerCerts);
};

/**
 * Load sample profile data as array of raw attributes, and update their anchor to YotiAnchor.
 *
 * @returns Array
 */
const loadProfileContent = () => {
  const profileContentPath = './tests/sample-data/profile-service/profile.json';
  const profileContent = JSON.parse(fs.readFileSync(profileContentPath, 'utf8'));
  return profileContent.map((attribute) => {
    const refinedAttribute = { ...attribute };
    ['sources', 'verifiers'].forEach((anchorKey) => {
      const rawAnchors = attribute[anchorKey];
      if (rawAnchors.length > 0) {
        refinedAttribute[anchorKey] = JSON.parse(JSON.stringify(rawAnchors))
          .map(buildYotiAnchorFromJsonAnchor);
      }
    });
    if (attribute.name === ATTR_DATE_OF_BIRTH) {
      refinedAttribute.value = new Date(attribute.value);
    } else if (AgeVerification.isAttributeNameMatchingAgeVerification(attribute.name)) {
      refinedAttribute.value = new AgeVerification(attribute.name, attribute.value);
    }
    return refinedAttribute;
  });
};

const profileContentSingle = loadProfileContent();
const profileContentRepeatedAttributes = [...profileContentSingle, ...profileContentSingle]
  .map((attr, index) => {
    if ([ATTR_SELFIE, ATTR_DOCUMENT_IMAGES].includes(attr.name)) {
      return Object.assign({}, attr, { id: `${attr.name}-${index}` });
    }
    return attr;
  });

const anyPostalAddressAttributesName = [ATTR_POSTAL_ADDRESS, ATTR_STRUCTURED_POSTAL_ADDRESS];

describe('Profile', () => {
  [
    {
      description: 'When profile data is has one attribute for one name',
      profileContent: profileContentSingle,
      hasMultipleAttributeByName: false,
    },
    {
      description: 'When profile data is has several attribute for one name',
      profileContent: profileContentRepeatedAttributes,
      hasMultipleAttributeByName: true,
    },
  ].forEach(({ description, profileContent, hasMultipleAttributeByName }) => {
    describe(description, () => {
      const profileContentWithoutPostalAddress = profileContent
        .filter((attribute) => attribute.name !== ATTR_POSTAL_ADDRESS);
      const profileContentWithoutAnyPostalAddress = profileContent
        .filter((attribute) => !anyPostalAddressAttributesName.includes(attribute.name));

      let profile;
      let profileWithoutPostalAddress;
      let profileWithoutAnyPostalAddress;

      beforeEach(() => {
        profile = new Profile(profileContent);
        profileWithoutPostalAddress = new Profile(profileContentWithoutPostalAddress);
        profileWithoutAnyPostalAddress = new Profile(profileContentWithoutAnyPostalAddress);
      });

      describe('#getFullName', () => {
        const expectedValue = 'TEST FULL_NAME';
        it('should return full_name value', () => {
          expect(profile.getFullName().getValue()).toBe(expectedValue);
        });
      });

      describe('#getGivenNames', () => {
        const expectedValue = 'TEST GIVEN_NAMES';
        it('should return given_names value', () => {
          expect(profile.getGivenNames().getValue()).toBe(expectedValue);
        });
      });

      describe('#getFamilyName', () => {
        const expectedValue = 'TEST FAMILY_NAME';
        it('should return family_name value', () => {
          expect(profile.getFamilyName().getValue()).toBe(expectedValue);
        });
      });

      describe('#getGender', () => {
        const expectedValue = 'TEST MALE';
        it('should return gender value', () => {
          expect(profile.getGender().getValue()).toBe(expectedValue);
        });
      });

      describe('#getPhoneNumber', () => {
        const expectedValue = '+447474747474';
        it('should return gender value', () => {
          expect(profile.getPhoneNumber().getValue()).toBe(expectedValue);
        });
      });

      describe('#getDateOfBirth', () => {
        const expectedValue = '2080-09-11T00:00:00.000Z';
        it('should return gender value', () => {
          expect(profile.getDateOfBirth().getValue()).toBeInstanceOf(Date);
          expect(profile.getDateOfBirth().getValue().toISOString()).toBe(expectedValue);
        });
      });

      describe('#getEmailAddress', () => {
        const expectedValue = 'example@yoti.com';
        it('should return email_address value', () => {
          expect(profile.getEmailAddress().getValue()).toBe(expectedValue);
        });
      });

      describe('#getFullName#getSources#getValue', () => {
        it('should return full_name first source value', () => {
          const expectedValue = 'PASSPORT';
          const sourceValue = profile.getFullName().getSources()[0].getValue();
          expect(sourceValue).toBe(expectedValue);
        });
      });

      describe('#getFullName#getVerifiers#getValue', () => {
        it('should return full_name first verifier value', () => {
          const expectedValue = 'YOTI_ADMIN';
          const verifierValue = profile.getFullName().getVerifiers()[0].getValue();
          expect(verifierValue).toBe(expectedValue);
        });
      });

      describe('#getPostalAddress', () => {
        describe('when postal address is available', () => {
          it('should return postal_address value', () => {
            const expectedValue = 'TEST ADDRESS';
            expect(profile.getPostalAddress().getValue()).toBe(expectedValue);
          });
        });
        describe('when postal address is null', () => {
          it('should return formatted address with structured address anchors', () => {
            const testedProfile = profileWithoutPostalAddress;
            const structuredPostalAddressAttribute = testedProfile.getStructuredPostalAddress();
            const expectedName = ATTR_POSTAL_ADDRESS;
            const { formatted_address: expectedValue } = structuredPostalAddressAttribute.value;
            const expectedSources = structuredPostalAddressAttribute.sources;
            const expectedVerifiers = structuredPostalAddressAttribute.verifiers;

            const postalAddressAttr = testedProfile.getPostalAddress();
            expect(postalAddressAttr.getName()).toBe(expectedName);
            expect(postalAddressAttr.getValue()).toBe(expectedValue);
            expect(postalAddressAttr.getSources()).toBe(expectedSources);
            expect(postalAddressAttr.getVerifiers()).toBe(expectedVerifiers);
          });
        });
        describe('when both postal address and structured address are null', () => {
          it('should return null', () => {
            expect(profileWithoutAnyPostalAddress.getPostalAddress()).toBe(null);
          });
        });
      });

      describe('#getStructuredPostalAddress', () => {
        it('should return structured_postal_address value', () => {
          const matchingAttribute = profileContent
            .find((attribute) => attribute.name === ATTR_STRUCTURED_POSTAL_ADDRESS);
          const expectedValue = matchingAttribute.value;
          expect(profile.getStructuredPostalAddress().getValue())
            .toStrictEqual(expectedValue);
        });
      });

      describe('#getDocumentImages', () => {
        it('should return document_images value', () => {
          const matchingAttribute = profileContent
            .find((attribute) => attribute.name === ATTR_DOCUMENT_IMAGES);
          const expectedValue = matchingAttribute.value;
          expect(profile.getDocumentImages().getValue())
            .toStrictEqual(expectedValue);
        });
      });

      describe('#getAttributesList', () => {
        it('should return all attributes as an array', () => {
          const attributes = profile.getAttributesList();
          expect(attributes).toBeInstanceOf(Array);
          expect(attributes.length).toBe(profileContent.length);
          attributes.forEach((attribute) => {
            expect(attribute).toBeInstanceOf(Attribute);
          });
        });
      });

      describe('#getAttributesByName', () => {
        it('should return all attributes with that name as an array', () => {
          const matchingAttribute = profileContent
            .find((attribute) => attribute.name === ATTR_GENDER);
          const allGenderAttributes = profile.getAttributesByName(ATTR_GENDER);

          if (!hasMultipleAttributeByName) {
            expect(allGenderAttributes.length).toBe(1);
            const [onlyAttribute] = allGenderAttributes;
            expect(onlyAttribute.getValue()).toBe(matchingAttribute.value);
          } else {
            expect(allGenderAttributes.length).toBe(2);
            const [firstAttribute, secondAttribute] = allGenderAttributes;
            expect(firstAttribute.getValue()).toBe(matchingAttribute.value);
            expect(secondAttribute.getValue()).toBe(matchingAttribute.value);
            // Given the multiple attributes are built as repetition of one definition
            expect(firstAttribute).toStrictEqual(secondAttribute);
          }
        });
      });

      describe('#getAgeVerifications', () => {
        it('should only find age derived attributes', () => {
          const expectedAgeVerificationAttributesPrint = [
            `${ATTR_AGE_UNDER}18-age_under-18-false`,
            `${ATTR_AGE_UNDER}21-age_under-21-true`,
            `${ATTR_AGE_OVER}18-age_over-18-true`,
            `${ATTR_AGE_OVER}21-age_over-21-false`,
          ];
          const ageVerifications = profile.getAgeVerifications();

          expect(ageVerifications).toBeInstanceOf(Array);
          expect(ageVerifications).toHaveLength(4);

          const ageVerificationAttributesPrint = [];
          ageVerifications.forEach((attribute) => {
            const value = attribute.getValue();
            expect(value).toBeInstanceOf(AgeVerification);

            ageVerificationAttributesPrint.push([
              attribute.getName(),
              value.getCheckType(),
              value.getAge(),
              value.getResult(),
            ].join('-'));
          });

          expect(ageVerificationAttributesPrint).toEqual(expectedAgeVerificationAttributesPrint);
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
          const attribute = profile.findAgeUnderVerification(18);
          const verification = attribute.getValue();
          expect(verification.getAge()).toBe(18);
          expect(verification.getCheckType()).toBe('age_under');
          expect(verification.getResult()).toBe(false);
        });
        it('should find successful age under verification', () => {
          const attribute = profile.findAgeUnderVerification(21);
          const verification = attribute.getValue();
          expect(verification.getAge()).toBe(21);
          expect(verification.getCheckType()).toBe('age_under');
          expect(verification.getResult()).toBe(true);
        });
        it('should return NULL for no match', () => {
          const verification = profile.findAgeUnderVerification(100);
          expect(verification).toBe(null);
        });
      });

      describe('#findAgeOverVerification', () => {
        it('should find successful age over verification', () => {
          const attribute = profile.findAgeOverVerification(18);
          const verification = attribute.getValue();
          expect(verification.getAge()).toBe(18);
          expect(verification.getCheckType()).toBe('age_over');
          expect(verification.getResult()).toBe(true);
        });
        it('should find unsuccessful age over verification', () => {
          const attribute = profile.findAgeOverVerification(21);
          const verification = attribute.getValue();
          expect(verification.getAge()).toBe(21);
          expect(verification.getCheckType()).toBe('age_over');
          expect(verification.getResult()).toBe(false);
        });
        it('should return NULL for no match', () => {
          const verification = profile.findAgeOverVerification(100);
          expect(verification).toBe(null);
        });
      });

      describe('#findAgeVerification', () => {
        it('should find successful age over verification', () => {
          const attribute = profile.findAgeVerification(ATTR_AGE_OVER, 18);
          const verification = attribute.getValue();
          expect(verification.getAge()).toBe(18);
          expect(verification.getCheckType()).toBe('age_over');
          expect(verification.getResult()).toBe(true);
        });
        it('should find unsuccessful age over verification', () => {
          const attribute = profile.findAgeVerification(ATTR_AGE_OVER, 21);
          const verification = attribute.getValue();
          expect(verification.getAge()).toBe(21);
          expect(verification.getCheckType()).toBe('age_over');
          expect(verification.getResult()).toBe(false);
        });
        it('should return NULL for no match', () => {
          const verification = profile.findAgeVerification('above:', 21);
          expect(verification).toBe(null);
        });
      });

      describe('#getIdentityProfileReport', () => {
        it('should return identity_profile_report value', () => {
          const matchingAttribute = profileContent
            .find((item) => item.name === ATTR_IDENTITY_PROFILE_REPORT);
          expect(profile.getIdentityProfileReport().getValue())
            .toEqual(matchingAttribute.value);
        });
      });

      describe('#getAttributeById', () => {
        it('should return corresponding attributes', () => {
          if (hasMultipleAttributeByName) {
            const selfies = profile.getAttributesByName('selfie');
            expect(selfies.length).toBe(2);
            expect(selfies[0].getId()).not.toBe(selfies[1].getId());
            expect(profile.getAttributeById(selfies[0].getId())).toBe(selfies[0]);
            expect(profile.getAttributeById(selfies[1].getId())).toBe(selfies[1]);

            const documentImages = profile.getAttributesByName(ATTR_DOCUMENT_IMAGES);
            expect(documentImages.length).toBe(2);
            expect(documentImages[0].getId()).not.toBe(documentImages[1].getId());
            expect(profile.getAttributeById(documentImages[0].getId())).toBe(documentImages[0]);
            expect(profile.getAttributeById(documentImages[1].getId())).toBe(documentImages[1]);
          }
        });
      });
    });
  });
});
