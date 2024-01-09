export = IDVService;
/**
 * Service Class to handle interactions with the IDV API
 *
 * @class IDVService
 */
declare class IDVService {
    /**
     * @param {string} sdkId
     * @param {string|Buffer} pem
     * @param {{apiUrl?: string}} options
     */
    constructor(sdkId: string, pem: string | Buffer, { apiUrl }?: {
        apiUrl?: string;
    });
    /** @private */
    private sdkId;
    /** @private */
    private pem;
    /** @private */
    private apiUrl;
    /**
     * Uses the supplied session specification to create a session
     *
     * @param {SessionSpecification} sessionSpecification
     *
     * @returns {Promise<CreateSessionResult>}
     */
    createSession(sessionSpecification: SessionSpecification): Promise<CreateSessionResult>;
    /**
     * Retrieves the current state of a given session
     *
     * @param {string} sessionId
     *
     * @returns {Promise<GetSessionResult>}
     */
    getSession(sessionId: string): Promise<GetSessionResult>;
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
     * @returns {Promise<Media>}
     */
    getMediaContent(sessionId: string, mediaId: string): Promise<Media>;
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
     * @param {boolean} includeNonLatin
     *
     * @returns {Promise<SupportedDocumentsResponse>}
     */
    getSupportedDocuments(includeNonLatin: boolean): Promise<SupportedDocumentsResponse>;
    /**
     * Creates a face capture resource
     * @param {string} sessionId
     * @param {CreateFaceCaptureResourcePayload} createFaceCaptureResourcePayload
     *
     * @returns {Promise<CreateFaceCaptureResourceResponse>}
     */
    createFaceCaptureResource(sessionId: string, createFaceCaptureResourcePayload: CreateFaceCaptureResourcePayload): Promise<CreateFaceCaptureResourceResponse>;
    /**
     * Uploads a face capture image
     * @param {string} sessionId
     * @param {string} resourceId
     * @param {UploadFaceCaptureImagePayload} uploadFaceCaptureImagePayload
     *
     */
    uploadFaceCaptureImage(sessionId: string, resourceId: string, uploadFaceCaptureImagePayload: UploadFaceCaptureImagePayload): Promise<any>;
    /**
     * @param {string} sessionId
     *
     * @returns {Promise<SessionConfigurationResponse>}
     */
    getSessionConfiguration(sessionId: string): Promise<SessionConfigurationResponse>;
}
import SessionSpecification = require("./session/create/session.specification");
import CreateSessionResult = require("./session/create/create.session.result");
import GetSessionResult = require("./session/retrieve/get.session.result");
import Media = require("../data_type/media");
import SupportedDocumentsResponse = require("./support/supported.documents.response");
import CreateFaceCaptureResourcePayload = require("./session/create/face_capture/create.face.capture.resource.payload");
import CreateFaceCaptureResourceResponse = require("./session/retrieve/create.face.capture.resource.response");
import UploadFaceCaptureImagePayload = require("./session/create/face_capture/upload.face.capture.image.payload");
import SessionConfigurationResponse = require("./session/retrieve/configuration/session.configuration.response");
