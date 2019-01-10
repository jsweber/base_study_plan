const Node = require('./Node')

class NodeWithCount extends Node{
    constructor(data, left, right){
        super(data, left, right)
        this.count = 1
    }

}

module.exports = NodeWithCount
