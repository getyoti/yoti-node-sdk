export = AttributeDefinition;
declare class AttributeDefinition {
    constructor(name: any);
    /** @private */
    private name;
    getName(): any;
    toJSON(): {
        name: any;
    };
}
