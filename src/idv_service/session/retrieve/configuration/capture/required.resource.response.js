'use strict';

const Validation = require('../../../../../yoti_common/validation');
const EndUserAllowedSourceResponse = require('./source/end.user.allowed.source.response');
const IbvAllowedSourceResponse = require('./source/ibv.allowed.source.response');
const RelyingBusinessAllowedSourceResponse = require('./source/relying.business.allowed.source.response');
const UnknownAllowedSourceResponse = require('./source/unknown.allowed.source.response');
const IDVConstants = require('../../../../idv.constants');

/**
 * @param {array<string, string>} source
 * @return {AllowedSourceResponse}
 */
function createAllowedSourceFromArray(source) {
  switch (source) {
    case IDVConstants.END_USER:
      return new EndUserAllowedSourceResponse();
    case IDVConstants.IBV:
      return new IbvAllowedSourceResponse();
    case IDVConstants.RELYING_BUSINESS:
      return new RelyingBusinessAllowedSourceResponse();
    default:
      return new UnknownAllowedSourceResponse();
  }
}

class RequiredResourceResponse {
  /**
   * @param {object} requiredResource
   */
  constructor(requiredResource) {
    Validation.isString(requiredResource.type, 'type');
    this.type = requiredResource.type;

    Validation.isString(requiredResource.id, 'id');
    this.id = requiredResource.id;

    Validation.isString(requiredResource.state, 'state');
    this.state = requiredResource.state;

    if (requiredResource.allowed_sources) {
      Validation.isArray(requiredResource.allowed_sources, 'allowed_sources');
      this.allowedSources = requiredResource.allowed_sources.map(
        (allowedSource) => createAllowedSourceFromArray(allowedSource)
      );
    }
  }

  /**
   * @return {string}
   */
  getType() {
    return this.type;
  }

  /**
   * @return {string}
   */
  getId() {
    return this.id;
  }

  /**
   * @return {string}
   */
  getState() {
    return this.state;
  }

  /**
   * @return {AllowedSourceResponse[]}
   */
  getAllowedSources() {
    return this.allowedSources;
  }

  /**
   *
   * Returns if the Relying Business is allowed to upload resources
   * to satisfy the requirement.
   *
   * return the end user is allowed to upload resources
   *
   * @return {boolean}
   */
  isRelyingBusinessAllowed() {
    if (this.allowedSources) {
      return this.allowedSources.findIndex(
        (item) => item instanceof RelyingBusinessAllowedSourceResponse
      ) > -1;
    }

    return false;
  }
}

module.exports = RequiredResourceResponse;
