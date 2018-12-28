/**
 * 重复字符串
 * @param {*} str 
 * @param {*} n 
 */
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

/**
 * 获取字符串字节数
 * 汉字的Unicode编码大于255，英文数字等一个字节就可以了，一般两个字节代表一个汉字，所意当有个汉字时，字符串长度+1
 * 
 */

 function byteLen(str){
     var len = str.length
     for(var i = 0; i < str.length; i++){
         if (str[i].charCodeAt() > 255){
             len ++
         }
     }
     return len
 }

 //mysql需要3个字节表示一个汉字，所以我们用另一种方法实现，并且支持传入用多少个字节表示汉字
 function byteLen2(str, fix){
     fix = fix ? fix : 2
     let placeholder = new Array(fix + 1).join('-')
     str = str.replace(/[^\x00-\xff]/g, placeholder)
     return str.length
 }

 //腾讯的方法
 function byteLen3(str, charset){
     var total = 0,
     i = 0,
     c = 0
     charset = charset ? charset.toLowerCase() : ''
    console.log(charset)
     if (charset === 'utf-16' || charset === 'utf16'){
         for (; i < str.length; i++){
             c = str.charAt(i).charCodeAt() 
            
             if (c <= 0x00FFFF){
                console.log(len)
                total+= 2
             }else {
                total += 4
             }
         }
     }else {
        for (; i < str.length; i++){
            c = str.charAt(i).charCodeAt()
            if (c <= 0x007F){// 0x00007F前面加几个0都一样
                total++
            }else if (c <= 0x07FF){
                total += 2
            }else if (c <= 0xFFFF){
                total += 3
            }else {
                total += 4
            }
        }
     }
     return total
 }

//当字符串过长，时阶段添...
function truncate(str, length, truncation){
    truncation = truncation ? truncation : '...'
    length = length || 30
    return str.length > length ? str.slice(0, length - truncation.length) + truncation : String(str)
}
