# jyson

This package lets you generate fast json templates for your apis. It lets you quickly build powerful api templates.

## Usage
```bash
npm install @hubba/jyson --save
```

## Usage

jyson can create many different types of templates, for a full list of examples check out the [tests](https://github.com/hubba/jyson/blob/master/lib/jyson.spec.js).

```js
const jyson = require('@hubba/jyson');

productTemplateFunction = jyson.buildTemplateFunction({
  name: 'name',
  tags: ['meta.tags.$'],
  other: {
    dogRating: 'meta.rating',
    exampleMissingValue: 'notFound'
  },
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
    ]
  }

productTemplateFunction([input]);
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
//    exampleMissingValue: null
//  }
//}]
```

***

Built with ❤️ at [Hubba](www.hubba.com).
