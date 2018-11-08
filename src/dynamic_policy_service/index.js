"use strict";

const httpRequest = require("../request");
const { Payload } = require("../request/payload");
const constant = require("../yoti_common/constants");

const {
    DynamicPolicyRequest,
    DynamicPolicyResult,
    Policy
} = require("./dynamic.policy");

const getDynamicPolicy = (dynamicSharingRequest, pem, appId) => {
    const endPoint = `/qrcodes/apps/${appId}`;
    const httpMethod = "POST";

    if (!dynamicSharingRequest) {
        throw new Error("Error - dynamic sharing request should not be empty");
    }

    const payload = new Payload(dynamicSharingRequest.getData());

    return new Promise((resolve, reject) => {
        httpRequest.makeRequest(httpMethod, endPoint, pem, appId, payload)
            .then((response) => {
                try { 
                    const parsedResponse = response.getParsedResponse();
                    DynamicPolicyResult.checkAttributes(parsedResponse);
                    return resolve(new DynamicPolicyResult(parsedResponse));
                } catch(err) {
                    console.log(`Error getting response data :: ${err}`);
                    return reject(err);
                }
            })
            .catch((err) => {
                console.log(`Error retriving requested data: ${err}`);
                return reject(err);
            })
    });
}

module.exports = {
    DynamicPolicyRequest,
    DynamicPolicyResult,
    Policy,
    getDynamicPolicy,
};
