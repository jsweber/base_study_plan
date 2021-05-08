//  方法一：每次取出两个不同的数，剩下的数字中重复出现的数字肯定比其他数字多，将规模缩小化。如果每次删除两个不同的数（不管包括不包括最高频数），那么在剩余的数字里，原最高频数出现的频率一样超过了50%，不断重复这个过程，最后剩下的将全是同样的数字，即最高频数。此算法避免了排序，时间复杂度只有O(n)，空间复杂度为O(1)

const search = list => {
    let findNum = list[0]
    let count = 1

    for(let i = 1; i < list.length; i++){
        if (count === 0){
            findNum = list[i]
            count = 1
        } else {
            if (findNum === list[i]){
                count++
            } else {
                count--
            }
        }
    }

    return findNum
}


const test = [1,2,3,2,5,2,2,6,2,2,2]
console.log(search(test))

