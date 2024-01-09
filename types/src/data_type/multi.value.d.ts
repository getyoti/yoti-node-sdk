export = MultiValue;
declare class MultiValue {
    /**
     * MultiValue constructor.
     *
     * @param {array} items
     */
    constructor(items: any[]);
    /** @private */
    private originalItems;
    /** @private */
    private items;
    /** @private */
    private allowedInstances;
    /** @private */
    private allowedTypes;
    /**
     * Allow values by their instance type.
     *
     * @param {*} type
     *
     * @returns {MultiValue}
     */
    allowInstance(type: any): MultiValue;
    /**
     * Allow values by their constructor name.
     *
     * @param {String} type
     *
     * @returns {MultiValue}
     */
    allowType(type: string): MultiValue;
    /**
     * Apply all filters.
     */
    applyFilters(): void;
    /**
     * Check if this MultiValue has been filtered.
     */
    hasFilters(): boolean;
    /**
     * Check instance.
     *
     * @param {*} value
     */
    isAllowedInstance(value: any): boolean;
    /**
     * Check constructor name (class).
     *
     * @param {*} value
     */
    isAllowedType(value: any): boolean;
    /**
     * @returns {readonly any[]} List of filtered items.
     */
    getItems(): readonly any[];
}
