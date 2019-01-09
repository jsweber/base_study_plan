/**
 * 排列算法
 */
let A = function(str, extractNum){
    let result = 0
    let arr = []
    if(extractNum === 1){
        return str
    }

    function loop(str, num, pl){
        for(let i = 0; i < str.length; i++){
            let copyStr = str.slice(0)
            let cpl = pl
            cpl += copyStr.splice(i,1)

            if (num === extractNum){
                result+=copyStr.length
                for (let j = 0; j < copyStr.length; j++){
                    arr.push(cpl+copyStr[j])
                }
            }else {
                loop(copyStr, num+1, cpl)
            }
        }
    }
    loop(str, 2, '')
    return arr

}
/**
 * 组合算法
 * 在排列的基础上排序去重
*/
let C = function(str, extractNum){
    let result = []
    let arr = A(str, extractNum).map(a => a.split('').sort().join(''))
    let flag = {}
    for (let i = 0; i<arr.length; i++){
        if (!flag[arr[i]]){
            flag[arr[i]] = 1
            result.push(arr[i])
        }
    }
    return result
}

let str = ['a', 'b', 'c']
console.log(A(str, 2))
console.log(C(str, 2))
