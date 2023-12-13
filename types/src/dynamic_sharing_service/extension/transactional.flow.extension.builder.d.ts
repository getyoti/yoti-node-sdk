export = TransactionalFlowExtensionBuilder;
declare class TransactionalFlowExtensionBuilder {
    /**
     * Allows you to provide a non-null object representing the content to be submitted
     * in the TRANSACTIONAL_FLOW extension.
     *
     * @param {Object} content
     */
    withContent(content: any): this;
    content: any;
    /**
     * @returns {Extension} Extension with TRANSACTIONAL_FLOW type
     */
    build(): Extension;
}
import Extension = require("./extension");
