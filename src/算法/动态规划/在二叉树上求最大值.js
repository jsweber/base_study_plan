//https://blog.csdn.net/baidu_28312631/article/details/47418773
/**
 *      7

      3   8

    8   1   0

  2   7   4   4

 4   5   2   6   5
 */

/**
 * 问题描述
 *  在上面的数字三角形中寻找一条从顶部到底边的路径，使得路径上所经过的数字之和最大。路径上的每一步都只能往左下或 右下走。只需要求出这个最大和即可，不必给出具体路径。
 * 
 */
const createNodeTree = () => {
    return [
        [7],
        [3, 8],
        [8, 1, 0],
        [2, 7, 4, 4],
        [4, 5, 2, 6, 5]
    ]
}
const maxRow = createNodeTree().length
/**
 * 
 * @param {Number} rows 树的高度正整数
 * @param {Array} nodeTree 以数组表示的二叉树 
 * @return {Number} 返回最大值
 */
 const maxSum = (rows, nodeTree) => {}

 /**
  * 基础的分析：
  * 1.tree Depth 等于最后一层的叶子节点个数（只适用于完全二叉树）
  * 2.设D[i, j]为树上第i行第j列的值
  *   在选择相加的树中，它只能从 D[i+1, j]和D[i+1, j+1]中选一个
  */

//递归方法，计算量太大无法运行
const maxSum1 = (rows, nodeTree) => {
    return maxSumRecursive(1, 1, nodeTree)
}

const maxSumRecursive = (row, col, nodeTree) => {
    if (row === maxRow){
        return nodeTree[row - 1][col - 1]
    }

    let max = Math.max(
            maxSumRecursive(row + 1, col, nodeTree),
            maxSumRecursive(row + 1, col + 1, nodeTree)
        ) + nodeTree[row-1][col-1]
    return max
}

console.log(maxSum1(maxSum, createNodeTree()))

//我们仿照文章中的方法用一个二维数组来存各层的结果，方便理解后面的动态规划实现方式
const createMaxSum = () => {
    let n = createNodeTree().length
    let ret = new Array(n)
    for (let i = 0; i < n; i++){
        ret[i] = []
        for (let j = 0; j <= i; j++){
            ret[i][j] = -1
        }
    }
    return ret
}

//修改上面的实现
let maxSumArr2 = createMaxSum()
const maxSum2 = (rows, nodeTree) => {
    return maxSumRecursive2(1, 1, nodeTree)
}
const maxSumRecursive2 = (row, col, nodeTree) => {
    if (row === maxRow){
        return maxSumArr2[row - 1][col - 1] = nodeTree[row - 1][col - 1]
    }

    let max = Math.max(
            maxSumRecursive2(row + 1, col, nodeTree),
            maxSumRecursive2(row + 1, col + 1, nodeTree)
        ) + nodeTree[row-1][col-1]
    return maxSumArr2[row - 1][col - 1] = max
}

//接下来通过maxSumArr2变量已经存储的值，可以优化maxSumRecursive2，计算过的就直接通过maxSumArr2返回，通过增加空间减少计算时间
let maxSumArr3 = createMaxSum()
const maxSum3 = (rows, nodeTree) => {
    return maxSumRecursive3(1, 1, nodeTree)
}
const maxSumRecursive3 = (row, col, nodeTree) => {
    let i = row - 1
    let j = col - 1
    if (maxSumArr3[i][j] !== -1){
        return maxSumArr3[i][j]
    }
    if (row === maxRow){
        return maxSumArr3[i][j] = nodeTree[i][j]
    }

    return maxSumArr3[i][j] = Math.max(
            maxSumRecursive3(row+1, col, nodeTree),
            maxSumRecursive3(row+1, col+1, nodeTree)
        ) + nodeTree[i][j]
}

//用递归会生成很多堆栈，很容易造成益处，我们可以考虑把递归改成递推

/**
 * 开始用动态规划的方式实现
 * 动态规划和递归的思想相反，递归是从顶部开始考虑，动态规划是从底部开始思考
 * 这时候上面的createMaxSum函数生成的累加值就有意义了
 */
/**
 *
       [30]
     [23, 21]
    [20, 13, 10]
  [7, 12, 10, 10]
 [ 4, 5, 2, 6, 5 ]
 * 
 */
/** 
 * 先可以得到叶子节点的值[ 4, 5, 2, 6, 5 ]
 * 倒数第二层的值是原节点上的值加上叶子节点的值，然后取较大值
 * 设S[i, j] 第i行第j列到叶子节点路径上值累加的最大值
 * S[i,j] = Max( D[i+1][j], D[i+1][j+1] ) + D[i, j]  // i < RowMax
 * S[i,j] = D[i][j] // i == RowMax
 * 找到递推公式后写代码
 * 递推公式只有自己在草稿纸上找规律，没有别的方法
 * 有限的规律是：
 * 先找边界，求出边界值，然后看看边界值怎么转换成上层值
 * */
const dpmaxSumArr = createMaxSum()

const dpMaxSum = (rows, nodeTree) => {
    let boundry = rows - 1
    dpmaxSumArr[boundry] = nodeTree[boundry].map(n => n)

    for (let i = boundry - 1; i >= 0; i--){
        let len = nodeTree[i].length
        for (let j = 0; j < len; j++){
            dpmaxSumArr[i][j] = Math.max(dpmaxSumArr[i+1][j], dpmaxSumArr[i+1][j+1]) + nodeTree[i][j]
        }
    }
    return dpmaxSumArr[0][0]
}

//再次优化，其实我们不用一个二维数组去存，一维数组就够了，当然题目不同，情况也不同

const dpMaxSum2 = (rows, nodeTree) => {
    let boundry = rows - 1
    let maxSum = nodeTree[boundry]
    let len = 0

    for (let i = boundry - 1; i >= 0; i--){
        len = nodeTree[i].length
        for (let j = 0; j < len; j++){
            //再被覆盖前就把把值计算好了，然后原地存入
            maxSum[j] = Math.max(maxSum[j], maxSum[j + 1]) + nodeTree[i][j]
        }
    }
    return maxSum[0]
}

 /**
接下来，我们就进行一下总结：

    递归到动规的一般转化方法

    递归函数有n个参数，就定义一个n维的数组，数组的下标是递归函数参数的取值范围，数组元素的值是递归函数的返回值，这样就可以从边界值开始， 逐步填充数组，相当于计算递归函数值的逆过程。

    动规解题的一般思路

    1. 将原问题分解为子问题

    把原问题分解为若干个子问题，子问题和原问题形式相同或类似，只不过规模变小了。子问题都解决，原问题即解决(数字三角形例）。
    子问题的解一旦求出就会被保存，所以每个子问题只需求 解一次。
    2.确定状态

    在用动态规划解题时，我们往往将和子问题相关的各个变量的一组取值，称之为一个“状 态”。一个“状态”对应于一个或多个子问题， 所谓某个“状态”下的“值”，就是这个“状 态”所对应的子问题的解。
    所有“状态”的集合，构成问题的“状态空间”。“状态空间”的大小，与用动态规划解决问题的时间复杂度直接相关。 在数字三角形的例子里，一共有N×(N+1)/2个数字，所以这个问题的状态空间里一共就有N×(N+1)/2个状态。
    整个问题的时间复杂度是状态数目乘以计算每个状态所需时间。在数字三角形里每个“状态”只需要经过一次，且在每个状态上作计算所花的时间都是和N无关的常数。

    3.确定一些初始状态（边界状态）的值

    以“数字三角形”为例，初始状态就是底边数字，值就是底边数字值。

    4. 确定状态转移方程

     定义出什么是“状态”，以及在该“状态”下的“值”后，就要找出不同的状态之间如何迁移――即如何从一个或多个“值”已知的 “状态”，求出另一个“状态”的“值”(递推型)。状态的迁移可以用递推公式表示，此递推公式也可被称作“状态转移方程”。


能用动规解决的问题的特点

    1) 问题具有最优子结构性质。如果问题的最优解所包含的 子问题的解也是最优的，我们就称该问题具有最优子结 构性质。

    2) 无后效性。当前的若干个状态值一旦确定，则此后过程的演变就只和这若干个状态的值有关，和之前是采取哪种手段或经过哪条路径演变到当前的这若干个状态，没有关系。

*/

