import {
    isDef
} from '../util'


function createRmCb(childElm, listeners){
    function remove(){
        if (--remove.listeners === 0){
            removeNode(childElm)
        }
    }

    remove.listeners = listeners

    return remove
}


function removeNode(elm){
    if (isDef(elm) && isDef(elm.parentNode)){
        elm.parentNode.removeChild(elm)
    }
}


