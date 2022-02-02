
function * arrayToGenerator(list) {
    for (let i = 0; i < list.length; i++){
        yield list[i]
    }
}

module.exports = arrayToGenerator
