//数据测试平台类
class CArray{
    constructor(numElements){
        this.dataStore = []
        this.pos = 0
        this.numElements = numElements
    }

    insert(element){
        this.dataStore[this.numElements] = element
    }

    toString(){
        for (let i = 0; i < this.numElements; i++){
            if (i % 9 === 0 && i !== 0){
                console.log(this.dataStore[i] + '\n')
            }else {
                console.log(this.dataStore[i])
            }
        }
    }

    clear(){
        this.dataStore = new Array(this.numElements).fill(0)
    }

    setData(){
        for (let i = 0; i < this.numElements; i++){
            this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1))
        }
    }

    swap(arr, index1, index2){
        let temp = arr[index1]
        arr[index1] = arr[index2]
        arr[index2] = temp
    }

    //冒泡排序
    bubbleSort(){
        let arr = this.dataStore
        for (let outer = arr.length - 1; outer >0; outer--){
            for (let inner = 0; inner < outer; inner++){
                if (arr[inner] > arr[inner + 1]){
                    this.swap(arr, inner, inner + 1)
                }
            }
        }
    }

    bubbleSort2(){
        let arr = this.dataStore
        for (let i = 0; i < arr.length - 1; i++){
            for (let j = arr.length - 1;  j > i; j--){
                if (arr[j] < arr[j - 1]){
                    this.swap(arr, j, j-1)
                }
            }
        }
    }
    //选择排序
    selectSort(){
        let min = 0, arr = this.dataStore, len = this.dataStore.length
        for (let i = 0; i < len - 1; i++){
            min = i
            for (let j = i + 1; j < len; j++){
                if (arr[min] > arr[j]){
                    min = j
                }
            }
            this.swap(arr, min, i)
        }
    }

    //插入排序
    insertSort(){
        let temp = 0, j = 0, arr = this.dataStore, len = this.dataStore.length

        for (let i = 1; i < len; i++){
            temp = arr[i]
            j = i
            while(j > 0 && (arr[j - 1] > temp)){//易错点：写arr[j - 1] > arr[j]这个逻辑在第二次循环排的时候就出错了，因为后后一个一定比后一个小，temp只能放在后一个或者当前的位置上 
                arr[j] = arr[j - 1]
                j--
            }
            arr[j] = temp            
        }
    }

    //shell排序
    shellSort(){
        let len = this.dataStore.length, n = 1, arr = this.dataStore
        //动态gap的希尔排序
        while(n < Math.floor(len / 3)){
            n = n * 3 + 1
        }

        while(n > 0){
            for (let i = n; i < len; i++){
                for (let j = i; j >= n &&  arr[j - n] > arr[j]; j = j - n ){
                    this.swap(arr, j - n, j)
                }
            }
            n = (n-1) / 3
        }
    }

    //归并排序
    mergeSort(){
        if (this.dataStore.length < 2) return
        let arr = this.dataStore, 
        step = 1,
        startLeft = 0,
        startRight = 0,
        len = arr.length

        while(step < len){
            startLeft = 0
            startRight = step

            while(startRight + step <= len){
                this.mergeArr(arr, startLeft, startLeft + step, startRight, startRight + step)
                startLeft = startRight + step
                startRight = startLeft + step
            }

            if (startRight < len){//易错点，不知道为什么容易写出while
                this.mergeArr(arr, startLeft, startLeft + step, startRight, len)
            }
            step *= 2
        }

    }

    mergeArr(arr, startLeft, stopLeft, startRight, stopRight){
        let leftArr = new Array(stopLeft - startLeft + 1)
        let rightArr = new Array(stopRight - startRight + 1)

        let k = startRight, i = 0
        for ( i = 0; i < rightArr.length - 1; i++){
            rightArr[i] = arr[k++]
        }

        k = startLeft
        for (i = 0; i < leftArr.length - 1; i++){
            leftArr[i] = arr[k++]
        }

        leftArr[leftArr.length - 1] = Infinity
        rightArr[rightArr.length - 1] = Infinity

        let n = 0, m = 0
        for (i = startLeft; i < stopRight; i++){
            if (leftArr[n] < rightArr[m]){
                arr[i] = leftArr[n++]
            }else {
                arr[i] = rightArr[m++]
            }
        }
    }
    //快速排序
    quickSort(arr){
        if (arr.length === 0) return []
        let len = arr.length,
        smallArr = [],
        bigArr = [],
        qivot = arr[0]

        for (let i = 1; i < len; i++){//易错点：i = 0 造出溢栈
            if (qivot < arr[i]){
                bigArr.push(arr[i])
            }else {
                smallArr.push(arr[i])
            }
        }

        return this.quickSort(smallArr).concat(qivot, this.quickSort(bigArr))
    }
}
//test
// let num = 100000
// let ca = new CArray(num)
// ca.setData()
// let startTime = +new Date()
// ca.bubbleSort()
// console.log(+new Date() - startTime)

// ca.setData()
// startTime = +new Date()
// ca.selectSort()
// console.log(+new Date() - startTime)

// ca.setData()
// startTime = +new Date()
// ca.insertSort()
// console.log(+new Date() - startTime)

// ca.setData()
// startTime = +new Date()
// ca.shellSort()
// console.log(+new Date() - startTime)

// ca.setData()
// startTime = +new Date()
// ca.mergeSort()
// console.log(+new Date() - startTime)

// let num = 10
// let ca = new CArray(num)
// ca.setData()
// ca.mergeSort()
// ca.toString()

let num = 100000
let ca = new CArray(num)
ca.setData()
let startTIme = +new Date()
ca.quickSort(ca.dataStore)
console.log(+new Date() - startTIme)
// module.exports = CArray
