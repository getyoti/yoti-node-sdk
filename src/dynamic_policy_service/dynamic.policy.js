"use strict";

const constants = require("../yoti_common/constants");

const validateWanted = (wanted) => {
    if (!Array.isArray(wanted)) {
        return false;
    }
    const validAttributes = new Set([
        "name",
        "accept_self_asserted",
        "derivation",
        "optional",
    ]);

    for (const item of wanted) {
        for (const key of Object.keys(item)) {
            if (!validAttributes.has(key)) {
                throw new Error(`invalid key value attribute supplied ${key}`);
            }
        }
    }
    return null;
}

/**
 * Verify the type of remember-me.
 * @param {*} rememberMe 
 */
const validateRememberMe = (rememberMe) => {
    if (typeof(rememberMe) !== "boolean") {
        const errorMessage = `type of policy ${constants.WANTED_REMEMBER_ME} should be a boolean`;
        throw new Error(errorMessage);
    }
}

/**
 * @desc validate authType is an array of boolean.
 * @param {*} authTypes 
 */
const validateWantedAuthTypes = (authTypes) => {
    if (!Array.isArray(authTypes)) {
        const errorMessage = `type of ${constants.WANTED_AUTH_TYPES} should be an array of numbers`;
        throw new Error(errorMessage);
    }
}

/**
 * 
 * @param {*} wanted wanted is an array of attributes to be requested.
 * @param {*} authTypes auth types represeents the authentication type to be used.
 * @param {*} wantedRememberMe 
 */
const Policy = (
    wanted,
    authTypes,
    wantedRememberMe = false,
    extensions = [],
) => {
    // Perform some validation
    const policy = {};
    // Validate policy.
    validateWanted(wanted);
    policy[constants.WANTED] = wanted;
    // Assert an array of numbers.
    if (authTypes) {
        validateWantedAuthTypes(authTypes);
    }
    policy[constants.WANTED_AUTH_TYPES] = (authTypes) ? authTypes : [];
    // Assert boolean value
    validateRememberMe(wantedRememberMe)
    policy[constants.WANTED_REMEMBER_ME] = wantedRememberMe;

    policy[constants.EXTENSIONS] = extensions;
    return policy;
}

class DynamicPolicyRequest {
    /**
     * 
     * @param {*} callbackEndpoint refers to the endpoint to callback to.
     * @param {*} policy is the poilicy to be requested, this refers to thte attributes.
     */
    constructor(callbackEndpoint, policy) {
        this.setCallBackEndpoint(callbackEndpoint);
        this.setPolicy(policy);
    }

    /**
     * @param {*} callbackEndpoint sets the callbackEndpoint
     */
    setCallBackEndpoint(callbackEndpoint) {
        this.callbackEndpoint = callbackEndpoint;
    }

    /**
     * 
     * @param {*} policy sets the policy.
     */
    setPolicy(policy) {
        const validatedPolicy = Policy(
            policy[constants.WANTED],
            policy[constants.WANTED_AUTH_TYPES],
            policy[constants.WANTED_REMEMBER_ME],
        );
        this.policy = validatedPolicy;
    }

    /**
     * @param {wantedPolicy} wantedPolicy is a policy to add.
     */
    addWantedPolicy(wantedPolicy) {
        validateWanted(wantedPolicy);
        this.policy.wanted.push(wantedPolicy);
    }

    /**
     *  @returns a json serialised object request.
     */
    getData() {
        const data = {};
        data[constants.CALLBACK_ENDPOINT] = this.callbackEndpoint;
        data[constants.POLICY] = this.policy;
        data[constants.EXTENSIONS] = [];
        return data;
    }
};


/**
 * @description is the response object from connect.
 * The response will return two values which represents the QRCode to be passed
 * to the widget. as well as the reference id.
 */
class DynamicPolicyResult {
    constructor(data) {
        this.data = data;
    }

    static checkAttributes(result) {
        const expectedElements = [
            constants.QRCODE,
            constants.REF_ID,
        ];
        for (const element of expectedElements) {
            if (!Object.prototype.hasOwnProperty.call(result, element)) {
                throw new Error(`Missing attribute in the result ${element}`);
            }
        }
    }

    getQRCodeLink() {
        return (this.data) ? this.data[constants.QRCODE] : undefined;
    }

    getRefId() {
        return (this.data) ? this.data[constants.REF_ID] : undefined;
    }
};

module.exports = {
    Policy,
    DynamicPolicyResult,
    DynamicPolicyRequest,
};
