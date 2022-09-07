const {
  RequestedWatchlistAdvancedCaCheckBuilder,
  RequestedCustomAccountWatchlistAdvancedCaConfigBuilder,
  RequestedYotiAccountWatchlistAdvancedCaConfigBuilder,
  RequestedExactMatchingStrategyBuilder,
  RequestedFuzzyMatchingStrategyBuilder,
  RequestedTypeListSourcesBuilder,
  RequestedSearchProfileSourcesBuilder,
} = require('../../../../..');

describe('RequestedExactMatchingStrategyBuilder', () => {
  it('should build a RequestedExactMatchingStrategy, which stringify correctly', () => {
    const expectedJson = JSON.stringify({
      type: 'EXACT',
    });
    const requestedExactMatchingStrategy = new RequestedExactMatchingStrategyBuilder()
      .build();
    expect(JSON.stringify(requestedExactMatchingStrategy)).toBe(expectedJson);
  });
});

describe('RequestedFuzzyMatchingStrategyBuilder', () => {
  it('should build a RequestedFuzzyMatchingStrategy with fuzziness provided, which stringify correctly', () => {
    const expectedJson = JSON.stringify({
      type: 'FUZZY',
      fuzziness: 0.6,
    });
    const requestedFuzzyMatchingStrategy = new RequestedFuzzyMatchingStrategyBuilder()
      .withFuzziness(0.6)
      .build();
    expect(JSON.stringify(requestedFuzzyMatchingStrategy)).toBe(expectedJson);
  });
  it('should build a RequestedFuzzyMatchingStrategy without fuzziness provided, which stringify correctly', () => {
    const expectedJson = JSON.stringify({
      type: 'FUZZY',
      fuzziness: 0.5,
    });
    const requestedFuzzyMatchingStrategy = new RequestedFuzzyMatchingStrategyBuilder()
      .build();
    expect(JSON.stringify(requestedFuzzyMatchingStrategy)).toBe(expectedJson);
  });
  it('should throw an TypeError when the fuzziness is not a number', () => {
    expect(() => {
      new RequestedFuzzyMatchingStrategyBuilder()
        .withFuzziness('abc')
        .build();
    }).toThrowError(TypeError);
  });
  it('should throw an RangeError when the fuzziness is not in range, too high', () => {
    expect(() => {
      new RequestedFuzzyMatchingStrategyBuilder()
        .withFuzziness(5)
        .build();
    }).toThrowError(RangeError);
  });
  it('should throw an RangeError when the fuzziness is not in range, too low', () => {
    expect(() => {
      new RequestedFuzzyMatchingStrategyBuilder()
        .withFuzziness(-1)
        .build();
    }).toThrowError(RangeError);
  });
});

describe('RequestedTypeListSourcesBuilder', () => {
  it('should build a RequestedTypeListSources with the types provided, which stringify correctly', () => {
    const expectedJson = JSON.stringify({
      type: 'TYPE_LIST',
      types: ['some', 'thing'],
    });
    const requestedTypeListSources = new RequestedTypeListSourcesBuilder()
      .withTypes(['some', 'thing'])
      .build();
    expect(JSON.stringify(requestedTypeListSources)).toBe(expectedJson);
  });
  it('should build a RequestedTypeListSources with no types, which stringify correctly', () => {
    const expectedJson = JSON.stringify({
      type: 'TYPE_LIST',
      types: [],
    });
    const requestedTypeListSources = new RequestedTypeListSourcesBuilder()
      .build();
    expect(JSON.stringify(requestedTypeListSources)).toBe(expectedJson);
  });
  it('should throw an TypeError when the types is not an array of string', () => {
    expect(() => {
      new RequestedTypeListSourcesBuilder()
        .withTypes([12, 'thing'])
        .build();
    }).toThrowError(TypeError);
  });
  it('should throw an TypeError when the types is not an array', () => {
    expect(() => {
      new RequestedTypeListSourcesBuilder()
        .withTypes('thing')
        .build();
    }).toThrowError(TypeError);
  });
  it('should throw an TypeError when the types null', () => {
    expect(() => {
      new RequestedTypeListSourcesBuilder()
        .withTypes(null)
        .build();
    }).toThrowError(TypeError);
  });
});

describe('RequestedSearchProfileSourcesBuilder', () => {
  it('should build a RequestedSearchProfileSources, which stringify correctly', () => {
    const expectedJson = JSON.stringify({
      type: 'PROFILE',
      search_profile: 'bobby',
    });
    const requestedSearchProfileSources = new RequestedSearchProfileSourcesBuilder()
      .withSearchProfile('bobby')
      .build();
    expect(JSON.stringify(requestedSearchProfileSources)).toBe(expectedJson);
  });
  it('should throw an TypeError when the searchProfile is not valid string', () => {
    expect(() => {
      new RequestedSearchProfileSourcesBuilder()
        .withSearchProfile(12)
        .build();
    }).toThrowError(TypeError);
  });
  it('should throw an TypeError when the searchProfile is an empty string', () => {
    expect(() => {
      new RequestedSearchProfileSourcesBuilder('')
        .withSearchProfile()
        .build();
    }).toThrowError(TypeError);
  });
  it('should throw an TypeError when the searchProfile is not defined', () => {
    expect(() => {
      new RequestedSearchProfileSourcesBuilder()
        .build();
    }).toThrowError(TypeError);
  });
});

describe.each([
  {
    configBuilderClassName: 'RequestedCustomAccountWatchlistAdvancedCaConfigBuilder',
    getConfigBuilder() {
      return new RequestedCustomAccountWatchlistAdvancedCaConfigBuilder()
        .withApiKey('some-api-key')
        .withClientRef('some-client-ref');
    },
  },
  {
    configBuilderClassName: 'RequestedYotiAccountWatchlistAdvancedCaConfigBuilder',
    getConfigBuilder: () => new RequestedYotiAccountWatchlistAdvancedCaConfigBuilder(),
  },
])('The config builder (common behaviour)', ({ configBuilderClassName, getConfigBuilder }) => {
  describe(configBuilderClassName, () => {
    let configBuilder;
    beforeEach(() => {
      configBuilder = getConfigBuilder();
    });
    it('should build with default properties, and serialize correctly', () => {
      const expectedDeserializedConfig = {
        matching_strategy: {
          type: 'EXACT',
        },
        remove_deceased: false,
        share_url: false,
        sources: {
          type: 'TYPE_LIST',
          types: [],
        },
      };
      const config = configBuilder.build();
      const deserializedConfig = JSON.parse(JSON.stringify(config));
      expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
    });
    it('should build with specific type list sources provided, and serialize correctly', () => {
      const expectedDeserializedConfig = {
        matching_strategy: {
          type: 'EXACT',
        },
        remove_deceased: false,
        share_url: false,
        sources: {
          type: 'TYPE_LIST',
          types: [
            '123',
            'abc',
          ],
        },
      };
      const sources = new RequestedTypeListSourcesBuilder()
        .withTypes(['123', 'abc'])
        .build();
      const config = configBuilder.withSources(sources).build();
      const deserializedConfig = JSON.parse(JSON.stringify(config));
      expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
    });
    it('should build with specific removeDeceased provided, and serialize correctly', () => {
      const expectedDeserializedConfig = {
        matching_strategy: {
          type: 'EXACT',
        },
        remove_deceased: true,
        share_url: false,
        sources: {
          type: 'TYPE_LIST',
          types: [],
        },
      };

      const config = configBuilder.withRemoveDeceased(true)
        .build();
      const deserializedConfig = JSON.parse(JSON.stringify(config));
      expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
    });
    it('should throw an error if removeDeceased provided is not expected type', () => {
      expect(() => {
        configBuilder.withRemoveDeceased(123).build();
      }).toThrowError(TypeError);
    });
    it('should build with specific shareUrl provided, and serialize correctly', () => {
      const expectedDeserializedConfig = {
        matching_strategy: {
          type: 'EXACT',
        },
        remove_deceased: false,
        share_url: true,
        sources: {
          type: 'TYPE_LIST',
          types: [],
        },
      };

      const config = configBuilder.withShareUrl(true)
        .build();
      const deserializedConfig = JSON.parse(JSON.stringify(config));
      expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
    });
    it('should throw an error if shareUrl provided is not expected type', () => {
      expect(() => {
        configBuilder.withShareUrl(123).build();
      }).toThrowError(TypeError);
    });
    it('should build with search profile sources, and serialize correctly', () => {
      const expectedDeserializedConfig = {
        matching_strategy: {
          type: 'EXACT',
        },
        remove_deceased: false,
        share_url: false,
        sources: {
          type: 'PROFILE',
          search_profile: 'super profile',
        },
      };

      const sources = new RequestedSearchProfileSourcesBuilder()
        .withSearchProfile('super profile')
        .build();
      const config = configBuilder.withSources(sources).build();
      const deserializedConfig = JSON.parse(JSON.stringify(config));
      expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
    });
    it('should throw an error if sources provided are not expected type', () => {
      expect(() => {
        configBuilder.withSources({ name: 'bad source' }).build();
      }).toThrowError(TypeError);
    });
    it('should build with specific exact match strategy provided, and serialize correctly', () => {
      const expectedDeserializedConfig = {
        matching_strategy: {
          type: 'EXACT',
        },
        remove_deceased: false,
        share_url: false,
        sources: {
          type: 'TYPE_LIST',
          types: [],
        },
      };
      const matchingStrategy = new RequestedExactMatchingStrategyBuilder()
        .build();
      const config = configBuilder.withMatchingStrategy(matchingStrategy)
        .build();
      const deserializedConfig = JSON.parse(JSON.stringify(config));
      expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
    });
    it('should build with specific fuzziness match strategy provided, and serialize correctly', () => {
      const expectedDeserializedConfig = {
        matching_strategy: {
          fuzziness: 0.33,
          type: 'FUZZY',
        },
        remove_deceased: false,
        share_url: false,
        sources: {
          type: 'TYPE_LIST',
          types: [],
        },
      };
      const matchingStrategy = new RequestedFuzzyMatchingStrategyBuilder()
        .withFuzziness(0.33)
        .build();
      const config = configBuilder.withMatchingStrategy(matchingStrategy)
        .build();
      const deserializedConfig = JSON.parse(JSON.stringify(config));
      expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
    });
    it('should throw an error if match strategy provided is not expected type', () => {
      expect(() => {
        configBuilder.withMatchingStrategy('super strategy').build();
      }).toThrowError(TypeError);
    });
    it('should build with specific multiple modifications, and serialize correctly', () => {
      const expectedDeserializedConfig = {
        matching_strategy: {
          fuzziness: 0.44,
          type: 'FUZZY',
        },
        remove_deceased: true,
        share_url: true,
        sources: {
          type: 'PROFILE',
          search_profile: 'secret profile',
        },
      };
      const sources = new RequestedSearchProfileSourcesBuilder()
        .withSearchProfile('secret profile')
        .build();
      const matchingStrategy = new RequestedFuzzyMatchingStrategyBuilder()
        .withFuzziness(0.44)
        .build();
      const config = configBuilder
        .withRemoveDeceased(true)
        .withShareUrl(true)
        .withSources(sources)
        .withMatchingStrategy(matchingStrategy)
        .build();
      const deserializedConfig = JSON.parse(JSON.stringify(config));
      expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
    });
  });
});

describe('The config builder', () => {
  describe('RequestedCustomAccountWatchlistAdvancedCaConfigBuilder instance', () => {
    let configBuilder;
    beforeEach(() => {
      configBuilder = new RequestedCustomAccountWatchlistAdvancedCaConfigBuilder();
    });

    describe('requires default set up to build (both apiKey and clientRef)', () => {
      it('should throw an Error when apiKey is missing', () => {
        expect(() => {
          configBuilder
            .withClientRef('some-ref')
            .build();
        }).toThrowError(TypeError);
      });
      it('should throw an Error when clientRef is missing', () => {
        expect(() => {
          configBuilder
            .withApiKey('some-key')
            .build();
        }).toThrowError(TypeError);
      });
      it('should builds when both apiKey and clientRef are set', () => {
        expect(() => {
          configBuilder
            .withApiKey('some-key')
            .withClientRef('some-ref')
            .build();
        }).not.toThrowError(TypeError);
      });
    });
    describe('when specifying properties', () => {
      const expectedDeserializedDefaultConfig = Object.assign({
        api_key: 'some-key',
        client_ref: 'some-ref',
        monitoring: false,
      });

      beforeEach(() => {
        configBuilder
          .withApiKey('some-key')
          .withClientRef('some-ref');
      });

      it('should build with specified withApiKey, and serialize correctly', () => {
        const expectedDeserializedConfig = Object.assign(
          {},
          expectedDeserializedDefaultConfig,
          {
            api_key: 'my-XXXXX-TRA-chi',
          }
        );
        const config = configBuilder
          .withApiKey('my-XXXXX-TRA-chi')
          .build();
        const deserializedConfig = JSON.parse(JSON.stringify(config));
        expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
      });
      it('should throw an Error when apiKey is not a string', () => {
        expect(() => {
          configBuilder.withApiKey(132).build();
        }).toThrowError(TypeError);
      });
      it('should throw an Error when apiKey is an empty string', () => {
        expect(() => {
          configBuilder.withApiKey('').build();
        }).toThrow();
      });

      it('should build with specified withMonitoring, and serialize correctly', () => {
        const expectedDeserializedConfig = Object.assign(
          {},
          expectedDeserializedDefaultConfig,
          {
            monitoring: true,
          }
        );
        const config = configBuilder
          .withMonitoring(true)
          .build();
        const deserializedConfig = JSON.parse(JSON.stringify(config));
        expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
      });
      it('should throw an Error when monitoring is not a boolean', () => {
        expect(() => {
          configBuilder.withMonitoring('something').build();
        }).toThrowError(TypeError);
      });

      it('should build with specified withTags, and serialize correctly', () => {
        const expectedDeserializedConfig = Object.assign(
          {},
          expectedDeserializedDefaultConfig,
          {
            tags: {
              tag1: 'tagOne',
              tag2: 'tagTwo',
              tag3: 456,
            },
          }
        );
        const config = configBuilder
          .withTags({ tag1: 'tagOne', tag2: 'tagTwo', tag3: 456 })
          .build();
        const deserializedConfig = JSON.parse(JSON.stringify(config));
        expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
      });
      it('should throw an Error tags is not a plain object', () => {
        expect(() => {
          configBuilder.withTags(132).build();
        }).toThrowError(TypeError);
      });
      it('should throw an Error tags has nil values', () => {
        expect(() => {
          configBuilder.withTags({ tagA: null, tagB: 'something' }).build();
        }).toThrowError(TypeError);
      });

      it('should build with specified withClientRef, and serialize correctly', () => {
        const expectedDeserializedConfig = Object.assign(
          {},
          expectedDeserializedDefaultConfig,
          {
            client_ref: 'CLIENT%ABC-132',
          }
        );
        const config = configBuilder
          .withClientRef('CLIENT%ABC-132')
          .build();
        const deserializedConfig = JSON.parse(JSON.stringify(config));
        expect(deserializedConfig).toEqual(expect.objectContaining(expectedDeserializedConfig));
      });
      it('should throw an Error when clientRef is not a string', () => {
        expect(() => {
          configBuilder.withClientRef(132).build();
        }).toThrowError(TypeError);
      });
      it('should throw an Error when clientRef is an empty string', () => {
        expect(() => {
          configBuilder.withClientRef('').build();
        }).toThrow();
      });
    });
  });
});

describe('RequestedWatchlistAdvancedCaCheckBuilder', () => {
  describe('with a RequestedYotiAccountWatchlistAdvancedCaConfig', () => {
    it('should build a RequestedWatchlistScreeningCheck, and serialize correctly', () => {
      const expectedJson = JSON.stringify({
        type: 'WATCHLIST_ADVANCED_CA',
        config: {
          type: 'WITH_YOTI_ACCOUNT',
          remove_deceased: false,
          share_url: false,
          sources: {
            type: 'TYPE_LIST',
            types: [],
          },
          matching_strategy: {
            type: 'EXACT',
          },
        },
      });

      const config = new RequestedYotiAccountWatchlistAdvancedCaConfigBuilder().build();

      const check = new RequestedWatchlistAdvancedCaCheckBuilder()
        .withConfig(config)
        .build();

      expect(JSON.stringify(check)).toBe(expectedJson);
    });
  });
  describe('with a RequestedCustomAccountWatchlistAdvancedCaConfig', () => {
    it('should build a RequestedWatchlistScreeningCheck, and serialize correctly', () => {
      const expectedJson = JSON.stringify({
        type: 'WATCHLIST_ADVANCED_CA',
        config: {
          type: 'WITH_CUSTOM_ACCOUNT',
          api_key: 'the-key',
          monitoring: false,
          client_ref: 'the-referee',
          remove_deceased: false,
          share_url: false,
          sources: {
            type: 'TYPE_LIST',
            types: [],
          },
          matching_strategy: {
            type: 'EXACT',
          },
        },
      });

      const config = new RequestedCustomAccountWatchlistAdvancedCaConfigBuilder()
        .withApiKey('the-key')
        .withClientRef('the-referee')
        .build();

      const check = new RequestedWatchlistAdvancedCaCheckBuilder()
        .withConfig(config)
        .build();

      expect(JSON.stringify(check)).toBe(expectedJson);
    });
  });
  describe('with a incorrect config', () => {
    it('should throw an error', () => {
      expect(() => {
        const config = {
          name: 'my config',
          type: 'SUPER',
        };
        new RequestedWatchlistAdvancedCaCheckBuilder()
          .withConfig(config)
          .build();
      }).toThrowError(TypeError);
    });
  });
});
