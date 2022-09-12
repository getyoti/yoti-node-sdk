const Yoti = require('yoti');
const {
  constants: {
    ATTR_SELFIE,
    ATTR_FULL_NAME,
    ATTR_FAMILY_NAME,
    ATTR_GIVEN_NAMES,
    ATTR_GENDER,
    ATTR_NATIONALITY,
    ATTR_PHONE_NUMBER,
    ATTR_DATE_OF_BIRTH,
    ATTR_EMAIL_ADDRESS,
    ATTR_POSTAL_ADDRESS,
    ATTR_STRUCTURED_POSTAL_ADDRESS,
    ATTR_DOCUMENT_DETAILS,
    ATTR_DOCUMENT_IMAGES,
    ATTR_AGE_OVER,
    ATTR_AGE_UNDER,
  },
} = require('yoti');
const config = require('../config');

const yotiClient = new Yoti.Client(config.CLIENT_SDK_ID, config.PEM_KEY);

const displayAttributesMapping = {
  [ATTR_SELFIE]: {
    label: 'Selfie',
    icon: 'yoti-icon-profile',
    toDisplayableValue: (value) => value.getBase64Content(),
  },
  [ATTR_FULL_NAME]: {
    label: 'Full name',
    icon: 'yoti-icon-profile',
    toDisplayableValue: (value) => value,
  },
  [ATTR_FAMILY_NAME]: {
    label: 'Family names',
    icon: 'yoti-icon-profile',
    toDisplayableValue: (value) => value,
  },
  [ATTR_GIVEN_NAMES]: {
    label: 'Given names',
    icon: 'yoti-icon-profile',
    toDisplayableValue: (value) => value,
  },
  [ATTR_DATE_OF_BIRTH]: {
    label: 'Date of birth',
    icon: 'yoti-icon-calendar',
    toDisplayableValue: (value) => value,
  },
  [ATTR_GENDER]: {
    label: 'Gender',
    icon: 'yoti-icon-gender',
    toDisplayableValue: (value) => value,
  },
  [ATTR_NATIONALITY]: {
    label: 'Nationality',
    icon: 'yoti-icon-nationality',
    toDisplayableValue: (value) => value,
  },
  [ATTR_PHONE_NUMBER]: {
    label: 'Mobile number',
    icon: 'yoti-icon-phone',
    toDisplayableValue: (value) => value,
  },
  [ATTR_EMAIL_ADDRESS]: {
    label: 'Email address',
    icon: 'yoti-icon-email',
    toDisplayableValue: (value) => value,
  },
  [ATTR_POSTAL_ADDRESS]: {
    label: 'Address',
    icon: 'yoti-icon-address',
    toDisplayableValue: (value) => value,
  },
  [ATTR_STRUCTURED_POSTAL_ADDRESS]: {
    label: 'Structured Address',
    icon: 'yoti-icon-address',
    toDisplayableValue: (value) => Object.entries(value),
  },
  [ATTR_DOCUMENT_DETAILS]: {
    label: 'Document Details',
    icon: 'yoti-icon-document',
    toDisplayableValue: (value) => ({
      type: value.getType(),
      issuingCountry: value.getIssuingCountry(),
      issuingAuthority: value.getIssuingAuthority(),
      documentNumber: value.getDocumentNumber(),
      expirationDate: value.getExpirationDate(),
    }),
  },
  [ATTR_DOCUMENT_IMAGES]: {
    label: 'Document Images',
    icon: 'yoti-icon-document',
    toDisplayableValue: (value) => value.map((image) => image.getBase64Content()),
  },
  [ATTR_AGE_OVER]: {
    label: 'Age Over',
    icon: 'yoti-icon-calendar',
    toDisplayableValue: (value) => ({
      checkType: value.getCheckType(),
      age: value.getAge(),
      result: value.getResult(),
    }),
  },
  [ATTR_AGE_UNDER]: {
    label: 'Age Under',
    icon: 'yoti-icon-calendar',
    toDisplayableValue: (value) => ({
      checkType: value.getCheckType(),
      age: value.getAge(),
      result: value.getResult(),
    }),
  },
};

function extractAttributesFromProfile(profile) {
  return [
    profile.getSelfie(),
    profile.getFullName(),
    profile.getFamilyName(),
    profile.getGivenNames(),
    profile.getDateOfBirth(),
    profile.getGender(),
    profile.getNationality(),
    profile.getPhoneNumber(),
    profile.getEmailAddress(),
    profile.getPostalAddress(),
    profile.getStructuredPostalAddress(),
    profile.getDocumentDetails(),
    profile.getDocumentImages(),
    ...(profile.getAgeVerifications()),
  ].filter((attribute) => !!attribute);
}

function toDisplayableSourceOrVerifier(sourceOrVerifier) {
  return {
    value: sourceOrVerifier.getValue(),
    subType: sourceOrVerifier.getSubType(),
  };
}

function toDisplayableAttribute(attribute) {
  const name = attribute.getName();
  let mappingName = name;
  if (name.includes(':')) {
    mappingName = `${name.split(':').shift()}:`;
  }
  const sources = attribute.getSources();
  const verifiers = attribute.getVerifiers();
  const displayMapping = displayAttributesMapping[mappingName];

  if (displayMapping) {
    const { label, icon, toDisplayableValue } = displayMapping;
    return {
      name,
      displayName: mappingName,
      label,
      icon,
      value: toDisplayableValue(attribute.getValue()),
      sources: sources.map(toDisplayableSourceOrVerifier),
      verifiers: verifiers.map(toDisplayableSourceOrVerifier),
    };
  }
  return null;
}

module.exports = (req, res) => {
  const { token } = req.query;
  if (!token) {
    res.render('pages/error', {
      error: 'No token has been provided.',
    });
  }

  const promise = yotiClient.getActivityDetails(token);
  promise.then((activityDetails) => {
    const profile = activityDetails.getProfile();
    const attributes = extractAttributesFromProfile(profile);
    const displayableAttributes = attributes.map(toDisplayableAttribute)
      .filter((attribute) => !!attribute);

    res.render('pages/profile', {
      profile,
      attributes: displayableAttributes,
    });
  }).catch((err) => {
    console.error(err);
    res.render('pages/error', {
      error: err,
    });
  });
};
