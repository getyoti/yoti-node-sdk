'use strict';

const Objective = require('./objective');
const IDVConstants = require('../../../idv.constants');

class ProofOfAddressObjective extends Objective {
  constructor() {
    super(IDVConstants.PROOF_OF_ADDRESS);
  }
}

module.exports = ProofOfAddressObjective;
