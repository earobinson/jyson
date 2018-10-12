const chai = require('chai');

const expect = chai.expect;

const jyson = require('../../../lib/jyson');

describe('jyson.emptyArrayValueOverride.spec', () => {
  describe('template arrays defined by strings', () => {
    beforeEach(() => {
      this.templateFunction = jyson.buildTemplateFunction({
        a: ['a.$'],
        b: [new jyson.Value({ path: 'b.$' })],
        c: [new jyson.Value({ path: 'c.$', emptyArrayValue: null })],
        d: [new jyson.Value({ path: 'd.$', emptyArrayValue: undefined })],
        e: [new jyson.Value({ path: 'e.$', emptyArrayValue: 'missing' })],
        f: [new jyson.Value({ path: 'f.$', emptyArrayValue: [] })],
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

      expect(json).to.deep.equal(input);
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

      expect(json).to.deep.equal(Object.assign(input, { a: [] }));
    });

    describe('jyson.Value', () => {
      describe('emptyArrayValue', () => {
        it('must use the default emptyArrayValue for missing arrays when emptyArrayValue not defined', () => {
          const input = {
            a: [1],
            c: [3, 4, 5],
            d: [6, 7, 8, 9],
            e: [10, 11, 12, 13, 14],
            f: [15, 16, 17, 18, 19, 20]
          };
          const json = this.templateFunction(input);

          expect(json).to.deep.equal(Object.assign(input, { b: [] }));
        });

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is null', () => {
          const input = {
            a: [1],
            b: [2, 3],
            d: [6, 7, 8, 9],
            e: [10, 11, 12, 13, 14],
            f: [15, 16, 17, 18, 19, 20]
          };
          const json = this.templateFunction(input);

          expect(json).to.deep.equal(Object.assign(input, { c: null }));
        });

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is undefined', () => {
          const input = {
            a: [1],
            b: [2, 3],
            c: [4, 5, 6],
            e: [10, 11, 12, 13, 14],
            f: [15, 16, 17, 18, 19, 20]
          };
          const json = this.templateFunction(input);

          expect(json).to.deep.equal(input);
        });

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is a string', () => {
          const input = {
            a: [1],
            b: [2, 3],
            c: [4, 5, 6],
            d: [6, 7, 8, 9],
            f: [15, 16, 17, 18, 19, 20]
          };
          const json = this.templateFunction(input);

          expect(json).to.deep.equal(Object.assign(input, { e: 'missing' }));
        });

        it('must use emptyArrayValue for missing arrays when emptyArrayValue is an array', () => {
          const input = {
            a: [1],
            b: [2, 3],
            c: [4, 5, 6],
            d: [6, 7, 8, 9],
            e: [10, 11, 12, 13, 14]
          };
          const json = this.templateFunction(input);

          expect(json).to.deep.equal(Object.assign(input, { f: [] }));
        });
      });
    });
  });
});