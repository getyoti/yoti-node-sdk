export = DocScanService;
/**
 * Service built to handle the interactions between the client and Doc Scan APIs
 *
 * @class DocScanService
 */
declare class DocScanService {
    /**
     * @param {string} sdkId
     * @param {string|Buffer} pem
     */
    constructor(sdkId: string, pem: string | Buffer);
    sdkId: string;
    pem: string | Buffer;
    /**
     * Uses the supplied session specification to create a session
     *
     * @param {SessionSpecification} sessionSpecification
     *
     * @returns {Promise} Resolves CreateSessionResult
     */
    createSession(sessionSpecification: SessionSpecification): Promise<any>;
    /**
     * Retrieves the current state of a given session
     *
     * @param {string} sessionId
     *
     * @returns {Promise} Resolves GetSessionResult
     */
    getSession(sessionId: string): Promise<any>;
    /**
     * Deletes a session and all of its associated content
     *
     * @param {string} sessionId
     *
     * @returns {Promise}
     */
    deleteSession(sessionId: string): Promise<any>;
    /**
     * Retrieves {@link Media} content for a given session and media ID
     *
     * @param {string} sessionId
     * @param {string} mediaId
     *
     * @returns {Promise} resolving Media
     */
    getMediaContent(sessionId: string, mediaId: string): Promise<any>;
    /**
     * Deletes media content for a given session and media ID
     *
     * @param {string} sessionId
     * @param {string} mediaId
     *
     * @returns {Promise}
     */
    deleteMediaContent(sessionId: string, mediaId: string): Promise<any>;
    /**
     * Gets a list of supported documents.
     *
     * @returns {Promise}
     */
    getSupportedDocuments(): Promise<any>;
}
import SessionSpecification = require("./session/create/session.specification");
