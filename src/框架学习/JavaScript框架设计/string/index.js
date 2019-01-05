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
        n = n>>1// 2>>1=1解释：2除以2等于1
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
//转换成驼峰形式
//a-b-c | a_b_c => aBC
function camelize(target){
    if (!~target.indexOf('-') && !~target.indexOf('_') ) return target
    return target.replace(/[-_][^-_]/g, function(match){
        return match.charAt(1).toUpperCase()
    })
}

//转化成下划线风格
/*我的实现，和下面书上的实现对比*/
function underscoredByMine(target){
    return target.replace(/[-_]/g,  '').replace(/([a-z])([A-Z])/g, function(match){
        return match.charAt(0) + '_' + match.charAt(1).toLowerCase()
    })
}

function underscoredByBook(target){
    return target.replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/\-/g, '_').toLowerCase()
}

var underscored = underscoredByBook

//css风格，即-号连接
function dasherizeByMine(target){
    return target.replace(/([a-z\d])([A-Z])/g, '$1-$2').replace(/_/g, '-').toLowerCase()
}
//by book
function dasherize(target){
    return underscored(target).replace(/_/g, '-')
}

//首字母大写
function capitalizeByMine(target){
    return target.charAt(0).toUpperCase() + target.slice(1)
}
//by book
function capitalize(target){
    return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase()
}

//by book
//移除字符串中的html标签，保留标签中的文本文件
//这里和书上不同，因为书上是把正则放全局，但是我想闭包，但是又不想用函数自执行浪费一次执行（不用此函数的情况下），所以这里用了懒执行
//stripTags('<div onclick="function">hello<p class="red"> world</p></div>')
var stripTags = function(target){
    var flag = /<\w+\s+("[^"]*"|'[^']*'|[^>])+?>|<\/\w+>/ig
    stripTags = function(t){
        return String(t || '').replace(flag, '')
    }
    return stripTags(target)
}

//去除script脚本，需要比stripTags先执行
function stripScriptByMine(target){
    return (target || '').replace(/<script>(\s|\S)+?<\/script>/img, '')
}

//by book
//stripScript('<div>hello<script>cosnole.log</script></div>')
function stripScript(target){
    return String(target || '').replace(/<script[^>]*?>([\s\S]*?)<\/script>/img, '')
}

//escapeHTML和unescapeHTML解析的顺序和对应的内容都是反的
function escapeHTML(target){
    return target.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function unescapeHTML(target){
    return target.replace(/&#39;/g, '\'').replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&')
}
//escapeHTMLByDom("<div>hello<script>cosnole.log</script></div>")
//=> "&lt;div&gt;hello&lt;script&gt;cosnole.log&lt;/script&gt;&lt;/div&gt;"
function escapeHTMLByDom(target){
    var div = document.createElement('div')
    div.innerText = target
    div = null //释放dom对象
    return div.innerHTML
}
//unescapeHTMLByDom("&lt;div&gt;hello&lt;script&gt;cosnole.log&lt;/script&gt;&lt;/div&gt;")
//=> "<div>hello<script>cosnole.log</script></div>"
function unescapeHTMLByDom(target){
    var div = document.createElement('div')
    div.innerHTML = target
    div = null
    return div.innerText
}

//把正则表达式的关键词都加\
function escapeRegExp(target){
    return target.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1')
}

//pad('50', 5) => "00050"
function pad(target, n){
    var zero = new Array(n).join('0')
    var str = zero + target 
    return str.substr(-n)
}

function padDirection(target, n, filling, right, radix){
    var num = target.toString(radix || 10),
    filling = filling || '0'

    while(num.length < n){
        if (right){
            num += filling
        }else {
            num = filling + num
        }
    }
    return num
}

function format(str, obj){
    var args = [].slice.call(arguments, 1)
    return str.replace(/\\?\#\{([^\{\}]+)\}/mg, function(match, name){
        //\\?代表0或者1个斜杠
        //match正则匹配的字符串，name为第一个分组字符串 e.g. #{name} name
        if (match.charAt(0) == '\\'){
            //代表用户输入\#{xxxx}，这种输入就是不需要匹配的里面的字段，只要去掉斜杠原样返回即可
            return match.slice(1)
        }else if (Number(name) >= 0){
            return args[name]
        }else if (obj && obj[name]){
            return obj[name]
        }
        return ''
    })
}

function stringLiteralize(source){
    return '"' + source.replace(/\x5C/g, '\\\\').replace(/"/g, '\\"').replace(/\x0A/g, '\\n').replace(/\x09/g, '\\t').replace(/\x0D/g, '\\r') + '"'
}
//书上列了12种方法，挑选几种比较有意义的实现下
function trim(str){
    return str.replace(/^\s+|\s+$/g, '')
}

function trimFaster(str){
    str = str.replace(/^\s+/, '')
    for (var i =  str.length - 1; i >=0; i--){
        if (/\S/.test(str.charAt(i))){
            return str.slice(0, i+1)
        }
    }
}
//这里假设空格的ASCII码小于等于32
//'\n'  10
//'\t'   9
//'\r'  13
// '\f'  12
// ' '    32
function trimByCharCode(str){
    var i = -1, len = str.length
    var j = len-1
    for (; str.charAt(++i) <= 32; ){}
    for (; j > i && str.charAt(j) <= 32; j--){}
    return str.slice(i, j+1)
}

module.exports = {
    format,
    stripScript,
    escapeHTML,
    unescapeHTML,
    escapeHTMLByDom,
    unescapeHTMLByDom,
    escapeRegExp,
    pad,
    padDirection
}

