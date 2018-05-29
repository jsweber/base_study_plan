let perm = function(){
    let str = ['a', 'b', 'c', 'd']
    let extractNum = 3
    let result = 0

    function loop(str, num){
        for (let i = 0; i < str.length; i++){
            let copyStr = str.slice(0)
            let extractor = copyStr.splice(i, 1)
            if (num === extractNum){
                result += copyStr.length
            }else{
                loop(str, num+1)
            }
        }
    }
    loop(str, 0)
    return result

}