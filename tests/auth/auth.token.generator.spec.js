'use strict';

const nock = require('nock');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const AuthTokenGenerator = require('../../src/auth/auth.token.generator');

const PEM_STRING = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');
const SDK_ID = 'test-sdk-id';
const AUTH_URL = 'https://auth.example.com/v1/oauth/token';

describe('AuthTokenGenerator', () => {
  describe('constructor', () => {
    it('should throw if sdkId is not a string', () => {
      expect(() => new AuthTokenGenerator(123, PEM_STRING)).toThrow(TypeError);
    });

    it('should throw if pem is empty', () => {
      expect(() => new AuthTokenGenerator(SDK_ID, '')).toThrow();
    });

    it('should accept valid parameters', () => {
      expect(() => new AuthTokenGenerator(SDK_ID, PEM_STRING)).not.toThrow();
    });

    it('should accept custom auth URL', () => {
      expect(() => new AuthTokenGenerator(SDK_ID, PEM_STRING, { authUrl: AUTH_URL })).not.toThrow();
    });
  });

  describe('#generate', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should throw if scopes is empty', async () => {
      const generator = new AuthTokenGenerator(SDK_ID, PEM_STRING, { authUrl: AUTH_URL });
      await expect(generator.generate([])).rejects.toThrow('At least one scope must be provided');
    });

    it('should throw if scopes is not provided', async () => {
      const generator = new AuthTokenGenerator(SDK_ID, PEM_STRING, { authUrl: AUTH_URL });
      await expect(generator.generate()).rejects.toThrow('At least one scope must be provided');
    });

    it('should exchange JWT assertion for access token', async () => {
      const mockResponse = {
        access_token: 'test-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'idv:sessions',
      };

      const scope = nock(AUTH_URL.replace('/v1/oauth/token', ''))
        .post('/v1/oauth/token')
        .reply(200, mockResponse);

      const generator = new AuthTokenGenerator(SDK_ID, PEM_STRING, { authUrl: AUTH_URL });
      const response = await generator.generate(['idv:sessions']);

      expect(response.getAccessToken()).toBe('test-access-token');
      expect(response.getTokenType()).toBe('Bearer');
      expect(response.getExpiresIn()).toBe(3600);
      expect(response.getScope()).toBe('idv:sessions');
      expect(scope.isDone()).toBe(true);
    });

    it('should send correct JWT claims', async () => {
      let capturedBody;

      nock(AUTH_URL.replace('/v1/oauth/token', ''))
        .post('/v1/oauth/token', (body) => {
          capturedBody = body;
          return true;
        })
        .reply(200, { access_token: 'token', token_type: 'Bearer', expires_in: 3600 });

      const generator = new AuthTokenGenerator(SDK_ID, PEM_STRING, { authUrl: AUTH_URL });
      await generator.generate(['scope1', 'scope2']);

      expect(capturedBody).toHaveProperty('grant_type', 'client_credentials');
      expect(capturedBody).toHaveProperty('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
      expect(capturedBody).toHaveProperty('client_assertion');
      expect(capturedBody).toHaveProperty('scope', 'scope1 scope2');

      const decoded = jwt.decode(capturedBody.client_assertion, { complete: true });
      expect(decoded.header.alg).toBe('PS384');
      expect(decoded.header.typ).toBe('JWT');
      expect(decoded.payload.iss).toBe(`sdk:${SDK_ID}`);
      expect(decoded.payload.sub).toBe(`sdk:${SDK_ID}`);
      expect(decoded.payload.aud).toBe(AUTH_URL);
      expect(decoded.payload).toHaveProperty('jti');
      expect(decoded.payload).toHaveProperty('iat');
      expect(decoded.payload).toHaveProperty('exp');
      expect(decoded.payload.exp - decoded.payload.iat).toBe(300);
    });
  });
});
