export = DigitalIdentityServiceError;
/**
 * Signals that a problem occurred in a Yoti Digital Identity Service
 *
 * @class DigitalIdentityServiceError
 */
declare class DigitalIdentityServiceError extends Error {
    constructor(error: any);
    status: any;
    code: any;
    reason: any;
}
