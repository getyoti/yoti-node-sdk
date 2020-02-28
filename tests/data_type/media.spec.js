const ByteBuffer = require('bytebuffer');
const Media = require('../../src/data_type/media');

const SOME_BUFFER_CONTENT = Buffer.from('test_content');
const SOME_BYTE_BUFFER_CONTENT = ByteBuffer.wrap(SOME_BUFFER_CONTENT);
const SOME_MIME_TYPE = 'some/mime';

describe('Media', () => {
  let media;

  beforeEach(() => {
    media = new Media(SOME_BUFFER_CONTENT, SOME_MIME_TYPE);
  });

  describe('when instantiated', () => {
    it('should be an instance of Media', () => {
      expect(media).toBeInstanceOf(Media);
    });
    it('should allow Buffer content', () => {
      media = new Media(SOME_BUFFER_CONTENT, SOME_MIME_TYPE);
      expect(media).toBeInstanceOf(Media);
      expect(media.getContent()).toStrictEqual(SOME_BYTE_BUFFER_CONTENT);
    });
    it('should allow ByteBuffer content', () => {
      media = new Media(SOME_BYTE_BUFFER_CONTENT, SOME_MIME_TYPE);
      expect(media).toBeInstanceOf(Media);
      expect(media.getContent()).toStrictEqual(SOME_BYTE_BUFFER_CONTENT);
    });
    it('should throw TypeError when content is incorrect type', () => {
      expect(() => new Media('', SOME_MIME_TYPE))
        .toThrow(new TypeError('content must be of type Buffer|ByteBuffer'));
    });
  });

  describe('#getContent()', () => {
    it('should return original image content', () => {
      expect(media.getContent()).toStrictEqual(SOME_BYTE_BUFFER_CONTENT);
    });
  });

  describe('#getBase64Content()', () => {
    it('should return base64 image content', () => {
      const base64String = `data:${SOME_MIME_TYPE};base64,${SOME_BUFFER_CONTENT.toString('base64')}`;
      expect(media.getBase64Content()).toBe(base64String);
    });
  });

  describe('#getMimeType()', () => {
    it(`should return ${SOME_MIME_TYPE}`, () => {
      expect(media.getMimeType()).toBe(SOME_MIME_TYPE);
    });
  });
});
