import Objective = require('./objective');
import IDVConstants = require('../../../idv.constants');

class ProofOfAddressObjective extends Objective {
  constructor() {
    super(IDVConstants.PROOF_OF_ADDRESS);
  }
}

export default ProofOfAddressObjective;
