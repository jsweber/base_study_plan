// https://juejin.cn/post/6844903625769091079

class Promise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined

        const resolve = value => {
            if (this.state === 'pending'){
                this.state = 'fulfilled'
                this.value = value;
            }
        }

        const reject = reason => {
            if (this.state === 'pending'){
                this.state = 'reject';
                this.reason = reason;
            }
        }

        try {
            executor(resolve, reject);
        }catch(e) {
            reject(e);
        }
    }

    then(onResolved, onRejected) {
        if (this.state === 'fulfilled'){
            onResolved(this.value);
        } else if (this.state === 'reject'){
            onRejected(this.reason);
        }
    }
}

