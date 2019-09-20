class TokenRequest {
  constructor(rememberMeId, sandboxAttributes) {
    this.rememberMeId = rememberMeId;
    this.sandboxAttributes = sandboxAttributes;
  }

  toJSON() {
    return {
      remember_me_id: this.rememberMeId,
      profile_attributes: this.sandboxAttributes,
    };
  }
}

module.exports = {
  TokenRequest,
};
