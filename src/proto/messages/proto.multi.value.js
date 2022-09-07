'use strict';

const { MultiValue } = require('../types');

module.exports = {
  decodeMultiValue(value) {
    return MultiValue.decode(value);
  },
};
