
class AlphabetHelper {
  
    static ptnLetter = /^[a-zA-Z]$/
    static ptnNumber = /^[0-9]$/
    static ptnLiteral = /^[_a-zA-Z0-9]$/
    static ptnOperator = /^[+\-*/><=!&|^%,]$/

    static isLetter(c) {
        return AlphabetHelper.ptnLetter.test(c)
    }
    static isNumber(c) {
        return AlphabetHelper.ptnNumber.test(c)
    }
    static isLiteral(c) {
        return AlphabetHelper.ptnLiteral.test(c)
    }
    static isOperator (c) {
        return AlphabetHelper.ptnOperator.test(c)
    }
}

module.exports = AlphabetHelper
