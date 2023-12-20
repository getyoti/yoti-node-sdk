export = DocumentRestrictionBuilder;
declare class DocumentRestrictionBuilder {
    withDocumentTypes(documentTypes: any): this;
    documentTypes: any;
    withCountries(countryCodes: any): this;
    countryCodes: any;
    build(): DocumentRestriction;
}
import DocumentRestriction = require("./document.restriction");
