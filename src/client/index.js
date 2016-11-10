'use strict';

const ursa = require('ursa');
const fs = require('fs');
const profileService = require('../profile_service');

var pem;
var applicationId;

exports.YotiClient = class YotiClient {
	constructor(applicationId, pem) {
		this.applicationId = applicationId;
		this.pem = pem;
	}

	getActivityDetails (encryptedConnectToken) {
		let decryptedToken
		try {
			decryptedToken = decryptToken(encryptedConnectToken, this.pem)
		} catch (err) {
			return Promise.reject(err)
		}
		return profileService.getReceipt(decryptedToken, this.pem, this.applicationId);
	}
}

function decryptToken(encryptedConnectToken, pem) {
	let privateKey = ursa.createPrivateKey(pem);
	var decryptedToken;
	try{
		decryptedToken = privateKey.decrypt(encryptedConnectToken, 'base64', 'utf8', ursa.RSA_PKCS1_PADDING);
	} catch (err) {
		throw new Error("Could not decrypt token: " + encryptedConnectToken)
	}
	return decryptedToken;
}