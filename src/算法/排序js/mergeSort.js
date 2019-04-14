//自顶向下
function mergeSort2(arr, lo, hi){
    if (lo >= hi) return
    let mid =Math.floor((hi - lo) / 2) + lo
    mergeSort2(arr, lo, mid)
    mergeSort2(arr, mid+1, hi)
    mergeArr(arr, lo, hi)
}

function mergeArr(arr, lo, hi){
    console.log(lo, hi)
    let temp = []
    let mid = Math.floor((hi - lo) / 2) + lo
    let left = lo
    let right = mid + 1

    for (let i = lo; i <= hi; i++){
        temp.push(arr[i])
    }
    console.log(temp)
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