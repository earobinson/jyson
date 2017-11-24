const assert = require('assert');

const cloneDeep = require('lodash.clonedeep');
const get = require('lodash.get');
const isFunction = require('lodash.isfunction');

const getKey = (object, key, undefinedValue, opts) => {
  let actualKey = key;

  opts.arrayIndexes.forEach(arrayIndex => {
    actualKey = actualKey.replace(/\.\$/, `.${arrayIndex}`);
  });

  return get(object, actualKey, undefinedValue);
};

const setValue = (json, key, value) => {
  if (typeof value === 'undefined') {
    return json;
  }

  return json[key] = value;
};

const getArrayValueLength = (object, json, arrayIndexes) => {

  if(typeof json === 'string'){
    let arrayLocation = json;

    arrayIndexes.forEach(arrayIndex => {
      arrayLocation = arrayLocation.replace(/\.\$/, `.${arrayIndex}`);
    });

    arrayLocation = arrayLocation.split('.$').shift();

    return get(object, arrayLocation, []).length;
  }

  if(typeof json === 'object'){
    return Object.keys(json).reduce((maxLength, key) => {
      return Math.max(maxLength, getArrayValueLength(object, json[key], arrayIndexes));
    }, -1);
  }

  return -1;
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
      assert.ok(json[key].length === 1, `jyson template arrays must be of length one at key: ${key}`);

      const arrayValueLength = getArrayValueLength(object, json[key][0], opts.arrayIndexes);
      const arrayIndexesIndex = opts.arrayIndexes.length;
      const arrayValue = [];

      if (arrayValueLength < 0) {
        throw `jyson encountered an invalid array at: ${key}`;
      }

      while(arrayValue.length < arrayValueLength) {
        opts.arrayIndexes[arrayIndexesIndex] = arrayValue.length;

        let result;
        if(typeof json[key][0] === 'string'){
          result = setValue(jsonResult, key, getKey(object, json[key][0], undefinedValue, opts));
        } else {
          result = fillKeys(json[key][0], object, undefinedValue, opts);
        }
        arrayValue.push(result);
      }

      opts.arrayIndexes.pop();
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

      return fillKeys(json, object, buildTemplateFunctionOpts.undefinedValue, Object.assign(opts, {arrayIndexes: []}));
    });

  };

  return templateFunction;
};