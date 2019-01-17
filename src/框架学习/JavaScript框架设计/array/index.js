//数组相关函数拓展
function reduce(arr, fn, lastResult, scope){
    var hasInitVal = lastResult !== undefined,
    startIndex = hasInitVal ? 0 : 1,
    initVal = hasInitVal ? lastResult : arr[0]

    for (; startIndex < arr.length; startIndex++){
        initVal = fn.call(scope || null, initVal, arr[startIndex])
    }

    return initVal
}

function reduceRight(arr, fn, lastResult, scope){
    var t = arr.concat().reverse()
    return reduce(t, fn, lastResult, scope)
}

function contains(target, item){
    return target.indexOf(item) > -1
}

function removeAt(target, idx){
    return typeof idx === 'number' && idx > -1 ? target.splice(idx, 1) : null
}

function remove(target, item){
    var idx = target.indexOf(item)
    return removeAt(target, idx)
}
//对数组进行洗牌
function shuffle(target){
    var copy = target.concat()
    for (var i= copy.length, j, temp;
        i > 0;
        j = parseInt(Math.random() * i), temp=copy[--i], copy[i] = copy[j], copy[j] = temp
    ){}
    return copy
}

function random(target){
    return target[Math.floor(Math.random() * target.length)]
}

function flatten(target){
    var result = []
    target.forEach(c => {
        if (Array.isArray(c)){
            result = result.concat(flatten(c))
        }else{
            result.push(c)
        }
    })
    return result
}

function unique(target){
    var filterObj = {}, key = ''
    return target.filter( c => {
        key = isPrimary(c) ? '' + c : getObjKey(c)
        if (!filterObj[key]){
            filterObj[key] = 1
            return true
        }
        return false
    } )
}
//比较重要的函数，百度考过
function getObjKey(o){
    var ret = ''
    if (typeof o === 'function' || Array.isArray(o)){
        ret = '' + o //"function aab(){}"  ,  '1,2,3,4'
    }else {
        try{
            ret = JSON.stringify(o)
        }catch(e){
            return false
        }
    }
    return ret
}

function isPrimary(n){
    return typeof n === 'number' || typeof n === 'boolean' || !n || typeof n === 'string'
}

function compact(target){
    return target.filter(c => c!=null) //注意，这里是不全等
}

//取得对象数组的每一个元素指定属性，组成数组返回
function pluck(target, name){
    return compact(target.map(c => c[name] ))
}

function groupBy(target, val){
    var result = {},
    iterator = typeof val === 'function' ? val :  function(obj){ return obj[val] }
    target.forEach((value, index) => {
        var key = iterator(value, index)
        if (!result[key]){
            result[key] = []
        }
        result[key].push(value) 
    })
    return result
}
/** 
 * sortBy([{name: 'Lee', age: 40}, {name: 'du', age: 30}, {name: 'kk', age: 20}], function(o, i){ return o.age })
*/
function sortBy(target, fn, scope){
    //先对数组进行规范化
    var arr = target.map(function(item, index){
        return {
            el: item,
            re: fn.call((scope || null), item, index)
        }
    })

    return arr.sort(function(a, b){
        var ret = a.re - b.re
        return ret > 0 ? 1 : ( ret === 0 ? 0 : -1 )
    })
}
//两个数组取并集
function union(target, arr){
    return unique(target.concat(arr))
}

