const assert = require('assert');

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

  test('must convert an object to "json"', () => {
    const input = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    };
    const json = this.templateFunction(input);

    expect(json.a).toBe(input.a);
    expect(json.b).toBe(input.b);
    expect(json.c).toBe(input.c);
    expect(json.d).toBe(input.d);
  });

  describe('jyson.Value', () => {
    describe('undefinedValue', () => {
      test(
        'must use undefinedValue for missing objects when undefined is null',
        () => {
          const input = {
            a: 1,
            c: 3,
            d: 4
          };
          const json = this.templateFunction(input);

          expect(json.b).toBeNull();
        }
      );

      test(
        'must use undefinedValue for missing objects when undefined is undefined',
        () => {
          const input = {
            a: 1,
            b: 2,
            d: 4
          };
          const json = this.templateFunction(input);

          expect(json.c).toBeUndefined();
        }
      );

      test(
        'must use undefinedValue for missing objects when undefined is custom',
        () => {
          const input = {
            b: 2,
            c: 3,
            d: 4
          };
          const json = this.templateFunction(input);

          expect(json.a).toBe('qwerty');
        }
      );

      test(
        'must use the default undefinedValue if no custom undefinedValue is defined',
        () => {
          const input = {
            a: 1,
            b: 2,
            c: 3
          };
          const json = this.templateFunction(input);

          expect(json.d).toBeNull();
        }
      );
    });

    describe('path', () => {
      test('must error if it encounters a json.Value thats missing a path', () => {
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
          expect(error).toBeInstanceOf(assert.AssertionError);
          expect(error.message).toBe('JsonValue requires a path');
        }
      });
    });
  });
});