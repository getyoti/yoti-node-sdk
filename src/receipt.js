"use strict";

var receipt = {};

export function withWrappedReceiptKey(wrappedReceiptKey) {
	receipt.wrapped_receipt_key = wrappedReceiptKey
	return receipt
}