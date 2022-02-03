const TokenTypes = require('./tokenType');
const AlphabetHelper = require("../utils/AlphabetHelper")

const Keywords = new Set([
    "var",
    "if",
    "else",
    "for",
    "while",
    "break",
    "func",
    "return",
    "int",
    "float",
    "bool",
    "void",
    "string"
  ])

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

    static makeVarOrKeyword(it) {
        let s = ''

        while(it.hasNext()) {
            const c = it.peek()

            if (AlphabetHelper.isLiteral(c)){
                s += c
            } else {
                break
            }

            it.next()
        }

        if (Keywords.has(s) ){
            return new Token(s, TokenTypes.keyword)
        }

        if (s === 'true' || s === 'false') {
            return new Token(s, TokenTypes.boolean)
        }

        return new Token(s, TokenTypes.variable)
    }

}

module.exports = Token
