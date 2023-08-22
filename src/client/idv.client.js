'use strict';

const config = require('../../config');
const { IDVService } = require('../idv_service');

/**
 * Client used for communication with the Yoti IDV service
 *
 * The {@code IDVClient} facilitates requests to the Yoti IDV service
 *
 * @class IDVClient
 */
class IDVClient {
  /**
   * @param {string} sdkId
   * @param {string|Buffer} pem
   * @param {Object} options
   * @param {string} options.apiUrl
   */
  constructor(sdkId, pem, { apiUrl } = {}) {
    const options = {
      apiUrl: apiUrl || config.yoti.idvApi,
    };
    this.idvService = new IDVService(sdkId, pem, options);
  }

  /**
   * Creates a IDV session using the supplied session specification
   *
   * @param {SessionSpecification} sessionSpecification
   *
   * @returns {Promise<CreateSessionResult>}
   */
  createSession(sessionSpecification) {
    return this.idvService.createSession(sessionSpecification);
  }

  /**
   * Retrieves the state of a previously created Yoti IDV session
   *
   * @param {string} sessionId
   *
   * @returns {Promise<GetSessionResult>}
   */
  getSession(sessionId) {
    return this.idvService.getSession(sessionId);
  }

  /**
   * Deletes a previously created Yoti IDV session and all
   * of its related resources
   *
   * @param {string} sessionId
   *
   * @returns {Promise}
   */
  deleteSession(sessionId) {
    return this.idvService.deleteSession(sessionId);
  }

  /**
   * Retrieves media related to a Yoti IDV session based
   * on the supplied media ID
   *
   * @param {string} sessionId
   * @param {string} mediaId
   *
   * @returns {Promise<Media>}
   */
  getMediaContent(sessionId, mediaId) {
    return this.idvService.getMediaContent(sessionId, mediaId);
  }

  /**
   * Deletes media related to a Yoti IDV session based
   * on the supplied media ID
   *
   * @param {string} sessionId
   * @param {string} mediaId
   *
   * @returns {Promise}
   */
  deleteMediaContent(sessionId, mediaId) {
    return this.idvService.deleteMediaContent(sessionId, mediaId);
  }

  /**
   * Gets a list of supported documents.
   *
   * @param {boolean} includeNonLatin
   *
   * @returns {Promise<SupportedDocumentsResponse>}
   */
  getSupportedDocuments(includeNonLatin) {
    return this.idvService.getSupportedDocuments(includeNonLatin);
  }

  /**
   * Creates a face capture resource
   * @param {string} sessionId
   * @param {CreateFaceCaptureResourcePayload} createFaceCaptureResourcePayload
   *
   * @returns {Promise<CreateFaceCaptureResourceResponse>}
   */
  createFaceCaptureResource(sessionId, createFaceCaptureResourcePayload) {
    return this.idvService.createFaceCaptureResource(
      sessionId,
      createFaceCaptureResourcePayload
    );
  }

  /**
   * Uploads a face capture image
   * @param {string} sessionId
   * @param {string} resourceId
   * @param {UploadFaceCaptureImagePayload} uploadFaceCaptureImagePayload
   *
   * @returns {Promise<CreateFaceCaptureResourceResponse>}
   */
  uploadFaceCaptureImage(sessionId, resourceId, uploadFaceCaptureImagePayload) {
    return this.idvService.uploadFaceCaptureImage(
      sessionId,
      resourceId,
      uploadFaceCaptureImagePayload
    );
  }

  /**
   * Fetches the configuration for the given sessionID.
   *
   * @param {string} sessionId
   *
   * @returns {Promise<SessionConfigurationResponse>}
   */
  getSessionConfiguration(sessionId) {
    return this.idvService.getSessionConfiguration(sessionId);
  }
}

module.exports = IDVClient;
