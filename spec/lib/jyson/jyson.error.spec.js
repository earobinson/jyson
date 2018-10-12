const chai = require('chai');

const expect = chai.expect;

const jyson = require('./../../../lib/jyson');

describe('jyson.error.spec: testing errors in jyson', () => {
  it('must error if the template cant be parsed', () => {
    const templateFunction = jyson.buildTemplateFunction({
      key: undefined
    });

    try {
      templateFunction({});
      return Promise.reject('an error should have been thrown');
    } catch(error) {
      expect(error.message).to.equal('jyson encountered an unknown template value: undefined');
    }
  });

  describe('arrays', () => {
    it('json template arrays must be of length 1', () => {
      const templateFunction = jyson.buildTemplateFunction({
        key: ['a', 'b']
      });

      try {
        templateFunction({});
        return Promise.reject('an error should have been thrown');
      } catch(error) {
        expect(error.message).to.equal('jyson template arrays must be of length one at key: key');
      }
    });

    describe('missing a $', () => {
      it('must error in the simple case', () => {
        const templateFunction = jyson.buildTemplateFunction({
          key: [{
            key2: undefined
          }]
        });

        try {
          templateFunction({});
          return Promise.reject('an error should have been thrown');
        } catch(error) {
          expect(error.message).to.equal('jyson encountered an invalid array at: key');
        }
      });

      it('must error in the simple case', () => {
        const templateFunction = jyson.buildTemplateFunction({
          fooKey: {
            barKey: [{
              key2: undefined
            }]
          }
        });

        try {
          templateFunction({});
          return Promise.reject('an error should have been thrown');
        } catch(error) {
          expect(error.message).to.equal('jyson encountered an invalid array at: barKey');
        }
      });

      it('must error with nested keys', () => {
        const templateFunction = jyson.buildTemplateFunction({
          foo: [{
            bar: {
              key: undefined
            }
          }]
        });

        try {
          templateFunction({});
          return Promise.reject('an error should have been thrown');
        } catch(error) {
          expect(error.message).to.equal('jyson encountered an invalid array at: foo');
        }
      });
    });
  });
});