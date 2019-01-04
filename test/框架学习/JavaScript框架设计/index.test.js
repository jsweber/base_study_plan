const {escapeHTML, unescapeHTML, pad, padDirection, format} = require('../../../src/框架学习/JavaScript框架设计/string/index')

const html = '<div>hello</div>'
const htmlEntity = '&lt;div&gt;hello&lt;/div&gt;'

describe('js框架函数测试', function(){
    test('escapeHTML:  convert html  tobe safe str', function(){
        expect(escapeHTML(html)).toBe(htmlEntity)
    })
    
    test('unescapeHTML: convert safe str into html', function(){
        expect(unescapeHTML(htmlEntity)).toBe(html)
    })
    
    test('pad: add 0 to 50 and convert to str', function(){
        expect(pad(50, 5)).toBe('00050')
    })
    
    test('padDirection: add 1 at target right side', function(){
        expect(padDirection(65, 5, 1, true)).toBe('65111')
    })
    
    
    test('padDirection: add 1 at target left side', function(){
        expect(padDirection(65, 5, 1, false)).toBe('11165')
    })
    
    test('format: param is Array', function(){
        expect(format('Result is #{0},#{1}', 22, 33)).toBe('Result is 22,33')
    })
    
    test('format: param is Object', function(){
        expect(format('#{name} is #{age}', {name: 'Lee', age: 40})).toBe('Lee is 40')
    })
})

