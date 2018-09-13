const chai = require('chai');

const expect = chai.expect;

const jyson = require('../../../lib/jyson');

describe('jyson.undefinedOverride.spec: a basic template', () => {
  beforeEach(() => {
    this.templateFunction = jyson.buildTemplateFunction({
      'a': new jyson.Value({ path: 'a', undefinedValue: 'qwerty' }),
      'b': new jyson.Value({ path: 'b', undefinedValue: null }),
      'c': new jyson.Value({ path: 'c', undefinedValue: undefined })
    });
  });

  it('must convert an object to "json"', () => {
    const input = {
      a: 1,
      b: 2,
      c: 3
    };
    const json = this.templateFunction(input);

    expect(json.a).to.equal(input.a);
    expect(json.b).to.equal(input.b);
    expect(json.c).to.equal(input.c);
  });

  describe('jyson.Value', () => {
    it('must use undefinedValue for missing objects when undefined is null', () => {
      const input = {
        a: 1,
        c: 3
      };
      const json = this.templateFunction(input);

      expect(json.b).to.equal(null);
    });

    it('must use undefinedValue for missing objects when undefined is undefined', () => {
      const input = {
        a: 1,
        b: 2
      };
      const json = this.templateFunction(input);

      expect(json.c).to.equal(undefined);
    });

    it('must use undefinedValue for missing objects when undefined is custom', () => {
      const input = {
        b: 2,
        c: 3
      };
      const json = this.templateFunction(input);

      expect(json.a).to.equal('qwerty');
    });
  });
});