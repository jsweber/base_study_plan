const noop = () => {}

const createList = n => (new Array(n).fill(0)).map(n => {
    return Math.floor(Math.random() * 100);
});
class Node {
    constructor(value = null) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    show () {
        console.log(`[${this.value}]`);
    }
}


const createBST = (n = 10) => {
    const list = createList(n);
    console.log(list);
    let root = new Node(list[0]);
    let current = root;

    for (let i = 1; i < list.length; i++){
        const val = list[i];
        while (current){
            console.log(current, val);
            if (val < current.value){
                if (current.left){
                    current = current.left;
                } else {
                    current.left = new Node(val);
                }
            } else {
                if (current.right) {
                    current = current.right
                } else {
                    current.right = new Node(val);
                }
            }
        }
        
    }

    return root;
}

// 递归遍历 前中后
const DFS = (root, fn=noop) => {
    if (root === null){
        return;
    }

    fn(root);
    DFS(root.left, fn);
    DFS(root.right, fn);
}

// 广度遍历
const BFS = (root, fn=noop) => {
    const queue = [];
    queue.push(root);
    
    while (queue.length > 0){
        const node = queue.shift();
        fn(node);

        if (node.left){
            queue.push(node.left);
        }

        if (node.right) {
            queue.push(node.right);
        }
    }
}

const filterSameNum = (list = []) => {
    let i = 0;
    let count = 0;
    const len = list.length;

    for (let j = 0; j < len; j++) {

    }
}

// console.log(createBST(5));


// 迭代遍历 前中后


// 循环矩阵， 给出一个正整数n，从外向内打印1到n^2所有数值

// 一个正整数数组nums，找出最小长度的连续子数组，使子数组元素之和大于或者等于s，返回满足条件的连续最小子数组的长度，否则返回0
// 1. 暴力解法；2.滑动窗口


