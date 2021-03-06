import { reduce } from "./array-function";

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
            //参数还没有传够，所有返回一个匿名函数
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
//compose返回的函数只接受一个参数，所以传入的函数需要经过curry/partial处理下
function compose(...fns){
    return function(value){
        return reduce(fns.reverse(), (acc, fn) => fn(acc), value)
    }
}

function pipe(...fns){
    return function(value){
        return reduce(fns, (acc, fn)=> fn(acc), value)
    }
}

function identity(v){
    console.log(v)
    return v
}

//函子是带有值的容器
//带有chain的Pointed函子也叫Monad函子
var Container = function(value){
    this.value = value
}

Container.of = function(value){
     //of 接口只是为了方便返回container ， 拥有of的函子也叫做pointed函子
    return new Container(value)
}
//函子的map会遍历函子（即js中的对象）的每一个属性
Container.prototype.map = function(fn){
    return Container.of(fn(this.value))
}
//函子的具体应用
var Maybe = function(value){
    this.value = value
}

Maybe.of = function(value){
    return new Maybe(value)
}

Maybe.prototype.nothing = function(){
    return this.value === null || this.value === undefined
}

Maybe.prototype.map = function(fn){
    return this.nothing() ? Maybe.of(null) : Maybe.of(fn(this.value))
}

Maybe.prototype.join = function(){
    return this.nothing() ? Maybe.of(null) : this.value
}

Maybe.prototype.chain = function(fn){
    return this.map(fn).join()
}

//应用，错误处理，即使参入null和undefined也能正常运行
Maybe.of('may').map(toUpperCase).map((v) => 'Mrs '+ v)

//另一个应用
var Nothing = function(v){
    this.value = v
}

Nothing.of = function(value){
    return new Nothing(value)
}

Nothing.prototype.map = function(f){
    return this//为了保留错误信息，这样就不会像Maybe一样只是返回null
}

var Some = function(v){
    this.value = v
}

Some.of = function(v){
    return new Some(v)
}

Some.prototype.map = function(fn){
    return Some.of(fn(this.value))
}

var Either = {
    some: Some,
    nothing: Nothing
}

let reqTest = function(type){
    let resp = {}
    try{
        resp = Some.of(Api.fetch(type).body)//成功的话return {code: 200, msg: 'ok'}
    }catch(e){
        resp = Nothing.of({code: 500, msg: 'request error'})
    }
    return resp
}

reqTest('unknown').map(x => x.msg)



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

//练习
function memorize2(fn){
    let store = {}
    return function(...param){
        return store[param.toString()] || (store[param.toString()] = fn.apply(this, param))
    }
}

function once2(fn){
    let hasDone = false
    return function(){
        return hasDone ? undefined : (hasDone = true, fn.apply(this, arguments))
    }
}

function curry2(fn){
    if (typeof fn != 'function'){throw 'param should be func'}
    return function c(...param1){
        if (fn.length > param1.length){
            return function(...param2){
                let args = param1.concat(param2)
                return c.apply(this, args)
            }
        }else {
            return fn.apply(this, ...param1)
        }
    }
}


function partial2(fn, ...param1){
    if (typeof fn != 'function'){throw 'param should be func'}

    return function(...param2){
        let idx = 0
        for (let i = 0; i < param1.length && idx < param2.length; i++){
            if (param1[i] == undefined){
                param1[i] = param2[idx++]
            }
        }
        return fn.apply(this, param1)
    }
}

