//重复字符串
function repeat(str, n){
    return new Array(n).fill(str).join('')
}

function repeat2(str, n){
    let o = {}
    o.length = n + 1 //+1是因为把str当作数组之间分割的符号
    return [].join.call(o, str)
}
//二分法
function repeat3(str, n){
    var total = ''
    while(n > 0){
        if (n % 2 === 1){
            total += str
        }
        if (n === 1){
            break
        }
        str += str
        n = n>>1
    }
    return total
}

function repeat4(str, n){
    let s = str, needLen = s.length * n
    do {
        s += s
    }while(n = n >> 1)
    return s.substr(0,  needLen)
}
//递归
function repeat5(str, n){
    if (n === 1){
        return str
    }
    var s = repeat5(str, Math.floor(n / 2))
    s += s
    if (n % 2){
        s += str
    }
    return s
}

//书上说效率最差的实现
function repeat6(str, n){
    return n <=0 ? '' :  str.concat(repeat6(str, --n))
}



