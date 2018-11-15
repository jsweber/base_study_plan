export function map(arr, fn){
    let results = []
    for (let value of arr){
        results.push(value)
    }
    return results
}

export function filter(arr, fn){
    let results = []
    for (let value of arr){
        fn(value) && results.push(value)
    }
    return results
}

export function concatAll(arr){
    let results = []
    for(const v of arr){
        results.push.apply(results, v) //利用apply第二个参数可以传数组的特点，把外面多余的数组结构去掉
    }
    return results
}

export function reduce(arr, fn, init){
    let acc,
    if ( init === undefined){
        acc = arr[0]
        for (let i = 1; i < arr.length; i++){
            acc = fn(acc, arr[i])
        }
    }else {
        acc = init
        for (let v of arr){
            acc = fn(acc, v)
        }
    }
    return acc
}

//合并两个数组
export function zip(leftArr, rightArr, fn){
    let results = [], len = Math.min(leftArr.length, rightArr.length)
    for (let i = 0; i < len; i++){
        results.push(fn(leftArr[i], rightArr[i]))
    }
    return results
}
