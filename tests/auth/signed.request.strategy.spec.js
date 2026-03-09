'use strict';

const fs = require('fs');
const SignedRequestStrategy = require('../../src/auth/signed.request.strategy');

const PEM_STRING = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

describe('SignedRequestStrategy', () => {
  describe('constructor', () => {
    it('should throw if pem is empty', () => {
      expect(() => new SignedRequestStrategy('')).toThrow();
    });

    it('should throw if pem is null', () => {
      expect(() => new SignedRequestStrategy(null)).toThrow();
    });

    it('should accept a valid PEM string', () => {
      expect(() => new SignedRequestStrategy(PEM_STRING)).not.toThrow();
    });
  });

  describe('#createAuthHeaders', () => {
    it('should return X-Yoti-Auth-Digest header', () => {
      const strategy = new SignedRequestStrategy(PEM_STRING);
      const headers = strategy.createAuthHeaders('GET', '/test?nonce=abc&timestamp=123', '');

      expect(headers).toHaveProperty('X-Yoti-Auth-Digest');
      expect(typeof headers['X-Yoti-Auth-Digest']).toBe('string');
      expect(headers['X-Yoti-Auth-Digest'].length).toBeGreaterThan(0);
    });

    it('should produce consistent digests for same input', () => {
      const strategy = new SignedRequestStrategy(PEM_STRING);
      const headers1 = strategy.createAuthHeaders('GET', '/test?nonce=abc', '');
      const headers2 = strategy.createAuthHeaders('GET', '/test?nonce=abc', '');

      expect(headers1['X-Yoti-Auth-Digest']).toBe(headers2['X-Yoti-Auth-Digest']);
    });

    it('should produce different digests for different input', () => {
      const strategy = new SignedRequestStrategy(PEM_STRING);
      const headers1 = strategy.createAuthHeaders('GET', '/test?nonce=abc', '');
      const headers2 = strategy.createAuthHeaders('POST', '/test?nonce=abc', '');

      expect(headers1['X-Yoti-Auth-Digest']).not.toBe(headers2['X-Yoti-Auth-Digest']);
    });
  });

  describe('#createQueryParams', () => {
    it('should return nonce and timestamp', () => {
      const strategy = new SignedRequestStrategy(PEM_STRING);
      const params = strategy.createQueryParams();

      expect(params).toHaveProperty('nonce');
      expect(params).toHaveProperty('timestamp');
      expect(typeof params.nonce).toBe('string');
      expect(typeof params.timestamp).toBe('number');
    });

    it('should generate unique nonces', () => {
      const strategy = new SignedRequestStrategy(PEM_STRING);
      const params1 = strategy.createQueryParams();
      const params2 = strategy.createQueryParams();

      expect(params1.nonce).not.toBe(params2.nonce);
    });
  });
});
