# jyson

This package lets you generate fast json templates for your apis. It lets you quickly build powerful api templates.

[![Build Status](https://api.travis-ci.org/hubba/jyson.svg?branch=master)](https://travis-ci.org/hubba/jyson)
[![Coveralls](https://img.shields.io/coveralls/github/hubba/jyson.svg)](https://coveralls.io/github/hubba/jyson)
[![npm version](https://badge.fury.io/js/jyson.svg)](https://badge.fury.io/js/jyson)
[![Dependency Status](https://gemnasium.com/badges/github.com/hubba/jyson.svg)](https://gemnasium.com/github.com/hubba/jyson)


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
