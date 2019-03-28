class BST{
    constructor(root){
        this.root = root
    }

    size(){
        if (this.root === null) return 0
        return this.root.N
    }

    nodeSize(node){
        if (node === null) return 0
        return node.N
    }

    get(key){
        return this.getByRoot(this.root, key)
    }

    getByRoot(node, key){
        if (node === null) return null
        if (node.key < key) return this.getByRoot(node.right, key)
        if (node.key > key) return this.getByRoot(node.left, key)
        return node.val
    }

    put(key, val){
        this.root = this.putByRoot(this.root, key, val)
    }

    putByRoot(node, key, val){
        if (node === null) return new Node(key, val, 1)
        if (node.key < key) node.right = this.putByRoot(node.right, key, val)
        if (node.key > key) node.left = this.putByRoot(node.left, key, val)
        if (node.key === key){
            node.val = val
        }
        node.N = this.nodeSize(node.left) + this.nodeSize(node.right) + 1
        return node
    }

    min(){
        if (this.root === null) return null
        let cur = this.root
        while(cur && cur.left){
            cur = cur.left
        }

        return cur
    }

    max(){
        if (this.root === null) return null
        let cur = this.root
        while(cur.right){
            cur = cur.right
        }

        return cur
    }

    floor(key){
        let x = this._floor(this.root, key)
        if (x === null) return null
        return x.key
    }

    _floor(node, key){
        if (!node) return null
        let cmp = node.key - key
        if (cmp > 0) return this._floor(node.left, key)
        if (cmp == 0) return node
        let t = this._floor(node.right, key)
        if (t) return t 
        return node
    }

    ceil(key){
        let x = this._ceil(this.root, key)
        if (x === null) return null
        return x.key
    }

    _ceil(node, key){
        if (node === null) return null

        if (node.key === key) return node
        if (node.key < key) return this._ceil(node.right, key)
        let x = this._ceil(node.left, key)
        if (x === null) return x
        return node
    }

    select(){

    }

    rank(){
        
    }

}

class Node{
    constructor(key, val, N){
        this.key = key
        this.val = val
        this.N = N // size(node.left) + size(node.right) + 1
        this.left = this.right = null
    }
}

