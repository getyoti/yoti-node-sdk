export = RequiredIdDocumentBuilder;
declare class RequiredIdDocumentBuilder {
    /**
     * @param {DocumentFilter} filter
     *
     * @returns {this}
     */
    withFilter(filter: DocumentFilter): this;
    filter: DocumentFilter;
    /**
     * @returns {RequiredIdDocument}
     */
    build(): RequiredIdDocument;
}
import DocumentFilter = require("./document.filter");
import RequiredIdDocument = require("./required.id.document");
