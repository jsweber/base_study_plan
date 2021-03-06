//提供一种顺序访问一个聚合对象中各个元素，而又不需要暴露该对象内部表示的模式

//内部迭代器
/**
 * array
 */
function innerEach(arr,cb){
    for(let i = 0; i < arr.length; i++){
        cb.apply(arr[i], [i, arr[i]])
    }
}


//**外部迭代器
function Iterator(obj){
    let current = 0
    function next(){
        current++
    }

    function done(){
        return current >= obj.length
    }

    function value(){
        return obj[current]
    }

    return {
        next,
        done,
        value
    }
}

//test
//比较两个数组是否完全相等
function compare(iterator1, iterator2){
    while(!iterator1.done() && !iterator2.done()){
        if (iterator1.value() !== iterator2.value()){
            return '不相等'
        }
        iterator1.next()
        iterator2.next()
    }
    if (iterator1.done() && iterator2.done()){
        return '相等'
    }else {
        return '不相等'
    }
    
}
compare(Iterator([1,2,3]), Iterator([1,2,3]))

//案例，获取上传组件
//说明：上传组件上传速度要比单纯的input file快，但是每个浏览器的上传组件不一样，甚至没有

let getActiveUploadObj = function(){
    try{
        return new ActiveXObject('TXFTNActiveX.FTNUpload')
    }catch(e){
        return false
    }
}

let getFlashUploadObj = function(){
    try{
        let obj = document.createElement('object')
        obj.type = 'application/x-shockwave-flash'
        return document.body.appendChild(obj)
    }catch(e){
        return false
    }
}

let getFormUploadObj = function(){
    let obj = document.createElement('input')
    obj.type = 'file'
    obj.name = 'file'
    return document.body.appendChild(obj)
}

let iteratorUploadObj = function(){
    for (let i = 0; i < arguments.length; i++){
        let uploadObj = arguments[i]()
        if (!uploadObj){
            return uploadObj
        }
    }
}

let uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj)

