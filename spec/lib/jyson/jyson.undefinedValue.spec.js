const Q = require('q');
const _ = require('lodash');
const chai = require('chai');

const expect = chai.expect;

const jyson = require('./../../../lib/jyson');

describe('jyson.undefinedValue.spec: basic undefined', () => {
  beforeEach(() =>{
    this.templateFunction = jyson.buildTemplateFunction({
      a: 'a',
      b: {b: 'b'},
      c: function({object}) {
        return object.c;
      }
    }, {
      undefinedValue: undefined
    });
  });

  it('must handle missing basic values', () => {
    const input = {
      b: 2,
      c: 3
    };
    const json = this.templateFunction(input);
    const jsonKeys = _.keys(json);
    const jsonBKeys = _.keys(json.b);

    expect(json.a).be.undefined;
    expect(json.b.b).to.equal(input.b);
    expect(json.c).to.equal(input.c);

    expect(jsonKeys.length).to.equal(2);
    expect(jsonKeys).not.to.include('a');
    expect(jsonKeys).to.include('b');
    expect(jsonKeys).to.include('c');

    expect(jsonBKeys.length).to.equal(1);
    expect(jsonBKeys).to.include('b');
  });

  it('must handle missing nested values', () => {
    const input = {
      a: 1,
      c: 3
    };
    const json = this.templateFunction(input);
    const jsonKeys = _.keys(json);
    const jsonBKeys = _.keys(json.b);

    expect(json.a).to.equal(input.a);
    expect(json.b.b).to.be.undefined;
    expect(json.c).to.equal(input.c);

    expect(jsonKeys.length).to.equal(3);
    expect(jsonKeys).to.include('a');
    expect(jsonKeys).to.include('b');
    expect(jsonKeys).to.include('c');

    expect(jsonBKeys.length).to.equal(0);
    expect(jsonBKeys).not.to.include('b');
  });

  it('must handle missing function values', () => {
    const input = {
      a: 1,
      b: 2
    };
    const json = this.templateFunction(input);
    const jsonKeys = _.keys(json);
    const jsonBKeys = _.keys(json.b);

    expect(json.a).to.equal(input.a);
    expect(json.b.b).to.equal(input.b);
    expect(json.c).to.be.undefined;

    expect(jsonKeys.length).to.equal(2);
    expect(jsonKeys).to.include('a');
    expect(jsonKeys).to.include('b');
    expect(jsonKeys).not.to.include('c');

    expect(jsonBKeys.length).to.equal(1);
    expect(jsonBKeys).to.include('b');
  });
});

describe('jyson.undefinedValue.spec: string undefined', () => {
  beforeEach(() =>{
    this.templateFunction = jyson.buildTemplateFunction({
      a: 'a',
      b: {b: 'b'},
      c: function({object}) {
        return object.c;
      }
    }, {
      undefinedValue: 'MISSING'
    });
  });

  it('must handle missing basic values', () => {
    const input = {
      b: 2,
      c: 3
    };
    const json = this.templateFunction(input);

    expect(json.a).to.equal('MISSING');
    expect(json.b.b).to.equal(input.b);
    expect(json.c).to.equal(input.c);
  });

  it('must handle missing nested values', () => {
    const input = {
      a: 1,
      c: 3
    };
    const json = this.templateFunction(input);

    expect(json.a).to.equal(input.a);
    expect(json.b.b).to.equal('MISSING');
    expect(json.c).to.equal(input.c);
  });

  it('must handle missing function values', () => {
    const input = {
      a: 1,
      b: 2
    };
    const json = this.templateFunction(input);

    expect(json.a).to.equal(input.a);
    expect(json.b.b).to.equal(input.b);
    expect(json.c).to.equal('MISSING');
  });
});