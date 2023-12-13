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
    toJSON(): {
        type: string;
    } & {
        objective: Objective;
        document_types: string[];
        country_codes: string[];
    };
}
import RequiredDocument = require("./required.document");
import Objective = require("../objective/objective");
