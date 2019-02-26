//顺寻查找，就是从第一个一直遍历到最后一个
//实现略

//查找最大值和最小值
//实现略

//数据自组织方式查找
//原理：二八原则，帕累托分布
function seqSearch(arr, t){
    let ret = -1
    for (let i = 0; i < arr.length; i++){
        if (arr[i] === t){
            ret = i
            swap(arr, i , i-1)
            break
        }
    }

    return ret
}
//如果在数组的前20%外找到，就直接放到第一个
function seqSearch2(arr, t){
    let ret = -1, b = Math.floor(arr.length * 0.2)
    for (let i = 0; i < arr.length; i++){
        if (arr[i] === t){
            ret = i
            if (i > b) swap(arr, i , 0)
            break
        }
    }

    return ret
}

//二分法查找，使用前必须排序
function binarySearch(arr, t){
    let min = 0,
        max = arr.length - 1,
        mid = 0
    
    while(min <= max){
        mid = Math.floor((min + max) / 2)
        if (arr[mid] < t){
            min = mid + 1
        }else if (arr[mid] > t){
            max = mid - 1
        }else {
            return mid
        }
    }

    return -1
}

//计算重复的值
function count(arr, n){
    let p = binarySearch(arr, n)
    let count = 0
    if (p > -1){
        count++
        for (let i = p + 1; i < arr.length; i++ ){
            if (arr[i] === n){
                count++
            }else {
                break
            }
        }

        for (let i = p - 1; i >=0 ; i--){
            if (arr[i] === n){
                count++
            }else {
                break
            }
        }
    }
    return count
}


function getRandomNums(n){
    let ret = []
    for (let i = 0; i < n; i++){
        ret.push(Math.floor(Math.random()*(n+1)))
    }
    return ret
}

function swap(arr, i, j){
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function insertSort(arr){
    let temp = 0, j = 0

    for (let i = 0; i < arr.length; i++){
        temp = arr[i]
        j = i
        while(j > 0 && (arr[j - 1] > temp)){
            arr[j] = arr[--j]
        }
        arr[j] = temp
    }
    return arr
}

// console.log(insertSort(getRandomNums(10)))
let arr = insertSort(getRandomNums(20))
console.log(arr, count(arr, 7))
