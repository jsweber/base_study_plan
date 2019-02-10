//动态规划和递归相关，递归是把复杂的问题从顶部向下拆解，动态规划是把复杂的问题从简单的答案开始解答，然后在此基础上解决复杂的问题

//以斐波那契数列为例

//传统的递归解决方法
function fib(n){
    if (n < 2){
        return n
    }

    return fib(n - 1) + fib(n - 2)
}


//动态规划
function dynFib(n){
    let val = new Array(n+1).fill(0)
    if (n === 1 || n === 2){
        return 1
    }

     //先解决简单的，再解决后面的

     val[1] = 1
     val[2] = 1

    for (let i = 3; i <= n; i++){
       val[i] = val[i - 1] + val[i - 2]
    }

    return val[n]
}

//不需要中间值的版本
function dynFib2(n){
    let last = 1, nextLast = 1, ret = 1

    for (let i = 3; i <= n; i++){
        ret = last + nextLast
        nextLast = last
        last = ret
    }
    return ret
}

