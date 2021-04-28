// 尾递归优化

/**
 * 不断的递归会不断生成函数的上下文帧，会加大函数堆栈对内存的占用
 * 得益于js编译器的优化，通过尾递归优化可以让外层函数执行完成后出栈，返回的函数进栈，这样就可以在递归过程中减少上下文堆栈对内存的占用
 * 
 * 尾递归优化的效率无限接近for循环
 * 
 * 尾递归优化的实现思路：
 * 1.最后一步一定是递归，类式 n * factotorial(n - 1)不是尾递归 （如果熟练不是尾递归优化）
 * 
 * 2. 确认基例，中间态和结果，将当前函数的执行结果作为参数传入递归函数（具体实现见下面案例）
 * 
 * 3. 使用es6的默认参数给一个默认值
 */

// 阶乘案例

// 非尾递归

const factorial = n => n === 1 ?  n :  n *  factorial(n - 1)

console.log(factorial(3))
// 尾递归优化版
const factorialTco = (n, current = 1) => {
    // n === 1为基例
    if (n === 1) return current
    // n - 1为中间态， n * current为结果
    return factorialTco(n - 1, n * current)
}

console.log(factorialTco(15))

// 对比for循环
const factorialFor = n => {
    let result = 1
    // 循环中的 i = n 为基例， i--为中间态，result *= i为结果
    for (let i = n; i > 0; i--){
        result *= i
    }
    return result
}

console.log(factorialFor(5))


// 另一个案例: 递归计算数组的总和，自己试着实现下

const first = arr => arr[0]
const rest = arr => arr.slice(1)

// 普通递归
const sum = arr => arr.length === 0 ? 0 : first(arr) + sum(rest(arr))
// 尾递归优化
const sumTco = (arr , current = 0 ) => {
    if (arr.length === 0) return current

    return sumTco(rest(arr), first(arr) +  current)
}

console.log('普通递归: ' + sum([1,2,3,4,5,6]) )
console.log('尾递归: ' + sumTco([1,2,3,4,5,6]) )
                    