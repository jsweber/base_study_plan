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
}

let bst = new BST()
bst.insert(10)
