const assert = require('assert');
const _ = require('lodash');

const getKey = (object, key, undefinedValue) => {
  const arraySplitKeys = key.split('.$');
  const value = _.get(object, arraySplitKeys.shift(), undefinedValue);

  // We have found our key
  if (arraySplitKeys.length === 0) {
    return value;
  }

  // else we have an array
  return _.map(value, (element, index) => {
    return getKey(value, `${index}${_.join(arraySplitKeys, '')}`);
  });
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
    if(_.isString(json[key])){
      const value = getKey(object, json[key], undefinedValue);

      // If its an array we need to iterate through the array
      assert.ok(!_.isArray(value), `jyson encountered an array when it was not expecting one: ${json[key]}`);

      // otherwise return the value
      return setValue(jsonResult, key, value);
    }

    // Array
    if(_.isArray(json[key])) {
      assert.ok(json[key].length === 1, `jyson template arrays must be of length one: ${json[key]}`);

      return setValue(jsonResult, key, getKey(object, json[key][0], undefinedValue));
    }

    if (_.isFunction(json[key])) {
      const functionResult = json[key]({object, key, opts});
      return setValue(jsonResult, key, typeof functionResult === 'undefined' ? undefinedValue : functionResult);
    }

    // Nested Object
    if(_.isObject(json[key])) {
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
      const json = _.cloneDeep(templateObject);

      return fillKeys(json, object, buildTemplateFunctionOpts.undefinedValue, opts);
    });

  };

  return templateFunction;
};