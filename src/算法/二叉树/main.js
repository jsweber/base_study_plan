const BST = require('./BST')

let bst = new BST()
bst.insert(10)
bst.insert(7)
bst.insert(12)
bst.insert(8)
bst.insert(1)
bst.insert(99)
bst.inOrder(bst.root, show)
// bst.remove(12)
// bst.remove(9)
bst.update(10)
bst.update(10)
bst.update(12)
bst.update(8)
console.log('-----------------')
bst.inOrder(bst.root, show)
// console.log('-----------------')
// bst.preOrder(bst.root, show)
// console.log('-----------------')
// bst.postOrder(bst.root, show)

function show(node){
    console.log(`${node.data}: ${node.count}`)
}

// console.log('min', bst.findMin())
// console.log('max', bst.findMax())
// console.log('find', bst.findNode(10))
