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
    //选中排序
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
            while(j > 0 && (arr[j - 1] > temp)){
                arr[j] = arr[j - 1]
                j--
            }
            arr[j] = temp            
        }
    }
}
//test
// let num = 10000
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

let num = 10
let ca = new CArray(num)
ca.setData()
ca.insertSort()
ca.toString()

// module.exports = CArray
