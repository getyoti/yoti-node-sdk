'use strict';

const receipt = {};

module.export.withWrappedReceiptKey = (wrappedReceiptKey) => {
  receipt.wrapped_receipt_key = wrappedReceiptKey;
  return receipt;
};
