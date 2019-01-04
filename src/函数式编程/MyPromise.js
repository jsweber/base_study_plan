//https://juejin.im/post/5ab20c58f265da23a228fe0f
const Pending = 1,
Resolve = 2,
Reject = 3


function MyPromise(executor){
    

    let _this = this
    _this._status = Pending //default state
    _this._value = undefined //成功时传给成功回调函数的值
    _this._reason = undefined //失败时失败函回调的原因
    _this.onResolvedCallbacks = [] //存放then成功的回调
    _this.onRejectedCallbacks = [] //存放then失败的回调

    function resolve(value){
        if (_this._status === Pending){
            _this._status = Resolve
            _this._value = value
            _this.onResolvedCallbacks.forEach(function(fn){
                typeof fn === 'function' && fn()
            })
        }
    }

    function reject(reason){
        if (_this._status === Pending){
            _this._status = Reject
            _this._reason = reason
            _this.onRejectedCallbacks.forEach(function(fn){
                typeof fn === 'function' && fn()
            })
        }
    }
    try{
        executor(resolve, reject)
    }catch(e){
        reject(e)
    }
    
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
    let _this = this,
    promise2

    if (_this._status === Resolve){
        promise2 = new MyPromise(function(resolve, reject){
            try{
                let x = onFulfilled(_this._value)
                resolve(x)
            }catch(e){
                reject(e)
            }
        })
        
    }else if (_this._status === Reject){
        promise2 = new MyPromise(function(resolve, reject){
            try{
                let x= onRejected(_this._reason)
                //如果上面处理了就不需要让下一个then的onRejected处理了
                //当前then本身没有传onRejected，活着throw了error的话会被下面的catch捕获
                resolve(x)
            
            }catch(e){
                reject(e)
            }
        })

    }else if (_this._status === Pending){
        promise2 = new MyPromise(function(resolve, reject){
            _this.onResolvedCallbacks.push(function(){
                try{
                    let x = onFulfilled(_this._value)
                    resolve(x)
                }catch(e){
                    reject(x)
                }
            })

            _this.onRejectedCallbacks.push(function(){
                try{
                    let x = onRejected(_this._reason)
                    resolve(x)
                }catch(e){
                    reject(x)
                }
            })

        })
    }

    return promise2
}

//测试代码
let p = new MyPromise(function(resolve, reject){
    resolve(1)
})

p.then(function(v){
    console.log(v)
})

let p2 = new MyPromise(function(resolve, reject){
    reject(2)
})

p2.then(null, function(v){
    console.log(v)
})

let p3 = new MyPromise(function(resolve, reject){
    setTimeout(function(){
        resolve(3)
    }, 2000)
})

p3.then(function(v){
    console.log(v)
}).then(function(){
    console.log('end')
})

let p4 = new MyPromise(function(resolve, reject){
    throw 'I am Error'
})

p4.then(null, function(v){
    console.log(v)
})

