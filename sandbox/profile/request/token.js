/**
 * @class TokenRequest
 */
class TokenRequest {
  /**
   * @param {string} rememberMeId
   * @param {SandboxAttribute[]} sandboxAttributes
   */
  constructor(rememberMeId, sandboxAttributes) {
    this.rememberMeId = rememberMeId;
    this.sandboxAttributes = sandboxAttributes;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      remember_me_id: this.rememberMeId,
      profile_attributes: this.sandboxAttributes,
    };
  }
}

module.exports = TokenRequest;
