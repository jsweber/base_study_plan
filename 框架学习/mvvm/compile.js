class Compile{
    constructor(el, vm){
        this.$vm = vm
        this.$el = this.isElementNode(el) ? el: document.querySelector(el)

        if (this.$el){
            this.$fragment = this.node2Fragment(this.$el)
            this.init()
            this.$el.appendChild(this.$fragment)
        }
    }

    node2Fragment(el){
        let fragment = document.createDocumentFragment(), child
        while(child = el.firstChild){
            fragment.appendChild(child)
        }
        return fragment
    }

    init(){
        this.compileElement(this.$fragment)
    }

    compileElement(el){
        //text和元素节点的统一入口
        let children = el.childNodes,
        self = this,
        pattern = /\{\{(.*)\}\}/

        for (let i = 0; i < children.length; i++){
            let node = children[i]
            if (self.isElementNode(node)){
                self.compile(node)
                let childNode = node.childNodes
                if (childNode && childNode.length > 0){
                    self.compileElement(el)
                }
                
            }else if (self.isTextNode(node) && pattern.test(node.textContent)){
                self.compileText(node, RegExp.$1)
            }
        }
    }

    compile(node){
        //处理元素节点的 事件指令， 命令指令
        let attrs = node.attributes,
        self = this,
        attr

        for (let i=0; i < attrs.length; i++){
            attr = attrs[i]
            if (self.isDirective(attr.name)){
                let dir = attr.name.substr(2) //v-on是事件属性，v-custname(v-html)是普通指令
                if (self.isEventDirective(dir)){
                    compileUtil.eventHandler(node, self.$vm, attr.value, dir)
                }else {
                    compileUtil[dir] && compileUtil[dir](node, self.$vm, attr.value)
                }

                node.removeAttribute(attr.name)//不要把模版命令放到生成的html中
            }

        }

    }

    compileText(node, exp){
        compileUtil.text(node, this.$vm, exp)
    }

    isDirective(dir){
        return dir.indexOf('v-') > 0
    }

    isEventDirective(dir){
        return dir.indexOf('on')> 0
    }

    isElementNode(node){
        return node.nodeType == 1
    }

    isTextNode(node){
        return node.nodeType == 3
    }

}

let compileUtil = {
    text(node, vm, exp){
        this.bind(node, vm, exp, 'text')
    },

    html(node, vm, exp){
        this.bind(node, vm, exp, 'html')
    },

    model(node, vm, exp){
        this.bind(node, vm, exp, 'model')
        let self = this,val = this._getVMVal(vm, exp)
        node.addEventListener('input', function(e){
            //target 触发事件的节点， 可用于事件委托，父节点绑定事件，用子节点触发父节点的事件，此时，target是子节点，currentTarget是父节点；currentTarget 监听事件的对象
            let newValue = e.target.value
            if (val !== newValue){
                self._setVMVal(vm, exp, newValue)
                val = newValue
            }
        }, false)
    },

    class(node, vm, exp){
        this.bind(node, vm, exp, 'class')
    },

    bind(node, vm, exp, dir){
        let updateFn = updater[dir + 'Updater']
        updateFn && updateFn(node, this._getVMVal(vm, exp))

        new Watcher(vm, exp, function(v, ov){
            updateFn && updateFn(node, v, ov)
        })
    },

    eventHandler(node, vm, exp, dir){
        let eventType = dir.split(':')[1],//v-on:click="handler"
            fn = vm.$options.methods && vm.$options.methods[exp]
        
        if (eventType && fn)
            node.addEventListener(eventType, fn.bind(vm), false)
    },

    _getVMVal(vm, exp){
        let keys = exp.split('.'), val = vm
        leys.forEach(k => {
            val = val[k]
        })
        return val
    },

    _setVMVal(vm, exp, value){
        let val = vm, keys = exp.split('.')
        keys.forEach((k, i) => {
            if (i < keys.length - 1){
                val = val[k]
            }else {
                val[k] = value
            }
        })
    }
}

let updater = {
    textUpdater(node, value){
        //textContent包括了子元素的text内容
        node.textContent = typeof value == 'undefined' ? '' : value
    },

    htmlUpdater(node, value){
        node.innerHTML = typeof value == 'undefined' ? '' : value
    },

    classUpdater(node, value, oldValue){
        if (value && oldValue && value !== oldValue){
            node.classList.remove(oldValue)
            node.classList.add(value)
        }
    },

    modelUpdater(node, value){
        node.value = typeof value == 'undefined' ? '' : value
    }
}
