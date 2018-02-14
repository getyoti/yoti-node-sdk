'use strict';

// Export Yoti entity modules required for the AML check
const Country = require('./country').Country;
const AmlAddress = require('./aml.address').AmlAddress;
const AmlProfile = require('./aml.profile').AmlProfile;

module.exports = {Country, AmlAddress, AmlProfile};