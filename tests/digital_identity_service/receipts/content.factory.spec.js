jest.mock('../../../src/digital_identity_service/receipts/decryption.utils');
jest.mock('../../../src/digital_identity_service/receipts/application.content');
jest.mock('../../../src/digital_identity_service/receipts/user.content');

const {
  buildApplicationContentFromEncryptedContent,
  buildUserContentFromEncryptedContent,
} = require('../../../src/digital_identity_service/receipts/content.factory');

const DecryptionUtils = require('../../../src/digital_identity_service/receipts/decryption.utils');
const { AttributeList } = require('../../../src/proto/types');
const { AttributeListConverter } = require('../../../src/yoti_common/converters/attribute.list.converter');
const ExtraDataConverter = require('../../../src/yoti_common/converters/extra.data.converter');

const ApplicationContent = require('../../../src/digital_identity_service/receipts/application.content');
const UserContent = require('../../../src/digital_identity_service/receipts/user.content');

describe('Content factory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('#buildUserContentFromEncryptedContent', () => {
    it('should return the sessionId value after calling the common decryption methods', () => {
      DecryptionUtils.decryptReceiptContent.mockImplementation((content) => `decrypted-${content}`);

      const decodeAttributeListSpy = jest.spyOn(AttributeList, 'decode');
      decodeAttributeListSpy.mockReturnValueOnce({ attributes: 'decoded-attributes' });

      const convertAttributeListSpy = jest.spyOn(AttributeListConverter, 'convertAttributeList');
      const mockConvertedAttributesList = [];
      convertAttributeListSpy.mockReturnValueOnce(mockConvertedAttributesList);

      const convertExtraDataSpy = jest.spyOn(ExtraDataConverter, 'convertExtraData');
      const mockConvertedExtraDataList = [];
      convertExtraDataSpy.mockReturnValueOnce(mockConvertedExtraDataList);

      const mockContent = { profile: 'some-profile', extraData: 'some-extra-data' };
      const mockReceiptKey = 'some-receipt-key';

      const result = buildUserContentFromEncryptedContent(mockContent, mockReceiptKey);
      expect(result).toBeInstanceOf(UserContent);
      expect(UserContent).toHaveBeenCalledTimes(1);
      expect(UserContent)
        .toHaveBeenCalledWith(mockConvertedAttributesList, mockConvertedExtraDataList);

      expect(DecryptionUtils.decryptReceiptContent).toHaveBeenCalledTimes(2);
      expect(DecryptionUtils.decryptReceiptContent)
        .toHaveBeenCalledWith(mockContent.profile, mockReceiptKey);
      expect(DecryptionUtils.decryptReceiptContent)
        .toHaveBeenCalledWith(mockContent.extraData, mockReceiptKey);

      expect(decodeAttributeListSpy).toHaveBeenCalledTimes(1);
      expect(decodeAttributeListSpy).toHaveBeenCalledWith(`decrypted-${mockContent.profile}`);
      expect(convertAttributeListSpy).toHaveBeenCalledWith('decoded-attributes');
      expect(convertExtraDataSpy).toHaveBeenCalledWith(`decrypted-${mockContent.extraData}`);
    });
  });
  describe('#buildApplicationContentFromEncryptedContent', () => {
    it('should return the sessionId value after calling the common decryption methods', () => {
      DecryptionUtils.decryptReceiptContent.mockImplementation((content) => `decrypted-${content}`);

      const decodeAttributeListSpy = jest.spyOn(AttributeList, 'decode');
      decodeAttributeListSpy.mockReturnValueOnce({ attributes: 'decoded-attributes' });

      const convertAttributeListSpy = jest.spyOn(AttributeListConverter, 'convertAttributeList');
      const mockConvertedAttributesList = [];
      convertAttributeListSpy.mockReturnValueOnce(mockConvertedAttributesList);

      const convertExtraDataSpy = jest.spyOn(ExtraDataConverter, 'convertExtraData');
      const mockConvertedExtraDataList = [];
      convertExtraDataSpy.mockReturnValueOnce(mockConvertedExtraDataList);

      const mockContent = { profile: 'some-profile', extraData: 'some-extra-data' };
      const mockReceiptKey = 'some-receipt-key';

      const result = buildApplicationContentFromEncryptedContent(mockContent, mockReceiptKey);
      expect(result).toBeInstanceOf(ApplicationContent);
      expect(ApplicationContent).toHaveBeenCalledTimes(1);
      expect(ApplicationContent)
        .toHaveBeenCalledWith(mockConvertedAttributesList, mockConvertedExtraDataList);

      expect(DecryptionUtils.decryptReceiptContent).toHaveBeenCalledTimes(2);
      expect(DecryptionUtils.decryptReceiptContent)
        .toHaveBeenCalledWith(mockContent.profile, mockReceiptKey);
      expect(DecryptionUtils.decryptReceiptContent)
        .toHaveBeenCalledWith(mockContent.extraData, mockReceiptKey);

      expect(decodeAttributeListSpy).toHaveBeenCalledTimes(1);
      expect(decodeAttributeListSpy).toHaveBeenCalledWith(`decrypted-${mockContent.profile}`);
      expect(convertAttributeListSpy).toHaveBeenCalledWith('decoded-attributes');
      expect(convertExtraDataSpy).toHaveBeenCalledWith(`decrypted-${mockContent.extraData}`);
    });
  });
});
