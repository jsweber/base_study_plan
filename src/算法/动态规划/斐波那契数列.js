// 一般我们计算斐波那契数列会用递归，但是这种算法会有大量的重复计算，并且算法时间复杂度是2^n
// 这里我们用动态规划（记忆法）来做，
// fib(n) n代表相加数个数
// 先从简单的 fib(2) = 0 + 1开发
// fib(3) = fib(2) + 1
// fib(4) = fib(3) + 2

const fib = n => {
    if (n <= 0) return null
    if (n === 1) return 0
    if (n === 2) return 1

    let fib1 = 0
    let fib2 = 1
    let fib3 = 0

    for (let i = 2; i < n; i++) {
        // 辗转相加
        fib3 = fib1 + fib2
        fib1 = fib2
        fib2 = fib3
    }
    return fib3
}

console.log(fib(0));
console.log(fib(1));
console.log(fib(2));
console.log(fib(3));
console.log(fib(5));
console.log(fib(6));
console.log(fib(10));
