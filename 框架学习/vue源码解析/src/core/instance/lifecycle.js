//明确一个概念Vue构造出来的是组件，一个组件有多个vnode组成，组件本身也会挂在到父组件的某个vnode下面

const activeInstance = null

export function lifecycleMixin(Vue){
    Vue.prototype._update = function(vnode, hydrating){
        //保存先前的实例挂载节点，虚拟dom和实例
        const vm = this
        const prevEl = vm.$el
        const prevVnode = vm._vnode
        const prevActiveInstance = activeInstance
        //给上面变量赋新值
        activeInstance = vm
        vm._vnode = vnode
        //__patch__是根据运行的平台注入进去的
        if (!prevVnode){
            //这里代表不存在旧虚拟节点，所以是初始化的操作
            vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false)
        }else {
            //根因虚拟节点
            vm.$el = vm.__patch__(prevVnode, vnode)
        }

        activeInstance = prevActiveInstance

        if (prevEl){
            prevEl.__vue__ = null
        }

        if (vm.$el){
            vm.$el.__vue__ = vm
        }

        if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode){
            //这样就能判断父组件是高阶组件了？
            //ans: 对于_vnode和$vnode的理解在core/instance/render.js的line19和line22
            //vm._vnode = null // the root of the child tree
            //_vnode其实就是组件的根虚拟节点；$vnode其实就是父节点
            //vm.$parent是在initLifecycle方法中找到的，非抽象父节点
            //const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
            
            vm.$parent.$el = vm.$el
        }
    }

    Vue.prototype.$forceUpdate = function(){
        const vm = this
        if (vm._watcher){
            vm._watcher.update()
        }
    }



}
