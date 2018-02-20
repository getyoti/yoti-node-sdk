'use strict'

const {expect} = require('chai');
const assert = require('assert');
const nock = require('nock');
const fs = require('fs');

const YotiClient = require('..');
const {AmlAddress} = require('../src/aml_type');
const {AmlProfile} = require('../src/aml_type');
const {Payload} = require('../src/request/payload');
const request = require('../src/request');
const amlService = require('../src/aml_service');
const yotiCommon = require('../src/yoti_common');
const config = require('../config');

const privateKeyFile = fs.readFileSync('./test/keys/node-sdk-test.pem', 'utf8');
const amlCheckResult = fs.readFileSync('./test/aml-check-result.json', 'utf8');
const amlCheckError = fs.readFileSync('./test/aml-check-error.json', 'utf8');

const expectedSignedMessage = fs.readFileSync('./test/aml-signed-message.txt', 'utf8');
const expectedPayloadJSON = '{"given_names":"Edward Richard George","family_name":"Heath","ssn":"","address":{"post_code":"","country":"GBR"}}';
const expectedBase64Payload = 'eyJnaXZlbl9uYW1lcyI6IkVkd2FyZCBSaWNoYXJkIEdlb3JnZSIsImZhbWlseV9uYW1lIjoiSGVhdGgiLCJzc24iOiIiLCJhZGRyZXNzIjp7InBvc3RfY29kZSI6IiIsImNvdW50cnkiOiJHQlIifX0=';

let amlAddress = new AmlAddress('GBR');
let amlProfile = new AmlProfile('Edward Richard George', 'Heath', amlAddress);
let amlPayload = new Payload(amlProfile.getData());

describe('Test getRSASignatureForMessage function' , function() {
  it('should return the signed message', function() {
    let signedMessage = yotiCommon.getRSASignatureForMessage('blah blah blah', privateKeyFile);
    expect(signedMessage).to.equal(expectedSignedMessage);
  });
});

describe('Test Payload class' , function() {
  it('should return the payload JSON string', function() {
    let payloadJSON = amlPayload.getPayloadJSON();
    expect(payloadJSON).to.equal(expectedPayloadJSON);
  });

  it('should return the base64 Payload', function() {
    let base64Payload = amlPayload.getBase64Payload();
    expect(base64Payload).to.equal(expectedBase64Payload);
  });
});

describe('Test performAmlCheck service', function() {
  beforeEach(done => {
    nock(`${config.server.configuration.connectApi}`)
        .post(new RegExp('^/api/v1/aml-check?'), amlPayload.getPayloadJSON())
        .reply(200, amlCheckResult);

    done();
  });

  afterEach(done => {
    nock.cleanAll();
    done();
  });

  it('should return a successful result from performAmlCheck call', done => {
    amlService.performAmlCheck(amlProfile, privateKeyFile, 'stub-app-id')
        .then(amlResult => {
          assert.equal(amlResult.isOnPepList, true);
          assert.equal(amlResult.isOnFraudList, false);
          assert.equal(amlResult.isOnWatchList, false);

          done();
        })
        .catch(done);
  });

});

describe('Test performAmlCheck from client', function() {
  beforeEach(done => {
    nock(`${config.server.configuration.connectApi}`)
        .post(new RegExp('^/api/v1/aml-check?'), amlPayload.getPayloadJSON())
        .reply(200, amlCheckResult);

    done();
  });

  afterEach(done => {
    nock.cleanAll();
    done();
  });

  it('should make a successful POST request to aml-check endpoint', done => {
    request.makeRequest('POST', '/aml-check', privateKeyFile, 'stub-app-id', amlPayload)
        .then(response => {
          expect(response.parsedResponse).to.be.a('object');

          done();
        })
        .catch(done);
  });

  it('should return a successful result from performAmlCheck call', done => {
    let yotiClient = new YotiClient('stub-app-id', privateKeyFile)
    yotiClient.performAmlCheck(amlProfile)
        .then(amlResult => {
          assert.equal(amlResult.isOnPepList, true);
          assert.equal(amlResult.isOnFraudList, false);
          assert.equal(amlResult.isOnWatchList, false);

          done();
        })
        .catch(done);
  });
});

let amlAddress2 = new AmlAddress('UK');
let amlProfile2 = new AmlProfile('Edward Richard George', 'Heath', amlAddress2);
let amlPayload2 = new Payload(amlProfile2.getData());
let expectedErrorMessage = 'PAYLOAD_VALIDATION - country must be specified as an ISO-3166 3-letter code';

describe('Test perform AML check with 2-letter country code', function() {
  beforeEach(done => {
    nock(`${config.server.configuration.connectApi}`)
        .post(new RegExp('^/api/v1/aml-check?'), amlPayload2.getPayloadJSON())
        .reply(400, amlCheckError);

    done();
  });

  afterEach(done => {
    nock.cleanAll();
    done();
  });

  it('should return PAYLOAD_VALIDATION error', done => {
    let yotiClient = new YotiClient('stub-app-id', privateKeyFile);
    yotiClient.performAmlCheck(amlProfile2)
        .catch(err => {
          expect(err.message).to.equal(expectedErrorMessage);
          done();
        })
        .catch(done);
  });
});