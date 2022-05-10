
# NeuPack

Module for alternative array methods and for mapping data as an array.
It makes it easier to iterate through objects. And fast and productive static array methods.

<br />

# Table of Contents
1. [ Install ](#install) <br />
2. [ Usage ](#examples) <br />

<br />

<a name="install"></a>
## Install

```console
npm i neupack 
```

<br />

<a name="examples"></a>
## Usage


### Default:

```js
// CJS require
const NeuPack = require('neupack')
// ESM import
import NeuPack from 'neupack'

const items = [
  { id: 'ID3', name: 'Name 1', rel: '1574' },
  { id: 'ID2', name: 'Name 2', rel: '1574' }
]
const elements = new NeuPack({
  input: items,
  id: 'id'
})

/** 
 *
 * @param {string}
 * @returns {boolean} true
*/
elements.includes('Name 1')
/** 
 *
 * @param {callback}
 * @returns {Array<any>} filtered array
*/
elements.filter(el => el.rel === '1574')
/** 
 *
 * @param {string}
 * @param {object}
 * @returns {NeuPack} edits the selected item
*/
elements.patch('NM587', { rel: '2000' })
/** 
 *
 * @param {string}
 * @returns {NeuPack} deletes the selected item
*/
elements.delete('NM202')
/** 
 *
 * @param {object}
 * @returns {NeuPack} adds a new item to pack
*/
elements.post({ id: 'NM456', name: 'NeuTest', rel: '2020' })
```


### Static:

```js
// CJS require
const NeuPack = require('neupack')
// ESM import
import NeuPack from 'neupack'

const items = [
  { id: 'ID3', name: 'Name 1', rel: '1574' },
  { id: 'ID2', name: 'Name 2', rel: '1574' }
]

NeuPack.each(items, (el, i) => {
  console.log(el)
})

const elementsMap = NeuPack.map(items, (el, i) => {
  return el
})

const elementsValuedMap = NeuPack.valuedMap(items, (el, i) => {
  return el || null
})

/**
 * Awaits for each callback to finish.
 * Similar to [ await Promise.all(items.map(asyncFn)) ]
 */
const elementsPack = await NeuPack.pack(items, async (el, i) => {
  return el
})

const elementsToObject = NeuPack.toObject(items, 'id')

/**
 * Runs callback on each element while in reverse and reverses the array back on return.
 */
const elementsReverseBack = NeuPack.reverseBack(items, (el, i) => {
  return el
})
```
