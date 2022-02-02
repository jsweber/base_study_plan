const TokenTypes = require('./tokenType');

class Token {
    constructor(value, type) {
        this.value = value
        this.tokenType = type
    }

    getType() {
        return this.type
    }

    isVariable() {
        return this.type === TokenTypes.variable.type
    }

    isScalar() {
        return this.type === TokenTypes.Integer.type
            || this.type === TokenTypes.float.type
            || this.type === TokenTypes.string.type
            || this.type === TokenTypes.boolean.type
    }

    toString() {
        return `value: ${this.value}; type: ${this.type}`
    }

}

module.exports = Token
