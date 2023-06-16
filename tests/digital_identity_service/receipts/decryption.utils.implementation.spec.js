jest.mock('../../../src/yoti_common');

const { unwrapReceiptKey, decryptReceiptContent } = require('../../../src/digital_identity_service/receipts/decryption.utils');
const YotiCommon = require('../../../src/yoti_common');
const { messages } = require('../../../src/proto');

describe('Decryption utils (implementation)', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('#unwrapReceiptKey', () => {
    it('should return the sessionId value after calling the common decryption methods', () => {
      const wrappedReceiptKey = Buffer.from('receipt-key').toString('base64');
      const encryptedItemKey = Buffer.from('encrypted-item-key').toString('base64');
      const itemKeyIv = Buffer.from('item-key-iv').toString('base64');
      const pem = Buffer.from('pem');

      const decryptedItemKey = 'decrypted-item-key';
      const cipherText = 'cipher-text';
      const tag = 'tag';
      const unwrappedReceiptKey = 'unwrapped-receipt-key';
      YotiCommon.decryptAsymmetric.mockReturnValueOnce(decryptedItemKey);
      YotiCommon.decomposeAESGCMCipherText.mockReturnValueOnce({ cipherText, tag });
      YotiCommon.decryptAESGCM.mockReturnValueOnce(unwrappedReceiptKey);

      const result = unwrapReceiptKey(wrappedReceiptKey, encryptedItemKey, itemKeyIv, pem);
      expect(result).toEqual(unwrappedReceiptKey);

      expect(YotiCommon.decryptAsymmetric).toHaveBeenCalledTimes(1);
      const decryptAsymmetricArguments = YotiCommon.decryptAsymmetric.mock.calls[0];
      expect(decryptAsymmetricArguments[0]).toBeInstanceOf(Buffer);
      expect(decryptAsymmetricArguments[0].toString('base64')).toEqual(encryptedItemKey);
      expect(decryptAsymmetricArguments[1]).toEqual(pem);

      expect(YotiCommon.decomposeAESGCMCipherText).toHaveBeenCalledTimes(1);
      const decomposeAESGCMCipherTextArguments = YotiCommon.decomposeAESGCMCipherText.mock.calls[0];
      expect(decomposeAESGCMCipherTextArguments[0]).toBeInstanceOf(Buffer);
      expect(decomposeAESGCMCipherTextArguments[0].toString('base64')).toEqual(wrappedReceiptKey);

      expect(YotiCommon.decryptAESGCM).toHaveBeenCalledTimes(1);
      const decryptAESGCMArguments = YotiCommon.decryptAESGCM.mock.calls[0];
      expect(decryptAESGCMArguments[0]).toEqual(cipherText);
      expect(decryptAESGCMArguments[1]).toEqual(tag);
      expect(decryptAESGCMArguments[2]).toBeInstanceOf(Buffer);
      expect(decryptAESGCMArguments[2].toString('base64')).toEqual(itemKeyIv);
      expect(decryptAESGCMArguments[3]).toEqual(decryptedItemKey);
    });
  });
  describe('#decryptReceiptContent', () => {
    it('#should return the decoded and decrypted content message', () => {
      const encryptedContentMessage = Buffer.from('some-content').toString('base64');
      const receiptKey = Buffer.from('receipt-key').toString('base64');
      const contentCipherText = Buffer.from('content-cipher-text').toString('base64');
      const contentIv = Buffer.from('content-iv').toString('base64');

      const decodeEncryptedDataSpy = jest.spyOn(messages, 'decodeEncryptedData');
      decodeEncryptedDataSpy.mockReturnValueOnce({ cipherText: contentCipherText, iv: contentIv });

      const mockedResult = 'decoded-and-decrypted-content';
      YotiCommon.decryptAESCBC.mockReturnValueOnce(mockedResult);

      const result = decryptReceiptContent(encryptedContentMessage, receiptKey);
      expect(result).toEqual(mockedResult);

      expect(decodeEncryptedDataSpy).toHaveBeenCalledTimes(1);
      const decodeEncryptedDataArguments = decodeEncryptedDataSpy.mock.calls[0];
      expect(decodeEncryptedDataArguments[0]).toBeInstanceOf(Buffer);
      expect(decodeEncryptedDataArguments[0].toString('base64')).toEqual(encryptedContentMessage);

      expect(YotiCommon.decryptAESCBC).toHaveBeenCalledTimes(1);
      const decryptAESCBCArguments = YotiCommon.decryptAESCBC.mock.calls[0];
      expect(decryptAESCBCArguments[0]).toBeInstanceOf(Buffer);
      expect(decryptAESCBCArguments[0].toString('base64')).toEqual(contentCipherText);
      expect(decryptAESCBCArguments[1]).toBeInstanceOf(Buffer);
      expect(decryptAESCBCArguments[1].toString('base64')).toEqual(contentIv);
      expect(decryptAESCBCArguments[2]).toEqual(receiptKey);
    });
  });
});
