export = AttributeDefinition;
declare class AttributeDefinition {
    constructor(name: any);
    name: any;
    getName(): any;
    toJSON(): {
        name: any;
    };
}
