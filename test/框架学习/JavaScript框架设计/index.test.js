const {escapeHTML, unescapeHTML} = require('../../../框架学习/JavaScript框架设计/string/index')

const html = '<div>hello</div>'
const htmlEntity = '&lt;div&gt;hello&lt;/div&gt;'

test('escapeHTML', function(){
    expect(escapeHTML(html)).toBe(htmlEntity)
})

test('unescapeHTML', function(){
    expect(unescapeHTML(htmlEntity)).toBe(html)
})

