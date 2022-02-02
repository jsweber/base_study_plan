
const CacheSize = 10

class PeekIterator {
    constructor(it, endToken = null) {
        this.it = it
        this.stackPutBacks = []
        this.queueCache = []
        this.endToken = endToken
    }

    peek() {
        if (this.stackPutBacks.length > 0) {
            return this.stackPutBacks[this.stackPutBacks.length - 1]
        }

        const val = this.next()
        this.putBack()
        return val
    }

    putBack() {
        if (this.queueCache.length > 0) {
            this.stackPutBacks.push(this.queueCache.pop())
        }
    }

    hasNext() {
        return !!this.endToken || !!this.peek()
    }

    next() {
        let val = null

        if (this.stackPutBacks.length > 0) {
            return this.stackPutBacks.pop()
        } else {
            val = this.it.next().value
            if (val === undefined) {
                val = this.endToken
                this.endToken = null
            }
        }

        while(this.queueCache.length > CacheSize - 1) {
            this.queueCache.shift()
        }

        this.queueCache.push(val)
        return val
    }
}

module.exports = PeekIterator
