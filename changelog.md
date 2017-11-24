# jyson changelog

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
