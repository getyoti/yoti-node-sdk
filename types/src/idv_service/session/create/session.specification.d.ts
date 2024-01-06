export = SessionSpecification;
/**
 * Definition for the IDV Session to be created
 *
 * @class SessionSpecification
 */
declare class SessionSpecification {
    /**
     * @param {number} clientSessionTokenTtl
     *   Client-session-token time-to-live to apply to the created session
     * @param {number} resourcesTtl
     *   Time-to-live used for all Resources created in the course of the session
     * @param {string} userTrackingId
     *   User tracking id, for the Relying Business to track returning users
     * @param {NotificationConfig} notifications
     *   For configuring call-back messages
     * @param {RequestedCheck[]} requestedChecks
     *   The Checks to be performed on each Document
     * @param {RequestedTask[]} requestedTasks
     *   The Tasks to be performed on each Document
     * @param {SdkConfig} sdkConfig
     *   The SDK configuration set on the session specification
     * @param {RequiredDocument[]} requiredDocuments
     *   List of RequiredDocument defining the documents required from the client
     * @param {boolean} blockBiometricConsent
     *   Sets whether or not to block the collection of biometric consent
     * @param {Date} sessionDeadline
     *   The deadline that the session needs to be completed by
     * @param {object} identityProfileRequirements
     * @param {object} subject
     *   Information about the subject of the session
     */
    constructor(clientSessionTokenTtl: number, resourcesTtl: number, userTrackingId: string, notifications: NotificationConfig, requestedChecks: RequestedCheck[], requestedTasks: RequestedTask[], sdkConfig: SdkConfig, requiredDocuments: RequiredDocument[], blockBiometricConsent: boolean, sessionDeadline: Date, identityProfileRequirements: object, subject: object);
    /** @private */
    private clientSessionTokenTtl;
    /** @private */
    private sessionDeadline;
    /** @private */
    private resourcesTtl;
    /** @private */
    private userTrackingId;
    /** @private */
    private notifications;
    /** @private */
    private sdkConfig;
    /** @private */
    private identityProfileRequirements;
    /** @private */
    private subject;
    /** @private */
    private requestedChecks;
    /** @private */
    private requestedTasks;
    /** @private */
    private requiredDocuments;
    /** @private */
    private blockBiometricConsent;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import NotificationConfig = require("./notification.config");
import RequestedCheck = require("./check/requested.check");
import RequestedTask = require("./task/requested.task");
import SdkConfig = require("./sdk.config");
import RequiredDocument = require("./filters/required.document");
