const chai = require('chai');

const expect = chai.expect;

const jyson = require('../../../lib/jyson');

describe.only('jyson.emptyArrayValue.spec: basic undefined', () => {
  describe('template arrays defined by strings', () => {
    describe('emptyArrayValue is null', () => {

      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: ['a.$']
        }, {
          emptyArrayValue: null
        });
      });

      it('must resolve arrays', () => {
        const input = {
          a: [1, 2, 3]
        };
        const json = this.templateFunction(input);

        expect(json).to.deep.equal({
          a: [1, 2, 3]
        });
      });

      it('must resolve an empty array', () => {
        const input = {
          a: []
        };
        const json = this.templateFunction(input);

        expect(json).to.deep.equal({
          a: []
        });
      });

      it('must resolve a missing array', () => {
        const input = {
        };
        const json = this.templateFunction(input);

        expect(json).to.deep.equal({
          a: null
        });
      });
    });

    describe('emptyArrayValue is a string', () => {

      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: ['a.$']
        }, {
          emptyArrayValue: 'empty array'
        });
      });

      it('must resolve arrays', () => {
        const input = {
          a: [1, 2, 3]
        };
        const json = this.templateFunction(input);

        expect(json).to.deep.equal({
          a: [1, 2, 3]
        });
      });
    });
  });
});