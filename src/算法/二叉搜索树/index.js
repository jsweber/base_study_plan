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
    //按从小到大的顺序，找到排名第k的节点（0开始）
    select(k){
        return this._select(this.root, k).key
    }
    //null的情况：比如说k太大超过了node总数
    _select(node, k){
        if (node == null) return null

        let n = this.nodeSize(node.left)
        if (n === k) return node
        if (n > k) return this._select(node.left, k) 
        else return this._select(node.right, n - k - 1)
    }

    //按从小到大的顺序，节点为key在二叉搜索树中的排名（0开始）
    rank(key){
        return this._rank(this.root, key)
    }

    _rank(node, key){
        if (node === null) return 0

        let t = this.nodeSize(node.left)
        if (node.key === key) return t
        if (node.key > key) return this._rank(node.left, key)
        if (node.key < key) return this._rank(node.right, key) + t + 1
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

