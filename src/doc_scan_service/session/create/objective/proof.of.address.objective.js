'use strict';

const Objective = require('./objective');
const DocScanConstants = require('../../../doc.scan.constants');

class ProofOfAddressObjective extends Objective {
  constructor() {
    super(DocScanConstants.PROOF_OF_ADDRESS);
  }
}

module.exports = ProofOfAddressObjective;
