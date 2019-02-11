//动态规划：背包问题
/**
 * 背包容量capacity：16
 * 宝物体积size： 3，4，7，8，9 
 * 宝物价值value：4，5，10，11，13
 * 宝物个数n：5
 * 
 * 说明宝物的价值越低，体积越小，并且排好序
 * 要求背包里价值最高
 */

 function dknapsack(capacity, size, value, n){
    let k = new Array(n + 1).fill(0).map(() => [])
    
    for (let i = 0; i <= n; i++){
        for (let w = 0; w  <= capacity; w++){
            if (i === 0 || w === 0){
                k[i][w] = 0
            }else if (size[i - 1] <= w){
                k[i][w] = max(
                    //可获取价值最大的宝物 + 剩下体积可获取的最大宝物价值
                    value[i-1] + k[i - 1][w - size[i - 1]],
                    //不取价值最大宝物可以获取的最大价值
                    k[i - 1][w]
                )
            }else {
                k[i][w] = k[i - 1][w]
            }
        }
    }
    console.log(k)

    return k[n][capacity]
 }

//test
dknapsack(16, [3, 4, 7, 8, 9], [4, 5, 10, 11, 13], 5)

 //递归方法
 //直接看这里不好理解
 function knapsack(capacity, size, value, n){
    if (capacity === 0 || n === 0) return 0

    if (size[n - 1] <= capacity){
        return max(
                value[n - 1] + knapsack(capacity - size[n - 1], size, value, n - 1) ,
                knapsack(capacity, size, value, n - 1)
            )
    }else {
        return knapsack(capacity, size, value, n - 1)
    }
 }

 function max(a, b){
     return a > b ? a : b
 }

