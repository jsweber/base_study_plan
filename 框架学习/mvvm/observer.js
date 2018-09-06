class Observer{
    constructor(data){
        this.data = data
        this.walk(data)
    }

    walk(data){
        Object.keys(data).forEach(k => {
            this.convert(key, data[key])
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

                val = v
                console.log(`new: ${v}; old: ${val}`)
                childObj = observe(val) //如果给的是引用类型，则需要重新监听新值
                dep.notify()
            }
        })
    }

}

function observe(d, vm){
    if (!d || typeof d !== 'object') return
    return new Observer(d)
}

let uid = 0
//这里的sub|s其实就是Watcher类实例
class Dep{
    constructor(){
        this.id = uid++
        this.subs = []
    }
    static target = null

    notify(){
        this.subs.forEach(s => {
            s.update()
        })
    }

    depend(){
        Dep.target.addDep(this)
    }

    addSub(s){
        this.subs.push(s)
    }

    removeSub(sub){
        let _i = this.subs.indexOf(sub)
        if (!~_i){
            this.subs.splice(index, 1)
        }
    }
}

if (module){
    module.exports = {
        Dep,
        Observer
    }
}
