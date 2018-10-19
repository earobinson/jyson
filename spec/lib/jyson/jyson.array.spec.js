const set = require('lodash.set');

const jyson = require('./../../../lib/jyson');

describe('jyson.array.spec: an array in the template', () => {
  describe('template arrays defined by strings', () => {
    beforeEach(() => {
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

        expect(json.a).toEqual(input.a);
        expect(json.a).toHaveLength(input.a.length);
        expect(json.b).toEqual(input.b);
        expect(json.b).toHaveLength(input.b.length);
        expect(json.c).toEqual(input.c);
        expect(json.c).toHaveLength(input.c.length);
      });

      it('must convert an object to json when the array is not provided', () => {
        const input = {
        };
        const json = this.templateFunction(input);

        expect(json.a).toEqual([]);
        expect(json.a).toHaveLength(0);
        expect(json.b).toEqual([]);
        expect(json.b).toHaveLength(0);
        expect(json.c).toEqual([]);
        expect(json.c).toHaveLength(0);
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

        expect(json.a).toEqual(expect.arrayContaining([1]));
        expect(json.a).toHaveLength(input.a.length);
        expect(json.b).toEqual(input.b);
        expect(json.b).toHaveLength(input.b.length);
        expect(json.c).toEqual(input.c);
        expect(json.c).toHaveLength(input.c.length);
      });
    });
  });

  describe('template arrays defined by objects', () => {
    describe('simple arrays', () => {
      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: [{
            a: 'a.$.a',
            b: 'a.$.b',
            c: 'a.$.c'
          }]
        });
      });

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
        expect(json.a.length).toBe(2);
        expect(json.a[0].a).toBe('a0a');
        expect(json.a[0].b).toBe('a0b');
        expect(json.a[0].c).toBe('a0c');
        expect(json.a[1].a).toBe('a1a');
        expect(json.a[1].b).toBe('a1b');
        expect(json.a[1].c).toBe('a1c');
      });

      it('must handle undefined values when converting an object to json', () => {
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
        expect(json.a.length).toBe(2);
        expect(json.a[0].a).toBe('a0a');
        expect(json.a[0].b).toBeNull();
        expect(json.a[0].c).toBe('a0c');
        expect(json.a[1].a).toBe('a1a');
        expect(json.a[1].b).toBe('a1b');
        expect(json.a[1].c).toBe('a1c');
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
        expect(json.a.length).toBe(10);
        for(let ii = 0; ii < 10; ii++) {
          expect(json.a[ii].a).toBe(`a${ii}a`);
          expect(json.a[ii].b).toBe(`a${ii}b`);
          expect(json.a[ii].c).toBe(`a${ii}c`);
        }
      });
    });

    describe('complex arrays', () => {
      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: [{
            b: {
              c: 'a.$.b.c'
            }
          }]
        });
      });

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
        expect(json.a.length).toBe(1);
        expect(json.a[0].b.c).toBe('easy as 123');
        expect(Object.keys(json.a[0].b)).toEqual(expect.arrayContaining(['c']));
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
        expect(json.a.length).toBe(2);
        expect(json.a[0].b.c).toBe('easy as 123');
        expect(json.a[1].b.c).toBe('EASY AS 123');
        expect(Object.keys(json.a[0].b)).toEqual(expect.arrayContaining(['c']));
        expect(Object.keys(json.a[1].b)).toEqual(expect.arrayContaining(['c']));
      });
    });

    describe('arrays that access multiple arrays', () => {
      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          x: [{
            a: 'a.$.a',
            b: 'b.$.b',
            c: 'c.$.c'
          }]
        });
      });

      describe('when all the arrays are the same length', () => {
        it('must convert an object to json', () => {
          const input = {
            a: [
              {
                a: 'a0a',
              }, {
                a: 'a1a',
              }
            ],
            b: [
              {
                b: 'b0b',
              }, {
                b: 'b1b',
              }
            ],
            c: [
              {
                c: 'c0c',
              }, {
                c: 'c1c',
              }
            ],
          };
          const json = this.templateFunction(input);
          expect(json.x.length).toBe(2);
          expect(json.x[0].a).toBe('a0a');
          expect(json.x[0].b).toBe('b0b');
          expect(json.x[0].c).toBe('c0c');
          expect(json.x[1].a).toBe('a1a');
          expect(json.x[1].b).toBe('b1b');
          expect(json.x[1].c).toBe('c1c');
        });
      });

      describe('when one of the arrays is longer than the others', () => {
        it('must convert an object to json', () => {
          const input = {
            a: [
              {
                a: 'a0a',
              }, {
                a: 'a1a',
              }
            ],
            b: [
              {
                b: 'b0b',
              }
            ],
            c: [
              {
                c: 'c0c',
              }
            ],
          };
          const json = this.templateFunction(input);
          expect(json.x.length).toBe(2);
          expect(json.x[0].a).toBe('a0a');
          expect(json.x[0].b).toBe('b0b');
          expect(json.x[0].c).toBe('c0c');
          expect(json.x[1].a).toBe('a1a');
          expect(json.x[1].b).toBeNull();
          expect(json.x[1].c).toBeNull();
        });
      });
    });

    describe('arrays that access non array values', () => {
      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: [{
            a: 'a.$',
            b: 'b',
          }]
        });
      });

      it('must convert an object to json', () => {
        const input = {
          a: [0, 1],
          b: 'b'
        };
        const json = this.templateFunction(input);
        expect(json.a.length).toBe(2);
        expect(json.a[0].a).toBe(0);
        expect(json.a[0].b).toBe('b');
        expect(json.a[1].a).toBe(1);
        expect(json.a[0].b).toBe('b');
      });

      it('must convert an object to json when the order is reversed', () => {
        const input = {
          b: 'b',
          a: [0, 1]
        };
        const json = this.templateFunction(input);
        expect(json.a.length).toBe(2);
        expect(json.a[0].a).toBe(0);
        expect(json.a[0].b).toBe('b');
        expect(json.a[1].a).toBe(1);
        expect(json.a[0].b).toBe('b');
      });
    });

    describe('arrays that access non array values for nested arrays', () => {
      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: [{
            a: 'a.$.a',
            b: 'b.b',
          }]
        });
      });

      it('must convert an object to json', () => {
        const input = {
          a: [{ a: 0 }, { a: 1 }],
          b: { b: 'b' }
        };
        const json = this.templateFunction(input);
        expect(json.a.length).toBe(2);
        expect(json.a[0].a).toBe(0);
        expect(json.a[0].b).toBe('b');
        expect(json.a[1].a).toBe(1);
        expect(json.a[0].b).toBe('b');
      });

      it('must convert an object to json when the non array value does not have a length',
        () => {
          const input = {
            a: [{ a: 0 }, { a: 1 }],
            b: { b: false },
          };
          const json = this.templateFunction(input);
          expect(json.a.length).toBe(2);
          expect(json.a[0].a).toBe(0);
          expect(json.a[0].b).toBe(false);
          expect(json.a[1].a).toBe(1);
          expect(json.a[0].b).toBe(false);
        }
      );
    });
  });

  describe('template arrays of arrays of arrays', () => {
    beforeEach(() => {
      this.templateFunction = jyson.buildTemplateFunction({
        e: [{
          f: [{
            g: [{
              h: 'a.$.b.$.c.$.d'
            }]
          }]
        }]
      });
    });

    it('must convert an object to json', () => {
      const input = {
        a: [{
          b: [{
            c: [{
              d: 'arrays'
            }]
          }]
        }]
      };
      const json = this.templateFunction(input);
      expect(json).toEqual({
        e: [{
          f: [{
            g: [{
              h: 'arrays'
            }]
          }]
        }]
      });
    });

    it('must handle a missing a', () => {
      const input = {};
      const json = this.templateFunction(input);
      expect(json).toEqual({
        e: []
      });
    });

    it('must handle an empty a array', () => {
      const input = {
        a: []
      };
      const json = this.templateFunction(input);
      expect(json).toEqual({
        e: []
      });
    });

    it('must handle an empty b array', () => {
      const input = {
        a: [{
          b: []
        }]
      };
      const json = this.templateFunction(input);
      expect(json).toEqual({
        e: [{
          f: []
        }]
      });
    });

    it('must handle an empty c array', () => {
      const input = {
        a: [{
          b: [{
            c: []
          }]
        }]
      };
      const json = this.templateFunction(input);
      expect(json).toEqual({
        e: [{
          f: [{
            g: []
          }]
        }]
      });
    });

    it('must handle a missing empty d', () => {
      const input = {
        a: [{
          b: [{
            c: [{}]
          }]
        }]
      };
      const json = this.templateFunction(input);
      expect(json).toEqual({
        e: [{
          f: [{
            g: [{
              h: null
            }]
          }]
        }]
      });
    });

    it('must convert an object with many arrays to json', () => {
      const input = {};
      const output = {};
      const arrayLengths = 10;

      for(let a = 0; a < arrayLengths; a++) {
        for(let b = 0; b < arrayLengths; b++) {
          for(let c = 0; c < arrayLengths; c++) {
            for(let d = 0; d < arrayLengths; d++) {
              set(input, `a[${a}]b[${b}]c[${c}]d`, `${a}-${b}-${c}-${d}`);
              set(output, `e[${a}]f[${b}]g[${c}]h`, `${a}-${b}-${c}-${d}`);
            }
          }
        }
      }

      const json = this.templateFunction(input);
      expect(json).toEqual(output);
    });
  });
});