/**
 * JavaScript.DOM高级程序设计
 */

 (function(win, doc){
     if (!win.ads){ win.ads = {} }

     var node = {
        ELEMENT_NODE :1,
        ATTRIBUTE_NODE : 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12
    }

     function noop(){}

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
        var createWindow = function(width, height){
            width = width || 200
            height = height || 200
            let browserWindowSize = ads.getBrowserWindowSize()
            // var top = ((browserWindowSize.height - height) / 2) || 0
            // var left = ((browserWindowSize.width - width) / 2) || 0
            var top = 0
            var left = browserWindowSize.width - width - 2
            logWindow = doc.createElement('ul')
            logWindow.setAttribute('class', 'log_hook')
            logWindow.style.position = 'absolute'
            logWindow.style.top = top+'px'
            logWindow.style.left = left+'px'
            logWindow.style.width = width + 'px'
            logWindow.style.height = height + 'px'
            logWindow.style.overflow = 'scroll'

            logWindow.style.padding = 0
            logWindow.style.margin = 0
            logWindow.style.border = '1px solid black'
            logWindow.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            logWindow.style.listStyle = 'none'
            logWindow.style.font = '10px/10px Verdana, Tahoma, Sans'

            doc.body.appendChild(logWindow)
        }

        this.writeRaw = function(message){
            if (!logWindow) createWindow()
            var li = document.createElement('li')
            li.style.padding = '2px'
            li.style.border = 0
            li.style.borderBottom = '1px dotted black'
            li.style.margin = '0'
            li.style.color = '#fff'
            li.style.font = '9px/9px Verdana, Tahoma, Sans'

            if (!message){
                li.appendChild(doc.createTextNode('Message was undefined'))
            }else if (typeof li.innerHTML !== 'undefined'){
                li.innerHTML = message
                
            }else {
                li.appendChild(doc.createTextNode(message))
            }
            logWindow.appendChild(li)
            return true
        }
    }

    myLogger.prototype = {
        write: function(message){
            if (!message) return this.writeRaw('ADS.log: null message')
            if (typeof message != 'string'){
                if (message.toString) return this.writeRaw(message.toString())
                return this.writeRaw(typeof message)
            }

            message = message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            return this.writeRaw(message)
        },

        header: function(message){
            message = '<span style="color:white;background-color:red;font-weight:bold;padding:0px 5px;">' + message + '</span>'
            return this.writeRaw(message)
        }
    }

    function getBrowserWindowSize(){
        var de = doc.documentElement
        return {
            width: win.innerWidth || de.clientWidth || document.body.clientWidth,
            height: win.innerHeight || de.clientHeight || document.body.clientHeight
        }
    }
    /**
     * ads.domWalk(document.body, function(depth, resultFromParent){
            console.log(`parent nodeName: ${this.nodeName}, depth: ${depth}, from parent: ${resultFromParent}`)
            return this.nodeName
        }, 1, 'body')
     * 
    */
    function domWalk(node, nodeHandler, depth, returnFromParent){
        var root = node || doc.body,
        returnFromParent = nodeHandler.call(root, depth++, returnFromParent),
        firstNode = root.firstChild

        while(firstNode){
            domWalk(firstNode, nodeHandler, depth, returnFromParent)
            firstNode = firstNode.nextSibling
        }
    }

    function domAttrWalk(node, attrHandler, nodeHandler, depth, returnFromParent){
        var root = node || doc.body,
        returnFromParent = nodeHandler.call(root, depth++, returnFromParent),
        attrs = root.attributes,
        firstNode = root.firstChild
        if (attrs && attrs.length > 0){
            //原版的实现递归太多了，其实对于属性节点的迭代可以放在循环一级直接处理
            for (var i = 0; i < attrs.length; i++){
                attrHandler.call(attrs[i], depth, returnFromParent)
            }
        }
        //虽然原版有下面的内容，但是我自己的实现方式不需要
        // while(firstNode){
        //     domAttrWalk(firstNode, attrHandler, nodeHandler, depth, returnFromParent)
        //     firstNode = firstNode.nextSibling
        // }
    }

    if (!String.prototype.repeat){
        String.prototype.repeat = function(l){
            if (typeof l !== 'number') throw 'repeat param type is number'
            return new Array(l+1).join(this)
        }
    }

    if (!String.prototype.trim){
        String.prototype.trim = function(){
            return this.replace(/^\s+|\s+$/g, '')
        }
    }
 
    function camelize(s){
        return s.replace(/-(\w)/g, function(strMatch, p1){
            console.log(strMatch, p1) //camelize('hello-world')  -> -w , w
            return p1.toUpperCase()
        })
    }

    function stopPropagation(eventObj){
        eventObj = eventObj || getEventObject(event)
        if (eventObj.stopPropagation){
            event.stopPropagation()
        }else {
            eventObj.cancelBubble = true
        }
    }

    function preventDefault(eventObj){
        eventObj = eventObj || getEventObject(event)
        if (eventObj.preventDefault){
            eventObj.preventDefault()
        }else {
            eventObj.returnValue = false
        }
    }
    


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
    win['ads']['getBrowserWindowSize'] = getBrowserWindowSize
    win['ads']['node'] = node
    win['ads']['domWalk'] = domWalk
    win['ads']['domAttrWalk'] = domAttrWalk
    win['ads']['camelize'] = camelize
    win['ads']['noop'] = noop
    win['ads']['stopPropagation'] = stopPropagation
    win['ads']['preventDefault'] = preventDefault

 })(window, document)


