/**
 * 定义：保证一个类只有一个实例，并提供一个访问实例的全局访问
 * 
 * 下面介绍几种比较好的单例写法
 */


//用代理来实现单例
function User(name){
    this.name = name
}
User.prototype.sayName = function(){
    console.log(this.name)
}
//上面是一个普通类，用代理实现单例，兼顾灵活性
let ProxySingleUser = (function(){
    let single = null

    return function(name){
        if (!single){
            return single = new User(name)
        }
        return single
    }
})()
//把管理单例模式的逻辑提取出来
//传入的函数一定要return一个真值
var getSingle = function(fn){
    let result
    return function(){
        return result || (result = fn.apply(this, arguments))
    }
}

/**用途：
*1.利用单例和惰性解决弹窗唯一
*2.利用单例和惰性解决dom只绑定一次
*/

//1
var loginLayer = getSingle(function(){
    var div = document.createElement('div')
    div.innerHTML = '唯一的弹窗'
    document.body.appendChild(div)
    return div
})

document.getElementById('#btn').onclick = function(){
    //每次点击并不会创建新的弹窗，只是在第一次创建
    loginLayer().style.display = 'block'
}

//2 事件只绑定一次,jquery的one也可以，但是现在不流行用，前端破事多
var bindEvent = getSingle(function(){
    document.getElementById('#btn').onclick = function(){}
    //一定要return个真值，要不然 getSingle里result就不能直接返回了，这样就不能只调用一次了
    return true
})

var render = function(){
    console.log('渲染列表')
    bindEvent()
}
render()
render()
render()
//只绑定一次

