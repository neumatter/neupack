
const is = require('@neumatter/is')
const toCamelCase = require('@neumatter/to-camel-case')

/**
 *
 * @type {import('./types/index').default}
 */
class NeuPack {
  #caseSensitive
  constructor ({
    id,
    input = null,
    caseSensitive = true
  }) {
    this.#caseSensitive = caseSensitive
    this.keys = []
    this.data = {}
    this.id = id
    if (input) {
      if (is.array(input)) {
        const { length } = input
        let index = -1
        while (++index < length) {
          if (!this.#caseSensitive) input[index][this.id] = toCamelCase(input[index][this.id])
          this.keys[index] = input[index][this.id]
          this.data[input[index][this.id]] = input[index]
        }
      } else if (is.object(input)) {
        this.keys.push(input[id])
        this.data[input[id]] = input
      }
    }
  }

  get length () {
    return this.keys.length
  }

  get lastIndex () {
    return this.length - 1
  }

  get nextIndex () {
    return this.length
  }

  values () {
    return Object.values(this.data)
  }

  get (...args) {
    const { length } = args
    if (!length) {
      return Object.values(this.data)
    }
    if (length === 1) {
      if (!this.#caseSensitive) args[0] = toCamelCase(args[0])
      return this.data[args[0]] || null
    }
    let index = length
    const items = []
    while (index--) {
      const key = !this.#caseSensitive
        ? toCamelCase(args[index])
        : args[index]
      if (this.data[key]) items.push(this.data[key])
    }
    return items
  }

  push (input) {
    if (!this.#caseSensitive) input[this.id] = toCamelCase(input[this.id])
    this.keys[this.nextIndex] = input[this.id]
    this.data[input[this.id]] = input
    return this
  }

  edit (key, input) {
    if (!this.#caseSensitive) key = toCamelCase(key)
    if (this.data[key]) {
      this.data[key] = { ...this.data[key], ...input }
    }
    return this
  }

  delete (key) {
    if (!this.#caseSensitive) key = toCamelCase(key)
    // seperate item from data
    const { [key]: id, ...rest } = this.data
    this.data = rest
    let index = this.length
    // remove key
    const keys = []
    while (index--) {
      if (this.keys[index] !== key) keys.push(this.keys[index])
    }
    this.keys = keys
    return this
  }

  has (key) {
    if (!this.#caseSensitive) key = toCamelCase(key)
    if (this.data[key]) return true
    return false
  }

  find (searchParam) {
    let index = this.length
    const response = []
    const searchKey = Object.keys(searchParam)[0]
    while (index--) {
      const key = this.keys[index]
      if (this.data[key][searchKey] === searchParam[searchKey]) {
        response.push(this.data[key])
      }
    }
    return response
  }

  each (callback) {
    let index = -1
    while (++index < this.length) {
      const key = this.keys[index]
      callback(this.data[key], key, index)
    }
    return this
  }

  some (callback) {
    let index = -1
    while (++index < this.length) {
      const key = this.keys[index]
      const result = callback(this.data[key], key, index)
      if (result) return result
    }
    return null
  }

  includes (searchParam) {
    let index = this.length
    const searchKey = Object.keys(searchParam)[0]
    while (index--) {
      const key = this.keys[index]
      if (this.data[key][searchKey] === searchParam[searchKey]) {
        return true
      }
    }
    return false
  }

  filter (callback) {
    const output = []
    let outputIndex = -1
    let index = -1
    while (++index < this.length) {
      const key = this.keys[index]
      if (callback(this.data[key], key, index)) {
        output[++outputIndex] = this.data[key]
      }
    }
    return output
  }

  range (start, end) {
    end += 1
    const length = end - start
    console.log(length)
    let index = start - 1
    let id = -1
    const output = []
    while (++index < end) {
      output[++id] = this.data[this.keys[index]]
    }
    return output
  }

  map (callback) {
    const output = new Array(this.length)
    let index = -1
    while (++index < this.length) {
      const key = this.keys[index]
      output[index] = callback(this.data[key], key, index)
    }
    return output
  }

  pack (callback) {
    const output = new Array(this.length)
    let index = -1
    while (++index < this.length) {
      const key = this.keys[index]
      output[index] = callback(this.data[key], key, index)
    }
    return Promise.all(output)
  }

  all (callback) {
    const output = new Array(this.length)
    let index = -1
    while (++index < this.length) {
      const key = this.keys[index]
      output[index] = callback(this.data[key], key, index)
    }
    return Promise.all(output)
  }

  allSettled (callback) {
    const output = new Array(this.length)
    let index = -1
    while (++index < this.length) {
      const key = this.keys[index]
      output[index] = callback(this.data[key], key, index)
    }
    return Promise.allSettled(output)
  }

  any (callback) {
    const output = new Array(this.length)
    let index = -1
    while (++index < this.length) {
      const key = this.keys[index]
      output[index] = callback(this.data[key], key, index)
    }
    return Promise.any(output)
  }

  reduce (callback, container) {
    let index = -1
    while (++index < this.length) {
      const key = this.keys[index]
      container = callback(container, this.data[key], key, index)
    }
    return container
  }

  /**
   *
   * @param {object} obj
   * @param {(value: any, index: any) => any} callback
   * @returns {object}
   */
  static objectMap (obj, callback) {
    const baseObj = Object(obj)
    const props = Object.keys(baseObj)
    const output = {}
    let index = props.length
    while (index--) {
      output[props[index]] = callback(obj[props[index]], props[index])
    }
    return output
  }

  static each (array, callback) {
    const { length } = array
    let index = -1
    while (++index < length) {
      callback(array[index], index)
    }
    return array
  }

  static includes (array, element) {
    let index = array.length
    while (index--) {
      if (array[index] === element) return true
    }
    return false
  }

  static reverseBack (array, callback) {
    const { length } = array
    const response = new Array(length)
    const output = new Array(length)
    let index = length
    while (index--) {
      response[index] = callback(array[index], index)
    }
    while (index--) {
      output[index] = response[index]
    }
    return output
  }

  static reverse (array, callback) {
    const { length } = array
    const output = new Array(length)
    let index = length
    if (callback) {
      while (index--) {
        output[index] = callback(array[index], index)
      }
    } else {
      while (index--) {
        output[index] = array[index]
      }
    }
    return output
  }

  static valuedMap (array, callback) {
    const { length } = array
    const output = []
    let index = -1
    let outputIndex = -1
    while (++index < length) {
      const result = callback(array[index], index)
      if (!is.falseType(result)) output[++outputIndex] = result
    }
    return output
  }

  static map (array, callback) {
    const { length } = array
    const output = new Array(length)
    let index = -1
    while (++index < length) {
      output[index] = callback(array[index], index)
    }
    return output
  }

  static pack (array, callback) {
    const { length } = array
    const output = new Array(length)
    let index = -1
    while (++index < length) {
      output[index] = callback(array[index], index)
    }
    return Promise.all(output)
  }

  static all (array, callback) {
    const { length } = array
    const output = new Array(length)
    let index = -1
    while (++index < length) {
      output[index] = callback(array[index], index)
    }
    return Promise.all(output)
  }

  static allSettled (array, callback) {
    const { length } = array
    const output = new Array(length)
    let index = -1
    while (++index < length) {
      output[index] = callback(array[index], index)
    }
    return Promise.allSettled(output)
  }

  static any (array, callback) {
    const { length } = array
    const output = new Array(length)
    let index = -1
    while (++index < length) {
      output[index] = callback(array[index], index)
    }
    return Promise.any(output)
  }

  static reduce (array, callback, output) {
    const length = array.length
    let index = -1
    while (++index < length) {
      output = callback(output, array[index], index)
    }
    return output
  }

  static toObject (array, key) {
    const output = {}
    const length = array.length
    let index = -1
    while (++index < length) {
      if (key) output[array[index][key]] = array[index]
      else output[index] = array[index]
    }
    return output
  }

  static filter (array, callback) {
    const { length } = array
    const output = []
    let outputIndex = -1
    let index = -1
    while (++index < length) {
      if (callback(array[index], index)) {
        output[++outputIndex] = array[index]
      }
    }
    return output
  }

  static range (array, start, end) {
    end += 1
    const length = end - start
    console.log(length)
    let index = start - 1
    let id = -1
    const output = []
    while (++index < end) {
      output[++id] = array[index]
    }
    return output
  }
}

class AsyncUtil {
  static all (array, callback) {
    const { length } = array
    const output = new Array(length)
    let index = -1
    while (++index < length) {
      output[index] = callback(array[index], index)
    }
    return Promise.all(output)
  }

  static allSettled (array, callback) {
    const { length } = array
    const output = new Array(length)
    let index = -1
    while (++index < length) {
      output[index] = callback(array[index], index)
    }
    return Promise.allSettled(output)
  }

  static any (array, callback) {
    const { length } = array
    const output = new Array(length)
    let index = -1
    while (++index < length) {
      output[index] = callback(array[index], index)
    }
    return Promise.any(output)
  }

  static async filter (array, callback) {
    const { length } = array
    const output = []
    let outputIndex = -1
    const index = -1

    async function next (index) {
      ++index
      if (index >= length) return output
      if (await callback(array[index], index)) {
        output[++outputIndex] = array[index]
      }
      return await next(index)
    }

    return await next(index)
  }

  static forEach (array, callback) {
    const { length } = array
    const index = -1

    async function next (index) {
      ++index
      if (index < length) {
        await callback(array[index], index)
        await next(index)
      } else {
        return array
      }
    }

    return next(index)
  }

  static includes (array, element) {
    return new Promise((resolve) => {
      let index = array.length
      while (index--) {
        if (array[index] === element) {
          return resolve(true)
        }
      }
      return resolve(false)
    })
  }
}

module.exports = NeuPack

module.exports.AsyncUtil = AsyncUtil
