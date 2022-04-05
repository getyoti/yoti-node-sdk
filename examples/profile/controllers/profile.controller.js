const Yoti = require('yoti');
const constants = require('yoti/src/yoti_common/constants');
const config = require('../config');

const yotiClient = new Yoti.Client(config.CLIENT_SDK_ID, config.PEM_KEY);

function createAttributeItem(prop, name, icon) {
  return {
    name,
    icon,
    prop,
  };
}

function buildViewAttributes(profile) {
  const attributes = [];

  profile.getAttributesList().forEach((attribute) => {
    if (attribute.getName().includes(':')) {
      // Derived attributes are handled separately.
      return;
    }

    switch (attribute.getName()) {
      case constants.ATTR_SELFIE:
        break;
      case constants.ATTR_FULL_NAME:
        // Handled separately.
        break;
      case constants.ATTR_FAMILY_NAME:
        attributes.push(createAttributeItem(attribute, 'Family names', 'yoti-icon-profile'));
        break;
      case constants.ATTR_GIVEN_NAMES:
        attributes.push(createAttributeItem(attribute, 'Given names', 'yoti-icon-profile'));
        break;
      case constants.ATTR_DATE_OF_BIRTH:
        attributes.push(createAttributeItem(attribute, 'Date of birth', 'yoti-icon-calendar'));
        break;
      case constants.ATTR_GENDER:
        attributes.push(createAttributeItem(attribute, 'Gender', 'yoti-icon-gender'));
        break;
      case constants.ATTR_NATIONALITY:
        attributes.push(createAttributeItem(attribute, 'Nationality', 'yoti-icon-nationality'));
        break;
      case constants.ATTR_PHONE_NUMBER:
        attributes.push(createAttributeItem(attribute, 'Mobile number', 'yoti-icon-phone'));
        break;
      case constants.ATTR_EMAIL_ADDRESS:
        attributes.push(createAttributeItem(attribute, 'Email address', 'yoti-icon-email'));
        break;
      case constants.ATTR_POSTAL_ADDRESS:
        attributes.push(createAttributeItem(attribute, 'Address', 'yoti-icon-address'));
        break;
      case constants.ATTR_DOCUMENT_DETAILS:
        attributes.push(createAttributeItem(attribute, 'Document Details', 'yoti-icon-document'));
        break;
      case constants.ATTR_STRUCTURED_POSTAL_ADDRESS:
        attributes.push(createAttributeItem(attribute, 'Structured Address', 'yoti-icon-address'));
        break;
      case constants.ATTR_DOCUMENT_IMAGES:
        attributes.push(createAttributeItem(attribute, 'Document Images', 'yoti-icon-document'));
        break;
      default:
        attributes.push(createAttributeItem(attribute, attribute.getName().replace('_', ' '), 'yoti-icon-profile'));
    }
  });

  const ageVerifications = profile.getAgeVerifications();
  if (ageVerifications) {
    ageVerifications.forEach((ageVerification) => {
      const attributeItem = createAttributeItem(ageVerification.getAttribute(), 'Age Verification', 'yoti-icon-verified');
      attributeItem.age_verification = ageVerification;
      attributes.push(attributeItem);
    });
  }

  return attributes;
}

module.exports = (req, res) => {
  const { token } = req.query;
  if (!token) {
    res.render('pages/error', {
      error: 'No token has been provided.',
    });
    return;
  }

  const promise = yotiClient.getActivityDetails(token);
  promise.then((activityDetails) => {
    const profile = activityDetails.getProfile();

    res.render('pages/profile', {
      profile,
      attributes: buildViewAttributes(profile),
    });
  }).catch((err) => {
    console.error(err);
    res.render('pages/error', {
      error: err,
    });
  });
};
