class Drink{
    constructor(){

    }

    boilWater(){
        console.log('把水煮沸')
    }

    brew(){
        //检查子类是否实现了这个方法，模板方法需要的方法，子类必须实现
        //如果子类没有实现，就会顺着原型链找到父类的方法，爆出这个error
        throw new Error('must overrides')
    }

    pourInCup(){
        throw new Error('must overrides')
    }

    addCondiments(){
        throw new Error('must overrides')
    }

    //钩子函数，子类可以选择是否实现
    customerWantsCondiments(){
        return true
    }

    init(){
        this.boilWater()
        this.brew()
        this.pourInCup()
        if (this.customerWantsCondiments()){
            //如果挂钩返回true，则需要调料
            this.addCondiments()
        }
    }
}

class Coffee extends Drink{

    brew(){
        console.log('用沸水冲咖啡')
    }

    pourInCup(){
        console.log('把咖啡倒杯子')
    }

    addCondiments(){
        console.log('加糖和牛奶')
    }

    customerWantsCondiments(){
        return window.confirm('请问需要加牛奶或者糖吗？')
    }
}

let coffeWithHook = new Coffee()
coffeeWithHook.init()

function DrinkHFunc(options){
    function boilWater(){
        console.log('把水煮沸')
    }

    let brew = options.brew || function(){
        throw new Error('must overrides')
    }

    let pourInCup = options.pourInCup || function(){
        throw new Error('must overrides')
    } 

    let addCondiments = options.addCondiments || function(){
        throw new Error('must overrides')
    }

    let customerWantsCondiments = options.customerWantsCondiments || function(){
        return true
    }

    let F = function(){}

    F.prototype.init = function(){
        boilWater()
        brew()
        pourInCup()
        if (customerWantsCondiments()){
            //如果挂钩返回true，则需要调料
            addCondiments()
        }
    }
    return F
}

const CoffeeFunc = DrinkHFunc({
    brew(){
        console.log('用沸水冲咖啡')
    },
    pourInCup(){
        console.log('把咖啡倒杯子')
    },
    addCondiments(){
        console.log('加糖和牛奶')
    },
    customerWantsCondiments(){
        return window.confirm('请问需要加牛奶或者糖吗？')
    }
})

let coffeeFunc = new CoffeeFunc()
coffeeFunc.init()

