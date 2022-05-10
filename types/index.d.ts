
declare module 'neupack'

declare class NeuPack {
  constructor ({input = null, id }): NeuPack
  keys: Array<string>
  data: object
  id: string
  get length (): number
  get lastIndex (): number
  get nextIndex (): number
  /**
   * Can return all data, range of data, or one selected data point.
   */
  get: (...args?: string[]) => any
  /**
   * Add a new item to the pack
   */
  post: (input: any) => NeuPack
  /**
   * Edits an item
   */
  patch: (key: string, input: any) => NeuPack
  /**
   * Delete an item
   */
  delete: (key: string) => NeuPack
  each: (callback:(element: any, index: number) => void) => Array<any>
  map: (callback:(element: any, index: number) => any) => Array<any>
  pack: (callback:(element: any, index: number) => any) => Promise<any[]>
  reduce: (callback:(element: any, index: number) => void, output: any) => any
  filter: (callback:(element: any, index: number) => any) => Array<any>
  range: (array:Array<any>, start: number, end: number) => Array<any>
  includes: (element: any) => boolean

  static each: (array:Array<any>, callback:(element: any, index: number) => void) => Array<any>
  /**
   * Only returns elements that are not a false or empty type.
   */
  static valuedMap: (array:Array<any>, callback:(element: any, index: number) => any) => Array<any>
  static map: (array:Array<any>, callback:(element: any, index: number) => any) => Array<any>
  static pack: (array:Array<any>, callback:(element: any, index: number) => any) => Promise<any[]>
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

export = NeuPack