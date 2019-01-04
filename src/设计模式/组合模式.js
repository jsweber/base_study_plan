//命令模式中介绍的Macro命令其实就是一种组合命令，其中的open....就是其子命令
//组合模式应用案例
//组合对象需要和叶子对象有一致的接口
class Folder{
    constructor(name){
        this.name = name
        this.parent = null
        this.files = []
    }
    add(file){
        file.parent = this
        this.files.push(file)
    }
    scan(){
        console.log('扫描文件夹: ' +this.name)
        this.files.forEach(f => {
            f.scan()
        })
    }
    remove(){
        //根节点或者游离节点
        if (!this.parent) return
        for (let files = this.parent.files, l = files.length-1; l >=0; l--){
            let file = files[l]
            if (file == this){
                files.splice(l, 1)
            }
        }
    }
}

class File{
    constructor(name){
        this.name = name
        this.parent = null
    }
    add(file){
        throw new Error('文件不能添加文件')
    }
    scan(){
        console.log('扫描文件: ' +this.name)
    }
    remove(){
        //根节点或者游离节点
        if (!this.parent) return
        for (let files = this.parent.files, l = files.length-1; l >=0; l--){
            let file = files[l]
            if (file == this){
                files.splice(l, 1)
            }
        }
    }
}

let folder1 = new Folder('视频')
let folder2 = new Folder('图片')
let file2 = new File('123.jpg')
let file1 = new File('bsn321.mp4')
folder1.add(file1)
folder2.add(file2)
let folder3 = new Folder('E')
folder3.add(folder1)
folder3.add(folder2)
folder3.scan()
//删除一个file1
file1.remove()
folder3.scan()

//组合模式将对象组合成树结构，表示“部分-整体” 的层次结构。除了用树表示外
//组合模式另一个好处是通过对象多态性表现，使得用户对单个对象和组合对象的使用具有一致性
//组合模式不是父子关系，而是聚合关系

