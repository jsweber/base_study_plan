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




