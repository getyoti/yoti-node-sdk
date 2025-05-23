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
    /** @protected */
    protected sdkId: string;
    /** @protected */
    protected pem: string | Buffer;
    /** @protected */
    protected apiUrl: string;
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
     * @returns {Promise<Media | null>}
     */
    getMediaContent(sessionId: string, mediaId: string): Promise<Media | null>;
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
    /**
     * @param {string} sessionId
     *
     * @returns {Promise<SessionTrackedDevicesResponse>}
     */
    getSessionTrackedDevices(sessionId: string): Promise<SessionTrackedDevicesResponse>;
    /**
     * Deletes tracked devices for a given session
     *
     * @param {string} sessionId
     *
     * @returns {Promise}
     */
    deleteSessionTrackedDevices(sessionId: string): Promise<any>;
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
import SessionTrackedDevicesResponse = require("./session/retrieve/devices/session.tracked.devices.response");
