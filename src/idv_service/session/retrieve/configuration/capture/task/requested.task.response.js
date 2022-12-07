class RequestedTaskResponse {
  /**
   * Returns the type of the {@link RequestedTaskResponse}
   *
   * @return {string | null}
   */
  getType() {
    return this.type;
  }

  /**
   * Returns the current state of the Requested Task
   *
   * @return {string | null}
   */
  getState() {
    return this.state;
  }
}

module.exports = RequestedTaskResponse;
