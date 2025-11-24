import { ThirdPartyAttribute } from '../types';

export function decodeThirdPartyAttribute(binaryData: any) {
  const decoded = ThirdPartyAttribute.decode(Buffer.from(binaryData, 'base64')) as any;
  return { issuanceToken: decoded.issuanceToken, issuingAttributes: decoded.issuingAttributes };
}
