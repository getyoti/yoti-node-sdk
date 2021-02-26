export = SessionSpecificationBuilder;
/**
 * Builder to assist the creation of {@link SessionSpecification}.
 *
 * @class SessionSpecificationBuilder
 */
declare class SessionSpecificationBuilder {
    requestedChecks: any[];
    requestedTasks: any[];
    requiredDocuments: any[];
    /**
     * Sets the client session token TTL (time-to-live)
     *
     * @param {int} clientSessionTokenTtl
     *   The client session token TTL
     *
     * @returns {this}
     */
    withClientSessionTokenTtl(clientSessionTokenTtl: any): this;
    clientSessionTokenTtl: any;
    /**
     * Sets the resources TTL (time-to-live)
     *
     * @param {int} resourcesTtl
     *   The resources TTL
     *
     * @returns {this}
     */
    withResourcesTtl(resourcesTtl: any): this;
    resourcesTtl: any;
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
     * @param {RequestedTask} requestedTasks
     *
     * @return
     */
    withRequestedTask(requestedTask: any): SessionSpecificationBuilder;
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
     * @param {bool} blockBiometricConsent
     *
     * @return {this}
     */
    withBlockBiometricConsent(blockBiometricConsent: any): this;
    blockBiometricConsent: any;
    /**
     * Builds the {@link SessionSpec} based on the values supplied to the builder
     *
     * @returns {SessionSpec}
     */
    build(): any;
}
import NotificationConfig = require("./notification.config");
import RequestedCheck = require("./check/requested.check");
import SdkConfig = require("./sdk.config");
import RequiredDocument = require("./filters/required.document");
