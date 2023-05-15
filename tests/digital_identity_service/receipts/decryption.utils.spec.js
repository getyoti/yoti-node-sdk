const forge = require('node-forge');
const { promisify } = require('util');
const { messages } = require('../../../src/proto');
const { unwrapReceiptKey, decryptReceiptContent } = require('../../../src/digital_identity_service/receipts/decryption.utils');

const generateRSAKeyPair = promisify(forge.pki.rsa.generateKeyPair);

describe('Decryption utils', () => {
  describe('#unwrapReceiptKey', () => {
    it('should unwrap a key based on the provided encryption material', async () => {
      // Given a receipt key
      const receiptKey = 'this-is-a-receipt-key';

      // That is being encrypted with 'AES-GCM'
      const itemKey = forge.random.getBytesSync(16);
      const itemKeyIv = forge.random.getBytesSync(16);
      const cipher = forge.cipher.createCipher('AES-GCM', itemKey);
      cipher.start({
        iv: itemKeyIv,
        tagLength: 16,
      });
      cipher.update(forge.util.createBuffer(receiptKey));
      cipher.finish();
      const encrypted = cipher.output;
      const tag = cipher.mode.tag;

      // And the resulting encrypted key and tag concatenated
      const wrappedReceiptKey = Buffer.concat([
        Buffer.from(encrypted.toHex(), 'hex'),
        Buffer.from(tag.toHex(), 'hex'),
      ]);

      // Given the item key is encrypted with an asymetric key
      const { publicKey, privateKey } = await generateRSAKeyPair();
      const pem = forge.pki.privateKeyToPem(privateKey);
      const encryptedItemKey = publicKey.encrypt(itemKey);

      // Calling the unwrapReceiptKey() with the wrappedReceiptKey, encryptedItemKey + iv, pem
      const unwrapReceiptKeyResult = unwrapReceiptKey(
        wrappedReceiptKey.toString('base64'),
        Buffer.from(encryptedItemKey, 'binary').toString('base64'),
        Buffer.from(itemKeyIv, 'binary').toString('base64'),
        pem
      );

      expect(unwrapReceiptKeyResult.toString()).toEqual(receiptKey);
    });
  });

  describe('#decryptReceiptContent', () => {
    it('#decryptReceiptContent', () => {
      // Given some clear content
      const content = 'I am some clear content';

      // Which is being encrypted
      const key = forge.random.getBytesSync(16);
      const iv = forge.random.getBytesSync(16);

      const cipher = forge.cipher.createCipher('AES-CBC', key);
      cipher.start({ iv });
      cipher.update(forge.util.createBuffer(Buffer.from(content)));
      cipher.finish();
      const encrypted = cipher.output;

      // Then added to an encoded EncryptedData message
      const contentAsEncryptedData = {
        cipherText: Buffer.from(encrypted.toHex(), 'hex').toString('base64'),
        iv: Buffer.from(iv, 'binary').toString('base64'),
      };
      const contentAsEncryptedDataMessage = messages.encodeEncryptedData(contentAsEncryptedData);

      const result = decryptReceiptContent(
        contentAsEncryptedDataMessage,
        key
      );
      //
      expect(Buffer.from(result).toString()).toEqual(content);
    });
  });
});
