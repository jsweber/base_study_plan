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

                val = v //这里用闭包让val不会消失，同时get也是返回v，所以不存在data[key]为基本类型时复制无效的情况，因为本身值已经和val挂靠了
                console.log(`new: ${v}; old: ${val}`)
                childObj = observe(val) //如果给的是引用类型，则需要重新监听新值
                dep.notify()
            }
        })
    }

}

