// https://juejin.cn/post/6844903625769091079

function resolvePromise(promise2, x, resolve, reject){
    if (promise2 === x){
        throw 'Chaining cycle detected for promise';
    }

    let called = false;

    if (x !== null && (typeof x === 'object' || typeof x === 'function')){
        const then = x.then;
        try {
            if (typeof then === 'function'){
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                });
            } else {
                if (called) return;
                called = true;
                resolve(x);
            }

        }catch(err) {
            if (called) return;
            called = true;
            reject(err);
        }
    } else {
        if (called) return;
        called = true;
        resolve(x);
    }
}

class Promise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined

        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
            if (this.state === 'pending'){
                this.state = 'fulfilled'
                this.value = value;

                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        const reject = reason => {
            if (this.state === 'pending'){
                this.state = 'reject';
                this.reason = reason;

                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        }catch(e) {
            reject(e);
        }
    }

    then(onResolved, onRejected) {
        onResolved = typeof onResolved === 'function' ? onResolved : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

        const promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled'){
                // promise a+ 规定 onResolve和onReject一定要异步调用
                setTimeout(() => {
                    try {
                        const x = onResolved(this.value);

                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e) {
                        reject(err);
                    }
                }, 0);
            } else if (this.state === 'reject'){
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e){
                        reject(e);
                    }
                }, 0)
            }
    
            if (this.state === 'pending'){
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onResolved(this.value);
    
                            resolvePromise(promise2, x, resolve, reject);
                        }catch(e) {
                            reject(err);
                        }
                    }, 0);
                });
    
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch(e){
                            reject(e);
                        }
                    }, 0);
                });
            }
        });

        return promise2;
    }
}

Promise.all = function(promiseList){}

Promise.race = function(promiseList){}

