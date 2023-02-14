const ReceiptItemKeyResponse = require('../../../src/digital_identity_service/receipts/receipt.item.key.response');

describe('ReceiptItemKeyResponse', () => {
  let receiptItemKeyResponse;

  beforeEach(() => {
    receiptItemKeyResponse = new ReceiptItemKeyResponse({
      id: 'test_receipt_item_key_id',
      iv: 'test_receipt_item_key_iv',
      value: 'test_receipt_item_key_value',
    });
  });

  describe('#getId', () => {
    it('should return the item key ID', () => {
      expect(receiptItemKeyResponse.getId()).toEqual('test_receipt_item_key_id');
    });
  });

  describe('#getIv', () => {
    it('should return the item key iv', () => {
      expect(receiptItemKeyResponse.getIv()).toEqual('test_receipt_item_key_iv');
    });
  });

  describe('#getValue', () => {
    it('should return the item key iv', () => {
      expect(receiptItemKeyResponse.getValue()).toEqual('test_receipt_item_key_value');
    });
  });
});
