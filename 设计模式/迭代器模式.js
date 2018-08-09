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


//外部迭代器

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


