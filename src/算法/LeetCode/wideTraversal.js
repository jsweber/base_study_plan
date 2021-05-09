// 广度优先算法
const wideTraversal = node => {
    if (!node) return []
    const queue = [], nodes = []

    queue.push(node)

    while(queue.length > 0){
        const item = queue.shift()

        nodes.push(item)

        for (let i = 0; i < item.children.length; i++){
            queue.push(item.children[i])
        }
    }

    return nodes
}
