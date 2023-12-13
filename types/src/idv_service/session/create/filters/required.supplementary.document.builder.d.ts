export = RequiredSupplementaryDocumentBuilder;
declare class RequiredSupplementaryDocumentBuilder {
    /**
     * @param {string[]} countryCodes
     *
     * @returns {this}
     */
    withCountryCodes(countryCodes: string[]): this;
    countryCodes: string[];
    /**
     * @param {string[]} documentTypes
     *
     * @returns {this}
     */
    withDocumentTypes(documentTypes: string[]): this;
    documentTypes: string[];
    /**
     * @param {Objective} objective
     *
     * @returns {this}
     */
    withObjective(objective: Objective): this;
    objective: Objective;
    /**
     * @returns {RequiredSupplementaryDocument}
     */
    build(): RequiredSupplementaryDocument;
}
import Objective = require("../objective/objective");
import RequiredSupplementaryDocument = require("./required.supplementary.document");
