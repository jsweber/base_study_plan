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
        var domRoot = document.createElement('div')
        domRoot.innerHTML = strHTML

        domCode = '',
        nodeNameCounters = [],
        requireVariable = '',
        newVariables = ''

        let node = domRoot.firstChild
        while(node){
            ads.domWalk(node, processNode, 0, strRoot)
            node = node.nextSibling
        }

        domCode = '/* requireVariable in this code \n' + requireVariable + '*/\n\n'
        + domCode + '\n\n'
        + '/* objects in this code\n' + newVariables + '*/\n\n'

        return domCode
    }

    function processAttribute(tabCount, refParent){

    }

    function processNode(tabCount, refParent){

    }

    window['generateDom'] = generate

})()