//拿java举例的话，就是一个抽象类，然后具体的类去继承实现它的方法

class Parent{
    step1(){

    }
    step2(){

    }
    step3(){

    }
    init(){
        //我就是模版方法
        this.step1()
        this.step2()
        this.step3()
    }

}
//子类去实现具体的step方法

//head first中的泡茶和咖啡的案例
class Drink{
    boilWater(){
        console.log('煮沸水')
    }
    brew(){
        //类似java抽象类中的强制重写
        throw new Error('子类必须手动重写brew')
    }
    pourInCup(){
        throw new Error('子类必须手动重写pourInCup')
    }
    addCondiments(){
        throw new Error('子类必须手动重addCondiments')
    }
    isWantCondiments(){
        //钩子方法
        return true //默认需要调料
    }
    init(){
        this.boilWater()
        this.brew()
        this.pourInCup()
        if (this.isWantCondiments()){
            this.addCondiments()
        }
    }
}
//这里我们只实现coffee的例子
class Coffee extends Drink{
    brew(){
        console.log('用沸水泡咖啡')      
    }
    pourInCup(){
        console.log('把咖啡倒进杯子')
    }
    addCondiments(){
        console.log('加糖和牛奶')
    }
    isWantCondiments(){
        return window.confirm('请问需要调料吗？')
    }
}

let coffee = new Coffee()
coffee.init()

