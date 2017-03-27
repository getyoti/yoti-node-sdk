'use strict'

const sinon = require('sinon')
const assert = require('assert');
const nock = require('nock');

const fs = require('fs')

const YotiClient = require('..')
const config = require('../config')


const privateKeyFile = fs.readFileSync('./test/keys/node-sdk-test.pem', 'utf8')

const encryptedYotiToken = "c31Db4y6ClxSWy26xDpa9LEX3ZTUuR-rKaAhjQWnmKilR20IshkysR5Y3Hh3R6hanOyxcu7fl5vbjikkGZZb3_iH6NjxmBXuGY_Fr23AhrHvGL9WMg4EtemVvr6VI2f_5H_PDhDpYUvv-YpEM0f_SReoVxGIc8VGfj1gukuhPyNJ9hs55-SDdUjN77JiA6FPcYZxEIaqQE_yT_c3Y4V72Jnq3RHbG0vL6SefSfY_fFsnx_HeddsJc10qJYCwAkdGzVzbJH2DQ2Swp821Gwyj9eNK54S6HvpIg7LclID7BtymG6z7cTNp3fXX7mgKYoQlh_DHmPmaiqyj398w424RBg=="


const response = fs.readFileSync('./test/payload.json', 'utf8')
const responseContentNull = fs.readFileSync('./test/payload-other-party-null.json', 'utf8')
const responseContentNonExistent = fs.readFileSync('./test/payload-other-party-non-existent.json', 'utf8')
const responseContentEmptyObj = fs.readFileSync('./test/payload-other-party-empty-object.json', 'utf8')

const selfie = fs.readFileSync('./test/selfie.txt', 'utf8')
const phoneNumber = '+447474747474';
const userId = 'Hig2yAT79cWvseSuXcIuCLa5lNkAPy70rxetUaeHlTJGmiwc/g1MWdYWYrexWvPU';
const profileService = require('../src/profile_service')

describe('Call Yoti client', function() {
	beforeEach(done => {
		nock(`${config.server.configuration.connectApi}`).get(new RegExp('^/api/v1/profile/')).reply(200, response);
		done()
	})
	

	afterEach(done => { 
		nock.cleanAll();
		done()
	})
	
	
	

	it('fetch and decrypt selfie+phone_number profile correctly', done => {
		let yotiClient = new YotiClient('stub-app-id', privateKeyFile)
		yotiClient.getActivityDetails(encryptedYotiToken)
			.then(activityDetails => {
				let profile = activityDetails.getUserProfile()
				let outcome = activityDetails.getOutcome()
				
				assert.notEqual(profile, undefined)
				assert.equal(activityDetails.getUserId(), userId)
				assert.equal(profile.phoneNumber, phoneNumber)
				assert.equal(profile.selfie, selfie)
				assert.equal(outcome, 'SUCCESS')
				
				done()
			})
			.catch(done)
	})

	it('should get receipt', done => {
		profileService.getReceipt('blah', privateKeyFile, 'stub-app-id')
			.then(activityDetails => {
				let profile = activityDetails.getUserProfile()
				let outcome = activityDetails.getOutcome()
				
				assert.notEqual(profile, undefined)
				assert.equal(activityDetails.getUserId(), userId)
				assert.equal(profile.phoneNumber, phoneNumber)
				assert.equal(profile.selfie, selfie)
				assert.equal(outcome, 'SUCCESS')

				done()
			})
			.catch(done)
	})
})

describe('Call Yoti client with no data in profile', function() {
	beforeEach(done => {
		nock(`${config.server.configuration.connectApi}`).get(new RegExp('^/api/v1/profile/')).reply(200, responseContentNull);
		done()
	})

	afterEach(done => {
		nock.cleanAll();
		done()
	})

	it('fetch and decrypt the empty profile providing the correct userId and outcome', done => {
		let yotiClient = new YotiClient('stub-app-id', privateKeyFile)
		yotiClient.getActivityDetails(encryptedYotiToken)
			.then(activityDetails => {
				let profile = activityDetails.getUserProfile()
				let outcome = activityDetails.getOutcome()

				assert.notEqual(profile, undefined)
				assert.deepEqual(profile, {})
				assert.equal(activityDetails.getUserId(), userId)
				assert.equal(outcome, 'SUCCESS')

				done()
			})
			.catch(done)
	})


	it('should get an empty receipt from an empty profile share', done => {
		profileService.getReceipt('blah', privateKeyFile, 'stub-app-id')
			.then(activityDetails => {
				let profile = activityDetails.getUserProfile()
				let outcome = activityDetails.getOutcome()

				assert.notEqual(profile, undefined)
				assert.deepEqual(profile, {})
				assert.equal(activityDetails.getUserId(), userId)
				assert.equal(outcome, 'SUCCESS')

				done()
			})
			.catch(done)
	})
})

describe('Call Yoti client containing empty object in profile attribute in the response', function() {
	beforeEach(done => {
		nock(`${config.server.configuration.connectApi}`).get(new RegExp('^/api/v1/profile/')).reply(200, responseContentEmptyObj);
		done()
	})

	afterEach(done => {
		nock.cleanAll();
		done()
	})

	it('fetch and decrypt the empty profile providing the correct userId and outcome', done => {
		let yotiClient = new YotiClient('stub-app-id', privateKeyFile)
		yotiClient.getActivityDetails(encryptedYotiToken)
			.then(activityDetails => {
				let profile = activityDetails.getUserProfile()
				let outcome = activityDetails.getOutcome()

				assert.notEqual(profile, undefined)
				assert.deepEqual(profile, {})
				assert.equal(activityDetails.getUserId(), userId)
				assert.equal(outcome, 'SUCCESS')

				done()
			})
			.catch(done)
	})


	it('should get an empty receipt from an empty profile share', done => {
		profileService.getReceipt('blah', privateKeyFile, 'stub-app-id')
			.then(activityDetails => {
				let profile = activityDetails.getUserProfile()
				let outcome = activityDetails.getOutcome()

				assert.notEqual(profile, undefined)
				assert.deepEqual(profile, {})
				assert.equal(activityDetails.getUserId(), userId)
				assert.equal(outcome, 'SUCCESS')

				done()
			})
			.catch(done)
	})
})



describe('Call Yoti client with no profile attribute existent in the response', function() {
	beforeEach(done => {
		nock(`${config.server.configuration.connectApi}`).get(new RegExp('^/api/v1/profile/')).reply(200, responseContentNonExistent);
		done()
	})

	afterEach(done => {
		nock.cleanAll();
		done()
	})

	it('fetch and decrypt the empty profile providing the correct userId and outcome', done => {
		let yotiClient = new YotiClient('stub-app-id', privateKeyFile)
		yotiClient.getActivityDetails(encryptedYotiToken)
			.then(activityDetails => {
				let profile = activityDetails.getUserProfile()
				let outcome = activityDetails.getOutcome()

				assert.notEqual(profile, undefined)
				assert.deepEqual(profile, {})
				assert.equal(activityDetails.getUserId(), userId)
				assert.equal(outcome, 'SUCCESS')

				done()
			})
			.catch(done)
	})

	it('should get an empty receipt from an empty profile share', done => {
		profileService.getReceipt('blah', privateKeyFile, 'stub-app-id')
			.then(activityDetails => {
				let profile = activityDetails.getUserProfile()
				let outcome = activityDetails.getOutcome()

				assert.notEqual(profile, undefined)
				assert.deepEqual(profile, {})
				assert.equal(activityDetails.getUserId(), userId)
				assert.equal(outcome, 'SUCCESS')

				done()
			})
			.catch(done)
	})
})
