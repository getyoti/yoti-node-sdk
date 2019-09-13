const fs = require('fs');

const yotiCommon = require('../../src/yoti_common');

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

describe('yotiCommon', () => {
  describe('#getRSASignatureForMessage', () => {
    it('should return the signed message', () => {
      const signedMessage = yotiCommon.getRSASignatureForMessage('blah blah blah', privateKeyFile);
      const expectedSignedMessage = fs.readFileSync('./tests/sample-data/fixtures/aml-signed-message.txt', 'utf8');
      expect(signedMessage).toBe(expectedSignedMessage);
    });
  });
});
