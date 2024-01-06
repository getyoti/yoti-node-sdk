export = DigitalIdentityServiceError;
/**
 * Signals that a problem occurred in a Yoti Digital Identity Service
 *
 * @class DigitalIdentityServiceError
 */
declare class DigitalIdentityServiceError extends Error {
    constructor(error: any);
    status: number;
    code: string | number;
    reason: string;
}
