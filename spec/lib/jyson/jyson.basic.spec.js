const assert = require('assert');

const jyson = require('./../../../lib/jyson');

describe('jyson.basic.spec: a basic template', () => {
  beforeEach(() => {
    this.templateFunction = jyson.buildTemplateFunction({
      a: 'a',
      b: 'b',
      c: 'c',
    });
  });

  it('must convert an object to "json"', () => {
    const input = {
      a: 1,
      b: 2,
      c: 3
    };
    const json = this.templateFunction(input);

    expect(json.a).toBe(input.a);
    expect(json.b).toBe(input.b);
    expect(json.c).toBe(input.c);
  });

  it('must ignore additional values', () => {
    const input = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    };
    const json = this.templateFunction(input);

    expect(Object.keys(json)).toContain('a');
    expect(Object.keys(json)).not.toContain('d');
  });

  it('must use null for missing objects', () => {
    const input = {
      a: 1,
      c: 3
    };
    const json = this.templateFunction(input);

    expect(json.b).toBeNull();
  });

  it('must error if it encounters an unexpected array', () => {
    const input = {
      a: [1],
    };

    try {
      this.templateFunction(input);
      return Promise.reject('an error should have been thrown');
    } catch(error) {
      expect(error).toBeInstanceOf(assert.AssertionError);
      expect(error.message).toBe('jyson encountered an array when it was not expecting one: a');
    }
  });

  it('must convert arrays "json"', () => {
    const input = [
      { a:1 },
      { b:2 },
      { c:3 }
    ];
    const json = this.templateFunction(input);

    expect(json).toEqual([
      { a:1, b:null, c:null },
      { a:null, b:2, c:null },
      { a:null, b:null, c:3 }
    ]);
  });

  it('must convert deep arrays "json"', () => {
    this.templateFunction = jyson.buildTemplateFunction({
      a: { a: 'a.a' },
      b: { b: 'b.b' },
      c: { c: 'c.c' },
    });

    const input = [
      { a:{ a: 1 } },
      { b:{ b: 2 } },
      { c:{ c: 3 } }
    ];
    const json = this.templateFunction(input);

    expect(json).toEqual([
      { a:{ a:1 }, b:{ b: null }, c:{ c: null } },
      { a:{ a:null }, b:{ b: 2 }, c:{ c: null } },
      { a:{ a:null }, b:{ b: null }, c:{ c: 3 } }
    ]);
  });

  it('must convert an object with properties "json"', () => {
    const input = {};
    Object.defineProperty(input, 'a', {
      get: () => { return 1; },
      set: () => { },
      enumerable: true,
      configurable: false
    });
    Object.defineProperty(input, 'b', {
      get: () => { return 2; },
      set: () => { },
      enumerable: true,
      configurable: false
    });
    Object.defineProperty(input, 'c', {
      get: () => { return 3; },
      set: () => {  },
      enumerable: true,
      configurable: false
    });

    const json = this.templateFunction(input);

    expect(json.a).toBe(1);
    expect(json.b).toBe(2);
    expect(json.c).toBe(3);
  });
});