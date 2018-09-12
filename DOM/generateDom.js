(function(){
    function encode(str){
        if (!str) return null
        str = str.replace(/\\/g, '\\\\')
        str = str.replace(/';/g, "\\'")
        str = str.replace(/\s+^/mg, "\\n")
        return str
    }

    function checkForValue(v){
        if (!~v.indexOf('$')){
            v = '\'' + v +'\''
        }else{
            v = v.substr(v.indexOf('$')+1)
            requireVariable += 'var ' + v + ';\n'
        }
        return v
    }

    var domCode = '',
    nodeNameCounters = [],
    requireVariable = '',
    newVariables = ''

    function generate(strHTML, strRoot){

    }

    function processAttribute(tabCount, refParent){

    }

    function processNode(tabCount, refParent){

    }

    window['generateDom'] = generate

})()