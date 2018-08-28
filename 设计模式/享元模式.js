//享元（flyweight）模式 fly这里是苍蝇的意思，意为绳量级
//享元模式主要是性能优化，要求将对象属性划分为内部状态与外部状态，减少共享对象的数量
//比如内衣厂有500套男士内衣，500太女士内衣
//现在要拍照展示，显然不需要500个男模特和500个女模特，只要一个男模特一个女模特就够了
//性别是Model类的内部状态，不需要变化，可以被共享；衣服是外部状态，会不断变化

//案例
let id = 0
window.startUpload = function(uploadType, files){
    for (let i = 0, file; file = files[i++];){
        let uploadObj = uploadManger.add(++id, uploadType, file.fileName, file.fileSize)
    }
}

class Upload{
    constructor(uploadType){
        this.uploadType = uploadType
    }

    delFile(id){
        //这个方法需要知道Upload代管在别处的属性
        uploadManger.setExternalState(id, this)
        if (this.fileSize < 3000){
            return this.dom.parentNode.removeChild(this.dom)
        }
        if (window.confirm('确定要删除'+this.fileName)){
            return this.dom.parentNode.removeChild(this.dom)
        }
    }
}


let UploadFactory = (function(){
    let createFlyWeightObjs = {}

    return {
        create: function(uploadType){
            //最后只会根据uploadType创建上传组件，而不是文件数量
            if (createFlyWeightObjs[uploadType]){
                return createFlyWeightObjs[uploadType]
            }
            return createFlyWeightObjs[uploadType] = new Upload(uploadType)
        }
    }
})()

let uploadManger = (function(){
    let uploadDatabase = {}

    return {
        add(id, uploadType, fileName, fileSize){
            //把原先绑定在Upload上的属性，用uploadDatabase代管，通过id去获取
            let flyWeightObj = UploadFactory.create(uploadType)

            let dom = document.createElement('div')
            dom.innerHTML = `<span>文件名：${fileName}文件大小：${fileSize}</span><button class="delFile">删除</button>`
            dom.querySelector('.delFile').onclick = function(){
                flyWeightObj.delFile(id)
            }
            document.body.appendChild(dom)
            uploadDatabase[id] = {
                fileName,
                fileSize,
                dom
            }
            return flyWeightObj
        },
        setExternalState(id, flyWeightObj){
            //根据id把代管的属性装载它身上
            let uploadData = uploadDatabase[id]
            for (let i in uploadData){
                flyWeightObj[i] = uploadData[i]
            }
        }
    }
})()

//unit test
startUpload('plugin', [
    {
        fileName: '1.txt',
        fileSize: 1000
    },
    {
        fileName: '2.txt',
        fileSize: 3000
    },
    {
        fileName: '3.txt',
        fileSize: 5000
    }
])

startUpload('flash', [
    {
        fileName: '4.html',
        fileSize: 1000
    },
    {
        fileName: '5.html',
        fileSize: 3000
    },
    {
        fileName: '6.txt',
        fileSize: 5000
    }
])

//适用场景
/**
 * 注：内部状态为值比较少的参数，外部状态位每个对象都不同的参数
 * 使用大量的相似对象
 * 由于使用大量对象，造成很大的内存开销
 * 对象的大多数状态都可以变成外部状态
 * 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象
*/

//对象池
let toolTipFactory = (function(){
    let toolTipPool = []
    return {
        create(){
            if (toolTipPool.length === 0){
                let div = document.createElement('div')
                document.body.appendChild(div)
                return div
            }else {
                return toolTipPool.shift()
            }
        },
        recover(dom){
            return toolTipPool.push(dom)
        }
    }
})()

let ary = []
for (let i = 0, str; str = ['A', 'B'][i++];){
    let dom = toolTipFactory.create()
    dom.innerHTML = str
    ary.push(dom)
}

//回收dom
for(let i = 0; i < ary.length; i++){
    toolTipFactory.recover(ary[i])
}

//再创建
for (let i = 0, str; str = ['A', 'B', 'C', 'D'][i++];){
    let dom = toolTipFactory.create()
    dom.innerHTML = str
    ary.push(dom)
}

//更通用的对象池，可以自定义创建过程
let ObjectFactoryPool = function(createFn){
    let pools = []
    return {
        create(){
            let obj = pools.length === 0 ? createFn.apply(this, arguments) : pools.shift()
            return obj 
        },
        recover(o){
            pools.push(o)
        }
    }
}

let iframeFactory = ObjectFactoryPool(function(){
    let iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    iframe.onload = function(){
        iframe.onload = null
        iframeFactory.recover(iframe)
    }
    return iframe
})

let if1 = iframeFactory.create()
if1.src = 'http://baidu.com'

let if2 = iframeFactory.create()
if2.src = 'http://wangyi.com'

//对象池和享元模式有些相似，但是其没有分离内部状态和外部状态，所以不是同一个东西
