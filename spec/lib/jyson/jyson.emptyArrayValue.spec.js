const jyson = require('../../../lib/jyson');

describe('jyson.emptyArrayValue.spec', () => {
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

        expect(json).toEqual({
          a: [1, 2, 3]
        });
      });

      it('must resolve an empty array', () => {
        const input = {
          a: []
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: []
        });
      });

      it('must resolve a missing array', () => {
        const input = {
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
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

        expect(json).toEqual({
          a: [1, 2, 3]
        });
      });

      it('must resolve an empty array', () => {
        const input = {
          a: []
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: []
        });
      });

      it('must resolve a missing array', () => {
        const input = {
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: 'empty array'
        });
      });
    });

    describe('emptyArrayValue is undefined', () => {
      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: ['a.$']
        }, {
          emptyArrayValue: undefined
        });
      });

      it('must resolve arrays', () => {
        const input = {
          a: [1, 2, 3]
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: [1, 2, 3]
        });
      });

      it('must resolve an empty array', () => {
        const input = {
          a: []
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: []
        });
      });

      it('must resolve a missing array', () => {
        const input = {
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
        });
      });
    });
  });

  describe('template arrays defined by an object', () => {
    describe('emptyArrayValue is null', () => {
      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: [{ a: 'a.$' }]
        }, {
          emptyArrayValue: null
        });
      });

      it('must resolve arrays', () => {
        const input = {
          a: [1, 2, 3]
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: [{ a: 1 }, { a: 2 }, { a: 3 }]
        });
      });

      it('must resolve an empty array', () => {
        const input = {
          a: []
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: []
        });
      });

      it('must resolve a missing array', () => {
        const input = {
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: null
        });
      });
    });

    describe('emptyArrayValue is an object', () => {
      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: [{ a: 'a.$' }]
        }, {
          emptyArrayValue: 'empty array'
        });
      });

      it('must resolve arrays', () => {
        const input = {
          a: [1, 2, 3]
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: [{ a: 1 }, { a: 2 }, { a: 3 }]
        });
      });

      it('must resolve an empty array', () => {
        const input = {
          a: []
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: []
        });
      });

      it('must resolve a missing array', () => {
        const input = {
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: 'empty array'
        });
      });
    });

    describe('emptyArrayValue is undefined', () => {
      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: [{ a: 'a.$' }]
        }, {
          emptyArrayValue: undefined
        });
      });

      it('must resolve arrays', () => {
        const input = {
          a: [1, 2, 3]
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: [{ a: 1 }, { a: 2 }, { a: 3 }]
        });
      });

      it('must resolve an empty array', () => {
        const input = {
          a: []
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
          a: []
        });
      });

      it('must resolve a missing array', () => {
        const input = {
        };
        const json = this.templateFunction(input);

        expect(json).toEqual({
        });
      });
    });
  });
});