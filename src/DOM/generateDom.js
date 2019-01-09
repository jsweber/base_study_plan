(function(){
    function encode(str){
        if (!str) return null
        str = str.replace(/\\/g, '\\\\')
        str = str.replace(/';/g, "\\'")
        str = str.replace(/\s+^/mg, "\\n")
        return str
    }

    function checkForVariable(v){
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
        if (this.nodeType != ads.node.ATTRIBUTE_NODE) return

        var attrValue = (this.nodeValue ? encode(this.nodeValue.trim()) : '')
        if (this.nodeName == 'cssText') console.log('cssText true')
        if (!attrValue) return
        var tabs = (tabCount ? '\t'.repeat(parseInt(tabCount)): '' )

        switch(this.nodeName){
            case 'class':
                domCode += tabs
                + refParent
                + '.className'
                + '='+ checkForVariable(attrValue) + ';\n'
            break
            case 'style':
            //这里原版做了很多判断，比如针对float关键字，-联结到骆驼表示等处理，我这里偷懒用cssText直接搞定了
                domCode += tabs
                + refParent
                + '.style.cssText'
                + ' = ' + checkForVariable(attrValue) + ';\n'
            break
            default:
                if (this.nodeName.substr(0,2) == 'on'){
                    domCode += tabs
                    + refParent
                    + '.'
                    + this.nodeName
                    + '=function(){'+ attrValue +'}\n'
                }else {
                    domCode += tabs
                    + refParent
                    + '.setAttribute(\'' + this.nodeName + '\', ' + checkForVariable(attrValue) + ');\n'
                }   
            break
        }

    }

    function returnElememntToAttr(depth, returnFromParent){
        console.log('returnElememntToAttr',depth, returnFromParent)
        return returnFromParent
    }

    function processNode(tabCount, refParent){
        var tabs = (tabCount ? '\t'.repeat(parseInt(tabCount)): '' ), ref
        switch(this.nodeType){
            case ads.node.ELEMENT_NODE:
                if (nodeNameCounters[this.nodeName]){
                    nodeNameCounters[this.nodeName]++
                }else {
                    nodeNameCounters[this.nodeName] =1
                }

                ref = this.nodeName.toLowerCase()
                + nodeNameCounters[this.nodeName]

                domCode += tabs 
                + 'var '
                + ref
                + ' = document.createElement(\''
                + this.nodeName + '\');\n'

                newVariables += ' ' + ref + ';\n'
                ads.domAttrWalk(this, processAttribute, returnElememntToAttr, tabCount, ref)
                break
            
            case ads.node.TEXT_NODE:
                //检查除了空白节点之外的文本节点
                var value = (this.nodeValue ? encode(this.nodeValue.trim()) : '')
                if (value){
                    if (nodeNameCounters['txt']){
                        nodeNameCounters['txt']++
                    }else {
                        nodeNameCounters['txt'] = 1
                    }

                    ref = 'txt' + nodeNameCounters['txt']

                    value = checkForVariable(value)

                    domCode += tabs
                    + 'var '
                    + ref
                    + ' =document.createTextNode('+ value +');\n'

                    newVariables += ' ' + ref + ';\n'
                }else{
                    return
                }
                break
            default:
                break
        }
        if (refParent){
            domCode += tabs + refParent + '.appendChild('+ ref +');\n'
        }
        return ref
    }

    window['generateDom'] = generate

})()