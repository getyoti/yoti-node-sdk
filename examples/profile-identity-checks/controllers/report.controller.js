/* eslint-disable camelcase */
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
  let verificationReports = null;
  let authenticationReport = null;
  let authenticationReports = null;
  let identityAssertionProof = null;
  let documentImagesAttributes = [];
  let selfieAttribute = null;
  let errorDetails = null;

  try {
    const activityDetails = await yotiClient.getActivityDetails(token);
    const outcome = activityDetails.getOutcome();

    if (outcome === 'SUCCESS') {
      const profile = activityDetails.getProfile();
      const identityProfile = profile.getIdentityProfileReport().getValue();
      const {
        identity_assertion,
        verification_report,
        verification_reports,
        authentication_report,
        authentication_reports,
        proof,
      } = identityProfile;

      identityAssertion = identity_assertion;
      verificationReport = verification_report;
      verificationReports = verification_reports;
      authenticationReport = authentication_report;
      authenticationReports = authentication_reports;
      identityAssertionProof = proof;

      if (verificationReport) {
        const { evidence } = verificationReport;
        const { face, documents } = evidence;

        // Document images (if any)
        documentImagesAttributes = documents
          .map(({ document_images_attribute_id }) => (document_images_attribute_id
            ? (profile && profile.getAttributeById(document_images_attribute_id)) : null))
          .filter((documentImagesAttribute) => documentImagesAttribute);

        // Selfie image (if any)
        const { selfie_attribute_id } = face;
        selfieAttribute = selfie_attribute_id
          ? (profile && profile.getAttributeById(selfie_attribute_id))
          : null;
      } else if (verificationReports.length > 0) {
        // Document images (if any)
        const documentImagesAttributesArray = verificationReports.map((report) => {
          const { evidence } = report;
          const { documents } = evidence;

          return documents
            .map(({ document_images_attribute_id }) => (document_images_attribute_id
              ? (profile && profile.getAttributeById(document_images_attribute_id)) : null))
            .filter((documentImagesAttribute) => documentImagesAttribute);
        });
        documentImagesAttributes = documentImagesAttributesArray.flat();

        // Selfie image (if any)
        const selfieAttributeArray = verificationReports.map((report) => {
          const { evidence } = report;
          const { face } = evidence;
          const { selfie_attribute_id } = face;

          return selfie_attribute_id
            ? (profile && profile.getAttributeById(selfie_attribute_id))
            : null;
        });
        // eslint-disable-next-line prefer-destructuring
        selfieAttribute = selfieAttributeArray.filter((selfie) => selfie)[0];
      }
    } else {
      errorDetails = activityDetails.getErrorDetails();
    }

    res.render('pages/identity-profile-report', {
      outcome,
      identityAssertion,
      verificationReport,
      verificationReports,
      authenticationReport,
      authenticationReports,
      identityAssertionProof,
      documentImagesAttributes,
      selfieAttribute,
      errorDetails,
    });
  } catch (err) {
    console.error(err);
    res.render('pages/error', {
      error: err,
    });
  }
};
