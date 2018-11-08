const {
    expect
} = require("chai");
const fs = require("fs");
const nock = require("nock");
const uuid = require("uuid");

const config = require("../config");
const {
    DynamicPolicyRequest,
    Policy,
    getDynamicPolicy,
} = require("../src/dynamic_policy_service");
const Payload = require('../src/request/payload').Payload;

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

const APP_ID = "9cd51c3f-f03a-46e3-aa9b-244cbfc99d86";

describe("dynamicPolicy", () => {
    const callbackURL = "/login/f842b2f6-b41f-45ba-8a53-a18d40379b82";
    const wantedPolicy = [{
        "name": "full_name",
        "derivation": "",
        "optional": "false",
    }];
    const wantedRememberMe = false;
    const policy = Policy(
        wantedPolicy,
        null,
        wantedRememberMe,
    );
    const dynamicPolicyRequest = new DynamicPolicyRequest(callbackURL, policy);
    const QRCODE_LINK = "https://staging0.code.yoti.com/CAEaJDRjNTQ3M2IxLTNiNzktNDg3My1iMmM4LThiMTQxZDYwMjM5ODAC";
    const REF_ID = "4c5473b1-3b79-4873-b2c8-8b141d602398";
    const DYNAMIC_POLICY_FILE = "./tests/sample-data/responses/dynamic-policy.json";

    beforeEach((done) => {
        const response = fs.readFileSync(DYNAMIC_POLICY_FILE);
        nock(`${config.yoti.connectApi}`)
            .post(new RegExp(`^/api/v1/qrcodes/apps/${APP_ID}`))
            .reply(200, response);
        done();
    });

    afterEach((done) => {
        nock.cleanAll();
        done();
    });

    context("validate policy", () => {
        it("should validate policy", () => {
            expect(policy).to.deep.equal({
                wanted: wantedPolicy,
                wanted_auth_types: [],
                wanted_remember_me: false,
                extensions: [],
            });
        });

        it("it should get the qr code and ref id", (done) => {
            getDynamicPolicy(dynamicPolicyRequest, privateKeyFile, APP_ID)
                .then((result) => {
                    expect(result.getQRCodeLink()).to.equal(QRCODE_LINK);
                    expect(result.getRefId()).to.equal(REF_ID);
                    done();
                })
                .catch(done);
        });

        it("should throw error when policy is empty", () => {
            expect(() => Policy(null, null, null))
                .to.throw(Error, "type of policy wanted_remember_me should be a boolean");
        });

    });

});
