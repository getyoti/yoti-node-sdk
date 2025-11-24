import { MultiValue } from '../types';

export function decodeMultiValue(value: Uint8Array) {
  return MultiValue.decode(value) as any;
}
