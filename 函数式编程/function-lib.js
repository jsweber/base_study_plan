/**
 * 函数式编程练习用封装
 */

function forEach(arr, fn){
    for (let i = 0; i < arr.length; i++){
        fn(arr[i])
    }
}

function forEachObj(o, fn){
    for (let p in o){
        if (o.hasOwnProperty(p)){
            fn(p, o[p])
        }
    }
}

function unless(predicate, fn){
    if (!predicate){
        fn()
    }
}

function times(count, fn){
    for (let i = 0; i < count; i++){
        fn(i)
    }
}

function every(arr, fn){
    for (let i = 0; i < arr.length; i++){
        if (!fn(arr[i])){
            return false
        }
    }
    return true
}

function some(arr, fn){
    for (let i = 0; i < arr.length; i++){
        if (fn(arr[i])){
            return true
        }
    }
    return false
}

function sortBy(property){
    return function(a ,b){
        return a[property] < b[property] ?  -1 : (a[property] > b[property] ? 1 : 0)
    }
}

//让函数只接受一个参数
const unary = fn => fn.length === 1 ? fn : arg => fn(arg)

//只让函数执行一次
const once = function(fn){
    let done = false
    return function(){
        return done ? undefined : (done = true, fn.apply(this, arguments))
    }
}

//让函数带有记忆功能
function memoized(fn){
    let store = {}
    return function(param){
        return store[param] || (store[param]=fn(param))
    }
}

function curry(fn){
    if (typeof fn !== 'function'){
        throw 'param should function'
    }
    return function curried(...args){
        if (args.length < fn.length){
            return function(){
                return curried.apply(null, args.concat([].slice.call(arguments)))
            }
        }else {
            return fn.apply(null, args)
        }
    }
}

function partial(fn, ...args){

    return function(...fullArgs){
        let arg = 0
        for (let i = 0; i < args.length && arg < fullArgs.length; i++){
            if (args[i] === undefined){
                //把args中的占位undefined换成第二次传的参数
                args[i] = fullArgs[arg++]
            }
        }
        return fn.apply(null, args)
    }
}

//test
function testCurry(){
    //测试字符串数组中有没有数字
    let testArr = ['num1', 'hello']
    let hasNum = curry(function(p, s){
        if (p.test(s)){
            return true
        }
        return false
    })(/\d+/)

    let filterNumStr = curry(function(fn, arr){
        return arr.filter(fn)
    })(hasNum)

    console.log(filterNumStr(testArr))//['num1']

    t = partial(setTimeout, undefined, 1000)
    t(function(){console.log(1)})
}

