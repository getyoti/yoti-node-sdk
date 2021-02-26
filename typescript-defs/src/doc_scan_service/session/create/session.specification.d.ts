export = SessionSpecification;
/**
 * Definition for the Doc Scan Session to be created
 *
 * @class SessionSpecification
 */
declare class SessionSpecification {
    /**
     * @param {int} clientSessionTokenTtl
     *   Client-session-token time-to-live to apply to the created session
     * @param {int} resourcesTtl
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
     * @param {bool} blockBiometricConsent
     *   Sets whether or not to block the collection of biometric consent
     */
    constructor(clientSessionTokenTtl: any, resourcesTtl: any, userTrackingId: string, notifications: NotificationConfig, requestedChecks: RequestedCheck[], requestedTasks: RequestedTask[], sdkConfig: SdkConfig, requiredDocuments: RequiredDocument[], blockBiometricConsent: any);
    clientSessionTokenTtl: any;
    resourcesTtl: any;
    userTrackingId: string;
    notifications: NotificationConfig;
    sdkConfig: SdkConfig;
    requestedChecks: RequestedCheck[];
    requestedTasks: RequestedTask[];
    requiredDocuments: RequiredDocument[];
    blockBiometricConsent: any;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import NotificationConfig = require("./notification.config");
import SdkConfig = require("./sdk.config");
import RequestedCheck = require("./check/requested.check");
import RequestedTask = require("./task/requested.task");
import RequiredDocument = require("./filters/required.document");
