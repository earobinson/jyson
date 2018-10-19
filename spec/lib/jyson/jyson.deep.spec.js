const jyson = require('./../../../lib/jyson');

describe('jyson.deep.spec: a template with deep paths', () => {
  beforeEach(() => {
    this.templateFunction = jyson.buildTemplateFunction({
      a: 'a',
      b: { b: 'b' },
      c: { c: { c:'c' } }
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
    expect(json.b.b).toBe(input.b);
    expect(json.c.c.c).toBe(input.c);
  });
});