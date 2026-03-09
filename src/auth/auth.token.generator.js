'use strict';

const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const superagent = require('superagent');
const Validation = require('../yoti_common/validation');
const config = require('../../config');
const CreateAuthenticationTokenResponse = require('./create.authentication.token.response');

/**
 * Generates authentication tokens via OAuth2 client_credentials grant.
 *
 * @class AuthTokenGenerator
 */
class AuthTokenGenerator {
  /**
   * @param {string} sdkId
   * @param {string|Buffer} pem
   * @param {{authUrl?: string}} options
   */
  constructor(sdkId, pem, { authUrl } = {}) {
    Validation.isString(sdkId, 'sdkId');
    Validation.notNullOrEmpty(pem, 'pem');

    /** @private */
    this.sdkId = sdkId;
    /** @private */
    this.pem = pem;
    /** @private */
    this.authUrl = authUrl || config.yoti.authApi;
  }

  /**
   * Generate an authentication token with the given scopes.
   *
   * @param {string[]} scopes
   *
   * @returns {Promise<CreateAuthenticationTokenResponse>}
   */
  async generate(scopes) {
    if (!Array.isArray(scopes) || scopes.length === 0) {
      throw new Error('At least one scope must be provided');
    }

    const assertion = this.createAssertion();

    const response = await superagent
      .post(this.authUrl)
      .type('form')
      .send({
        grant_type: 'client_credentials',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion: assertion,
        scope: scopes.join(' '),
      });

    return new CreateAuthenticationTokenResponse(response.body);
  }

  /**
   * @private
   * @returns {string}
   */
  createAssertion() {
    const now = Math.floor(Date.now() / 1000);

    return jwt.sign(
      {
        iss: `sdk:${this.sdkId}`,
        sub: `sdk:${this.sdkId}`,
        aud: this.authUrl,
        iat: now,
        exp: now + 300,
        jti: uuid(),
      },
      this.pem.toString(),
      { algorithm: 'PS384' }
    );
  }
}

module.exports = AuthTokenGenerator;
