const Enum = require('../utils/enum')

const TokenTypes = {
    keyword: new Enum('Keyword', 1),
    variable: new Enum('Variable', 2),
    operator: new Enum('Operator', 3),
    bracket: new Enum('Bracket', 4),
    Integer: new Enum('Integer', 8),
    string: new Enum('String', 5),
    float: new Enum('Float', 6),
    boolean: new Enum('Boolean', 7)
}

module.exports = TokenTypes
