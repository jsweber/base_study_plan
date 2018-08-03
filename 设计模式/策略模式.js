//定义：定义一系列算法，把它们一个个封装起来，并且可以相互替换

//案例，根据员工的表现S-B和工资计算年终奖

var strategies = {
    S(salary){
        return salary * 4
    },
    A(salary){
        return salary * 3
    },
    B(salary){
        return salary * 2
    }
}

var calcBouns = function(level, salary){
    return strategies[level](salary)
}

console.log(calcBouns('S', 20000))



