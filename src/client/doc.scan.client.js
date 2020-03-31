'use strict';

const { DocScanService } = require('../doc_scan_service');

/**
 * Client used for communication with the Yoti Doc Scan service
 *
 * The {@code DocScanClient} facilitates requests to the Yoti Doc Scan service
 *
 * @class DocScanClient
 */
class DocScanClient {
  /**
   * @param {string} sdkId
   * @param {string|Buffer} pem
   */
  constructor(sdkId, pem) {
    this.docScanService = new DocScanService(sdkId, pem);
  }

  /**
   * Creates a Doc Scan session using the supplied session specification
   *
   * @param {SessionSpecification} sessionSpecification
   *
   * @returns {Promise} Resolving CreateSessionResult
   */
  createSession(sessionSpecification) {
    return this.docScanService.createSession(sessionSpecification);
  }

  /**
   * Retrieves the state of a previously created Yoti Doc Scan session
   *
   * @param {string} sessionId
   *
   * @returns {Promise} Resolving GetSessionResult
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
  getMediaContent(sessionId, mediaId) {
    return this.docScanService.getMediaContent(sessionId, mediaId);
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
  deleteMediaContent(sessionId, mediaId) {
    return this.docScanService.deleteMediaContent(sessionId, mediaId);
  }

  /**
   * Gets a list of supported documents.
   *
   * @returns {Promise}
   */
  getSupportedDocuments() {
    return this.docScanService.getSupportedDocuments();
  }
}

module.exports = DocScanClient;
