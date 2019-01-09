class MVVM{
    constructor(options){
        this.$options = options || {}
        let data = this._data = this.$options.data

        Object.keys(data).forEach(k => {
            this._proxyData(k)
        })
        this._initComputed()

        observe(data)
        this.$compile = new Compile(options.el || document.body, this)
        
    }

    $watch(key, cb){
        new Watcher(this, key, cb)
    }

    _proxyData(key){
        //vm.xxx -> vm._data.xxx
        let self = this
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: false,
            get(){
                return self._data[key]
            },
            set(val){
                self._data[key] = val
            }
        })
    }

    _initComputed(){
        //计算属性不放到模版中，即使监听的data属性变了，也不会触发，这点vue也一样
        let computed = this.$options.computed,
        self = this

        if (typeof computed == 'object'){
            Object.keys(computed).forEach(k => {
                Object.defineProperty(self, k, {
                    get: typeof computed[k] == 'function' ? computed[k]: computed[k].get,
                    set(){}
                })
            })
        }
    }
}