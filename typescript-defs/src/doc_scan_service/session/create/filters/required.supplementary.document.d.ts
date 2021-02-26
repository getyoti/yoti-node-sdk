export = RequiredSupplementaryDocument;
declare class RequiredSupplementaryDocument extends RequiredDocument {
    /**
     * @param {Objective} objective
     * @param {string[]} documentTypes
     * @param {string[]} countryCodes
     */
    constructor(objective: Objective, documentTypes: string[], countryCodes: string[]);
    objective: Objective;
    documentTypes: string[];
    countryCodes: string[];
}
import RequiredDocument = require("./required.document");
import Objective = require("../objective/objective");
