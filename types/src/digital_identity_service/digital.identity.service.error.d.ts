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
declare namespace DigitalIdentityServiceError {
    export { ResponseBody, Response };
}
type ResponseBody = {
    message?: string;
    error?: string;
};
type Response = {
    status: number;
    text: string;
    body?: ResponseBody;
};
