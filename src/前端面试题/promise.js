// https://juejin.cn/post/6844903625769091079

function resolvePromise(promise2, x, resolve, reject){

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
        const promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled'){
                const x = onResolved(this.value);

                resolvePromise(promise2, x, resolve, reject);
            } else if (this.state === 'reject'){
                const x = onRejected(this.reason);

                resolvePromise(promise2, x, resolve, reject);
            }
    
            if (this.state === 'pending'){
                this.onResolvedCallbacks.push(() => {
                    const x = onResolved(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                });
    
                this.onRejectedCallbacks.push(() => {
                    const x = onRejected(this.reason);

                    resolvePromise(promise2, x, resolve, reject);
                });
            }
        });

        return promise2;
    }
}

