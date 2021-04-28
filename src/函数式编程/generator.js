// 生成器generator函数

function* range(start, end){
    for (let i = start; i <= end; i++){
        yield i
    }
}

const num = range(1,  10)
console.log(num.next().value)
console.log(num.next().value)
console.log(num.next().value)

for (let n of range(10, 20)){
    console.log(n)
}


function* range2(fn, start, end){
    for (let i =start; i <= end; i++){
        yield fn(i) // 可以把yield看成return， 把返回结果处理后返回
    }
}

for (let n of range2(s => s * s, 1, 3)){
    console.log(n)
}

// 递归调用

function* allStudentsGenerator(){
    yield 'c'
    yield 'r'
    yield* classTwoGenerator()

    yield 'A'
}

function* classTwoGenerator(){
    yield 'D',
    yield 'S'
}


for (let s of allStudentsGenerator()){
    console.log(s)
}

