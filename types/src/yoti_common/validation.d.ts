export = Validation;
declare class Validation {
    /**
     * @param {*} value
     * @param {*} type
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static instanceOf(value: any, type: any, name: string): void;
    /**
     * @param {*} value
     * @param {string} name
     * @param {boolean} optional the value can be undefined
     *
     * @throws {TypeError}
     */
    static isString(value: any, name: string, optional?: boolean): void;
    /**
     * @param {*} value
     * @param {string} name
     * @param {boolean} optional the value can be undefined
     *
     * @throws {TypeError}
     */
    static isStringDate(value: any, name: string, optional?: boolean): void;
    /**
     * @param {*} value
     * @param {string} name
     * @param {boolean} optional the value can be undefined
     *
     * @throws {TypeError}
     */
    static isBoolean(value: any, name: string, optional?: boolean): void;
    /**
     * @param {Object} value
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static hasOnlyStringValues(value: any, name: string): void;
    /**
     * @param {*} value
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static isArray(value: any, name: string): void;
    /**
     * @param {*} value
     * @param {string} name
     * @param {boolean} optional the value can be undefined
     *
     * @throws {TypeError}
     */
    static isInteger(value: any, name: string, optional?: boolean): void;
    /**
     * @param {*} value
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static isNumber(value: any, name: string): void;
    /**
     * @param {*} value
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static isPlainObject(value: any, name: string): void;
    /**
     * @param {*} value
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static notNull(value: any, name: string): void;
    /**
     * @param {*} values
     * @param {*} type
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static isArrayOfType(values: any, type: any, name: string): void;
    /**
     * @param {*} values
     * @param {Array} types
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static isArrayOfTypes(values: any, types: any[], name: string): void;
    /**
     * @param {*} values
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static isArrayOfStrings(values: any, name: string): void;
    /**
     * @param {*} values
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static isArrayOfIntegers(values: any, name: string): void;
    /**
     * @param {*} value
     * @param {*} limit
     * @param {string} name
     *
     * @throws {RangeError}
     */
    static notGreaterThan(value: any, limit: any, name: string): void;
    /**
     * @param {*} value
     * @param {*} limit
     * @param {string} name
     *
     * @throws {RangeError}
     */
    static notLessThan(value: any, limit: any, name: string): void;
    /**
     * @param {string} value
     * @param {RegExp} regexp
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static matchesPattern(value: string, regexp: RegExp, name: string): void;
    /**
     * @param {*} value
     * @param {*} minLimit
     * @param {*} maxLimit
     * @param {string} name
     *
     * @throws {RangeError}
     */
    static withinRange(value: any, minLimit: any, maxLimit: any, name: string): void;
    /**
     * @param {*} value
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static notNullOrEmpty(value: any, name: string): void;
    /**
     * @param {*} value
     * @param {array} acceptedValues
     * @param {string} name
     *
     * @throws {TypeError}
     */
    static oneOf(value: any, acceptedValues: any[], name: string): void;
}
