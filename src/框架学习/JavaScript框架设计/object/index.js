
function mixin(target, supply){
    if (Object.getOwnPropertyDescriptor){
        Object.keys(supply).forEach(property => {
            Object.defineProperty(target, property, Object.getOwnPropertyDescriptor(supply, property))
        })
    } else {
        for (let p in supply){
            if (supply.hasOwnProperty(p)){
                target[p] = supply[p]
            }
        }
    }
}


