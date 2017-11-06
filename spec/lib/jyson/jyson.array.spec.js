const chai = require('chai');

const expect = chai.expect;

const jyson = require('./../../../lib/jyson');

describe('jyson.array.spec: an array in the template', () => {
  describe('template arrays defined by strings', () => {
    beforeEach(() =>{
      this.templateFunction = jyson.buildTemplateFunction({
        a: ['a.$'],
        b: ['b.$'],
        c: ['c.$']
      });
    });

    describe('simple arrays', () => {
      it('must convert an object to json', () => {
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

      it('must convert an object to json when the array is not provided', () => {
        const input = {
        };
        const json = this.templateFunction(input);

        expect(json.a).to.deep.equal([]);
        expect(json.a).to.have.lengthOf(0);
        expect(json.b).to.deep.equal([]);
        expect(json.b).to.have.lengthOf(0);
        expect(json.c).to.deep.equal([]);
        expect(json.c).to.have.lengthOf(0);
      });
    });

    describe('complex arrays', () => {
      it('must convert an object to json', () => {
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

  describe('template arrays defined by objects', () => {
    describe('simple arrays', () => {
      beforeEach(() =>{
        this.templateFunction = jyson.buildTemplateFunction({
          a: [{
            a: 'a.$.a',
            b: 'a.$.b',
            c: 'a.$.c'
          }]
        });
      });

      describe('simple arrays', () => {
        it('must convert an object to json', () => {
          const input = {
            a: [
              {
                a: 'a0a',
                b: 'a0b',
                c: 'a0c',
              }, {
                a: 'a1a',
                b: 'a1b',
                c: 'a1c',
              }
            ],
          };
          const json = this.templateFunction(input);
          expect(json.a.length).to.equal(2);
          expect(json.a[0].a).to.equal('a0a');
          expect(json.a[0].b).to.equal('a0b');
          expect(json.a[0].c).to.equal('a0c');
          expect(json.a[1].a).to.equal('a1a');
          expect(json.a[1].b).to.equal('a1b');
          expect(json.a[1].c).to.equal('a1c');
        });

        it('must handel undefined values when converting an object to json', () => {
          const input = {
            a: [
              {
                a: 'a0a',
                c: 'a0c',
              }, {
                a: 'a1a',
                b: 'a1b',
                c: 'a1c',
              }
            ],
          };
          const json = this.templateFunction(input);
          expect(json.a.length).to.equal(2);
          expect(json.a[0].a).to.equal('a0a');
          expect(json.a[0].b).to.equal(null);
          expect(json.a[0].c).to.equal('a0c');
          expect(json.a[1].a).to.equal('a1a');
          expect(json.a[1].b).to.equal('a1b');
          expect(json.a[1].c).to.equal('a1c');
        });

        it('must convert an object of length 10 to json', () => {
          const input = {
            a: [
              {
                a: 'a0a',
                b: 'a0b',
                c: 'a0c',
              }, {
                a: 'a1a',
                b: 'a1b',
                c: 'a1c',
              }, {
                a: 'a2a',
                b: 'a2b',
                c: 'a2c',
              }, {
                a: 'a3a',
                b: 'a3b',
                c: 'a3c',
              }, {
                a: 'a4a',
                b: 'a4b',
                c: 'a4c',
              }, {
                a: 'a5a',
                b: 'a5b',
                c: 'a5c',
              }, {
                a: 'a6a',
                b: 'a6b',
                c: 'a6c',
              }, {
                a: 'a7a',
                b: 'a7b',
                c: 'a7c',
              }, {
                a: 'a8a',
                b: 'a8b',
                c: 'a8c',
              }, {
                a: 'a9a',
                b: 'a9b',
                c: 'a9c',
              }
            ],
          };
          const json = this.templateFunction(input);
          expect(json.a.length).to.equal(10);
          for(let ii = 0; ii < 10; ii++) {
            expect(json.a[ii].a).to.equal(`a${ii}a`);
            expect(json.a[ii].b).to.equal(`a${ii}b`);
            expect(json.a[ii].c).to.equal(`a${ii}c`);
          }
        });
      });
    });

    describe('simple arrays', () => {
      beforeEach(() =>{
        this.templateFunction = jyson.buildTemplateFunction({
          a: [{
            b: {
              c: 'a.$.b.c'
            }
          }]
        });
      });

      describe('complex arrays', () => {
        it('must convert an object to json of length one', () => {
          const input = {
            a: [
              {
                b: {
                  c: 'easy as 123',
                  d: 'do ray me'
                }
              }
            ],
          };
          const json = this.templateFunction(input);
          expect(json.a.length).to.equal(1);
          expect(json.a[0].b.c).to.equal('easy as 123');
          expect(Object.keys(json.a[0].b)).to.have.ordered.members(['c']);
        });

        it('must convert an object to json of length two', () => {
          const input = {
            a: [
              {
                b: {
                  c: 'easy as 123',
                  d: 'do ray me'
                }
              }, {
                b: {
                  c: 'EASY AS 123',
                  d: 'do ray me'
                }
              }
            ],
          };
          const json = this.templateFunction(input);
          expect(json.a.length).to.equal(2);
          expect(json.a[0].b.c).to.equal('easy as 123');
          expect(json.a[1].b.c).to.equal('EASY AS 123');
          expect(Object.keys(json.a[0].b)).to.have.ordered.members(['c']);
          expect(Object.keys(json.a[1].b)).to.have.ordered.members(['c']);
        });
      });
    });
  });
});