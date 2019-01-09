/**
 * 假设小米手机预售，优先付定金的有一定优惠政策
 * 预先缴纳500定金的可以获取100元优惠券
 * 预先缴纳200定金的可以获取50元优惠券
 * 而没有支付定金的用户进入普通模式，
 * 当库存为0时普通模式就买不到了，而付了定金的用户不受影响
*/
/**
 * @param {number} orderType 1:500元定金用户；2:200元定金用户；3:普通用户
 * 
 * @param {boolean} pay 表示用户是否已经支付定金，true/false，虽然用户已经下了订单，但是没付定金的话只能进入降级普通购买模式
 * 
 * @param {number} stock 库存
*/

let order = function(orderType, pay, stock){
    if (orderType === 1){
        if (pay == true){
            console.log('500元定金用户，得100优惠券')
        }else {
            if (stock > 0){
                console.log('普通购买，无优惠券')
            }else {
                console.log('库存不足')
            }
        }
    }else if (orderType === 2){
        if (pay == true){
            console.log('200元定金用户，得50优惠券')
        }else {
            if (stock > 0){
                console.log('普通购买，无优惠券')
            }else {
                console.log('库存不足')
            }
        }
    }else if (orderType === 3){
        if (stock > 0){
            console.log('普通购买，无优惠券')
        }else {
            console.log('库存不足')
        }
    }
}

order(1, true, 500)

//用职责链模式重构
let order500 = function(orderType, pay, stock){
    if (orderType === 1 && pay === true){
        console.log('500元定金用户，得100优惠券')
    }else {
        order200(orderType, pay, stock)
    }
}

let order200 = function(orderType, pay, stock){
    if (orderType === 2 && pay === true){
        console.log('200元定金用户，得50优惠券')
    }else {
        orderNormal(orderType, pay, stock)
    }
}

let orderNormal = function(orderType, pay, stock){
    if (stock > 0){
        console.log('普通购买，无优惠券')
    }else {
        console.log('库存不足')
    }
}
//但是这样还是不太好，因为函数里写死了调用哪个函数
//灵活可拆分的职责链节点
let order500pro = function(orderType, pay, stock){
    if (orderType === 1 && pay === true){
        console.log('500元定金用户，得100优惠券')
    }else {
        return 'next'
    }
}

let order200pro = function(orderType, pay, stock){
    if (orderType === 2 && pay === true){
        console.log('200元定金用户，得50优惠券')
    }else {
        return 'next'
    }
}

let orderNormalpro = function(orderType, pay, stock){
    if (stock > 0){
        console.log('普通购买，无优惠券')
    }else {
        console.log('库存不足')
    }
}

class Chain{
    constructor(fn){
        this.fn = fn
        this.successor = null
    }

    setNext(successor){
        return this.successor = successor
    }
    passRequest(){
        let ret = this.fn.apply(this, arguments)
        if (ret == 'next'){
            return this.successor && this.successor.passRequest.apply(this.successor,arguments)
        }
        return ret
    }
}

let chainOrder500 = new Chain(order500pro)
let chainOrder200 = new Chain(order200pro)
let chainOrderNormal = new Chain(orderNormalpro)

chainOrder500.setNext(chainOrder200)
chainOrder200.setNext(chainOrderNormal)

chainOrder500.passRequest(1, true, 500)
chainOrder500.passRequest(2, true, 500)
chainOrder500.passRequest(3, true, 500)
chainOrder500.passRequest(1, true, 500)

//异步传递
Chain.prototype.next = function(){
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}

let fn1 = new Chain(function(){
    console.log(1)
    return 'next'
})

let fn2 = new Chain(function(){
    console.log(2)
    
    setTimeout(() => {
        this.next()
    }, 1000)
})

let fn3 = new Chain(function(){
    console.log(3)
})

fn1.setNext(fn2).setNext(fn3)
fn1.passRequest()

//AOP实现职责链
Function.prototype.after = function(fn){
    let self = this
    return function(){
        let ret = self.apply(this, arguments)
        if (ret === 'next'){
            return fn.apply(this, arguments)
        }
        return ret
    }
}

let order2 = order500pro.after(chainOrder200).after(orderNormalpro)
order2(1, true, 500)
