//又名发布-订阅者模式，js中又称事件模式
//主要解决一对多的问题

/**
 * 案例：
 * 当有新楼盘出售时，售楼处就遍历名单，给买家发短信
 * 不同的买家对不同兴趣的房价的房子感兴趣，所有客户列表根据一个key值分类
*/
let saleOffices = {
    clientList:{}
}

saleOffices.listen = function(key, fn){
    if (this.clientList[key] == undefined){
        this.clientList[key] = []
    }
    this.clientList[key].push(fn)
    return this
}

saleOffices.trigger = function(){
    let key = [].shift.call(arguments)
    let fns = this.clientList[key]

    if (!fns || fns.length == 0){
        return false
    }
    for (let fn, i = 0; fn = fns[i++];){
        fn.apply(this, arguments)
    }
}

saleOffices.listen('price88888', function(price){
    console.log(price)
})

saleOffices.listen('proce9999', function(price){
    console.log(price)
})

saleOffices.trigger('price88888', 8888)
saleOffices.trigger('proce9999', 9999)

//更通用的代码
var event = {
    clientList : {},
    listen: function(key, fn){
        if (!this.clientList[key]){
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger(){
        let key = [].shift.call(arguments)
        let fns = this.clientList[key]

        if (!fns || fns.length == 0){
            return false
        }
        for (let fn, i = 0; fn = fns[i++];){
            fn.apply(this, arguments)
        }
    },
    remove(key, fn){
        let fns = this.clientList[key]
        if (!fns) return false
        if (!fn){
            fns && (fns.length = 0)
        }else {
            for (let i = fns.length-1; i >=0; i--){
                let _fn = fns[i]
                if(_fns == fn){
                    fns.splice(i,1)
                }
            }
        }
    }
}
//给对象安装
let installEvent = function(obj){
    for (var i in event){
        obj[i] = event[i]
    }
}

//test
let salesOffices2 = {}
installEvent(salesOffices2)
salesOffices2.listen('price88888', function(price){
    console.log(price)
})

salesOffices2.listen('proce9999', function(price){
    console.log(price)
})

salesOffices2.trigger('price88888', 8888)
salesOffices2.trigger('proce9999', 9999)

//更通用的方法
let event = (function(){
	let clientList = {}
	
	let listen = function(key, fn){
		if (!clientList[key]){
			clientList[key] = []
		}

		clientList[key].push(fn)
	}

	let trigger = function(){
		let key = [].shift.call(arguments)
		let fns = clientList[key]

		if (!fns || fns.length === 0){return false}
		for (let i = 0; i < fns.length; i++){
			fns[i].apply(this, arguments)
		}
	}

	let remove = function(key, fn){
		let fns = clientList[key]
		if (!fns || fns.length === 0){return false}
		if (!fn){
			fns.length = 0
		}else {
			for (let l = fns.length-1, _fn; l>=0 && (_fn = fns[l--]); ){
				if (_fn ==  fn){
					fns.splice(l, 1)
				}
			}
		}
		
	}

	return {
		listen,
		trigger,
		remove
	}
})()

//支持先发布后绑定的，创建命名空间
let Event = (function(){
    let global = this,
        Event,
        _default = 'default'

    Event = function(){
        let _listen,
            _trigger,
            _remove,
            _slice = Array.prototype.slice,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            namespaceCache = {},
            _create,
            find,
            each = function(ary, fn){
                let ret;
                for (let i = 0, l = ary.length; i < l; i++){
                    ret = fn.call(ary[i], i, ary[i])
                }
                return ret
            }
            _listen = function(key, fn, cache){
                if (!cache[key]){
                    cache[key] = []
                }
                cache[key].push(fn)
            }
            _remove = function(key, cache, fn){
                let fns = cache[key]
                if (!fns){
                    return false
                }

                if (!fn){
                    cache[key] = []
                }else {
                    for (let l = fns.length - 1; l >= 0; l--){
                        if (fns[l] == fn){
                            fns.splice(l, 1)
                        }
                    }
                }
            }
            _trigger = function(){
                let cache = _shift.call(arguments)
                let key = _shift.call(arguments)
                let args = _slice.call(arguments)
                let stack = cache[key]
                let self = this

                if (!stack || !stack.length){
                    return false
                }

                return each(stack, function(){
                    return this.apply(self, args)
                })

            },
            _create = function(namespace){
                namespace = namespace || _default
                let cache = {},
                    offlineStack = [],//离线事件
                    ret = {
                        listen(key, fn, last){
                          _listen(key, fn, cache) 
                          if (offlineStack == null){
                              return
                          } 
                          if (last == 'last'){
                              offlineStack.length && offlineStack.pop()() //执行最后一条
                          }else {
                              each(offlineStack, function(){
                                  this()
                              })
                          }
                          offlineStack = null //对于先发布后监听的事件，只有第一个监听的订阅者才能获取离线信息
                        },
                        one(key, fn, last){
                            //清空当前cache下key中的监听函数
                            _remove(key ,cache)
                            //再监听
                            this.listen(key, fn, last)
                        },
                        remove(key, fn){
                            _remove(key, cache, fn)
                        },
                        trigger(){
                            let self = this, args, fn
                            _unshift.call(arguments, cache)
                            args = arguments
                            fn = function(){
                                return _trigger.apply(self, args)
                            }

                            if (offlineStack){
                                //离线模式
                                return offlineStack.push(fn)
                            }

                            return fn()
                        }
                    }

                    return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace]=ret) : ret
                }

                return {
                    create: _create,
                    one(key, fn, last){
                        let event = this.create()
                        event.one(key, fn, last)
                    },
                    listen(key, fn, last){
                        let event = this.create()
                        event.listen(key, fn, last)
                    },
                    remove(key, fn){
                        let event = this.create()
                        event.remove(key, fn)
                    },
                    trigger(){
                        var event = this.create()
                        event.trigger.apply(this, arguments)
                    }
                }
    }()

    return Event

})()
//unit test
//先trigger再listen
Event.create('f').trigger('tag1', 'hello11111')
Event.create('f').listen('tag1', function(...a){
	console.log(a)
}) //['hello11111']

Event.create('a1').listen('tag', function(...arr){
	console.log(arr[0])
})
Event.create('a1').listen('tag', function(...arr){
	console.log(arr[1])
})
Event.create('a1').trigger('tag', 1,2,3) //[1,2,3]  1   2

Event.listen('tag', function(...a){
	console.log(a)
})
Event.trigger('tag', 'hello') //['hello']
