'use strict';

const { DocScanService } = require('../doc_scan_service');

/**
 * Client used for communication with the Yoti Doc Scan service,
 * where any signed request is required.
 *
 * The DocScanClient is to be used by clients to facilitate
 * requests to the Yoti Doc Scan system where any signed requests are
 * required.  Using the supplied models, clients can build requests, and
 * perform the requests to the Doc Scan system.
 *
 * @class DocScanClient
 */
class DocScanClient {
  /**
   * @param {string} applicationId
   * @param {string|Buffer} pem
   */
  constructor(applicationId, pem) {
    this.docScanService = new DocScanService(applicationId, pem);
  }

  /**
   * Creates a Doc Scan session using the supplied session specification
   *
   * @param {SessionSpecification} sessionSpecification
   *
   * @returns {Promise} Resolving SessionResult
   */
  createSession(sessionSpecification) {
    return this.docScanService.createSession(sessionSpecification);
  }

  /**
   * Retrieves the state of a previously created Yoti Doc Scan session
   *
   * @param {string} sessionId
   *
   * @returns {Promise} Resolving DocScanSession
   */
  getSession(sessionId) {
    return this.docScanService.getSession(sessionId);
  }

  /**
   * Deletes a previously created Yoti Doc Scan session and all
   * of its related resources
   *
   * @param {string} sessionId
   *
   * @returns {Promise}
   */
  deleteSession(sessionId) {
    return this.docScanService.deleteSession(sessionId);
  }

  /**
   * Retrieves media related to a Yoti Doc Scan session based
   * on the supplied media ID
   *
   * @param {string} sessionId
   * @param {string} mediaId
   *
   * @returns {Promise} resolving Media
   */
  getMedia(sessionId, mediaId) {
    return this.docScanService.getMedia(sessionId, mediaId);
  }

  /**
   * Deletes media related to a Yoti Doc Scan session based
   * on the supplied media ID
   *
   * @param {string} sessionId
   * @param {string} mediaId
   *
   * @returns {Promise}
   */
  deleteMedia(sessionId, mediaId) {
    return this.docScanService.deleteMedia(sessionId, mediaId);
  }
}

module.exports = DocScanClient;
