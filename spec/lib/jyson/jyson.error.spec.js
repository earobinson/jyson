const Q = require('q');
const assert = require('assert');
const chai = require('chai');

const expect = chai.expect;

const jyson = require('./../../../lib/jyson');

describe('jyson.error.spec: testing errors in jyson', () => {
  it('must convert an object to "json"', () => {
    const templateFunction = jyson.buildTemplateFunction({
      key: undefined
    });

    return Q.when()
    .then(() => {
      return templateFunction({});
    })
    .then(() => {
      return Q.reject('an error should have been thrown');
    })
    .catch(err => {
      expect(err).to.equal('jyson encountered an unknown template value: undefined');
    });
  });
});