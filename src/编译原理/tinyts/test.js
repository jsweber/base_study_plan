const PeekIterator = require('../tinyts/utils/peekIterator')
const arrayToGenerator = require('../tinyts/utils/arrayToGenerator')

const stream = 'abcdf'
const p = new PeekIterator(arrayToGenerator(stream))
console.log(p.next());
console.log(p.next());
console.log(p.peek());
console.log(p.next());
console.log(p.peek());
console.log(p.peek());
console.log(p.peek());
console.log(p.next());
console.log(p.next());
console.log(p.next());
console.log(p.next());
console.log(p.next());
