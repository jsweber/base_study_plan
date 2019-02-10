//经典案例
//找到两个字符串的最长子串

function lcs(word1, word2){
    let max = 0, index = 0, lcsarr = new Array(word1.length + 1), str = ''

    for (let i = 0; i <= word1.length; i++){
        lcsarr[i] = new Array(word2.length + 1).fill(0)
    }

    for (let i = 0; i <= word1.length; i++){
        for (let j = 0; j <= word2.length; j++){
            if (i === 0 || j === 0){
                lcsarr[i][j] = 0
            }else{
                if (word1[i - 1] === word2[j - 1]){
                    lcsarr[i][j] = lcsarr[i - 1][ j - 1] + 1

                }else {
                    lcsarr[i][j] = 0
                }
            }
            
            if (max < lcsarr[i][j]){
                max = lcsarr[i][j]
                index = i
            }
        }
    }

    if (max > 0){
        //这里的index已经指向最长子串的末尾了
        for (let i = index - max; i < index; i++){
            str += word1[i]
        }
    }

    return str
}


