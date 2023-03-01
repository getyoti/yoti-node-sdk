const fs = require('fs');
const crypto = require('crypto');

const yotiCommon = require('../../src/yoti_common');
const AESGCMEncryptedMessage = require('../sample-data/yoti-common/AESGCM-encrypted-message.json');
const AESCBCEncryptedMessage = require('../sample-data/yoti-common/AESCBC-encrypted-message.json');
const RSAPKCS1EncryptedMessage = require('../sample-data/yoti-common/RSA-PKCS1-encrypted-message.json');

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

describe('yotiCommon', () => {
  describe('#getRSASignatureForMessage', () => {
    it('should return the signed message', () => {
      const signedMessage = yotiCommon.getRSASignatureForMessage('blah blah blah', privateKeyFile);
      const expectedSignedMessage = fs.readFileSync('./tests/sample-data/fixtures/aml-signed-message.txt', 'utf8');
      expect(signedMessage).toBe(expectedSignedMessage);
    });
  });

  describe('#decryptAESGCM', () => {
    it('should decrypt the cipherText using the iv, tag and secret', () => {
      const {
        cipherText,
        plainText,
        iv,
        secret,
        tag,
      } = AESGCMEncryptedMessage;

      const decryptedBuffer = yotiCommon.decryptAESGCM(
        Buffer.from(cipherText, 'base64'),
        Buffer.from(tag, 'base64'),
        Buffer.from(iv, 'base64'),
        Buffer.from(secret, 'base64')
      );

      expect(decryptedBuffer.toString('utf8')).toBe(plainText);
    });
  });

  describe('#decryptAESCBC', () => {
    it('should decrypt the cipherText using the iv and secret', () => {
      const {
        cipherText, plainText, iv, secret,
      } = AESCBCEncryptedMessage;

      const decryptedValue = yotiCommon.decryptAESCBC(
        Buffer.from(cipherText, 'base64'),
        Buffer.from(iv, 'base64'),
        Buffer.from(secret, 'base64')
      );

      expect(decryptedValue.toString('utf8')).toBe(plainText);
    });
  });

  describe('#decomposeAESGCMCipherText', () => {
    it('should extract the cipherText and authentication tag given the default tag size', () => {
      const authTagSize = 16; // 16 bytes (0x10)
      const authTag = crypto.randomBytes(authTagSize);

      const cipherText = Buffer.from('I am a cipher text');

      const cipherTextWithAuthenticationTag = Buffer.concat([cipherText, authTag]);

      const {
        cipherText: decomposedCipherText,
        tag: decomposedTag,
      } = yotiCommon.decomposeAESGCMCipherText(cipherTextWithAuthenticationTag);

      expect(decomposedCipherText).toEqual(cipherText);
      expect(decomposedTag).toEqual(authTag);
    });

    it('should extract the cipherText and authentication tag given a custom tag size', () => {
      const authTagSize = 24;
      const authTag = crypto.randomBytes(authTagSize);

      const cipherText = Buffer.from('I am a cipher text');

      const cipherTextWithAuthenticationTag = Buffer.concat([cipherText, authTag]);

      const {
        cipherText: decomposedCipherText,
        tag: decomposedTag,
      } = yotiCommon.decomposeAESGCMCipherText(cipherTextWithAuthenticationTag, authTagSize);

      expect(decomposedCipherText).toEqual(cipherText);
      expect(decomposedTag).toEqual(authTag);
    });
  });

  describe('#decryptAsymmetric', () => {
    it('should decrypt the cipherText using the provided pem', () => {
      const { cipherText, plainText, pemString } = RSAPKCS1EncryptedMessage;

      const decryptedValue = yotiCommon.decryptAsymmetric(
        Buffer.from(cipherText, 'base64'),
        Buffer.from(pemString, 'utf8')
      );

      expect(decryptedValue.toString('utf8')).toEqual(plainText);
    });
  });
});
