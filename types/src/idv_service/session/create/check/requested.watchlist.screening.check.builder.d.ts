export = RequestedWatchlistScreeningCheckBuilder;
/**
 * Builder to assist the creation of {@link RequestedWatchlistScreeningCheck}.
 *
 * @class RequestedWatchlistScreeningCheckBuilder
 */
declare class RequestedWatchlistScreeningCheckBuilder {
    categories: any[];
    /**
     * Adds ADVERSE_MEDIA to the list of categories used for watchlist screening
     *
     * @returns {this}
     */
    withAdverseMediaCategory(): this;
    /**
     * Adds SANCTIONS to the list of categories used for watchlist screening
     *
     * @returns {this}
     */
    withSanctionsCategory(): this;
    /**
     * Adds a category to the list of categories used for watchlist screening
     *
     * @param {string} category
     *
     * @returns {this}
     */
    withCategory(category: string): this;
    build(): RequestedWatchlistScreeningCheck;
}
import RequestedWatchlistScreeningCheck = require("./requested.watchlist.screening.check");
