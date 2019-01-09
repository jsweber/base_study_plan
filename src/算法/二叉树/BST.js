const Node = require('./Node')

class BST{
    constructor(){
        this.root = null

    }
    insert(data){
        let n = new Node(data, null, null)

        if (this.root == null){
            this.root = n
        }else {
            let parent = null,
                curr = this.root

            while(true){
                parent = curr
                if (data < curr.data){
                    curr = curr.left
                    if (curr == null){
                        parent.left = n
                        break
                    }
                }else {
                    curr = curr.right
                    if (curr == null){
                        parent.right = n
                        break
                    }
                }
            }
        }
    }

    inOrder(node, fn){
        //中序遍历/升序遍历
        //左节点-》当前节点 -》右节点
        if(node != null && fn){
            this.inOrder(node.left, fn)
            fn(node)
            this.inOrder(node.right, fn)
        }
    }
    //先序遍历
    //当前节点 -》左节点 -》 右节点
    preOrder(node, fn){
        if(node != null && fn){
            fn(node)
            this.preOrder(node.left, fn)
            this.preOrder(node.right, fn)
        }
    }
    //后序遍历
    //左节点 -》 右节点 -》 当前节点
    postOrder(node, fn){
        if(node != null && fn){
            this.postOrder(node.left, fn)
            this.postOrder(node.right, fn)
            fn(node)
        }
    }

    findMin(){
        let cur = this.root
        while(cur.left !== null){
            cur = cur.left
        }
        return cur.data
    }

    findMax(){
        let cur = this.root
        while(cur.right !== null){
            cur = cur.right
        }
        return cur.data
    }

    findNode(data){
        let cur = this.root
        while(cur !== null){
            if (cur.data == data){
                return cur
            }
            if (data < cur.data){
                cur = cur.left
            }else if (data > cur.data){
                cur = cur.right
            }
        }
        return null
    }
}

let bst = new BST()
bst.insert(10)
bst.insert(7)
bst.insert(12)
bst.insert(8)
bst.insert(1)
bst.insert(99)
bst.inOrder(bst.root, show)
console.log('-----------------')
bst.preOrder(bst.root, show)
console.log('-----------------')
bst.postOrder(bst.root, show)

function show(node){
    console.log(node.data)
}

console.log('min', bst.findMin())
console.log('max', bst.findMax())
console.log('find', bst.findNode(10))
