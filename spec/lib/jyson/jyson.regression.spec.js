const jyson = require('./../../../lib/jyson');

describe('jyson.regression.spec: avoiding regressions', () => {
  beforeEach(() => {
    this.productTemplateFunction = jyson.buildTemplateFunction({
      name: 'name',
      countries: ['countries.$'],
      biodegradeable: 'biodegradeable',
      tags: ['tags.$']
    });
  });

  test(
    'must continue to output all properties after a property that evaluates false',
    () => {
      const input = {
        name: 'Bacon Peanut Butter “Ice Cream” for Dogs',
        countries: ['Canada', 'USA'],
        biodegradeable: false,
        tags: [
          'lactobacillus bulgaricus',
          'enterocococcus thermophilus',
          'lactobacillus acidophilus',
          'bifidobacterium bifidum',
          'lactobacillus casei'
        ]
      };

      const json = this.productTemplateFunction(input);
      expect(json).toEqual({
        name: 'Bacon Peanut Butter “Ice Cream” for Dogs',
        countries: ['Canada', 'USA'],
        biodegradeable: false,
        tags: [
          'lactobacillus bulgaricus',
          'enterocococcus thermophilus',
          'lactobacillus acidophilus',
          'bifidobacterium bifidum',
          'lactobacillus casei'
        ]
      });
    }
  );
});
