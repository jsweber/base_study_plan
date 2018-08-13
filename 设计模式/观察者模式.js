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

