export function requestCanSendPayload(httpMethod: string): boolean;
export function getRSASignatureForMessage(message: string, pem: string): string;
export function getAuthKeyFromPem(pem: string): string;
export function decryptUserProfile(receipt: any, pem: string): {
    attributes: any[];
};
export function decryptApplicationProfile(receipt: any, pem: string): {
    attributes: any[];
};
export function parseExtraData(receipt: any, pem: string): (AttributeIssuanceDetails | undefined)[];
export function decryptAESGCM(cipherText: Buffer, tag: Buffer, iv: Buffer, secret: Buffer): Buffer;
export function decryptAESCBC(cipherText: Buffer, iv: Buffer, secret: Buffer): Buffer;
export function decryptAsymmetric(cipherText: Buffer, pem: Buffer): Buffer;
export function decomposeAESGCMCipherText(secret: Buffer, tagSize?: number): {
    cipherText: Buffer;
    tag: Buffer;
};
export type AttributeIssuanceDetails = import('./../data_type/attribute.issuance.details');
