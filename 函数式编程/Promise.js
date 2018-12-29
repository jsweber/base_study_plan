//https://juejin.im/post/5c233a8ee51d450d5a01b712
//Promise 需要同步捕获，所以try catch要包裹回调

function Promise(fn){
    this._state = 0 //状态标记，一旦确定不可更改
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
        self._state = 1
    }catch(err){
        reject(self, err)
    }
}

function reject(self, newValue){
    self._state = 2

    if (!self._handled){
        Promise._unhandledRejectionFn(self._value)
    }
}



