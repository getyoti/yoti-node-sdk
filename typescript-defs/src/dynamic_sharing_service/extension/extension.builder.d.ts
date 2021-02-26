export = ExtensionBuilder;
declare class ExtensionBuilder {
    /**
     * @param {string} type
     */
    withType(type: string): import("./extension.builder");
    type: string;
    /**
     * @param {*} content
     */
    withContent(content: any): import("./extension.builder");
    content: any;
    /**
     * @returns {Extension}
     */
    build(): Extension;
}
import Extension = require("./extension");
