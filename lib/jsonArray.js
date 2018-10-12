const assert = require('assert');

class JsonArray {
  constructor(options = {}) {
    assert.ok(!!options.value, 'JsonArray requires a value');
    this.options = options;
  }

  get length() {
    return 1;
  }

  static isAnArray(object) {
    return object instanceof this || Array.isArray(object);
  }

  static getValue(object) {
    if (object instanceof this) {
      return object.options.value;
    }

    return object[0];
  }

  static getEmptyArrayValue(object, defaultValue) {
    if (object instanceof this && object.options.hasOwnProperty('emptyArrayValue')) {
      return object.options.emptyArrayValue;
    }

    return defaultValue;
  }
}

module.exports = JsonArray;