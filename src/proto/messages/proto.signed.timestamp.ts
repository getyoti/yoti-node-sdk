import { SignedTimestamp } from '../types';

export function decodeSignedTimeStamp(binaryData: Uint8Array) {
  const decoded = SignedTimestamp.decode(binaryData) as any;
  return { version: decoded.version, timestamp: decoded.timestamp };
}

export function encodeSignedTimeStamp(notificationData: any) {
  return SignedTimestamp.encode(notificationData).finish();
}
