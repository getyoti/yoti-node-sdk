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

const sdkDigitalIdentityClient = require('./sdk.digital.identity.client');

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

function renderProfile(profile, res) {
  const attributes = extractAttributesFromProfile(profile);
  const displayableAttributes = attributes.map(toDisplayableAttribute)
    .filter((attribute) => !!attribute);

  res.render('pages/profile', {
    profile,
    attributes: displayableAttributes,
  });
}

function renderProfileWithIdentity(profile, res) {
  const identityProfile = profile.getIdentityProfileReport().getValue();
  let documentImagesAttributes = [];
  let selfieAttribute = null;

  const {
    identity_assertion: identityAssertion,
    verification_report: verificationReport,
    verification_reports: verificationReports,
    authentication_report: authenticationReport,
    authentication_reports: authenticationReports,
    proof: identityAssertionProof,
  } = identityProfile;

  if (verificationReport) {
    const { evidence } = verificationReport;
    const { face, documents } = evidence;

    // Document images (if any)
    documentImagesAttributes = documents
    // eslint-disable-next-line max-len
      .map(({ document_images_attribute_id: documentImagesAttributeId }) => (documentImagesAttributeId
        ? (profile && profile.getAttributeById(documentImagesAttributeId))
        : null))
      .filter((documentImagesAttribute) => documentImagesAttribute);

    // Selfie image (if any)
    const { selfie_attribute_id: selfieAttributeId } = face;
    selfieAttribute = selfieAttributeId
      ? (profile && profile.getAttributeById(selfieAttributeId))
      : null;
  } else if (verificationReports.length > 0) {
    // Document images (if any)
    const documentImagesAttributesArray = verificationReports.map((report) => {
      const { evidence } = report;
      const { documents } = evidence;

      return documents
      // eslint-disable-next-line max-len
        .map(({ document_images_attribute_id: documentImagesAttributeId }) => (documentImagesAttributeId
          ? (profile && profile.getAttributeById(documentImagesAttributeId)) : null))
        .filter((documentImagesAttribute) => documentImagesAttribute);
    });
    documentImagesAttributes = documentImagesAttributesArray.flat();

    // Selfie image (if any)
    const selfieAttributeArray = verificationReports.map((report) => {
      const { evidence } = report;
      const { face } = evidence;
      const { selfie_attribute_id: selfieAttributeId } = face;

      return selfieAttributeId
        ? (profile && profile.getAttributeById(selfieAttributeId))
        : null;
    });
    // eslint-disable-next-line prefer-destructuring
    selfieAttribute = selfieAttributeArray.filter((selfie) => selfie)[0];
  }

  res.render('pages/profile-with-identity', {
    identityAssertion,
    verificationReport,
    verificationReports,
    authenticationReport,
    authenticationReports,
    identityAssertionProof,
    documentImagesAttributes,
    selfieAttribute,
  });
}

module.exports = async (req, res) => {
  try {
    const { sessionId, receiptId: receiptIdFromQuery } = req.query;
    if (!sessionId && !receiptIdFromQuery) {
      throw new Error('One of "sessionId" or "receiptId" must be passed as query params.');
    }

    let receiptId = receiptIdFromQuery;
    if (!receiptId) {
      const session = await sdkDigitalIdentityClient.getShareSession(sessionId);
      const { receiptId: receiptIdInSession } = session;
      if (!receiptIdInSession) {
        throw new Error('Could not retrieve the "receiptId" from the session.');
      }
      receiptId = receiptIdInSession;
    }

    const receipt = await sdkDigitalIdentityClient.getShareReceipt(receiptId);

    const receiptError = receipt.getError();
    const receiptErrorReason = receipt.getErrorReason();
    if (receiptError) {
      throw new Error(receiptErrorReason
        ? `${receiptError}\nError reason: ${JSON.stringify(receiptErrorReason, null, 2)}`
        : `${receiptError}`);
    }

    const profile = receipt.getProfile();
    if (!profile) {
      throw new Error('The receipt was fetched correctly, yet it does not contain any user profile!');
    }

    const hasIdentityProfile = Boolean(profile.getIdentityProfileReport());

    if (hasIdentityProfile) {
      renderProfileWithIdentity(profile, res);
    } else {
      renderProfile(profile, res);
    }
  } catch (err) {
    console.error(err);
    res.render('pages/error', {
      error: err,
    });
  }
};
