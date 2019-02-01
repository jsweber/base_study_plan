let uid = 0
//这里的sub|s其实就是Watcher类实例
class Dep{
    constructor(){
        this.id = uid++
        this.subs = []
    }

    notify(){
        this.subs.forEach(s => {
            s.update()
        })
    }

    depend(){
        Dep.target.addDep(this)//这里的this就是Watcher中的addDep的参数dep
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

Dep.target = null
