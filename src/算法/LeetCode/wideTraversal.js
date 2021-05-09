// 广度优先算法
const wideTraversal = (node) => {
    let nodes = [], i = 0
    while(node !== null){
        nodes.push(node)
        node = nodes[i++]
        for (let i = 0; i < node.children.length; i++){
            nodes.push(node.children[i])
        }
    }

    return nodes
}


