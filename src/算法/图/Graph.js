//图
class Graph{
    constructor(v){
        this.vertices = v
        this.edges = 0
        this.marked = [] //标记是否访问过
        this.adj = []//邻接表
        for (let i = 0; i < this.vertices; i++){
            this.marked[i] = false
            this.adj[i] = []
        }
    }

    addEdge(v, w){
        this.adj[v].push(w)
        this.adj[w].push(v)
        this.edges++
    }
    //深度优先遍历
    dfs(v, fn){
        this.marked[v] = true
        fn(v, this.adj[v])
        for (let vet of this.adj[v]){
            if (!this.marked[vet]){
                this.dfs(vet, fn)
            }
        }
    }
    //广度优先遍历
    bfs(s, fn){
        let queue = []
        queue.push(s)
        this.marked[s] = true
        while(queue.length > 0){
            let v = queue.shift()
            fn(v)
            for (let i = 0; i < this.adj[v].length; i++){
                let w = this.adj[v][i]
                if (!this.marked[w]){
                    this.marked[w] = true
                    queue.push(w)
                }
            }
        }
    }

    showGraph(){
        for(let i = 0; i < this.vertices; i++){
            console.log(`${i} -> `)
            for (let j = 0; j < this.adj[i].length; j++){
                console.log(this.adj[i][j])
            }
            console.log('\n')
        }
    }

    toString(){

    }
}

let g = new Graph(5)
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 3)
g.addEdge(2, 4)
// g.showGraph()
// g.dfs(0, function(v, adj){
//     console.log(`${v} -> ${adj.join()}`)
// })

g.bfs(0, function(v){
    console.log(v)
})
