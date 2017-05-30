const Q = require('q');
const chai = require('chai');

const expect = chai.expect;

const jyson = require('./jyson');

describe('jyson.spec', () => {
  describe('a basic template', () => {
    beforeEach(() =>{
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

      expect(json.a).to.equal(input.a);
      expect(json.b).to.equal(input.b);
      expect(json.c).to.equal(input.c);
    });

    it('must ignore additional values', () => {
      const input = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      };
      const json = this.templateFunction(input);

      expect(Object.keys(json)).to.include('a', 'b', 'c');
      expect(Object.keys(json)).not.to.include('d', 'e');
    });

    it('must use null for missing objects', () => {
      const input = {
        a: 1,
        c: 3
      };
      const json = this.templateFunction(input);

      expect(json.b).to.equal(null);
    });

    it('must error if it encounters an unexpected array', () => {
      const input = {
        a: [1],
      };

      return Q.when(null, () => {
        return this.templateFunction(input);
      })
      .then(() => {
        return Q.reject('an error should have been thrown');
      })
      .catch(error => {
        expect(error.name).to.equal('AssertionError');
        expect(error.message).to.equal('jyson encountered an array when it was not expecting one: a');
      });
    });

    it('must convert arrays "json"', () => {
      const input = [
        {a:1},
        {b:2},
        {c:3}
      ];
      const json = this.templateFunction(input);

      expect(json).to.deep.equal([
        {a:1, b:null, c:null},
        {a:null, b:2, c:null},
        {a:null, b:null, c:3}
      ]);
    });

    it('must convert deep arrays "json"', () => {
      this.templateFunction = jyson.buildTemplateFunction({
        a: {a: 'a.a'},
        b: {b: 'b.b'},
        c: {c: 'c.c'},
      });

      const input = [
        {a:{a: 1}},
        {b:{b: 2}},
        {c:{c: 3}}
      ];
      const json = this.templateFunction(input);

      expect(json).to.deep.equal([
        {a:{a:1}, b:{b: null}, c:{c: null}},
        {a:{a:null}, b:{b: 2}, c:{c: null}},
        {a:{a:null}, b:{b: null}, c:{c: 3}}
      ]);
    });
  });

  describe('a template with nesting', () => {
    beforeEach(() =>{
      this.templateFunction = jyson.buildTemplateFunction({
        a: 'a',
        b: 'b.b',
        c: 'c.c.c',
      });
    });

    it('must convert an object to "json"', () => {
      const input = {
        a: 1,
        b: {b: 2},
        c: {c: {c:3}}
      };
      const json = this.templateFunction(input);

      expect(json.a).to.equal(input.a);
      expect(json.b).to.equal(input.b.b);
      expect(json.c).to.equal(input.c.c.c);
    });
  });

  describe('a template with deep paths', () => {
    beforeEach(() =>{
      this.templateFunction = jyson.buildTemplateFunction({
        a: 'a',
        b: {b: 'b'},
        c: {c: {c:'c'}}
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
      expect(json.b.b).to.equal(input.b);
      expect(json.c.c.c).to.equal(input.c);
    });
  });

  describe('an array in the template', () => {
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

  describe('an example', () => {
    beforeEach(() =>{
      this.productTemplateFunction = jyson.buildTemplateFunction({
        name: 'name',
        tags: ['meta.tags.$'],
        other: {
          dogRating: 'meta.rating',
          exampleMissingValue: 'notFound'
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

      const json = this.productTemplateFunction(input);

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
            exampleMissingValue: null
          }
        }
      );
    });
  });
});