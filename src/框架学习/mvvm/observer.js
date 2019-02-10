class Observer{
    constructor(data){
        this.data = data
        this.walk(data)
    }

    walk(data){
        Object.keys(data).forEach(k => {
            this.convert(k, data[k])
        })
    }

    convert(key, val){
        this.defineReactive(this.data, key, val)
    }

    defineReactive(data, key, val){
        let dep = new Dep()
        let childObj = observe(val)//如果这是个引用类，就观察

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get(){
                Dep.target && dep.depend()
                return val
            },
            set(v){
                if (v === val) return
                console.log(`new: ${v}; old: ${val}`)
                val = v //这里用闭包让val不会消失
                
                childObj = observe(val) //如果给的是引用类型，则需要重新监听新值
                dep.notify()
            }
        })
    }

}

