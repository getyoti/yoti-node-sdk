'use strict';

const RequestedCheck = require('./requested.check');
const IDVConstants = require('../../../idv.constants');
const Validation = require('../../../../yoti_common/validation');
const RequestedIdDocumentComparisonConfig = require('./requested.id.document.comparison.config');

/**
 * @class RequestedIdDocumentComparisonCheck
 */
class RequestedIdDocumentComparisonCheck extends RequestedCheck {
  /**
   * @param {RequestedIdDocumentComparisonConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedIdDocumentComparisonConfig, 'config');
    super(IDVConstants.ID_DOCUMENT_COMPARISON, config);
  }
}

module.exports = RequestedIdDocumentComparisonCheck;
