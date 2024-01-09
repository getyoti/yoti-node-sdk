export = IDVClient;
/**
 * Client used for communication with the Yoti IDV service
 *
 * The {@code IDVClient} facilitates requests to the Yoti IDV service
 *
 * @class IDVClient
 */
declare class IDVClient {
    /**
     * @param {string} sdkId
     * @param {string|Buffer} pem
     * @param {{apiUrl?: string}} options
     */
    constructor(sdkId: string, pem: string | Buffer, { apiUrl }?: {
        apiUrl?: string;
    });
    /** @private */
    private idvService;
    /**
     * Creates a IDV session using the supplied session specification
     *
     * @typedef {import('../idv_service/session/create/session.specification.js')} SessionSpecification
     *
     * @param {SessionSpecification} sessionSpecification
     *
     * @typedef {import('../idv_service/session/create/create.session.result')} CreateSessionResult
     *
     * @returns {Promise<CreateSessionResult>}
     */
    createSession(sessionSpecification: import("../idv_service/session/create/session.specification.js")): Promise<import("../idv_service/session/create/create.session.result")>;
    /**
     * Retrieves the state of a previously created Yoti IDV session
     *
     * @param {string} sessionId
     *
     * @typedef {import('../idv_service/session/retrieve/get.session.result.js')} GetSessionResult
     *
     * @returns {Promise<GetSessionResult>}
     */
    getSession(sessionId: string): Promise<import("../idv_service/session/retrieve/get.session.result.js")>;
    /**
     * Deletes a previously created Yoti IDV session and all
     * of its related resources
     *
     * @param {string} sessionId
     *
     * @returns {Promise<void>}
     */
    deleteSession(sessionId: string): Promise<void>;
    /**
     * Retrieves media related to a Yoti IDV session based
     * on the supplied media ID
     *
     * @param {string} sessionId
     * @param {string} mediaId
     *
     * @typedef {import('../data_type/media.js')} Media
     *
     * @returns {Promise<Media>}
     */
    getMediaContent(sessionId: string, mediaId: string): Promise<import("../data_type/media.js")>;
    /**
     * Deletes media related to a Yoti IDV session based
     * on the supplied media ID
     *
     * @param {string} sessionId
     * @param {string} mediaId
     *
     * @returns {Promise<void>}
     */
    deleteMediaContent(sessionId: string, mediaId: string): Promise<void>;
    /**
     * Gets a list of supported documents.
     *
     * @param {boolean} includeNonLatin
     *
     * @typedef {import('../idv_service/support/supported.documents.response.js')} SupportedDocumentsResponse
     *
     * @returns {Promise<SupportedDocumentsResponse>}
     */
    getSupportedDocuments(includeNonLatin: boolean): Promise<import("../idv_service/support/supported.documents.response.js")>;
    /**
     * Creates a face capture resource
     * @param {string} sessionId
     *
     * @typedef {import('../idv_service/session/create/face_capture/create.face.capture.resource.payload.js')} CreateFaceCaptureResourcePayload
     *
     * @param {CreateFaceCaptureResourcePayload} createFaceCaptureResourcePayload
     *
     * @typedef {import('../idv_service/session/retrieve/create.face.capture.resource.response.js')} CreateFaceCaptureResourceResponse
     *
     * @returns {Promise<CreateFaceCaptureResourceResponse>}
     */
    createFaceCaptureResource(sessionId: string, createFaceCaptureResourcePayload: import("../idv_service/session/create/face_capture/create.face.capture.resource.payload.js")): Promise<import("../idv_service/session/retrieve/create.face.capture.resource.response.js")>;
    /**
     * Uploads a face capture image
     * @param {string} sessionId
     * @param {string} resourceId
     *
     * @typedef {import('../idv_service/session/create/face_capture/upload.face.capture.image.payload.js')} UploadFaceCaptureImagePayload
     *
     * @param {UploadFaceCaptureImagePayload} uploadFaceCaptureImagePayload
     *
     * @returns {Promise<void>}
     */
    uploadFaceCaptureImage(sessionId: string, resourceId: string, uploadFaceCaptureImagePayload: import("../idv_service/session/create/face_capture/upload.face.capture.image.payload.js")): Promise<void>;
    /**
     * Fetches the configuration for the given sessionID.
     *
     * @param {string} sessionId
     *
     * @typedef {import('../idv_service/session/retrieve/configuration/session.configuration.response.js')} SessionConfigurationResponse
     *
     * @returns {Promise<SessionConfigurationResponse>}
     */
    getSessionConfiguration(sessionId: string): Promise<import("../idv_service/session/retrieve/configuration/session.configuration.response.js")>;
}
