import { AttributeList } from '../types';

/**
 * Decode all attributes.
 */
export function decodeAttributeList(binaryData: Uint8Array) {
  const { attributes } = AttributeList.decode(binaryData) as any;
  return { attributes };
}

export function encodeAttributeList(attributesData: any) {
  return AttributeList.encode({ attributes: attributesData }).finish();
}
