
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


### Methods:

```ts
class NeuPack {
  constructor ({input = null, id }): NeuPack
  keys: Array<string>
  data: object
  id: string
  length: number
  lastIndex: number
  nextIndex: number
  get: (...args?: string[]) => any
  post: (input: any) => NeuPack
  patch: (key: string, input: any) => NeuPack
  delete: (key: string) => NeuPack
  find: (searchParam: object) => any
  each: (callback:(element: any, index: number) => void) => Array<any>
  map: (callback:(element: any, index: number) => any) => Array<any>
  pack: (callback:(element: any, index: number) => any) => Promise<any[]>
  all: (callback:(element: any, index: number) => any) => Promise<any[]>
  allSettled: (callback:(element: any, index: number) => any) => Promise<any[]>
  any: (callback:(element: any, index: number) => any) => Promise<any[]>
  reduce: (callback:(element: any, index: number) => void, output: any) => any
  filter: (callback:(element: any, index: number) => any) => Array<any>
  range: (array:Array<any>, start: number, end: number) => Array<any>
  includes: (element: any) => boolean

  static each: (array:Array<any>, callback:(element: any, index: number) => void) => Array<any>
  static valuedMap: (array:Array<any>, callback:(element: any, index: number) => any) => Array<any>
  static map: (array:Array<any>, callback:(element: any, index: number) => any) => Array<any>
  static pack: (array:Array<any>, callback:(element: any, index: number) => any) => Promise<any[]>
  static all: (array:Array<any>, callback:(element: any, index: number) => any) => Promise<any[]>
  static allSettled: (array:Array<any>, callback:(element: any, index: number) => any) => Promise<any[]>
  static any: (array:Array<any>, callback:(element: any, index: number) => any) => Promise<any[]>
  static reduce: (array:Array<any>, callback:(element: any, index: number) => void, output: any) => any
  static toObject: (array:Array<any>, key: string) => object
  static filter: (array:Array<any>, callback:(element: any, index: number) => any) => Array<any>
  static range: (array:Array<any>, start: number, end: number) => Array<any>
  static includes: (array:Array<any>, element: any) => boolean
  static reverse: (array:Array<any>, callback?:(element: any, index: number) => any) => Array<any>
  static reverseBack: (array:Array<any>, callback:(element: any, index: number) => any) => Array<any>
}
```
