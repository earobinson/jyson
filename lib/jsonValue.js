const assert = require('assert');

class JsonValue {
  constructor(options = {}) {
    assert.ok(!!options.path, 'JsonValue requires a path');
    this.options = options;
  }

  static isAPath(object) {
    return object instanceof this || typeof object === 'string';
  }

  static getPath(object) {
    if (object instanceof this) {
      return object.options.path;
    }

    return object;
  }

  static getUndefinedValue(object, defaultValue) {
    if (object instanceof this && object.options.hasOwnProperty('undefinedValue')) {
      return object.options.undefinedValue;
    }

    return defaultValue;
  }
}

module.exports = JsonValue;