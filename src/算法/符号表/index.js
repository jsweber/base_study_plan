//符号表也叫hash表

//基于链表实现

class Node{
    constructor(key, value, next=null){
        this.key = key
        this.value = value
        this.next = next
    }
}

class Hash{
    constructor(){
        this.count = 0
        this.key = []
        this.header = null
    }

    put(key, value){
        if (this.contains(key)){
            for (let i = this.header; i != null; i = i.next){
                if (i.key === key){
                    i.value = value
                    break
                }
            }
        }else {
            let _header = new Node(key, value, this.header)
            this.header = _header
        }
        this.count++
        this.key.push(key)
    }

    get(key){
        for(let i = this.header; i != null; i = i.next){
            if (i.key === key){
                return i.value
            }
        }
        return null
    }

    del(key){
        if (this.contains(key)){
            for (let i = this.header; i != null; i = i.next){
                if (i.key === key){
                    i.value = i.next.value
                    i.key = i.next.key
                    i.next = i.next.next
                    this.count--
                    this.key = this.key.filter(k => k !== key)
                    return true
                }
            }
        }
        return false
    }

    contains(key){
        return this.get(key) !== null
    }

    size(){
        return this.count
    }

    keys(){
        return this.key
    }

    isEmpty(){
        return this.count === 0
    }
}

//基于数组实现有序符号表
class HashByArray{
    constructor(){
        this.keyList = []
        this.valueList = []
    }

    put(key, value){

    }

    get(key){

    }

    del(key){

    }

    contains(key){

    }

    size(){
        return this.keyList.length
    }

    isEmpy(){
        return this.keyList.length === 0
    }

    max(){

    }

    min(){

    }
    //返回小于key的数量
    rank(key){

    }
    //返回名次
    select(key){}

    keys(){
        return this.keyList
    }
}

