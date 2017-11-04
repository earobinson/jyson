# jyson

This package lets you generate fast json templates for your apis. It lets you quickly build powerful api templates.

[![NPM Version](https://img.shields.io/npm/v/jyson.svg)](https://www.npmjs.com/package/jyson)
[![Travis Build Status](https://img.shields.io/travis/hubba/jyson.svg)](https://travis-ci.org/hubba/jyson)
[![Gemnasium Dependency Status](https://img.shields.io/gemnasium/hubba/jyson.svg)](https://gemnasium.com/github.com/hubba/jyson)
[![NPM Downloads](https://img.shields.io/npm/dw/localeval.svg)](https://www.npmjs.com/package/jyson)

## Install
```bash
npm install jyson --save
```

## Usage

jyson can create many different types of templates, for a full list of examples check out the [example tests](https://github.com/hubba/jyson/blob/master/spec/lib/jyson/jyson.example.spec.js).

```js
const jyson = require('jyson');

productTemplateFunction = jyson.buildTemplateFunction({
  name: 'name',
  tags: ['meta.tags.$'],
  other: {
    dogRating: 'meta.rating',
    exampleMissingValue: 'notFound',
    dateRan: ({opts}) => opts.dateRan
  }
});

const input = {
  name: 'Bacon Peanut Butter “Ice Cream” for Dogs',
  meta: {
    rating: 10,
    tags: [
      'lactobacillus bulgaricus',
      'enterocococcus thermophilus',
      'lactobacillus acidophilus',
      'bifidobacterium bifidum',
      'lactobacillus casei'
    ],
  }

productTemplateFunction([input], {dateRan: 1496351371149});
// => [{
//  name: 'Bacon Peanut Butter “Ice Cream” for Dogs',
//  tags:[
//    'lactobacillus bulgaricus',
//    'enterocococcus thermophilus',
//    'lactobacillus acidophilus',
//    'bifidobacterium bifidum',
//    'lactobacillus casei'
//  ],
//  other: {
//    dogRating: 10,
//    exampleMissingValue: null,
//    dateRan: 1496351371149
//  }
//}]
```

## Goals
 - Easy to install
 - Easy to understand
 - Make jyson part of the common lexicon

***

Built with ❤️ at [Hubba](https://www.hubba.com?utm_campaign=hubba_oss).
