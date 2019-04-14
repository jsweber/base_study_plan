function swap(arr, i, j){
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function BuildNum(n){
    let arr = []
    for (let i = 0; i < n; i++){
        arr[i] = Math.floor(Math.random() * n)
    }
    return arr
}

//自顶向下
function mergeSort2(arr, lo, hi){
    if (lo >= hi) return
    let mid =Math.floor((hi - lo) / 2) + lo
    mergeSort2(arr, lo, mid)
    mergeSort2(arr, mid+1, hi)
    mergeArr(arr, lo, hi)
}
//自底向上
function mergeSort3(arr, lo, hi){
    let N = arr.length

    for (let sz = 1; sz < N; sz *= 2 ){
        for (let lo = 0; lo < N - sz; lo+=(sz + sz)){
            mergeArr(arr, lo, Math.min(lo+sz+sz -1, N-1))
        }
    }
}

function mergeArr(arr, lo, hi){
    let temp = new Array(arr.length)//这里比较关键，要不然lo和hi与left和right对不上
    let mid = Math.floor((hi - lo) / 2) + lo
    let left = lo
    let right = mid + 1

    for (let i = lo; i <= hi; i++){
        temp[i] = arr[i]
    }

    for (let i = lo; i <= hi; i++){
        if (left > mid){
            arr[i] = temp[right++]
        }else if (right> hi){
            arr[i] = temp[left++]
        }else if (temp[left] < temp[right]){
            arr[i] = temp[left++]
        }else {
            arr[i] = temp[right++]
        }
    }
}




let arr = BuildNum(8)
console.log('prev: ' + arr.join())
mergeSort3(arr, 0, arr.length-1)

console.log('sorted:  ' + arr.join())
