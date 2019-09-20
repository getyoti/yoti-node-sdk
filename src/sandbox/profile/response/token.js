class TokenResponse {
  constructor(responseData) {
    this.token = responseData.token;
  }

  getToken() {
    return this.token;
  }
}

module.exports = {
  TokenResponse,
};
