const {
  expect,
} = require('chai');
const fs = require('fs');
const nock = require('nock');
const uuid = require('uuid');

const config = require('../config');
const {
  DynamicAttributeListRequest,
  AttributeList,
  getDynamicAttributeList,
} = require('../src/dynamic_attribute_list_service');

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

const APP_ID = uuid();

describe('dynamicAttributeList', () => {
  const callbackURL = '/login/f842b2f6-b41f-45ba-8a53-a18d40379b82';
  const wantedAttributeList = [{
    name: 'full_name',
    derivation: '',
    optional: 'false',
  }];
  const wantedRememberMe = false;
  const attributeList = AttributeList(
    wantedAttributeList,
    null,
    wantedRememberMe
  );
  const dynamicAttributeListRequest = new DynamicAttributeListRequest(callbackURL, attributeList);
  // const QRCODE_LINK = "https://staging0.code.yoti.com/CAEaJDRjNTQ3M2IxLTNiNzktNDg3My1iMmM4LThiMTQxZDYwMjM5ODAC";
  const QRCODE_LINK = 'https://dynamic-code.yoti.com/CAEaJDRjNTQ3M2IxLTNiNzktNDg3My1iMmM4LThiMTQxZDYwMjM5ODAC';
  const REF_ID = '4c5473b1-3b79-4873-b2c8-8b141d602398';
  const DYNAMIC_ATTRIBUTE_LIST_FILE = './tests/sample-data/responses/dynamic-attribute-list.json';

  beforeEach((done) => {
    const response = fs.readFileSync(DYNAMIC_ATTRIBUTE_LIST_FILE);
    nock(`${config.yoti.connectApi}`)
      .post(new RegExp(`^/api/v1/qrcodes/apps/${APP_ID}`))
      .reply(200, response);
    done();
  });

  afterEach((done) => {
    nock.cleanAll();
    done();
  });

  context('validate attributeList', () => {
    it('should validate AttributeList', () => {
      expect(attributeList).to.deep.equal({
        wanted: wantedAttributeList,
        wanted_auth_types: [],
        wanted_remember_me: false,
        extensions: [],
      });
    });

    it('it should get the qr code and ref id', (done) => {
      getDynamicAttributeList(dynamicAttributeListRequest, privateKeyFile, APP_ID)
        .then((result) => {
          expect(result.getQRCodeLink()).to.equal(QRCODE_LINK);
          expect(result.getRefId()).to.equal(REF_ID);
          done();
        })
        .catch(done);
    });

    it('should throw error when AttributeList is empty', () => {
      expect(() => AttributeList(null, null, null))
        .to.throw(Error, 'type of attributeList wanted_remember_me should be a boolean');
    });
  });
});
