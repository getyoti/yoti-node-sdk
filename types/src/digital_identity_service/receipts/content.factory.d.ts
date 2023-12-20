/**
 *
 * @param content {profile, extraData} encrypted profile content
 * @param receiptContentKey
 * @returns {ApplicationContent}
 */
export function buildApplicationContentFromEncryptedContent(content: profile, receiptContentKey: any): ApplicationContent;
/**
 *
 * @param content {profile, extraData} encrypted profile content
 * @param receiptContentKey
 * @returns {UserContent}
 */
export function buildUserContentFromEncryptedContent(content: profile, receiptContentKey: any): UserContent;
import ApplicationContent = require("./application.content");
import UserContent = require("./user.content");
