# jyson changelog

## v3.1.2
- Updated Jyson Packages, the following got updated:
  - mocha
  - coveralls

## v3.1.1
- Patched security issues in the following packages
  - randomatic https://nodesecurity.io/advisories/157
  - stringstream https://nodesecurity.io/advisories/664
- Removed Q as a dependency

## v3.1.0
- Adds undefinedValue value on a case by case basis
  - The following is now valid jyson
```
jyson.buildTemplateFunction({
  'a': new jyson.Value({ path: 'a', undefinedValue: 'qwerty' }),
  'b': new jyson.Value({ path: 'b', undefinedValue: null }),
  'c': new jyson.Value({ path: 'c', undefinedValue: undefined }),
  'd': new jyson.Value({ path: 'd' })
});
```
- Closes [Issue #10](https://github.com/hubba/jyson/issues/10)

## v3.0.1
- Bug fixes

## v3.0.0
- Adds nested array support to jyson
  - The following is now valid jyson
```
jyson.buildTemplateFunction({
  e: [{
    f: [{
      g: [{
        h: 'a.$.b.$.c.$.d'
      }]
    }]
  }]
});
```
- Closes [Issue #22](https://github.com/hubba/jyson/issues/22)

## v2.0.0
- Jyson no longer throws an error to handle arrays it reads ahead to determine array length
- A Jyson template can now access two different arrays
- Closes [Issue #15](https://github.com/hubba/jyson/issues/15)

## v1.3.0
- Made jyson less dependent on lodash
- Closes [Issue #13](https://github.com/hubba/jyson/issues/13)

## v1.2.1
- Fixed a bug when if an array was not provide when it was in the template jyson would crash

## v1.2.0
- jyson now supports an array of objects Issue [Issue #9](https://github.com/hubba/jyson/issues/9)
