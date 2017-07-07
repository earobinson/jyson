const chai = require('chai');

const expect = chai.expect;

const jyson = require('./../../../lib/jyson');

describe('jyson.example2.spec: an example', () => {
    beforeEach(() =>{
        this.productTemplateFunction = jyson.buildTemplateFunction({
            name: 'name',
            countries: ['countries.$'],
            biodegradeable: 'biodegradeable',
            tags: ['tags.$']
        });
    });

    it('must output example "json"', () => {
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

        expect(json).to.deep.equal(
            {
                name: 'Bacon Peanut Butter “Ice Cream” for Dogs',
                countries: ['Canada', 'USA'],
                biodegradeable: false,
                tags:[
                    'lactobacillus bulgaricus',
                    'enterocococcus thermophilus',
                    'lactobacillus acidophilus',
                    'bifidobacterium bifidum',
                    'lactobacillus casei'
                ]
            }
        );
    });
});
