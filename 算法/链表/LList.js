//节点与链表

class Node{
    constructor(name){
        if (!name){
            name = Date.now() + ''
            console.log('[Node warn] Node build need name')
        }
        this.name = name
        this.next = null
    }
}

class LList{
    constructor(){
        this.head = new Node('head')
    }
    push(name){
        let currentNode = this.head
        let addNode = new Node(name)

        while(currentNode.next){
            currentNode = currentNode.next
        }

        currentNode.next = addNode
        return addNode
    }

    find(name){
        if (!name){
            console.log('[LList warn] need name')
            return null
        }

        let currentNode = this.head

        while(currentNode.name !== name && currentNode.next){
            currentNode = currentNode.next
        }
        //到最后一个还是没找到
        if (currentNode.name !== name && !currentNode.next){
            return null
        }
        return currentNode
    }
    display(){
        let currentNode = this.head
        let r = []

        while(currentNode){
            r.push(currentNode.name)
            currentNode = currentNode.next
        }
        console.log(r)
        return r
    }
    //name表示新node，target表示新node前的node
    insertAfter(name, target){
        let node = new Node(name)
        let t = this.find(target)
        let nowNextNode = t.next

        if (!t){
            throw 'no such target'
        }

        t.next = node
        node.next = nowNextNode
        
        return true
    }

    findPrev(name){
        let currentNode = this.head

        while(!!currentNode.next && currentNode.next.name !== name){
            currentNode = currentNode.next
        }

        if (!currentNode.next){
            return null
        }
        return currentNode
    }

    remove(name){
        let prevNode = this.findPrev(name)
        let currentNode = prevNode.next

        if (!currentNode || !prevNode){
            return false
        }

        prevNode.next = currentNode.next
        return true
    }


}
