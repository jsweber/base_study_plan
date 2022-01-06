// 洗牌算法
/**
 *随机从数组选中一个元素，插入数组末尾 
 *从剩下的n-1个元素中再找到一个，插入末尾

 时间复杂度：o(n)
 */
const {createNumList, show} = require('./utils');

const shuffle = arr => {
    let length = arr.length;

    while(length > 0) {
        const random = Math.floor(Math.random() * length);
        length--;
        
        const temp = arr[length];
        arr[length] = arr[random];
        arr[random] = temp;
    }

    return arr;
}

// test
const list = createNumList(20);
show('原数组：', list);
show('打乱后的数组：', shuffle(list));

