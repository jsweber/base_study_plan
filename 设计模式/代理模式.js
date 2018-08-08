/**
 * 1.保护代理：控制不同权限的对象对目标对象的访问
 * 2.虚拟代理：把开销很大的对象，延迟到真正需要它的时候去创建
 * 3.缓存代理
 */

//用一张站位图片替代还没加载出来的图片
var myImage = (function(){
    let img = document.createElement('img')
    document.body.appendChild(img)

    return {
        setSrc(src){
            img.src = src
        }
    }

})()

let proxyImage = (function(){
    let image = new Image()
    image.onload = function(){
        myImage.setSrc(this.src)
    }
    
    return {
        setSrc(src){
            myImage.setSrc('default/loading.gif')
            image.src = src
        }
    }
})()

proxyImage.setSrc('http://image.qq.com/music/photo.img')


//每隔两秒执行一起执行累计的request操作

function asyncReq(id){
    console.log(id)
}

let proxyAsyncReq = (function(){
    let cache = []
    let timer
    return function(id){
        cache.push(id)
        if (timer){
            return
        }

        timer = setTimeout(()=>{
            async(cache.join())
            clearTimeout(timer)
            timer = null
            cache = []
        }, 2000)
    }
})()

let inputs = document.querySelectorAll('input')
for(let i = 0, checkout; checkout = inputs[i++];){
    checkout.onclick = function(){
        if (this.checked){
            proxyAsyncReq(this.id)
        }
    }
}

//缓存代理案例
function mult(){
    let a = 1
    for (let i = 0; i < arguments.length; i++){
        a *= arguments[i]
    }
    return a
}

var proxyMult = (function(){
    var cache = {}

    return function(){
        let args = [].slice.apply(arguments)
        let param = args.join()
        if (cache[param]){
            return cache[param]
        }

        return cache[param] = mult.apply(this, args)
    }

})()
//缓存代理模式+ 高阶函数 =》 代理模式函数产生工厂
var createProxyFactory = function(fn){
    let cache = {}
    return function(){
        let args = [].join.apply(arguments)
        if (args in cache){
            return cache[args]
        }
        return cache[args] = fn.apply(this, arguments)
    }
}
