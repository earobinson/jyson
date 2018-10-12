const chai = require('chai');

const expect = chai.expect;

const jyson = require('./../../../lib/jyson');

describe('jysonValue.spec', () => {
  describe('errors', () => {
    it('must error out if not path is provided', () => {
      try {
        new jyson.Value();
        return Promise.reject('an error should have been thrown');
      } catch(error) {
        expect(error.message).to.equal('JsonValue requires a path');
      }
    });
  });
});