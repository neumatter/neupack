import toCamelCase from '../index.js'

console.log(toCamelCase('hello-world'))
console.log(toCamelCase('hello_world'))
console.log(toCamelCase('hello world'))
console.log(toCamelCase('hello\nworld'))
console.log(toCamelCase(['hello\nworld1', 'hello world2', ['hello_world1', 'hello-world2']]))
console.log(toCamelCase({
  hello_world1: 'hi',
  'hello world2': 'hi',
  hello__world3: {
    hello_world4: 'hi',
    'hello world5': 'hi'
  }
}))
