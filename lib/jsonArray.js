const assert = require('assert');

class JsonArray {
  constructor(options = {}) {
    assert.ok(!!options.value, 'JsonArray requires a value');
    this.options = options;
  }

  static isAnArray(object) {
    return object instanceof this || typeof object === 'string';
  }

  static getValue(object) {
    if (object instanceof this) {
      return object.options.path;
    }

    return object;
  }

  static getEmptyArrayValue(object, defaultValue) {
    if (object instanceof this && object.options.hasOwnProperty('emptyArrayValue')) {
      return object.options.emptyArrayValue;
    }

    return defaultValue;
  }
}

module.exports = JsonArray;