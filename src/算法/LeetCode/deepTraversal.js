// 深度优先算法
const deepTraversal = (node, list = []) => {
    if (!node) return

    list.push(node)
    if (node.children){
        for(let i = 0; i < node.children.length; i++){
            deepTraversal(node.children[i]. list)
        }
    }

    return list
}
