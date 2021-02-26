export = Image;
/**
 * Abstract Image class.
 */
declare class Image extends Media {
    /**
     * @param {ByteBuffer} content
     * @param {string} mimeType
     */
    constructor(content: any, mimeType: string);
}
import Media = require("./media");
