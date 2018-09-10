/**
 * JavaScript.DOM高级程序设计
 */

 (function(win, doc){
     if (!win.ads){ win.ads = {} }

     win['ads']['isCompatible'] = isCompatible
     win['ads']['isNode'] = isNode
     win['ads']['$'] = $
     win['ads']['addEvent'] = addEvent
     win['ads']['removeEvent'] = removeEvent
     win['ads']['toggleDisplay'] = toggleDisplay
     win['ads']['insertAfter'] = insertAfter
     win['ads']['removeChildren'] = removeChildren
     win['ads']['prependChild'] = prependChild
     win['ads']['log'] = new myLogger()

     function isNode(dom){
         if (typeof dom === 'object'){
             return !!dom.nodeName
         }
         return false
     }

     function isCompatible(other){
         if (other === false || !Array.prototype.push || !Object.hasOwnProperty || !document.createElement || !document.getElementsByTagName || !doc.getElementsByClassName || !doc.children){
             return false
         }
         return true
     }
     

     function $(ele){
        if (typeof ele !== 'string'){ throw '$ need string as param'}
        if (/>|:/.test(ele)) throw '$ dont support this advance match'

         var doms = ele.split(' '), 
         domStr = '',
         parentNode = doc,
         len = doms.length

         try{
            for (var i = 0; i  < len; i++){
                domStr = doms[i]
                if (domStr.indexOf('#') === 0){
                    parentNode = parentNode. getElementById(domStr.slice(1))
                }else if(domStr === '*'){
                    return parentNode.getElementsByTagName('*')
                }else{
                    parentNode = domStr.indexOf('.') === 0 ? parentNode. getElementsByClassName (domStr.slice(1)) : parentNode. getElementsByTagName(domStr.slice(1))
                    if (i === len - 1){
                        //当最后一项时返回dom数组
                        return  parentNode.length > 1 ? parentNode : parentNode[0]
                    }else {
                        //不是最后一项，默认把第一个当成下一次提取的父级
                        parentNode = parentNode[0]
                    }
                }
             }
             return parentNode
         }catch(e){
             console.error(e)
             return null
         }
         
     }

     function addEvent(node, type, listener){
         if (!isCompatible()) return false
         if (!(node = $(node))) return false

         if (node.addEventListener){
             node.addEventListener(type, listener, false)
             return true
         }else if (node.attachEvent){
             node['e'+type+listener] = listener
             node[type+listener] = function(){
                 node['e' + type + listener](win.event)
             }
             node.attachEvent('on'+ type, node[type+listener])
             return true
         }
         return false
     }

     function removeEvent(node, type, listener){
        if (!(node = $(node))) return false

        if (node.removeEventListener){
            node.removeEventListener(type, listener, false)
            return true
        }else if (node.detachEvent){
            node.detachEvent('on'+type, node[type+listener])
            node[type+listener] = null
            return true
        }
        return false
     }

     function toggleDisplay(node, value){
         if (!(node = $(node))) return false
         if (node.style.display !== 'none'){
             node.style.display = 'none'
         }else {
             node.style.display = value || ''
         }
         return true
     }

     function insertAfter(node, referenceNode){
        if (!(node = $(node))) return false
        if (!(referenceNode = $(referenceNode))) return false
        return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling)
     }

     function removeChildren(parent){
        if (!(parent = $(parent))) return false

        var children = ''
        if (!(children = parent.children)) return false
        for (var i = 0;  i < children.length; i++){
            parent.removeChild(children[i])
        }
        return parent
     }

     function prependChild(parent, newChild){
        if (!(parent = $(parent))) return false
        console.log(newChild)
        if ( !isNode(newChild) ) throw 'newChild need a dom object'
        console.log('m')
        var children = parent.children
        if (!children || children.length === 0) parent.appendChild(newChild)
        else parent.insertBefore(newChild, children[0])
        return parent
     }

     function myLogger(id){
         id = id || 'ADSLogWindow'
         var logWindow = null
         var createWindow = function(){}
         this.writeRaw = function(message){}
     }

     myLogger.prototype = {
         write: function(message){

         },
         header: function(message){

         }
     }


 })(window, document)


