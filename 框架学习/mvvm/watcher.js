class Watcher{
    /**
     * new Watcher(vm, exp, function(v, ov){
            updateFn && updateFn(node, v, ov)
        })
    */
    constructor(vm, expOrFn, cb){
        this.cb = cb
        this.vm = vm
        this.expOrFn = expOrFn
        this.depIds = Object.create(null)

        if (typeof expOrFn === 'function'){
            this.getter = expOrFn
        }else {
            this.getter = this.parseGetter(expOrFn)
        }
        this.value = this.get()//第一次调用，同时成为该属性的观察者
    }

    update(){
        this.run()
    }

    run(){
        var value = this.get()
        let oldValue = this.value
        if (value !== oldValue){
            this.value = value
            this.cb.call(this.vm, value, oldValue)
        }
    }

    addDep(dep){
        //因为每次使用属性值，这个函数都会运行一遍，为了避免dep重复加入watcher，所以需要判断一下
        if (!this.depIds[dep.id]){
            dep.addSub(this)//把watcher实例加到dep中，监听属性的变化
            this.depIds[dep.id] = dep
        }
    }

    get(){
        Dep.target = this
        let value = this.getter.call(this.vm, this.vm)//触发相应属性的get，然后把watch加到属性的dep里，注意每个属性都有自己的Dep实例
        Dep.target = null
        return value
    }

    parseGetter(exp){
        if (!/[^\w.$]/.test(exp)) return
        let attrs = exp.split('.')

        return function(obj){
            for (let i = 0; i < attrs.length; i++){   
                if (!obj) return
                obj = obj[attrs[i]] //注意，由于数据劫持，看上去访问的是data[key]，实际上返回的是定义key时闭包保存的val
            }
            return obj
        }
    }
}

