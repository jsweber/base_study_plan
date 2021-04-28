// 迭代器
// 生成器和迭代器在es6中紧密相连

function range(start, end){
    return {
        [Symbol.iterator](){
            return this // 代表返回的对象实现了迭代器协议
        },
        next(){
            if (start <= end){
                return {
                    done: false,
                    value: start++
                }
            }

            return {
                done: true,
                value: end
            }
        }
    }
}

for (let i of range(1,3)){
    console.log(i)
}

for(let s of 'hello'){
    console.log(s)
}

for (let c of ['s', 's2']){
    console.log(c)
}

