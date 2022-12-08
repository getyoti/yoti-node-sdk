'use strict';

const SessionSpecification = require('./session/create/session.specification');
const CreateSessionResult = require('./session/create/create.session.result');
const GetSessionResult = require('./session/retrieve/get.session.result');
const { RequestBuilder } = require('../request/request.builder');
const { Payload } = require('../request/payload');
const Validation = require('../yoti_common/validation');
const config = require('../../config');
const Media = require('../data_type/media');
const IDVError = require('./idv.error');
const SupportedDocumentsResponse = require('./support/supported.documents.response');
const SessionConfigurationResponse = require('./session/retrieve/configuration/session.configuration.response');

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
   * @param {Object} options
   * @param {string} options.apiUrl
   */
  constructor(sdkId, pem, { apiUrl = DEFAULT_API_URL } = {}) {
    Validation.isString(sdkId, 'sdkId');
    Validation.notNullOrEmpty(pem, 'pem');

    this.sdkId = sdkId;
    this.pem = pem;
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
      .withPemString(this.pem)
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
      .withPemString(this.pem)
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
      .withPemString(this.pem)
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
   * @returns {Promise<Media>}
   */
  getMediaContent(sessionId, mediaId) {
    Validation.isString(sessionId, 'sessionId');
    Validation.isString(mediaId, 'mediaId');

    const request = new RequestBuilder()
      .withPemString(this.pem)
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
      .withPemString(this.pem)
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
   * @returns {Promise<SupportedDocumentsResponse>}
   */
  getSupportedDocuments() {
    const request = new RequestBuilder()
      .withPemString(this.pem)
      .withBaseUrl(this.apiUrl)
      .withEndpoint('/supported-documents')
      .withGet()
      .build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => resolve(new SupportedDocumentsResponse(response.getParsedResponse())))
        .catch((err) => reject(new IDVError(err)));
    });
  }

  /**
   * @param {string} sessionId
   *
   * @returns {Promise<SessionConfigurationResponse>}
   */
  getSessionConfiguration(sessionId) {
    const request = new RequestBuilder()
      .withPemString(this.pem)
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
}

module.exports = IDVService;
