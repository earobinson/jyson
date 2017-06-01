const Q = require('q');
const chai = require('chai');

const expect = chai.expect;

const jyson = require('./../../../lib/jyson');

describe('jyson.array.spec: an array in the template', () => {
  describe('simple arrays', () => {
    beforeEach(() =>{
      this.templateFunction = jyson.buildTemplateFunction({
        a: ['a.$'],
        b: ['b.$'],
        c: ['c.$']
      });
    });

    it('must convert an object to "json"', () => {
      const input = {
        a: [1],
        b: [2, 3],
        c: [4, 5, 6]
      };
      const json = this.templateFunction(input);

      expect(json.a).to.have.ordered.members(input.a);
      expect(json.a).to.have.lengthOf(input.a.length);
      expect(json.b).to.have.ordered.members(input.b);
      expect(json.b).to.have.lengthOf(input.b.length);
      expect(json.c).to.have.ordered.members(input.c);
      expect(json.c).to.have.lengthOf(input.c.length);
    });
  });

  describe('complex arrays', () => {
    it('must convert an object to "json"', () => {
      const input = {
        a: [1],
        b: [2, 3],
        c: [4, 5, 6]
      };
      input.a.test = 'hello world';
      input.b.push('hello world');

      const json = this.templateFunction(input);

      expect(json.a).to.have.ordered.members([1]);
      expect(json.a).to.have.lengthOf(input.a.length);
      expect(json.b).to.have.ordered.members(input.b);
      expect(json.b).to.have.lengthOf(input.b.length);
      expect(json.c).to.have.ordered.members(input.c);
      expect(json.c).to.have.lengthOf(input.c.length);
    });
  });
});