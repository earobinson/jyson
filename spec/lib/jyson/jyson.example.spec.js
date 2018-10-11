const chai = require('chai');

const expect = chai.expect;

const jyson = require('./../../../lib/jyson');

describe('jyson.example.spec: an example', () => {
  beforeEach(() => {
    this.productTemplateFunction = jyson.buildTemplateFunction({
      name: 'name',
      tags: ['meta.tags.$'],
      other: {
        dogRating: 'meta.rating',
        exampleMissingValue: 'notFound',
        dateRan: ({ templateOpts }) => templateOpts.dateRan
      },
    });
  });

  it('must output example "json"', () => {
    const input = {
      name: 'Bacon Peanut Butter “Ice Cream” for Dogs',
      meta: {
        rating: 10,
        tags: [
          'lactobacillus bulgaricus',
          'enterocococcus thermophilus',
          'lactobacillus acidophilus',
          'bifidobacterium bifidum',
          'lactobacillus casei'
        ]
      }
    };

    const json = this.productTemplateFunction(input, { dateRan: 1496351371149 });

    expect(json).to.deep.equal(
      {
        name: 'Bacon Peanut Butter “Ice Cream” for Dogs',
        tags:[
          'lactobacillus bulgaricus',
          'enterocococcus thermophilus',
          'lactobacillus acidophilus',
          'bifidobacterium bifidum',
          'lactobacillus casei'
        ],
        other: {
          dogRating: 10,
          exampleMissingValue: null,
          dateRan: 1496351371149
        }
      }
    );
  });
});