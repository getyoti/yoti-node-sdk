import SessionSpecification = require('./session/create/session.specification');
import CreateSessionResult = require('./session/create/create.session.result');
import GetSessionResult = require('./session/retrieve/get.session.result');
import { RequestBuilder } from '../request/request.builder';
import { Payload } from '../request/payload';
import { ContentType } from '../request/constants';
import Validation = require('../yoti_common/validation');
import config = require('../../config');
import Media = require('../data_type/media');
import IDVError = require('./idv.error');
import SupportedDocumentsResponse = require('./support/supported.documents.response');
import CreateFaceCaptureResourceResponse = require('./session/retrieve/create.face.capture.resource.response');
import CreateFaceCaptureResourcePayload = require('./session/create/face_capture/create.face.capture.resource.payload');
import UploadFaceCaptureImagePayload = require('./session/create/face_capture/upload.face.capture.image.payload');
import SessionConfigurationResponse = require('./session/retrieve/configuration/session.configuration.response');
import SessionTrackedDevicesResponse = require('./session/retrieve/devices/session.tracked.devices.response');

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
   * @param {string} sdkId
   * @param {string|Buffer} pem
   * @param {{apiUrl?: string}} options
   */
  constructor(sdkId, pem, { apiUrl = DEFAULT_API_URL } = {}) {
    Validation.isString(sdkId, 'sdkId');
    Validation.notNullOrEmpty(pem, 'pem');

    /** @protected */
    this.sdkId = sdkId;
    /** @protected */
    this.pem = pem;
    /** @protected */
    this.apiUrl = apiUrl;
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

    const request = new RequestBuilder()
      .withPemString(this.pem.toString())
      .withBaseUrl(this.apiUrl)
      .withEndpoint('/sessions')
      .withQueryParam('sdkId', this.sdkId)
      .withPost()
      .withPayload(new Payload(sessionSpecification))
      .withHeader('Content-Type', 'application/json')
      .build();

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

    const request = new RequestBuilder()
      .withPemString(this.pem.toString())
      .withBaseUrl(this.apiUrl)
      .withEndpoint(sessionPath(sessionId))
      .withQueryParam('sdkId', this.sdkId)
      .withGet()
      .build();

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

    const request = new RequestBuilder()
      .withPemString(this.pem.toString())
      .withBaseUrl(this.apiUrl)
      .withEndpoint(sessionPath(sessionId))
      .withQueryParam('sdkId', this.sdkId)
      .withMethod('DELETE')
      .build();

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

    const request = new RequestBuilder()
      .withPemString(this.pem.toString())
      .withBaseUrl(this.apiUrl)
      .withEndpoint(mediaContentPath(sessionId, mediaId))
      .withQueryParam('sdkId', this.sdkId)
      .withGet()
      .build();

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

    const request = new RequestBuilder()
      .withPemString(this.pem.toString())
      .withBaseUrl(this.apiUrl)
      .withEndpoint(mediaContentPath(sessionId, mediaId))
      .withQueryParam('sdkId', this.sdkId)
      .withMethod('DELETE')
      .build();

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
    const requestBuilder = new RequestBuilder()
      .withPemString(this.pem.toString())
      .withBaseUrl(this.apiUrl)
      .withEndpoint('/supported-documents')
      .withGet();

    if (includeNonLatin) {
      requestBuilder.withQueryParam('includeNonLatin', true);
    }

    const request = requestBuilder.build();

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

    const request = new RequestBuilder()
      .withPemString(this.pem.toString())
      .withBaseUrl(this.apiUrl)
      .withEndpoint(`sessions/${sessionId}/resources/face-capture`)
      .withQueryParam('sdkId', this.sdkId)
      .withPost()
      .withPayload(new Payload(createFaceCaptureResourcePayload))
      .build();

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

    const request = new RequestBuilder()
      .withPemString(this.pem.toString())
      .withBaseUrl(this.apiUrl)
      .withEndpoint(`/sessions/${sessionId}/resources/face-capture/${resourceId}/image`)
      .withQueryParam('sdkId', this.sdkId)
      .withPut()
      .withPayload(new Payload(uploadFaceCaptureImagePayload, ContentType.FORM_DATA))
      .build();

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

    const request = new RequestBuilder()
      .withPemString(this.pem.toString())
      .withBaseUrl(this.apiUrl)
      .withEndpoint(`/sessions/${sessionId}/configuration`)
      .withQueryParam('sdkId', this.sdkId)
      .withGet()
      .build();

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

    const request = new RequestBuilder()
      .withPemString(this.pem.toString())
      .withBaseUrl(this.apiUrl)
      .withEndpoint(`/sessions/${sessionId}/tracked-devices`)
      .withQueryParam('sdkId', this.sdkId)
      .withGet()
      .build();

    return new Promise((resolve, reject) => {
      request.execute()
        // eslint-disable-next-line max-len
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

    const request = new RequestBuilder()
      .withPemString(this.pem.toString())
      .withBaseUrl(this.apiUrl)
      .withEndpoint(`/sessions/${sessionId}/tracked-devices`)
      .withQueryParam('sdkId', this.sdkId)
      .withMethod('DELETE')
      .build();

    return new Promise((resolve, reject) => {
      request.execute(true)
        .then(() => resolve())
        .catch((err) => reject(new IDVError(err)));
    });
  }
}

export default IDVService;
