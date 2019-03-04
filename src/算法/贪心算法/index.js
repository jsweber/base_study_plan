//找钱 63块，币值：25快 ，10块，1快

function makeChange(originAmt, coins){
    let remainAmt = 0

    if (originAmt % 25 < originAmt){
        coins[2] = parseInt(originAmt / 25)
        remainAmt = originAmt % 25
        originAmt = remainAmt
    }

    if (originAmt % 10 < originAmt){
        coins[1] = parseInt(originAmt / 10)
        remainAmt = originAmt % 10
        originAmt = remainAmt
    }

    if (originAmt % 1 < originAmt){
        coins[0] = parseInt(originAmt / 1)
        remainAmt = originAmt % 1
        originAmt = remainAmt
    }
}

let coins = []
makeChange(63, coins)
//部分背包问题，物体可以按百分比切割
function ksack(values, weights, capacity){
    let i = 0, v = 0, loaded = 0
    while(i < values.length){
        if (weights[i] < (capacity - loaded)){
            v += values[i]
        }else {
            let r = (capacity - loaded) / weights[i]
            v+= r * values[i]
        }
        loaded += weights[i]
        i++
    }
    return v
}

let items = ['A', 'B', 'C', 'D']
let values = [50, 140, 60, 60]
let weights = [5, 20, 10, 12]
let capacity = 30
ksack(values, weights, capacity)


