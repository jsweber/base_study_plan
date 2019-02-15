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
}
//test
let ca = new CArray(10)
ca.setData()
ca.toString()
ca.bubbleSort2()
ca.toString()

// module.exports = CArray
