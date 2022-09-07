'use strict';

const ProofOfAddressObjective = require('./proof.of.address.objective');

class ProofOfAddressObjectiveBuilder {
  // eslint-disable-next-line class-methods-use-this
  build() {
    return new ProofOfAddressObjective();
  }
}

module.exports = ProofOfAddressObjectiveBuilder;
