export = DocScanClient;
/**
 * Client used for communication with the Yoti Doc Scan service
 *
 * The {@code DocScanClient} facilitates requests to the Yoti Doc Scan service
 *
 * @class DocScanClient
 */
declare class DocScanClient {
    /**
     * @param {string} sdkId
     * @param {string|Buffer} pem
     */
    constructor(sdkId: string, pem: string | Buffer);
    docScanService: DocScanService;
    /**
     * Creates a Doc Scan session using the supplied session specification
     *
     * @param {SessionSpecification} sessionSpecification
     *
     * @returns {Promise} Resolving CreateSessionResult
     */
    createSession(sessionSpecification: any): Promise<any>;
    /**
     * Retrieves the state of a previously created Yoti Doc Scan session
     *
     * @param {string} sessionId
     *
     * @returns {Promise} Resolving GetSessionResult
     */
    getSession(sessionId: string): Promise<any>;
    /**
     * Deletes a previously created Yoti Doc Scan session and all
     * of its related resources
     *
     * @param {string} sessionId
     *
     * @returns {Promise}
     */
    deleteSession(sessionId: string): Promise<any>;
    /**
     * Retrieves media related to a Yoti Doc Scan session based
     * on the supplied media ID
     *
     * @param {string} sessionId
     * @param {string} mediaId
     *
     * @returns {Promise} resolving Media
     */
    getMediaContent(sessionId: string, mediaId: string): Promise<any>;
    /**
     * Deletes media related to a Yoti Doc Scan session based
     * on the supplied media ID
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
import { DocScanService } from "../doc_scan_service";
