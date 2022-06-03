
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
const pack = new NeuPack({
  input: items,
  id: 'id'
})

pack.includes('Name 1')
pack.filter(el => el.rel === '1574')
pack.edit('NM587', { rel: '2000' })
pack.delete('NM202')
pack.push({ id: 'NM456', name: 'NeuTest', rel: '2020' })

for (const el of pack) {
  // do something with el
}

const arr = await pack.all(async el => {
  // do something async with el
})

const arr = await pack.allSettled(async el => {
  // do something async with el
})

const arr = await pack.any(async el => {
  // do something async with el
})

const arr = pack.map(el => {
  // do something with el
})

const result = pack.some(el => {
  // do something with el
})

pack.each(el => {
  // do something with el
})

const packGenerator = pack.generator // get generator
packGenerator.next() // get next { value, done }
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

const packMap = NeuPack.map(items, (el, i) => {
  return el
})

const packValuedMap = NeuPack.valuedMap(items, (el, i) => {
  return el || null
})

/**
 * Awaits for each callback to finish.
 * Similar to [ await Promise.all(items.map(asyncFn)) ]
 */
const packPack = await NeuPack.pack(items, async (el, i) => {
  return el
})

const packToObject = NeuPack.toObject(items, 'id')

/**
 * Runs callback on each element while in reverse and reverses the array back on return.
 */
const packReverseBack = NeuPack.reverseBack(items, (el, i) => {
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

  get: (...args: string[]) => any
  push: (input: object) => NeuPack
  edit: (key: string, input: any) => NeuPack
  delete: (key: string) => NeuPack
  has: (key: string) => boolean
  find: (searchParam: object) => Array<object>
  values: () => Array<object>
  each: (callback:(value: any, key: string, index: number) => void) => NeuPack
  some: (callback:(value: any, key: string, index: number) => any) => any
  map: (callback:(value: any, key: string, index: number) => any) => Array<any>
  pack: (callback:(value: any, key: string, index: number) => Promise<any>) => Promise<any[]>
  all: (callback:(value: any, key: string, index: number) => Promise<any>) => Promise<any[]>
  allSettled: (callback:(value: any, key: string, index: number) => Promise<any>) => Promise<any[]>
  any: (callback:(value: any, key: string, index: number) => Promise<any>) => Promise<any[]>
  reduce: (callback:(container: any, value: any, key: string, index: number) => void, output: any) => any
  filter: (callback:(value: any, key: string, index: number) => any) => Array<any>
  range: (array:Array<any>, start: number, end: number) => Array<any>
  includes: (searchParam: object) => boolean

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
