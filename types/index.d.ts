
declare module 'neupack'

declare interface NeuPackOptions {
  id: string,
  input?: any,
  caseSensitive?: boolean
}

declare class NeuPack {
  constructor (options: NeuPackOptions)
  keys: Array<string>
  data: object
  id: string
  get length (): number
  get lastIndex (): number
  get nextIndex (): number
  get generator (): Generator
  /**
   * Can return range of data or one selected data point.
   */
  get: (...args: string[]) => any
  /**
   * Add a new item to the pack
   */
  push: (input: object) => NeuPack
  /**
   * Edits an item
   */
  edit: (key: string, input: any) => NeuPack
  /**
   * Delete an item
   */
  delete: (key: string) => NeuPack
  has: (key: string) => boolean
  /**
   * Can return range of data or one selected data point.
   */
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
  /**
   * Runs callback on each element while in reverse and reverses the array back on return.
   */
  static reverseBack: (array:Array<any>, callback:(element: any, index: number) => any) => Array<any>
}

export default NeuPack