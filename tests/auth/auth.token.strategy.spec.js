'use strict';

const AuthTokenStrategy = require('../../src/auth/auth.token.strategy');

describe('AuthTokenStrategy', () => {
  describe('constructor', () => {
    it('should throw if token is not a string', () => {
      expect(() => new AuthTokenStrategy(123)).toThrow(TypeError);
    });

    it('should throw if token is undefined', () => {
      expect(() => new AuthTokenStrategy()).toThrow(TypeError);
    });

    it('should accept a valid string token', () => {
      expect(() => new AuthTokenStrategy('some-token')).not.toThrow();
    });
  });

  describe('#createAuthHeaders', () => {
    it('should return Authorization Bearer header', () => {
      const strategy = new AuthTokenStrategy('my-access-token');
      const headers = strategy.createAuthHeaders();

      expect(headers).toEqual({
        Authorization: 'Bearer my-access-token',
      });
    });
  });

  describe('#createQueryParams', () => {
    it('should return empty object', () => {
      const strategy = new AuthTokenStrategy('my-access-token');
      const params = strategy.createQueryParams();

      expect(params).toEqual({});
    });
  });
});
