export = DocumentRestrictionBuilder;
declare class DocumentRestrictionBuilder {
    withDocumentTypes(documentTypes: any): DocumentRestrictionBuilder;
    documentTypes: any;
    withCountries(countryCodes: any): DocumentRestrictionBuilder;
    countryCodes: any;
    build(): DocumentRestriction;
}
import DocumentRestriction = require("./document.restriction");
