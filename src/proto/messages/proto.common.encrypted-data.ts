import { EncryptedData } from '../types';

export function decodeEncryptedData(binaryData: Uint8Array) {
  const decodedData = EncryptedData.decode(binaryData) as any;
  return {
    cipherText: decodedData.cipherText.toString('base64'),
    iv: decodedData.iv.toString('base64'),
  };
}

export function encodeEncryptedData(notificationData: any) {
  return EncryptedData.encode(notificationData).finish();
}
