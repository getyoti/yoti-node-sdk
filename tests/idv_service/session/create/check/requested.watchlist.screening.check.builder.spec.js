const { RequestedWatchlistScreeningCheckBuilder } = require('../../../../..');

describe('RequestedWatchlistScreeningCheckBuilder', () => {
  it('should build RequestedWatchlistScreeningCheck (default, without any categories specified)', () => {
    const expectedJson = JSON.stringify({
      type: 'WATCHLIST_SCREENING',
      config: {
        categories: [],
      },
    });

    const check = new RequestedWatchlistScreeningCheckBuilder().build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });

  describe('when categories are specified', () => {
    const getExpectedSerialisedCheck = (categories = []) => JSON.stringify({
      type: 'WATCHLIST_SCREENING',
      config: {
        categories,
      },
    });

    describe('using the "withAdverseMediaCategory()" method', () => {
      it('should add "ADVERSE-MEDIA" to the categories', () => {
        const check = new RequestedWatchlistScreeningCheckBuilder()
          .withAdverseMediaCategory()
          .build();

        const serialisedCheck = JSON.stringify(check);
        const expectedSerialisedCheck = getExpectedSerialisedCheck(['ADVERSE-MEDIA']);
        expect(serialisedCheck).toBe(expectedSerialisedCheck);
      });
    });
    describe('using the "withSanctionsCategory()" method', () => {
      it('should add "SANCTIONS" to the categories', () => {
        const check = new RequestedWatchlistScreeningCheckBuilder()
          .withSanctionsCategory()
          .build();

        const serialisedCheck = JSON.stringify(check);
        const expectedSerialisedCheck = getExpectedSerialisedCheck(['SANCTIONS']);
        expect(serialisedCheck).toBe(expectedSerialisedCheck);
      });
    });
    describe('using the generic "withCategory()" method', () => {
      it('should add any passed string to the categories', () => {
        const check = new RequestedWatchlistScreeningCheckBuilder()
          .withCategory('A_NEW_CATEGORY')
          .build();

        const serialisedCheck = JSON.stringify(check);
        const expectedSerialisedCheck = getExpectedSerialisedCheck(['A_NEW_CATEGORY']);
        expect(serialisedCheck).toBe(expectedSerialisedCheck);
      });
      it('should throw an TypeError when the category is not valid string', () => {
        expect(() => {
          new RequestedWatchlistScreeningCheckBuilder()
            .withCategory(false)
            .build();
        }).toThrowError(TypeError);
      });
    });
    describe('when adding combination of category', () => {
      it('should ensure uniqueness of each category', () => {
        const check = new RequestedWatchlistScreeningCheckBuilder()
          .withAdverseMediaCategory()
          .withAdverseMediaCategory()
          .withCategory('ADVERSE-MEDIA')
          .withCategory('ADVERSE-MEDIA')
          .withSanctionsCategory()
          .withSanctionsCategory()
          .withCategory('SANCTIONS')
          .withCategory('SANCTIONS')
          .withCategory('BOING')
          .withCategory('BOING')
          .withCategory('BOING')
          .withCategory('BOING')
          .withCategory('BOING')
          .withCategory('BOING')
          .build();

        const serialisedCheck = JSON.stringify(check);
        const expectedSerialisedCheck = getExpectedSerialisedCheck(['ADVERSE-MEDIA', 'SANCTIONS', 'BOING']);
        expect(serialisedCheck).toBe(expectedSerialisedCheck);
      });
    });
  });
});
