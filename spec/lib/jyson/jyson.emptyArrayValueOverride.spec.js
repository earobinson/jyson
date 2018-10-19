const jyson = require('../../../lib/jyson');

describe('jyson.emptyArrayValueOverride.spec', () => {
  describe('template arrays defined by strings', () => {
    beforeEach(() => {
      this.templateFunction = jyson.buildTemplateFunction({
        a: ['a.$'],
        b: new jyson.Array({ value: 'b.$' }),
        c: new jyson.Array({ value: 'c.$', emptyArrayValue: null }),
        d: new jyson.Array({ value: 'd.$', emptyArrayValue: undefined }),
        e: new jyson.Array({ value: 'e.$', emptyArrayValue: 'missing' }),
        f: new jyson.Array({ value: 'f.$', emptyArrayValue: [] }),
      });
    });

    it('must convert an object to "json"', () => {
      const input = {
        a: [1],
        b: [2, 3],
        c: [3, 4, 5],
        d: [6, 7, 8, 9],
        e: [10, 11, 12, 13, 14],
        f: [15, 16, 17, 18, 19, 20]
      };
      const json = this.templateFunction(input);

      expect(json).toEqual(input);
    });

    it('must use the default emptyArrayValue for missing arrays', () => {
      const input = {
        b: [2, 3],
        c: [3, 4, 5],
        d: [6, 7, 8, 9],
        e: [10, 11, 12, 13, 14],
        f: [15, 16, 17, 18, 19, 20]
      };
      const json = this.templateFunction(input);

      expect(json).toEqual(Object.assign(input, { a: [] }));
    });

    describe('jyson.Array', () => {
      describe('emptyArrayValue', () => {
        it('must use the default emptyArrayValue for missing arrays when emptyArrayValue not defined',
          () => {
            const input = {
              a: [1],
              c: [3, 4, 5],
              d: [6, 7, 8, 9],
              e: [10, 11, 12, 13, 14],
              f: [15, 16, 17, 18, 19, 20]
            };
            const json = this.templateFunction(input);

            expect(json).toEqual(Object.assign(input, { b: [] }));
          }
        );

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is null',
          () => {
            const input = {
              a: [1],
              b: [2, 3],
              d: [6, 7, 8, 9],
              e: [10, 11, 12, 13, 14],
              f: [15, 16, 17, 18, 19, 20]
            };
            const json = this.templateFunction(input);

            expect(json).toEqual(Object.assign(input, { c: null }));
          }
        );

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is undefined',
          () => {
            const input = {
              a: [1],
              b: [2, 3],
              c: [4, 5, 6],
              e: [10, 11, 12, 13, 14],
              f: [15, 16, 17, 18, 19, 20]
            };
            const json = this.templateFunction(input);

            expect(json).toEqual(input);
          }
        );

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is a string',
          () => {
            const input = {
              a: [1],
              b: [2, 3],
              c: [4, 5, 6],
              d: [6, 7, 8, 9],
              f: [15, 16, 17, 18, 19, 20]
            };
            const json = this.templateFunction(input);

            expect(json).toEqual(Object.assign(input, { e: 'missing' }));
          }
        );

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is an array',
          () => {
            const input = {
              a: [1],
              b: [2, 3],
              c: [4, 5, 6],
              d: [6, 7, 8, 9],
              e: [10, 11, 12, 13, 14]
            };
            const json = this.templateFunction(input);

            expect(json).toEqual(Object.assign(input, { f: [] }));
          }
        );
      });
    });
  });

  describe('template arrays defined by objects', () => {
    beforeEach(() => {
      this.templateFunction = jyson.buildTemplateFunction({
        a: [{ a: 'a.$' }],
        b: new jyson.Array({ value: { b: 'b.$' } }),
        c: new jyson.Array({ value: { c: 'c.$' }, emptyArrayValue: null }),
        d: new jyson.Array({ value: { d: 'd.$' }, emptyArrayValue: undefined }),
        e: new jyson.Array({ value: { e: 'e.$' }, emptyArrayValue: 'missing' }),
        f: new jyson.Array({ value: { f: 'f.$' }, emptyArrayValue: [] }),
      });
    });

    it('must convert an object to "json"', () => {
      const input = {
        a: [1],
        b: [2, 3],
        c: [3, 4, 5],
        d: [6, 7, 8, 9],
        e: [10, 11, 12, 13, 14],
        f: [15, 16, 17, 18, 19, 20]
      };
      const json = this.templateFunction(input);

      expect(json).toEqual({
        a: [ { a: 1 } ],
        b: [ { b: 2 },  { b: 3 } ],
        c: [ { c: 3 },  { c: 4 },  { c: 5 } ],
        d: [ { d: 6 },  { d: 7 },  { d: 8 },  { d: 9 } ],
        e: [ { e: 10 }, { e: 11 }, { e: 12 }, { e: 13 }, { e: 14 } ],
        f: [ { f: 15 }, { f: 16 }, { f: 17 }, { f: 18 }, { f: 19 }, { f: 20 } ]
      });
    });

    it('must use the default emptyArrayValue for missing arrays', () => {
      const input = {
        b: [2, 3],
        c: [3, 4, 5],
        d: [6, 7, 8, 9],
        e: [10, 11, 12, 13, 14],
        f: [15, 16, 17, 18, 19, 20]
      };
      const json = this.templateFunction(input);

      expect(json.a).toEqual([]);
    });

    describe('jyson.Array', () => {
      describe('emptyArrayValue', () => {
        it('must use the default emptyArrayValue for missing arrays when emptyArrayValue not defined',
          () => {
            const input = {
              a: [1],
              c: [3, 4, 5],
              d: [6, 7, 8, 9],
              e: [10, 11, 12, 13, 14],
              f: [15, 16, 17, 18, 19, 20]
            };
            const json = this.templateFunction(input);

            expect(json.b).toEqual([]);
          }
        );

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is null',
          () => {
            const input = {
              a: [1],
              b: [2, 3],
              d: [6, 7, 8, 9],
              e: [10, 11, 12, 13, 14],
              f: [15, 16, 17, 18, 19, 20]
            };
            const json = this.templateFunction(input);

            expect(json.c).toBeNull();
          }
        );

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is undefined',
          () => {
            const input = {
              a: [1],
              b: [2, 3],
              c: [4, 5, 6],
              e: [10, 11, 12, 13, 14],
              f: [15, 16, 17, 18, 19, 20]
            };
            const json = this.templateFunction(input);

            expect(json.d).toBeUndefined();
          }
        );

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is a string',
          () => {
            const input = {
              a: [1],
              b: [2, 3],
              c: [4, 5, 6],
              d: [6, 7, 8, 9],
              f: [15, 16, 17, 18, 19, 20]
            };
            const json = this.templateFunction(input);

            expect(json.e).toBe('missing');
          }
        );

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is an array',
          () => {
            const input = {
              a: [1],
              b: [2, 3],
              c: [4, 5, 6],
              d: [6, 7, 8, 9],
              e: [10, 11, 12, 13, 14]
            };
            const json = this.templateFunction(input);

            expect(json.f).toEqual([]);
          }
        );
      });
    });
  });
});