/**
 * Defines the Digital Identity Service.
 *
 * @class DigitalIdentityService
 */
export class DigitalIdentityService {
    constructor(sdkId: any, pem: any, { apiUrl }?: {
        apiUrl?: string;
    });
    sdkId: any;
    pem: any;
    apiUrl: string;
    /**
     *
     * @param shareSessionConfig
     * @returns {Promise<CreateShareSessionResult>}
     */
    createShareSession(shareSessionConfig: any): Promise<CreateShareSessionResult>;
    /**
     *
     * @param sessionId
     * @returns {Promise<GetShareSessionResult>}
     */
    getShareSession(sessionId: any): Promise<GetShareSessionResult>;
    /**
     *
     * @param sessionId
     * @returns {Promise<CreateShareQrCodeResult>}
     */
    createShareQrCode(sessionId: any): Promise<CreateShareQrCodeResult>;
    /**
     *
     * @param qrCodeId
     * @returns {Promise<GetShareQrCodeResult>}
     */
    getShareQrCode(qrCodeId: any): Promise<GetShareQrCodeResult>;
    /**
     *
     * @param {string} receiptId
     * @returns {Promise<ReceiptResponse>}
     */
    fetchReceipt(receiptId: string): Promise<ReceiptResponse>;
    /**
     *
     * @param {string} receiptItemKeyId
     * @returns {Promise<ReceiptItemKeyResponse>}
     */
    fetchReceiptItemKey(receiptItemKeyId: string): Promise<ReceiptItemKeyResponse>;
    /**
     *
     * @param {string} receiptId
     * @returns {Promise<GetShareReceiptResult>}
     */
    getShareReceipt(receiptId: string): Promise<GetShareReceiptResult>;
}
import LocationConstraintExtensionBuilder = require("./extension/location.constraint.extension.builder");
import TransactionalFlowExtensionBuilder = require("./extension/transactional.flow.extension.builder");
import ThirdPartyAttributeExtensionBuilder = require("./extension/third.party.attribute.extension.builder");
import ExtensionBuilder = require("./extension/extension.builder");
import WantedAnchorBuilder = require("./policy/wanted.anchor.builder");
import SourceConstraintBuilder = require("./policy/source.constraint.builder");
import ConstraintsBuilder = require("./policy/constraints.builder");
import WantedAttributeBuilder = require("./policy/wanted.attribute.builder");
import PolicyBuilder = require("./policy/policy.builder");
import ShareSessionConfigurationBuilder = require("./share.session.configuration.builder");
import ShareSessionNotificationBuilder = require("./share.session.notification.builder");
import CreateShareSessionResult = require("./create.share.session.result");
import GetShareSessionResult = require("./get.share.session.result");
import CreateShareQrCodeResult = require("./create.share.qr.code.result");
import GetShareQrCodeResult = require("./get.share.qr.code.result");
import ReceiptResponse = require("./receipts/receipt.response");
import ReceiptItemKeyResponse = require("./receipts/receipt.item.key.response");
import GetShareReceiptResult = require("./get.share.receipt.result");
export declare namespace DigitalIdentityBuilders {
    export { LocationConstraintExtensionBuilder };
    export { TransactionalFlowExtensionBuilder };
    export { ThirdPartyAttributeExtensionBuilder };
    export { ExtensionBuilder };
    export { WantedAnchorBuilder };
    export { SourceConstraintBuilder };
    export { ConstraintsBuilder };
    export { WantedAttributeBuilder };
    export { PolicyBuilder };
    export { ShareSessionConfigurationBuilder };
    export { ShareSessionNotificationBuilder };
}
