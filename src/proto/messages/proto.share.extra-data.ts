import { ExtraData } from '../types';

export function decodeExtraData(binaryData: any) {
  const decoded = ExtraData.decode(Buffer.from(binaryData, 'base64')) as any;
  return { list: decoded.list };
}
