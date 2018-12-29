//https://juejin.im/post/5c233a8ee51d450d5a01b712
//Promise 需要同步捕获，所以try catch要包裹回调

function Promise(fn){
    this._state = 0 //状态标记，一旦确定不可更改
    this._value = void(0) //存储返回的值
    doResolve(fn, this)
}

function doResolve(fn, self){
    var done = false//保证只执行一次
    try{
        fn(function(value){
            if(done) return
            done = true
            resolve(self, value)

        }, function(reason){
            if(done) return
            done = true
            rejec(self, reason)
        })
    }catch(err){
        if(done) return
        done = true
        reject(self, err)
    }
}

Promise.prototype.then = function(onFullfilled, onRejected){
    try{
        onFullfilled(value)
    }catch(err){
        reject(err)
    }
}

function resolve(self, newValue){
    try {

        if (newValue instanceof Promise){
            self._state = 3
            self._value = newValue
            finale(self)
            return
        }else if(typeof then === 'function'){
            doResolve(bind(then, newValue), self)
            return
        }
        self._state = 1
        self._value = newValue
    }catch(err){
        reject(self, err)
    }
}

function reject(self, newValue){
    self._state = 2
    self._value = newValue

    if (!self._handled){
        Promise._unhandledRejectionFn(self._value)
    }
}

function handle(self, deferred){


    setTimeout(function(){
        var cb = self._state === 1 ? deferred.onFullfilled : deferred.onRejected
        if (cb === null){
            (self._state === 1 ? resolve : reject)(deferred.promise, self._value)
            return
        }
        var ret
        try{
            ret = cb(self._value)
        }catch(e){
            reject(deferred.promise, e)
            return
        }
        resolve(deferred.promise, ref)
    }, 0)


}

function bind(fn, ctx){
    return function(){
        return fn.apply(ctx, [].slice.arguments)
    }
}


