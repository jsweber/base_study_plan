//https://cloud.tencent.com/developer/article/1147847
//图算法，个人觉得比《算法JavaScript描述》这本书描述的好
//图的主要内容：点，边，广度遍历，深度遍历， 最短路径，拓扑排序（只能应用于有向五环图）
class Graph{
    constructor(){
        this.vertices = []
        this.adjList = new Map()
        this.time = 0 //记录访问使用时间，不重要
    }

    initialColor(){
        let color = []
        for (var i = 0; i < this.vertices.length; i++){
            color[this.vertices[i]] = 'white'
        }
        return color
    }

    addVertices(v){
        this.vertices.push(v)
        this.adjList.set(v, [])
    }

    addEdge(v, w){
        let adjList = this.adjList
        adjList.set(v, [...adjList.get(v), w])
        adjList.set(w, [...adjList.get(w), v])
    }

    bfs(v, fn){
        let queue = [],
        color = this.initialColor(),
        //d是你传入的顶点v距离每一个顶点的距离（这里的距离仅为边的数量）
        //pred就是当前顶点沿着路径找到的前一个顶点是什么。没有就是null
        d = {},
        pred = {}

        queue.push(v)

        for (let i = 0; i < this.vertices.length; i++){
            d[this.vertices[i]] = 0
            pred[this.vertices[i]] = null
        }

        while(queue.length > 0){
            let c = queue.shift(),
            neighbors = this.adjList.get(c)
            color[c] = 'grey'
            
            for (let i = 0; i < neighbors.length; i++){
                let w = neighbors[i]
                if (color[w] === 'white'){
                    color[w] = 'grey'
                    d[w] = d[c] + 1
                    pred[w] = c
                    queue.push(w)
                }
            }

            color[c] = 'black'
            fn && fn(c, neighbors)
        }
        return {
            distances: d,
            predecessors: pred
        }
    }

    dfs(){
        //d发现一个顶点的所用的时间， f完全探索一个定点所用的时间， p前朔点
        let color = this.initialColor(), d = {}, f = {}, p = {}
        for (let i = 0; i < this.vertices.length; i++){
            let v = this.vertices[i]
            f[v] = 0
            d[v] = 0
            p[v] = null
        }

        for (let i = 0; i < this.vertices.length; i++){
            let v = this.vertices[i]
            if (color[v] === 'white'){
                this.dfsVisit(v, color, d, f, p)
            }
        }

        return {
            discovery:d,
            finished:f,
            predecessors:p
        }
    }

    dfsVisit(u, color, d, f, p){
        let neighbors = this.adjList.get(u)
        color[u] = 'grep'
        d[u] = ++this.time

        for (let i = 0; i < neighbors.length; i++){
            let w = neighbors[i]
            if (color[w] === 'white'){
                p[w] = u
                this.dfsVisit(w, color, d, f, p)
            }

        }

        f[u] = ++this.time
        color[u] = 'black'
    }
    //最短路径
    shortPath(fromV, disV){
        let {predecessors} = this.bfs(disV)
        // console.log(predecessors)
        // console.log('---------------')
        let stack = []
        let count = 0, maxCount = 20//防止写出bug，调试等很久
        for (let v = fromV; v !== disV && count < maxCount; v = predecessors[v]){
            console.log(v)
            stack.push(v)
            count++
        }

        stack.push(disV)
        // console.log('---------------')
        return stack
    }

    topSort(){
        return this.dfs().predecessors
    }

    toString(){
        for (let [key, value] of this.adjList.entries()){
            console.log(`${key}: ${value.join()}`)
        }
    }
}

let g = new Graph()
let verticesArray = ['A','B','C','D','E','F','G','H','I']
for(var i = 0; i < verticesArray.length; i++) {
    g.addVertices(verticesArray[i])
}

g.addEdge('A','B');
g.addEdge('A','C');
g.addEdge('A','D');
g.addEdge('C','D');
g.addEdge('C','G');
g.addEdge('D','G');
g.addEdge('D','H');
g.addEdge('B','E');
g.addEdge('B','F');
g.addEdge('E','I');

// g.toString()

// console.log(g.bfs('A'))
// console.log(g.dfs())
console.log(g.shortPath('B', 'I'))

