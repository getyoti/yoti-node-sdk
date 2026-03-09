'use strict';

const SessionSpecification = require('./session/create/session.specification');
const CreateSessionResult = require('./session/create/create.session.result');
const GetSessionResult = require('./session/retrieve/get.session.result');
const { RequestBuilder } = require('../request/request.builder');
const { Payload } = require('../request/payload');
const { ContentType } = require('../request/constants');
const Validation = require('../yoti_common/validation');
const config = require('../../config');
const Media = require('../data_type/media');
const IDVError = require('./idv.error');
const SupportedDocumentsResponse = require('./support/supported.documents.response');
const CreateFaceCaptureResourceResponse = require('./session/retrieve/create.face.capture.resource.response');
const CreateFaceCaptureResourcePayload = require('./session/create/face_capture/create.face.capture.resource.payload');
const UploadFaceCaptureImagePayload = require('./session/create/face_capture/upload.face.capture.image.payload');
const SessionConfigurationResponse = require('./session/retrieve/configuration/session.configuration.response');
const SessionTrackedDevicesResponse = require('./session/retrieve/devices/session.tracked.devices.response');

const DEFAULT_API_URL = config.yoti.idvApi;

/**
 * @param {string} sessionId
 *
 * @returns {string}
 */
const sessionPath = (sessionId) => `/sessions/${sessionId}`;

/**
 * @param {string} sessionId
 * @param {string} mediaId
 *
 * @returns {string}
 */
const mediaContentPath = (sessionId, mediaId) => `${sessionPath(sessionId)}/media/${mediaId}/content`;

/**
 * Service Class to handle interactions with the IDV API
 *
 * @class IDVService
 */
class IDVService {
  /**
   * @param {?string} sdkId
   * @param {?(string|Buffer)} pem
   * @param {{apiUrl?: string, authStrategy?: Object}} options
   */
  constructor(sdkId, pem, { apiUrl = DEFAULT_API_URL, authStrategy } = {}) {
    if (authStrategy) {
      /** @private */
      this.authStrategy = authStrategy;
    } else {
      Validation.isString(sdkId, 'sdkId');
      Validation.notNullOrEmpty(pem, 'pem');
      /** @private */
      this.sdkId = sdkId;
      /** @private */
      this.pem = pem;
    }
    /** @private */
    this.apiUrl = apiUrl;
  }

  /**
   * Applies authentication to a request builder.
   *
   * @param {RequestBuilder} builder
   * @returns {RequestBuilder}
   * @private
   */
  applyAuthToBuilder(builder) {
    if (this.authStrategy) {
      return builder.withAuthStrategy(this.authStrategy);
    }
    return builder
      .withPemString(this.pem.toString())
      .withQueryParam('sdkId', this.sdkId);
  }

  /**
   * Uses the supplied session specification to create a session
   *
   * @param {SessionSpecification} sessionSpecification
   *
   * @returns {Promise<CreateSessionResult>}
   */
  createSession(sessionSpecification) {
    Validation.instanceOf(sessionSpecification, SessionSpecification, 'sessionSpecification');

    const builder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withEndpoint('/sessions')
      .withPost()
      .withPayload(new Payload(sessionSpecification))
      .withHeader('Content-Type', 'application/json');

    const request = this.applyAuthToBuilder(builder).build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            return resolve(new CreateSessionResult(response.getParsedResponse()));
          } catch (err) {
            return reject(new IDVError(err));
          }
        })
        .catch((err) => reject(new IDVError(err)));
    });
  }

  /**
   * Retrieves the current state of a given session
   *
   * @param {string} sessionId
   *
   * @returns {Promise<GetSessionResult>}
   */
  getSession(sessionId) {
    Validation.isString(sessionId, 'sessionId');

    const builder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withEndpoint(sessionPath(sessionId))
      .withGet();

    const request = this.applyAuthToBuilder(builder).build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            return resolve(new GetSessionResult(response.getParsedResponse()));
          } catch (err) {
            return reject(new IDVError(err));
          }
        })
        .catch((err) => reject(new IDVError(err)));
    });
  }

  /**
   * Deletes a session and all of its associated content
   *
   * @param {string} sessionId
   *
   * @returns {Promise}
   */
  deleteSession(sessionId) {
    Validation.isString(sessionId, 'sessionId');

    const builder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withEndpoint(sessionPath(sessionId))
      .withMethod('DELETE');

    const request = this.applyAuthToBuilder(builder).build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then(() => resolve())
        .catch((err) => reject(new IDVError(err)));
    });
  }

  /**
   * Retrieves {@link Media} content for a given session and media ID
   *
   * @param {string} sessionId
   * @param {string} mediaId
   *
   * @returns {Promise<Media | null>}
   */
  getMediaContent(sessionId, mediaId) {
    Validation.isString(sessionId, 'sessionId');
    Validation.isString(mediaId, 'mediaId');

    const builder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withEndpoint(mediaContentPath(sessionId, mediaId))
      .withGet();

    const request = this.applyAuthToBuilder(builder).build();

    return new Promise((resolve, reject) => {
      request.execute(true)
        .then((response) => {
          try {
            if (response.statusCode === 204) return resolve(null);

            const contentType = response.getHeaders()['content-type'];
            const mimeType = contentType ? contentType.split(';')[0] : '';

            let content = response.getBody();
            if (!Buffer.isBuffer(content)) {
              content = Buffer.from(content || '');
            }

            return resolve(new Media(content, mimeType));
          } catch (err) {
            return reject(new IDVError(err));
          }
        })
        .catch((err) => reject(new IDVError(err)));
    });
  }

  /**
   * Deletes media content for a given session and media ID
   *
   * @param {string} sessionId
   * @param {string} mediaId
   *
   * @returns {Promise}
   */
  deleteMediaContent(sessionId, mediaId) {
    Validation.isString(sessionId, 'sessionId');
    Validation.isString(mediaId, 'mediaId');

    const builder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withEndpoint(mediaContentPath(sessionId, mediaId))
      .withMethod('DELETE');

    const request = this.applyAuthToBuilder(builder).build();

    return new Promise((resolve, reject) => {
      request.execute(true)
        .then(() => resolve())
        .catch((err) => reject(new IDVError(err)));
    });
  }

  /**
   * Gets a list of supported documents.
   *
   * @param {boolean} includeNonLatin
   *
   * @returns {Promise<SupportedDocumentsResponse>}
   */
  getSupportedDocuments(includeNonLatin) {
    const builder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withEndpoint('/supported-documents')
      .withGet();

    if (includeNonLatin) {
      builder.withQueryParam('includeNonLatin', true);
    }

    const request = this.applyAuthToBuilder(builder).build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => resolve(new SupportedDocumentsResponse(response.getParsedResponse())))
        .catch((err) => reject(new IDVError(err)));
    });
  }

  /**
   * Creates a face capture resource
   * @param {string} sessionId
   * @param {CreateFaceCaptureResourcePayload} createFaceCaptureResourcePayload
   *
   * @returns {Promise<CreateFaceCaptureResourceResponse>}
   */
  createFaceCaptureResource(sessionId, createFaceCaptureResourcePayload) {
    Validation.isString(sessionId, 'sessionId');
    Validation.instanceOf(createFaceCaptureResourcePayload, CreateFaceCaptureResourcePayload, 'createFaceCaptureResourcePayload');

    const builder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withEndpoint(`sessions/${sessionId}/resources/face-capture`)
      .withPost()
      .withPayload(new Payload(createFaceCaptureResourcePayload));

    const request = this.applyAuthToBuilder(builder).build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            return resolve(new CreateFaceCaptureResourceResponse(response.getParsedResponse()));
          } catch (err) {
            return reject(new IDVError(err));
          }
        })
        .catch((err) => reject(new IDVError(err)));
    });
  }

  /**
   * Uploads a face capture image
   * @param {string} sessionId
   * @param {string} resourceId
   * @param {UploadFaceCaptureImagePayload} uploadFaceCaptureImagePayload
   *
   */
  uploadFaceCaptureImage(sessionId, resourceId, uploadFaceCaptureImagePayload) {
    Validation.isString(sessionId, 'sessionId');
    Validation.isString(resourceId, 'resourceId');
    Validation.instanceOf(uploadFaceCaptureImagePayload, UploadFaceCaptureImagePayload, 'uploadFaceCaptureImagePayload');

    const builder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withEndpoint(`/sessions/${sessionId}/resources/face-capture/${resourceId}/image`)
      .withPut()
      .withPayload(new Payload(uploadFaceCaptureImagePayload, ContentType.FORM_DATA));

    const request = this.applyAuthToBuilder(builder).build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then(resolve)
        .catch((err) => reject(new IDVError(err)));
    });
  }

  /**
   * @param {string} sessionId
   *
   * @returns {Promise<SessionConfigurationResponse>}
   */
  getSessionConfiguration(sessionId) {
    Validation.isString(sessionId, 'sessionId');

    const builder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withEndpoint(`/sessions/${sessionId}/configuration`)
      .withGet();

    const request = this.applyAuthToBuilder(builder).build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => resolve(new SessionConfigurationResponse(response.getParsedResponse())))
        .catch((err) => reject(new IDVError(err)));
    });
  }

  /**
   * @param {string} sessionId
   *
   * @returns {Promise<SessionTrackedDevicesResponse>}
   */
  getSessionTrackedDevices(sessionId) {
    Validation.isString(sessionId, 'sessionId');

    const builder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withEndpoint(`/sessions/${sessionId}/tracked-devices`)
      .withGet();

    const request = this.applyAuthToBuilder(builder).build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => resolve(new SessionTrackedDevicesResponse(response.getParsedResponse())))
        .catch((err) => reject(new IDVError(err)));
    });
  }

  /**
   * Deletes tracked devices for a given session
   *
   * @param {string} sessionId
   *
   * @returns {Promise}
   */
  deleteSessionTrackedDevices(sessionId) {
    Validation.isString(sessionId, 'sessionId');

    const builder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withEndpoint(`/sessions/${sessionId}/tracked-devices`)
      .withMethod('DELETE');

    const request = this.applyAuthToBuilder(builder).build();

    return new Promise((resolve, reject) => {
      request.execute(true)
        .then(() => resolve())
        .catch((err) => reject(new IDVError(err)));
    });
  }
}

module.exports = IDVService;
