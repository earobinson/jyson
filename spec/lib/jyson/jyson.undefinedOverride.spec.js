const assert = require('assert');
const chai = require('chai');

const expect = chai.expect;

const jyson = require('../../../lib/jyson');

describe('jyson.undefinedOverride.spec: a basic template', () => {
  beforeEach(() => {
    this.templateFunction = jyson.buildTemplateFunction({
      'a': new jyson.Value({ path: 'a', undefinedValue: 'qwerty' }),
      'b': new jyson.Value({ path: 'b', undefinedValue: null }),
      'c': new jyson.Value({ path: 'c', undefinedValue: undefined }),
      'd': new jyson.Value({ path: 'd' })
    });
  });

  it('must convert an object to "json"', () => {
    const input = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    };
    const json = this.templateFunction(input);

    expect(json.a).to.equal(input.a);
    expect(json.b).to.equal(input.b);
    expect(json.c).to.equal(input.c);
    expect(json.d).to.equal(input.d);
  });

  describe('jyson.Value', () => {
    describe('undefinedValue', () => {
      it('must use undefinedValue for missing objects when undefined is null', () => {
        const input = {
          a: 1,
          c: 3,
          d: 4
        };
        const json = this.templateFunction(input);

        expect(json.b).to.equal(null);
      });

      it('must use undefinedValue for missing objects when undefined is undefined', () => {
        const input = {
          a: 1,
          b: 2,
          d: 4
        };
        const json = this.templateFunction(input);

        expect(json.c).to.equal(undefined);
      });

      it('must use undefinedValue for missing objects when undefined is custom', () => {
        const input = {
          b: 2,
          c: 3,
          d: 4
        };
        const json = this.templateFunction(input);

        expect(json.a).to.equal('qwerty');
      });

      it('must use the default undefinedValue if no custom undefinedValue is defined', () => {
        const input = {
          a: 1,
          b: 2,
          c: 3
        };
        const json = this.templateFunction(input);

        expect(json.d).to.equal(null);
      });
    });

    describe('path', () => {
      it('must error if it encounters a json.Value thats missing a path', () => {
        try {
          const templateFunction = jyson.buildTemplateFunction({
            'a': new jyson.Value({ undefinedValue: 'qwerty' }),
          });
          const input = {
            a: 1,
          };

          templateFunction(input);
          return Promise.reject('an error should have been thrown');
        } catch(error) {
          expect(error).to.be.an.instanceOf(assert.AssertionError);
          expect(error.message).to.equal('JsonValue requires a path');
        }
      });
    });
  });
});