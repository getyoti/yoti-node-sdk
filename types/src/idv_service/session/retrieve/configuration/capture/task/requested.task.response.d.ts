export = RequestedTaskResponse;
declare class RequestedTaskResponse {
    /** @protected {string|null} */
    protected type: any;
    /** @protected {string|null} */
    protected state: any;
    /**
     * Returns the type of the {@link RequestedTaskResponse}
     *
     * @return {string | null}
     */
    getType(): string | null;
    /**
     * Returns the current state of the Requested Task
     *
     * @return {string | null}
     */
    getState(): string | null;
}
