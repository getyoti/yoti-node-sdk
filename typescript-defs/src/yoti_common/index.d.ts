export function requestCanSendPayload(httpMethod: string): boolean;
export function getRSASignatureForMessage(message: string, pem: string): string;
export function getAuthKeyFromPem(pem: string): string;
export function decryptProfileContent(profileContent: string, wrappedReceiptKey: string, pem: string): any[];
export function decryptCurrentUserReceipt(receipt: any, pem: string): any[];
export function decryptApplicationProfile(receipt: any, pem: string): any[];
export function parseExtraData(receipt: any, pem: string): ExtraData;
import ExtraData = require("../profile_service/extra.data");
