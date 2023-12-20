export = ExtensionBuilder;
declare class ExtensionBuilder {
    /**
     * @param {string} type
     */
    withType(type: string): this;
    type: string;
    /**
     * @param {*} content
     */
    withContent(content: any): this;
    content: any;
    /**
     * @returns {Extension}
     */
    build(): Extension;
}
import Extension = require("./extension");
