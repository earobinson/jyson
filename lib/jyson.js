const assert = require('assert');

const cloneDeep = require('lodash.clonedeep');
const get = require('lodash.get');
const isFunction = require('lodash.isfunction');

const getArrayLength = (object, arrayKey) => {
  const arrayValue = get(object, arrayKey);

  if (!Array.isArray(arrayValue) ) {
    return -1;
  }

  return arrayValue.length;
};

const getKey = (object, key, undefinedValue, opts) => {
  if (key.indexOf('$')!== -1) {
    const arrayKey = key.split('.$').shift();

    assert(getArrayLength(object, arrayKey) > opts.arrayIndex['$'], 'We hit the end of the array');
  }
  return get(object, key.replace(/\.\$/, `.${opts.arrayIndex['$']}`), undefinedValue);
};

const setValue = (json, key, value) => {
  if (typeof value === 'undefined') {
    return json;
  }

  return json[key] = value;
};

const fillKeys = (json, object, undefinedValue, opts) => {
  const jsonResult = {};
  Object.keys(json).forEach(key => {
    // String Path
    if(typeof json[key] === 'string'){
      const value = getKey(object, json[key], undefinedValue, opts);

      // If we encounter an array without a $ in jyson, we consider that an error
      assert.ok(!Array.isArray(value) || json[key].indexOf('$') !== -1, `jyson encountered an array when it was not expecting one: ${json[key]}`);

      // otherwise return the value
      return setValue(jsonResult, key, value);
    }

    // Array
    if(Array.isArray(json[key])) {
      assert.ok(getArrayLength(json, key) === 1, `jyson template arrays must be of length one: ${json[key]}`);

      const arrayValue = [];
      let continueLoop = true;

      while(continueLoop === true) {
        opts.arrayIndex['$'] = arrayValue.length;
        try {
          let result;
          if(typeof json[key][0] === 'string'){
            result = setValue(jsonResult, key, getKey(object, json[key][0], undefinedValue, opts));
          } else {
            result = fillKeys(json[key][0], object, undefinedValue, opts);
          }
          arrayValue.push(result);
        } catch(err) {
          if (err.message !== 'We hit the end of the array') {
            throw(err);
          }
          continueLoop = false;
        }
      }
      return setValue(jsonResult, key, arrayValue);
    }

    if (isFunction(json[key])) {
      const functionResult = json[key]({object, key, opts});
      return setValue(jsonResult, key, typeof functionResult === 'undefined' ? undefinedValue : functionResult);
    }

    // Nested Object
    if(json[key] !== null && json[key] !== undefined && typeof json[key] === 'object') {
      return setValue(jsonResult, key, fillKeys(json[key], object, undefinedValue, opts));
    }

    // We should not be able to get here
    throw `jyson encountered an unknown template value: ${json[key]}`;
  });

  return jsonResult;
};

module.exports.buildTemplateFunction = (templateObject, buildTemplateFunctionOpts = {undefinedValue: null}) => {
  const templateFunction = (objects, opts = {}) => {

    if (!(objects instanceof Array)) {
      return templateFunction([objects], opts)[0];
    }

    return objects.map(object => {
      const json = cloneDeep(templateObject);

      return fillKeys(json, object, buildTemplateFunctionOpts.undefinedValue, Object.assign(opts, {arrayIndex: {'$': 0}}));
    });

  };

  return templateFunction;
};