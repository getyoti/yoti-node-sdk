'use strict';

const SessionSpecification = require('../doc_scan_service/session/create/session.specification');
const CreateSessionResult = require('./session/create/create.session.result');
const DocScanSession = require('../doc_scan_service/session/retrieve/doc.scan.session');
const { RequestBuilder } = require('../request/request.builder');
const { Payload } = require('../request/payload');
const Validation = require('../yoti_common/validation');
const config = require('../../config');
const ByteBuffer = require('bytebuffer');
const Media = require('../data_type/media');
const ImagePng = require('../data_type/image.png');
const ImageJpeg = require('../data_type/image.jpeg');
const DocScanError = require('./doc.scan.error');

/**
 * @param {string} sessionId
 *
 * @returns {string}
 */
const sessionPath = sessionId => `/sessions/${sessionId}`;

/**
 * @param {string} sessionId
 * @param {string} mediaId
 *
 * @returns {string}
 */
const mediaContentPath = (sessionId, mediaId) => `${sessionPath(sessionId)}/media/${mediaId}/content`;

/**
 * Service built to handle the interactions between the client and Doc Scan API's
 *
 * @class DocScanService
 */
class DocScanService {
  /**
   * @param {string} applicationId
   * @param {string|Buffer} pem
   */
  constructor(applicationId, pem) {
    Validation.isString(applicationId, 'applicationId');
    Validation.notNullOrEmpty(pem, 'pem');

    this.applicationId = applicationId;
    this.pem = pem;
  }

  /**
   * Uses the supplied session specification to create a session
   *
   * @param {SessionSpecification} sessionSpecification
   *
   * @returns {Promise} Resolves CreateSessionResult
   */
  createSession(sessionSpecification) {
    Validation.instanceOf(sessionSpecification, SessionSpecification, 'sessionSpecification');

    const request = new RequestBuilder()
      .withPemString(this.pem)
      .withBaseUrl(config.yoti.docScanApi)
      .withEndpoint('/sessions')
      .withQueryParam('sdkId', this.applicationId)
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
            return reject(new DocScanError(err));
          }
        })
        .catch(err => reject(new DocScanError(err)));
    });
  }

  /**
   * Retrieves the current state of a given session
   *
   * @param {string} sessionId
   *
   * @returns {Promise} Resolves DocScanSession
   */
  getSession(sessionId) {
    Validation.isString(sessionId, 'sessionId');

    const request = new RequestBuilder()
      .withPemString(this.pem)
      .withBaseUrl(config.yoti.docScanApi)
      .withEndpoint(sessionPath(sessionId))
      .withQueryParam('sdkId', this.applicationId)
      .withGet()
      .build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            return resolve(new DocScanSession(response.getParsedResponse()));
          } catch (err) {
            return reject(new DocScanError(err));
          }
        })
        .catch(err => reject(new DocScanError(err)));
    });
  }

  /**
   * Deletes a session and all of it's associated content
   *
   * @param {string} sessionId
   *
   * @returns {Promise}
   */
  deleteSession(sessionId) {
    Validation.isString(sessionId, 'sessionId');

    const request = new RequestBuilder()
      .withPemString(this.pem)
      .withBaseUrl(config.yoti.docScanApi)
      .withEndpoint(sessionPath(sessionId))
      .withQueryParam('sdkId', this.applicationId)
      .withMethod('DELETE')
      .build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then(() => resolve())
        .catch(err => reject(new DocScanError(err)));
    });
  }

  /**
   * Retrieves {@link Media} content for a given session and media ID
   *
   * @param {string} sessionId
   * @param {string} mediaId
   *
   * @returns {Promise} resolving Media
   */
  getMediaContent(sessionId, mediaId) {
    Validation.isString(sessionId, 'sessionId');
    Validation.isString(mediaId, 'mediaId');

    const request = new RequestBuilder()
      .withPemString(this.pem)
      .withBaseUrl(config.yoti.docScanApi)
      .withEndpoint(mediaContentPath(sessionId, mediaId))
      .withQueryParam('sdkId', this.applicationId)
      .withGet()
      .build();

    return new Promise((resolve, reject) => {
      request.execute(true)
        .then((response) => {
          try {
            const contentType = response.getHeaders()['content-type'];
            const mimeType = contentType ? contentType.split(';')[0] : null;
            const content = new ByteBuffer(response.getBody());

            switch (mimeType) {
              case 'image/png':
                return resolve(new ImagePng(content));
              case 'image/jpeg':
                return resolve(new ImageJpeg(content));
              default:
                return resolve(new Media(content, mimeType));
            }
          } catch (err) {
            return reject(new DocScanError(err));
          }
        })
        .catch(err => reject(new DocScanError(err)));
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
      .withBaseUrl(config.yoti.docScanApi)
      .withEndpoint(mediaContentPath(sessionId, mediaId))
      .withQueryParam('sdkId', this.applicationId)
      .withMethod('DELETE')
      .build();

    return new Promise((resolve, reject) => {
      request.execute(true)
        .then(() => resolve())
        .catch(err => reject(new DocScanError(err)));
    });
  }
}

module.exports = DocScanService;
