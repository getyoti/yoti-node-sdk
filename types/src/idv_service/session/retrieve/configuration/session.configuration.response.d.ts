export = SessionConfigurationResponse;
declare class SessionConfigurationResponse {
    constructor(payload: any);
    /** @private */
    private clientSessionTokenTtl;
    /** @private */
    private sessionId;
    /** @private */
    private requestedChecks;
    /** @private */
    private capture;
    /**
     * Returns the amount of time remaining in seconds until the session
     * expires.
     *
     * @return {number | null}
     */
    getClientSessionTokenTtl(): number | null;
    /**
     * Returns the session ID that the configuration belongs to
     *
     * @return {string | null}
     */
    getSessionId(): string | null;
    /**
     * Returns a list of strings, signifying the checks that have been requested
     * in the session
     *
     * @return {string[] | null}
     */
    getRequestedChecks(): string[] | null;
    /**
     * Returns information about what needs to be captured to fulfil the
     * sessions requirements
     *
     * @return {CaptureResponse | null}
     */
    getCapture(): CaptureResponse | null;
}
import CaptureResponse = require("./capture/capture.response");
