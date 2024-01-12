/**
 *
 * @param {{profile, extraData}} content  encrypted profile content
 * @param receiptContentKey
 * @returns {ApplicationContent}
 */
export function buildApplicationContentFromEncryptedContent(content: {
    profile: any;
    extraData: any;
}, receiptContentKey: any): ApplicationContent;
/**
 *
 * @param {{profile, extraData}} content encrypted profile content
 * @param receiptContentKey
 * @returns {UserContent}
 */
export function buildUserContentFromEncryptedContent(content: {
    profile: any;
    extraData: any;
}, receiptContentKey: any): UserContent;
import ApplicationContent = require("./application.content");
import UserContent = require("./user.content");
