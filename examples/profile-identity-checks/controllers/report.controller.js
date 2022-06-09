const Yoti = require('yoti');
const config = require('../config');

const yotiClient = new Yoti.Client(config.CLIENT_SDK_ID, config.PEM_KEY);

module.exports = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    res.render('pages/error', {
      error: 'No token has been provided.',
    });
    return;
  }

  let identityAssertion = null;
  let verificationReport = null;
  let authenticationReport = null;
  let documentImagesAttributes = [];
  let errorDetails = null;

  try {
    const activityDetails = await yotiClient.getActivityDetails(token);
    const outcome = activityDetails.getOutcome();

    if (outcome === 'SUCCESS') {
      const profile = activityDetails.getProfile();
      const identityProfile = profile.getIdentityProfileReport().getValue();
      const {
        identity_assertion: assertion,
        verification_report: verification,
        authentication_report: authentication,
      } = identityProfile;

      identityAssertion = assertion;
      verificationReport = verification;
      authenticationReport = authentication;

      const { evidence } = verificationReport;
      const { documents } = evidence;
      documentImagesAttributes = documents
      // eslint-disable-next-line camelcase
        .map(({ document_images_attribute_id }) => (document_images_attribute_id
          ? (profile && profile.getAttributeById(document_images_attribute_id)) : null))
        .filter((documentImagesAttribute) => documentImagesAttribute);
    } else {
      errorDetails = activityDetails.getErrorDetails();
    }

    res.render('pages/identity-profile-report', {
      outcome,
      identityAssertion,
      verificationReport,
      authenticationReport,
      documentImagesAttributes,
      errorDetails,
    });
  } catch (err) {
    console.error(err);
    res.render('pages/error', {
      error: err,
    });
  }
};
