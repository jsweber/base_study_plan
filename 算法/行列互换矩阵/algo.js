/**
 * 矩阵行列转换
 */
let changeXY = function(arr, size=5){
    if (arr.length === 0){
        throw '数组不能为空'
    }

    let newArr = []
    let index = 0
    function loop(){
        if (index === size) return

        for (let i = 0; i< arr.length; i++){
            if (arr[i] % size === index){
                newArr.push(arr[i])
            }

        }
        index++
        loop()
    }
    loop()
    return newArr
}
