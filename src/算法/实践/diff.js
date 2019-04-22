//效果按理，参照git
const createPlainObject = () => Object.create(null)

const getItemKey = (o, key) => {
    if (typeof o === 'object' && typeof key === 'string') return o[key]
    return null
}

const makeKeyIndexAndFree = (list, key) => {
    let keyIndexMap = createPlainObject()
    let free = []

    for (let i = 0; i < list.length; i++){
        let item = list[i]
        let itemKey = getItemKey(item, key)
        if (itemKey){
            keyIndexMap[itemKey] = i
        }else {
            free.push(item)
        }
    }

    return {
        keyIndex: keyIndexMap,
        free
    }
}

const diff = (oldList, newList, key) => {
    let oldMap = makeKeyIndexAndFree(oldList, key)
    let newMap = makeKeyIndexAndFree(newList, key)

    let newFree = newMap.free //老的free不要了

    let oldKeyIndex = oldMap.keyIndex
    let newKeyIndex = newMap.keyIndex

    let moves = []
    let simulate = []

    const remove = index => {
        const move = {index, type: 'DEL'}
        moves.push(move)
    }

    const insert = (index, item) => {
        const move = {index, item, type: 'ADD'}
        moves.push(move)
    }

    const removeSimulate = index => {
        simulate.splice(index, 1)
    }

    let children = []
    let i = 0
    let freeIndex = 0

    while(i < oldList.length){
        let item = oldList[i]
        let itemKey = getItemKey(item, key)

        if (itemKey){
            if (typeof newKeyIndex[itemKey] !== 'undefined'){
                children.push(newList[newKeyIndex[itemKey]])
            }else {
                children.push(null)
            }
        }else {
            //oldList中的free不要，用newList中的替代
            let freeItem = newFree[freeIndex++]
            children.push(freeItem || null)
        }
        i++
    }

    simulate = children.slice()
    //remove items no longer exist
    i = 0
    while(i < simulate.length){
        if (simulate[i] !== null){
            i++
            continue
        }
        remove(i)
        removeSimulate(i)
    }

    let j = i = 0
    while(i < newList.length){
        let newItem = newList[i]
        let newItemKey = getItemKey(newItem, key)

        let simulateItem = simulate[j]
        let simulateItemKey = getItemKey(simulateItem, key)
        
        //你可能会觉得这个判断多此一举，其实这个判断很必要，主要的功能是处理：i还没遍历完成，j到头了，这种情况下，只要把newItem insert就可以了
        if (simulateItem){
            if (newItemKey === simulateItemKey){
                j++//新老一致，跳过
            }else {
                if(typeof oldKeyIndex[newItemKey] === 'undefined'){
                    insert(i, newItem)
                }else {
                    //虽然位置不对应，但是newItem确实在oldList中存在

                    let nextSimulateKey = getItemKey(simulate[j+1], key)
                    if (nextSimulateKey === newItemKey){
                        remove(i)
                        removeSimulate(j)
                        j++
                    }else {
                        insert(i, item)
                    }
                }
            }
        }else {
            insert(i, newItem)
        }

        i++
    }

    let k = simulate.length - j
    while(j++ < simulate.length){
        k--
        remove(k + i)
    }

    return {
        moves,
        children
    }
}


console.log(diff([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}], [{id: 2}, {id: 3}, {id: 1}], 'id'))


