const buf = Buffer.from("hello")

console.log(buf)

// console.log(Buffer.from(buf,  3,10))

const buf2 = Buffer.alloc(1024)
// console.log(buf2)
// buffer 长度
console.log(buf.length)

for (const item of buf) {
    console.log(item)
}

// 先创建一个空字节数组，然后写入
const buf3 = Buffer.alloc(10)

buf3.write('Hey')

console.log(buf3)
console.log(buf3.toString() + '|')

// copy参数为目标字节数组，调用函数的buffer对象为源数据
const copyBuf = Buffer.alloc(10)
buf.copy(copyBuf, 1, 3, 10)
console.log(copyBuf.toString())

// slice产生的切片不是副本，真正的buffer来源还是原始字节数组
console.log(buf.slice(0, 2))
