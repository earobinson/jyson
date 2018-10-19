const jyson = require('./../../../lib/jyson');

describe('jyson.nesting.spec: a template with nesting', () => {
  beforeEach(() => {
    this.templateFunction = jyson.buildTemplateFunction({
      a: 'a',
      b: 'b.b',
      c: 'c.c.c',
    });
  });

  it('must convert an object to "json"', () => {
    const input = {
      a: 1,
      b: { b: 2 },
      c: { c: { c:3 } }
    };
    const json = this.templateFunction(input);

    expect(json.a).toBe(input.a);
    expect(json.b).toBe(input.b.b);
    expect(json.c).toBe(input.c.c.c);
  });
});