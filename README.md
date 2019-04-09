# jyson

This package lets you generate fast json templates for your apis. It lets you quickly build powerful api templates.

[![NPM Version](https://img.shields.io/npm/v/jyson.svg)](https://www.npmjs.com/package/jyson)
[![Travis Build Status](https://img.shields.io/travis/earobinson/jyson.svg)](https://travis-ci.org/earobinson/jyson)
[![Coveralls](https://img.shields.io/coveralls/github/earobinson/jyson.svg)](https://coveralls.io/github/earobinson/jyson)
[![NPM Downloads](https://img.shields.io/npm/dm/jyson.svg)](https://www.npmjs.com/package/jyson)

## Install
```bash
npm install jyson --save
```

## Usage

jyson can create many different types of templates, for a full list of examples check out the [example tests](https://github.com/earobinson/jyson/blob/master/spec/lib/jyson/jyson.example.spec.js).

```js
const jyson = require('jyson');

const productTemplateFunction = jyson.buildTemplateFunction({
  name: 'name',
  tags: ['meta.tags.$'],
  other: {
    dogRating: 'meta.rating',
    exampleMissingValue: 'notFound',
    dateRan: ({ templateOpts }) => templateOpts.dateRan
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
};

const result = productTemplateFunction([input], {dateRan: 1496351371149});
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

## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions
for opening issues, coding standards, and notes on development.

***

Built with ❤️ at [Hubba](https://www.hubba.com?utm_campaign=hubba_oss). Maintained with 💖 by [earobinson](https://earobinson.net).
