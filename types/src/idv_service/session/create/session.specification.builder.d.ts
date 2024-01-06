export = SessionSpecificationBuilder;
/**
 * Builder to assist the creation of {@link SessionSpecification}.
 *
 * @class SessionSpecificationBuilder
 */
declare class SessionSpecificationBuilder {
    /** @private */
    private requestedChecks;
    /** @private */
    private requestedTasks;
    /** @private */
    private requiredDocuments;
    /**
     * Sets the client session token TTL (time-to-live)
     *
     * @param {number} clientSessionTokenTtl
     *   The client session token TTL
     *
     * @returns {this}
     */
    withClientSessionTokenTtl(clientSessionTokenTtl: number): this;
    clientSessionTokenTtl: number;
    /**
     * Sets the session deadline (alternative to session token TTL)
     *
     * @param {Date} sessionDeadline
     *   The session deadline date-time
     *
     * @returns {this}
     */
    withSessionDeadline(sessionDeadline: Date): this;
    sessionDeadline: Date;
    /**
     * Sets the resources TTL (time-to-live)
     *
     * @param {number} resourcesTtl
     *   The resources TTL
     *
     * @returns {this}
     */
    withResourcesTtl(resourcesTtl: number): this;
    resourcesTtl: number;
    /**
     * Sets the user tracking ID
     *
     * @param {string} userTrackingId
     *   The user tracking ID
     *
     * @returns {this}
     */
    withUserTrackingId(userTrackingId: string): this;
    userTrackingId: string;
    /**
     * Sets the {@link NotificationConfig}
     *
     * @param {NotificationConfig} notifications
     *
     * @returns {this}
     */
    withNotifications(notifications: NotificationConfig): this;
    notifications: NotificationConfig;
    /**
     * Adds a {@link RequestedCheck} to the list
     *
     * @param {RequestedCheck} requestedCheck
     *
     * @returns {this}
     */
    withRequestedCheck(requestedCheck: RequestedCheck): this;
    /**
     * Adds a {@link RequestedTask} to the list
     *
     * @param {RequestedTask} requestedTask
     *
     * @returns {this}
     */
    withRequestedTask(requestedTask: RequestedTask): this;
    /**
     * Sets the {@link SdkConfig}
     *
     * @param {SdkConfig} sdkConfig
     *
     * @returns {this}
     */
    withSdkConfig(sdkConfig: SdkConfig): this;
    sdkConfig: SdkConfig;
    /**
     * Adds a {@link RequiredDocument} to the list documents required from the client
     *
     * @param {RequiredDocument} requiredDocument
     *
     * @returns {this}
     */
    withRequiredDocument(requiredDocument: RequiredDocument): this;
    /**
     * Sets whether or not to block the collection of biometric consent
     *
     * @param {boolean} blockBiometricConsent
     *
     * @return {this}
     */
    withBlockBiometricConsent(blockBiometricConsent: boolean): this;
    blockBiometricConsent: boolean;
    withSubject(subject: any): this;
    subject: any;
    withIdentityProfileRequirements(identityProfileRequirements: any): this;
    identityProfileRequirements: any;
    /**
     * Builds the {@link SessionSpecification} based on the values supplied to the builder
     *
     * @returns {SessionSpecification}
     */
    build(): SessionSpecification;
}
import NotificationConfig = require("./notification.config");
import RequestedCheck = require("./check/requested.check");
import RequestedTask = require("./task/requested.task");
import SdkConfig = require("./sdk.config");
import RequiredDocument = require("./filters/required.document");
import SessionSpecification = require("./session.specification");
