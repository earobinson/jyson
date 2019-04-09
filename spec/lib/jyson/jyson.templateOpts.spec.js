const jyson = require('../../../lib/jyson');

describe('jyson.templateOpts.spec: access templateOpts via #', () => {
  describe('simple templateOpts', () => {
    beforeEach(() => {
      this.templateFunction = jyson.buildTemplateFunction({
        a: 'a',
        b: '#b'
      });
    });

    it('must convert an object to "json" with templateOpts', () => {
      const input = {
        a: 'a',
      };
      const templateOpts = {
        b: 'b',
      };
      const json = this.templateFunction(input, templateOpts);

      expect(json.a).toEqual('a');
      expect(json.b).toEqual('b');
    });
  });

  describe('templateOpts accessed by an object paramter', () => {
    beforeEach(() => {
      this.templateFunction = jyson.buildTemplateFunction({
        a: 'a',
        b: '#b[bIndex]'
      });
    });

    it('must convert an object to "json" with templateOpts', () => {
      const input = {
        a: 'a',
        bIndex: 1
      };
      const templateOpts = {
        b: ['b', 'bb', 'bbb'],
      };
      const json = this.templateFunction(input, templateOpts);

      expect(json.a).toEqual('a');
      expect(json.b).toEqual('bb');
    });

    it('must handle an arrayed input', () => {
      const input = [{
        a: 'a',
        bIndex: 0
      }, {
        a: 'b',
        bIndex: 1
      }, {
        a: 'c',
        bIndex: 2
      }];
      const templateOpts = {
        b: ['b', 'bb', 'bbb'],
      };
      const json = this.templateFunction(input, templateOpts);

      expect(json).toEqual([{
        a: 'a',
        b: 'b'
      }, {
        a: 'b',
        b: 'bb'
      }, {
        a: 'c',
        b: 'bbb'
      }]);
    });
  });

  describe('templateOpts that are deeply nested', () => {
    beforeEach(() => {
      this.templateFunction = jyson.buildTemplateFunction({
        a: 'a',
        b: '#b[b.c.d]'
      });
    });

    it('must convert an object to "json" with templateOpts', () => {
      const input = {
        a: 'a',
        b: {
          c: {
            d: 1
          }
        }
      };
      const templateOpts = {
        b: ['b', 'bb', 'bbb'],
      };
      const json = this.templateFunction(input, templateOpts);

      expect(json.a).toEqual('a');
      expect(json.b).toEqual('bb');
    });

    it('must handle an arrayed input', () => {
      const input = [{
        a: 'a',
        b: {
          c: {
            d: 0
          }
        }
      }, {
        a: 'b',
        b: {
          c: {
            d: 1
          }
        }
      }, {
        a: 'c',
        b: {
          c: {
            d: 2
          }
        }
      }];
      const templateOpts = {
        b: ['b', 'bb', 'bbb'],
      };
      const json = this.templateFunction(input, templateOpts);

      expect(json).toEqual([{
        a: 'a',
        b: 'b'
      }, {
        a: 'b',
        b: 'bb'
      }, {
        a: 'c',
        b: 'bbb'
      }]);
    });
  });

  describe('templateOpts via array', () => {
    describe('templateOpts arrays defined by strings', () => {
      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: 'a',
          b: ['#b[bIndex].$']
        });
      });

      it('must convert an object to "json" with templateOpts', () => {
        const input = {
          a: 'a',
          bIndex: 1
        };
        const templateOpts = {
          b: [['b0'], ['bb0', 'bb1'], ['bbb0', 'bbb1', 'bbb2']],
        };
        const json = this.templateFunction(input, templateOpts);

        expect(json.a).toEqual('a');
        expect(json.b[0]).toBe('bb0');
        expect(json.b[1]).toBe('bb1');
      });

      it('must handle an arrayed input', () => {
        const input = [{
          a: 'a',
          bIndex: 0
        }, {
          a: 'b',
          bIndex: 1
        }, {
          a: 'c',
          bIndex: 2
        }];
        const templateOpts = {
          b: [['b0'], ['bb0', 'bb1'], ['bbb0', 'bbb1', 'bbb2']],
        };
        const json = this.templateFunction(input, templateOpts);

        expect(json).toEqual([{
          a: 'a',
          b: ['b0']
        }, {
          a: 'b',
          b: ['bb0', 'bb1']
        }, {
          a: 'c',
          b: ['bbb0', 'bbb1', 'bbb2']
        }]);
      });
    });

    describe('templateOpts arrays defined by objects', () => {
      beforeEach(() => {
        this.templateFunction = jyson.buildTemplateFunction({
          a: 'a',
          b: [{
            b: '#b[bIndex].$'
          }]
        });
      });

      it('must convert an object to "json" with templateOpts', () => {
        const input = {
          a: 'a',
          bIndex: 1
        };
        const templateOpts = {
          b: [['b0'], ['bb0', 'bb1'], ['bbb0', 'bbb1', 'bbb2']],
        };
        const json = this.templateFunction(input, templateOpts);

        expect(json.a).toBe('a');
        expect(json.b[0].b).toBe('bb0');
        expect(json.b[1].b).toBe('bb1');
      });

      it('must handle an arrayed input', () => {
        const input = [{
          a: 'a',
          bIndex: 0
        }, {
          a: 'b',
          bIndex: 1
        }, {
          a: 'c',
          bIndex: 2
        }];
        const templateOpts = {
          b: [['b0'], ['bb0', 'bb1'], ['bbb0', 'bbb1', 'bbb2']],
        };
        const json = this.templateFunction(input, templateOpts);

        expect(json).toEqual([{
          a: 'a',
          b: [{ b: 'b0' }]
        }, {
          a: 'b',
          b: [{ b: 'bb0' }, { b: 'bb1' }]
        }, {
          a: 'c',
          b: [{ b: 'bbb0' }, { b: 'bbb1' }, { b: 'bbb2' }]
        }]);
      });
    });
  });

  describe('templateOpts via objects', () => {
    beforeEach(() => {
      this.templateFunction = jyson.buildTemplateFunction({
        a: 'a',
        id: 'id',
        b: '#b[id].b'
      });
    });

    it('must convert an object to "json" with templateOpts', () => {
      const input = {
        a: 'a',
        id: '679cd501-09bc-4acd-ae5a-1521352d49fa'
      };
      const templateOpts = {
        b: {
          '679cd501-09bc-4acd-ae5a-1521352d49fa': {
            b: 'b0'
          }
        }
      };
      const json = this.templateFunction(input, templateOpts);

      expect(json.a).toEqual('a');
      expect(json.id).toEqual('679cd501-09bc-4acd-ae5a-1521352d49fa');
      expect(json.b).toEqual('b0');
    });

    it('must handle an arrayed input', () => {
      const input = [{
        a: 'a',
        id: '2f14d15f-b468-4af9-964e-005d9b7c8296'
      }, {
        a: 'b',
        id: '81ee981c-d29d-4ec3-accd-4b0392f126c9'
      }, {
        a: 'c',
        id: '124ca089-a961-4307-8678-4ac7049b4b30'
      }];
      const templateOpts = {
        b: {
          '2f14d15f-b468-4af9-964e-005d9b7c8296': {
            b: 'b0'
          },
          '81ee981c-d29d-4ec3-accd-4b0392f126c9': {
            b: 'b1'
          },
          '124ca089-a961-4307-8678-4ac7049b4b30': {
            b: 'b2'
          }
        }
      };
      const json = this.templateFunction(input, templateOpts);

      expect(json).toEqual([{
        a: 'a',
        id: '2f14d15f-b468-4af9-964e-005d9b7c8296',
        b: 'b0'
      }, {
        a: 'b',
        id: '81ee981c-d29d-4ec3-accd-4b0392f126c9',
        b: 'b1'
      }, {
        a: 'c',
        id: '124ca089-a961-4307-8678-4ac7049b4b30',
        b: 'b2'
      }]);
    });
  });
});
