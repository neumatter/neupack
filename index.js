
import is from '@neumatter/is'

export default class NeuPack {
  constructor ({
    input = null,
    id = null
  }) {
    if (!id) throw new Error('new NeuPack({ id }): id, is required.')
    this.keys = []
    this.data = {}
    this.id = id
    if (input) {
      if (is.array(input)) {
        const { length } = input
        let index = -1
        while (++index < length) {
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

  /**
   *
   * @param {Array} args
   * @returns
   */
  get (...args) {
    const argsLength = args.length
    if (!argsLength) return Object.values(this.data)
    if (argsLength === 1) {
      const key = args[0]
      return this.data[key] || null
    } else {
      const nodes = NeuPack.map(args, (key) => {
        return this.data[key] || null
      })
      return nodes
    }
  }

  post (input) {
    this.keys[this.nextIndex] = input[this.id]
    this.data[input[this.id]] = input
    return this
  }

  patch (key, input) {
    if (this.data[key]) {
      this.data[key] = { ...this.data[key], ...input }
    }
    return this
  }

  delete (key) {
    const { [key]: id, ...rest } = this.data
    this.data = rest
    let index = -1
    const keys = []
    while (++index < this.length) {
      if (this.keys[index] !== key) keys.push(this.keys[index])
    }
    this.keys = keys
    return this
  }

  async find (searchParam) {
    const response = []
    const keys = Object.keys(searchParam)
    await NeuPack.pack(keys, async (key) => {
      await this.pack(async el => {
        if (el[key] === searchParam[key]) {
          response.push(el)
        }
      })
    })
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

  includes (element) {
    let index = this.length
    while (index--) {
      const key = this.keys[index]
      const props = Object.keys(this.data[key])
      let id = props.length
      while (id--) {
        if (this.data[key][props[id]] === element) return true
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
      container = callback(container, this.data[key], key)
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

export class AsyncUtil {
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
    let index = -1

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
    let index = -1

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

  static find (array, callback, search) {
    const keys = Object.keys(search)
    const { length } = array
    const output = new Array(length)
    let index = -1
    let keysIndex = -1
    while (++keysIndex < length) {
      const key = keys[keysIndex]
      while (++index < length) {
        output[index] = callback(array[index], index)
      }
    }
    return Promise.any(output)
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
