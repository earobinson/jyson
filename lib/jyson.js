const assert = require('assert');
const _ = require('lodash');

const getKey = (object, key) => {
  const arraySplitKeys = key.split('.$');
  const value = _.get(object, arraySplitKeys.shift(), null);

  // We have found our key
  if (arraySplitKeys.length === 0) {
    return value;
  }

  // else we have an array
  return _.map(value, (element, index) => {
    return getKey(value, `${index}${_.join(arraySplitKeys, '')}`);
  });
};

const fillKeys = (json, object, opts) => {
  const jsonKeys = Object.keys(json);

  _.each(jsonKeys, key => {
    // String Path
    if(_.isString(json[key])){
      const value = getKey(object, json[key], null);

      // If its an array we need to iterate through the array
      assert.ok(!_.isArray(value), `jyson encountered an array when it was not expecting one: ${json[key]}`);

      // otherwise return the value
      return json[key] = value;
    }

    // Array
    if(_.isArray(json[key])) {
      assert.ok(json[key].length === 1, `jyson template arrays must be of length one: ${json[key]}`);

      return json[key] = getKey(object, json[key][0], null);
    }

    if (_.isFunction(json[key])) {
      return json[key] = json[key]({object, key, opts});
    }

    // Nested Object
    if(_.isObject(json[key])) {
      return json[key] = fillKeys(json[key], object, opts);
    }

    // We should not be able to get here
    throw `jyson encountered an unknown template value: ${json[key]}`;
  });

  return json;
};

module.exports.buildTemplateFunction = (templateObject) => {
  const templateFunction = (objects, opts = {}) => {

    if (!(objects instanceof Array)) {
      return templateFunction([objects], opts)[0];
    }

    return objects.map(object => {
      const json = _.cloneDeep(templateObject);

      fillKeys(json, object, opts);

      return json;
    });

  };

  return templateFunction;
};