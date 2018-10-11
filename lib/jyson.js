const assert = require('assert');
const cloneDeep = require('lodash.clonedeep');
const get = require('lodash.get');
const isFunction = require('lodash.isfunction');

const JysonValue = require('./jsonValue');

const getKeyFromArrayIndexes = (key, arrayIndexes) => {
  let keyFromArrayIndexes = key;

  arrayIndexes.forEach((arrayIndex) => {
    keyFromArrayIndexes = keyFromArrayIndexes.replace(/\.\$/, `.${arrayIndex}`);
  });

  return keyFromArrayIndexes;
};

const getKey = (object, key, undefinedValue, arrayIndexes) => {
  return get(object, getKeyFromArrayIndexes(key, arrayIndexes), undefinedValue);
};

const setValue = (json, key, value) => {
  if (typeof value === 'undefined') {
    return json;
  }

  return json[key] = value;
};

const getArrayValueLength = (object, json, arrayIndexes) => {
  if(typeof json === 'string') {
    const arrayLocation = getKeyFromArrayIndexes(json, arrayIndexes).split('.$').shift();

    return get(object, `${arrayLocation}.length`, 0);
  }

  if(typeof json === 'object') {
    return Object.keys(json).reduce((maxLength, key) => {
      return Math.max(maxLength, getArrayValueLength(object, json[key], arrayIndexes));
    }, -1);
  }

  return -1;
};

const getKeyAndSetValue = (jsonResult, key, path, object, templateOpts, opts) => {
  const value = getKey(object, path, opts.undefinedValue, opts.arrayIndexes);

  // If we encounter an array without a $ in jyson, we consider that an error
  assert.ok(!Array.isArray(value) || path.indexOf('$') !== -1, `jyson encountered an array when it was not expecting one: ${path}`);

  // otherwise return the value
  return setValue(jsonResult, key, value);
};

const fillKeys = (json, object, templateOpts, opts) => {
  const jsonResult = {};
  Object.keys(json).forEach((key) => {
    // JysonValue
    if(json[key] instanceof JysonValue) {
      assert.ok(!!json[key].options.path, `jyson encountered a Value that was missing a path: ${key}`);

      const jysonValueUndefinedValue = Object.keys(json[key].options).includes('undefinedValue') ? json[key].options.undefinedValue : opts.undefinedValue;
      const jsonValueOpts = Object.assign({}, opts, { undefinedValue: jysonValueUndefinedValue });
      return getKeyAndSetValue(jsonResult, key, json[key].options.path, object, templateOpts, jsonValueOpts);
    }

    // String Path
    if(typeof json[key] === 'string') {
      assert(opts);
      return getKeyAndSetValue(jsonResult, key, json[key], object, templateOpts, opts);
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
        if(typeof json[key][0] === 'string') {
          result = setValue(jsonResult, key, getKey(object, json[key][0], opts.undefinedValue, opts.arrayIndexes));
        } else {
          result = fillKeys(json[key][0], object, templateOpts, opts);
        }
        arrayValue.push(result);
      }

      opts.arrayIndexes.pop();
      return setValue(jsonResult, key, arrayValue);
    }

    if (isFunction(json[key])) {
      const functionResult = json[key]({ object, key, templateOpts, opts });
      return setValue(jsonResult, key, typeof functionResult === 'undefined' ? opts.undefinedValue : functionResult);
    }

    // Nested Object
    if(json[key] !== null && json[key] !== undefined && typeof json[key] === 'object') {
      return setValue(jsonResult, key, fillKeys(json[key], object, templateOpts, opts));
    }

    // We should not be able to get here
    throw `jyson encountered an unknown template value: ${json[key]}`;
  });

  return jsonResult;
};

const buildTemplateFunction = (templateObject, buildTemplateFunctionOpts = {}) => {
  const opts = Object.assign({ undefinedValue: null, emptyArrayValue: [] }, buildTemplateFunctionOpts, { arrayIndexes: [] });
  const templateFunction = (objects, templateOpts = {}) => {

    if (!(objects instanceof Array)) {
      return templateFunction([objects], templateOpts)[0];
    }

    return objects.map((object) => {
      const json = cloneDeep(templateObject);

      return fillKeys(json, object, templateOpts, opts);
    });

  };

  return templateFunction;
};

module.exports = {
  buildTemplateFunction,
  Value: JysonValue
};