const createNumList = len => new Array(len).fill(0).map((_, i) => Math.floor(Math.random() * (len + 1)))

const swap = (array, i, j) => {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

const show = (label, array) => console.log(label, array.join())


module.exports = {
    createNumList,
    swap,
    show
}

