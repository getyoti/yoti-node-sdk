import Validation = require('../../../../../yoti_common/validation');
import EndUserAllowedSourceResponse = require('./source/end.user.allowed.source.response');
import IbvAllowedSourceResponse = require('./source/ibv.allowed.source.response');
import RelyingBusinessAllowedSourceResponse = require('./source/relying.business.allowed.source.response');
import UnknownAllowedSourceResponse = require('./source/unknown.allowed.source.response');
import IDVConstants = require('../../../../idv.constants');

/**
 * @typedef {import('./source/allowed.source.response')} AllowedSourceResponse
 */

/**
 * @param {{type: string}} source
 * @return {AllowedSourceResponse}
 */
function createAllowedSourceFromArray(source) {
  switch (source.type) {
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
    /** @private */
    this.type = requiredResource.type;

    Validation.isString(requiredResource.id, 'id');
    /** @private */
    this.id = requiredResource.id;

    Validation.isString(requiredResource.state, 'state');
    /** @private */
    this.state = requiredResource.state;

    if (requiredResource.allowed_sources) {
      Validation.isArray(requiredResource.allowed_sources, 'allowed_sources');
      /** @private */
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
      return this.allowedSources.some(
        (item) => item instanceof RelyingBusinessAllowedSourceResponse
      );
    }

    return false;
  }
}

export default RequiredResourceResponse;
