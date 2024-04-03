const GetShareReceiptResult = require('../../src/digital_identity_service/get.share.receipt.result');
const ExtraData = require('../../src/digital_identity_service/receipts/extra.data');
const AttributeIssuanceDetails = require('../../src/data_type/attribute.issuance.details');
const UserContent = require('../../src/digital_identity_service/receipts/user.content');
const UserProfile = require('../../src/digital_identity_service/receipts/user.profile');
const ReceiptResponse = require('../../src/digital_identity_service/receipts/receipt.response');

describe('GetShareReceiptResult', () => {
  let getShareReceiptResult;
  let receiptResponse;
  beforeEach(() => {
    receiptResponse = new ReceiptResponse({
      id: 'test_receipt_id',
      sessionId: 'test_session_id',
      rememberMeId: 'test_remember_me_id',
      parentRememberMeId: 'test_parent_remember_me_id',
      timestamp: '2003-11-04T12:51:07Z',
      error: 'MANDATORY_DOCUMENT_NOT_PROVIDED',
    });
    getShareReceiptResult = new GetShareReceiptResult(receiptResponse);
  });
  describe('#getSessionId', () => {
    it('should return the sessionId value', () => {
      expect(getShareReceiptResult.getSessionId()).toEqual('test_session_id');
    });
  });
  describe('#getRememberMeId', () => {
    it('should return rememberMeId value', () => {
      expect(getShareReceiptResult.getRememberMeId()).toBe(
        'test_remember_me_id'
      );
    });
  });
  describe('#getParentRememberMeId', () => {
    it('should return parentRememberMeId value', () => {
      expect(getShareReceiptResult.getParentRememberMeId()).toBe(
        'test_parent_remember_me_id'
      );
    });
  });
  describe('#getProfile', () => {
    it('should return Profile object', () => {
      const getShareReceiptResultInstance = new GetShareReceiptResult(
        receiptResponse,
        new UserContent([
          {
            name: 'attr_name',
            value: 'attr_value',
          },
        ])
      );
      const profile = getShareReceiptResultInstance.getProfile();
      expect(profile).toBeInstanceOf(UserProfile);
      expect(profile.getAttribute('attr_name').getValue()).toBe('attr_value');
    });
  });
  describe('#getExtraData', () => {
    it('should return extraData', () => {
      const extraData = [
        new AttributeIssuanceDetails('some_token', new Date()),
      ];

      const getShareReceiptResultInstance = new GetShareReceiptResult(
        receiptResponse,
        new UserContent([], extraData)
      );
      expect(getShareReceiptResultInstance.getExtraData()).toBeInstanceOf(
        ExtraData
      );
      expect(
        getShareReceiptResultInstance
          .getExtraData()
          .getAttributeIssuanceDetails()
      ).toEqual(extraData[0]);
    });
  });
  describe('#getError', () => {
    it('should return error value', () => {
      const error = 'MANDATORY_DOCUMENT_NOT_PROVIDED';
      expect(getShareReceiptResult.getError()).toEqual(error);
    });
  });
  describe('#getTimestamp', () => {
    it('should return timestamp value', () => {
      expect(getShareReceiptResult.getTimestamp().toUTCString()).toBe(
        'Tue, 04 Nov 2003 12:51:07 GMT'
      );
    });
  });
  describe('#getReceiptId', () => {
    it('should return receipt ID', () => {
      const receiptId = 'test_receipt_id';

      expect(getShareReceiptResult.getReceiptId()).toBe(receiptId);
    });
  });
});
