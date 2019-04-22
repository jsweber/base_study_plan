
const isUndefined = v => typeof v === 'undefined'

const createPlainObject = () => Object.create(null)

const getVal = (o, key) => {
    if (typeof o === 'object' && typeof key === 'string') return o[key]
    return undefined
}

const makeKeyIndexAndFree = (list, key) => {
    let keyIndex = createPlainObject()
    let free = []

    let val = null, o = null
    for (let i = 0; i < list.length; i++){
        o = list[i]
        val = getVal(o, key)
        if (!isUndefined(val)){
            keyIndex[val] = i
        }else {
            free.push(o)
        }
    }

    return {
        keyIndex,
        free
    }
}

const Delete = '__Delete'
const Add = '__Add'

class EasyDiff{
    constructor(options){
        this.key = options.key


    }
    /**
     * 
     * @param {*} oldList 
     * @param {*} newList 
     */
    diff(oldList, newList, key){
        key = key || this.key
        if (isUndefined(key)) throw new TypeError('key is undefined')

        let oldIndexMap = makeKeyIndexAndFree(oldList, key)
        let newIndexMap = makeKeyIndexAndFree(newList, key)

        let newFree = newIndexMap.free
        let newFreeIndex = 0

        let actions = []

        const del = i => actions.push({index: i, type: Delete})

        const add = (i, item) => actions.push({index: i, type: Add, item})

        const delItem = (arr, i) => arr.splice(i, 1)

        let subOldList = []
        let i = 0
        let item = null
        let val = null
        while(i < oldList.length){
            item = oldList[i]
            val = getVal(item, key)

            if (isUndefined(val)){
                subOldList.push(newFree[newFreeIndex++] || null)//newFree没有后用null代替
            }else {
                if (!isUndefined(newIndexMap[val])){
                    subOldList.push(item)
                }else {
                    subOldList.push(null)
                }
            }
            i++
        }

        i = 0
        while(i < subOldList.length){
            if (subOldList[i] === null){
                del(i)
                delItem(subOldList, i)
            }else {
                i++
            }
        }

        let j = i = 0
        let subOldItem = null, subOldIndex = 0
        while(i < newList.length){
            item = newList[i]
            val = getVal(item, key)

            subOldItem = subOldList[j]
            subOldVal = getVal(subOldItem, key)

            if (subOldItem){
                if (val === subOldVal){
                    j++
                }else {
                    if (isUndefined(oldIndexMap[val])){
                        add(i, item)
                    }else {
                        let nextSubOldListItem = subOldList[j+1]
                        let nextSubOldListVal = getVal(nextSubOldListItem, key)
                        if (nextSubOldListVal === val){
                            
                        }else {
                            add(i, item)
                        }
                    }
                }

            }else {
                add(i, item)
            }

            i++
        }






    }

}


