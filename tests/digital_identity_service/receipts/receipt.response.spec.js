const ReceiptResponse = require('../../../src/digital_identity_service/receipts/receipt.response');

describe('ReceiptItemKeyResponse', () => {
  let receiptResponse;

  beforeEach(() => {
    receiptResponse = new ReceiptResponse({
      id: 'test_receipt_id',
      sessionId: 'test_receipt_session_id',
      timestamp: '2003-11-04T12:51:07Z',
    });
  });

  describe('#getId', () => {
    it('should return the receipt ID', () => {
      expect(receiptResponse.getId()).toEqual('test_receipt_id');
    });
  });

  describe('#getSessionId', () => {
    it('should return the sessionId of the receipt', () => {
      expect(receiptResponse.getSessionId()).toEqual('test_receipt_session_id');
    });
  });

  describe('#getTimestamp', () => {
    it('should return the timestamp of the receipt', () => {
      expect(receiptResponse.getTimestamp().toUTCString()).toEqual('Tue, 04 Nov 2003 12:51:07 GMT');
    });
  });

  describe('#getRememberMeId', () => {
    it('should return undefined if not defined', () => {
      expect(receiptResponse.getRememberMeId()).toEqual(undefined);
    });

    it('should return rememberMeId of the receipt', () => {
      receiptResponse.rememberMeId = 'test_receipt_remember_me_id';
      expect(receiptResponse.getRememberMeId()).toEqual('test_receipt_remember_me_id');
    });
  });

  describe('#getParentRememberMeId', () => {
    it('should return undefined if not defined', () => {
      expect(receiptResponse.getParentRememberMeId()).toEqual(undefined);
    });

    it('should return parentRememberMeId of the receipt', () => {
      receiptResponse.parentRememberMeId = 'test_receipt_parent_remember_me_id';
      expect(receiptResponse.getParentRememberMeId()).toEqual('test_receipt_parent_remember_me_id');
    });
  });

  describe('#getContent', () => {
    it('should return undefined if not defined', () => {
      expect(receiptResponse.getContent()).toEqual(undefined);
    });

    it('should return content of the receipt', () => {
      receiptResponse.content = {
        profile: 'test_receipt_content_profile',
        extraData: 'test_receipt_content_extra_data',
      };
      expect(receiptResponse.getContent()).toEqual({
        profile: 'test_receipt_content_profile',
        extraData: 'test_receipt_content_extra_data',
      });
    });
  });

  describe('#getOtherPartyContent', () => {
    it('should return undefined if not defined', () => {
      expect(receiptResponse.getOtherPartyContent()).toEqual(undefined);
    });

    it('should return otherPartyContent of the receipt', () => {
      receiptResponse.otherPartyContent = {
        profile: 'test_receipt_other_party_content_profile',
        extraData: 'test_receipt_other_party_content_extra_data',
      };
      expect(receiptResponse.getOtherPartyContent()).toEqual({
        profile: 'test_receipt_other_party_content_profile',
        extraData: 'test_receipt_other_party_content_extra_data',
      });
    });
  });

  describe('#getWrappedItemKeyId', () => {
    it('should return undefined if not defined', () => {
      expect(receiptResponse.getWrappedItemKeyId()).toEqual(undefined);
    });

    it('should return wrappedItemKey of the receipt', () => {
      receiptResponse.wrappedItemKeyId = 'test_receipt_wrapped_item_key_id';
      expect(receiptResponse.getWrappedItemKeyId()).toEqual('test_receipt_wrapped_item_key_id');
    });
  });

  describe('#getWrappedkey', () => {
    it('should return undefined if not defined', () => {
      expect(receiptResponse.getWrappedKey()).toEqual(undefined);
    });

    it('should return wrappedKey of the receipt', () => {
      receiptResponse.wrappedKey = 'test_receipt_wrapped_key';
      expect(receiptResponse.getWrappedKey()).toEqual('test_receipt_wrapped_key');
    });
  });

  describe('#getError', () => {
    it('should return undefined if not defined', () => {
      expect(receiptResponse.getError()).toEqual(undefined);
    });

    it('should return error of the receipt', () => {
      receiptResponse.error = 'test_receipt_error';
      expect(receiptResponse.getError()).toEqual('test_receipt_error');
    });
  });
});
