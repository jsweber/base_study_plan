//https://segmentfault.com/a/1190000002928166

var Router = {
    routes: [],//保存当前已注册的路由
    mode: null,
    root: '/',//根路径
    config(options){
        this.mode = options && options.mode && options.mode == 'history' && !!(history.pushState) ? 'history' : 'hash'
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/'
        return this
    },
    getFragment(){
        let fragment = ''
        if (this.mode == 'history'){
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search))
            fragment = fragment.replace(/\?(.*)$/, '')
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment
        }else {
            let match = window.location.href.match(/#(.*)$/)
            fragment = match ? match[1] : ''
        }
        return this.clearSlashes(fragment)
    },
    clearSlashes(path){
        return path.toString().replace(/^\//, '').replace(/\/$/, '')
    },
    add(re, handler){
        if (typeof re == 'function'){
            handler = re
            re = ''
        }
        this.routes.push({re, handler})
        return this
    },
    // 删除只发生在通过一个传递匹配的正则表达式或传递handler参数给add方法
    remove(param){
        for (let i = 0,r; i < this.routes.length; i++){
            r = this.routes[i]
            if (param == r.handler || r.re.toString() === param.toString()){
                this.routes.splice(i, 1)
                return this
            }
        }
        return this
    },
    flush(){
        this.routes = []
        this.mode = null
        this.root = '/'
        return this
    },
    check(f){
        let fragment = f || this.getFragment()
        for (let i = 0; i < this.routes.length; i++){
            let match = fragment.match(this.routes[i].re)
            if (match){
                match.shift()
                this.routes[i].handler.apply(null, match)
                return this
            }
        }
        return this
    },
    listen(){
        //window.addEventListener('load', this.refresh.bind(this), false);
        //window.addEventListener('hashchange', this.refresh.bind(this), false);
        //https://developer.mozilla.org/zh-CN/docs/Web/Events/popstate
        //https://developer.mozilla.org/zh-CN/docs/Web/Events/hashchange
        let self = this
        let current = this.getFragment()
        let fn = () => {
            if (current != self.getFragment()){
                current = self.getFragment()
                self.check(current)
            }
        }
        clearInterval(this.timer)
        this.timer = setInterval(fn, 100)
        return this
    },
    navigate(path){
        path = path || ''
        if (this.mode === 'history'){
            history.pushState(null, null, this.root+this.clearSlashes(path))
        }else{
            if (/#(.*)$/.test(window.location.href)){
                window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path
            }
        }
        return this
    }
}

Router
.add(/about/, function() {
    console.log('about');
})
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    console.log('default');
})
.check('/products/12/edit/22').listen();

// forwarding
Router.navigate('/about');

