export = RequestedWatchlistScreeningCheck;
/**
 * @class RequestedWatchlistScreeningCheck
 */
declare class RequestedWatchlistScreeningCheck extends RequestedCheck {
    /**
     * @param {RequestedWatchlistScreeningConfig} config
     */
    constructor(config: RequestedWatchlistScreeningConfig);
}
import RequestedCheck = require("./requested.check");
import RequestedWatchlistScreeningConfig = require("./requested.watchlist.screening.config");
