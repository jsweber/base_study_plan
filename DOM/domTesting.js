var log = ads.log
var app = document.querySelector('#app')
log.header('testNodeName')
log.write(app.nodeName)
log.write(app.tagName)
/**
 * 1.DOM中的继承
 * 
 * Node -> Element -> HTMLElement
 * 
 * Node类属性和方法: nodeName, nodeType nodeValue , hasChildNodes, hasAttributes, insertBefore, appendChild...
 * 
 *Element类中的属性和方法： getAttribute, setAttribute, removeAttribute...

*HTMLElement类中的属性和方法： id, className, style, title...
*
* 继承上面类的一个类，比如a标签的类
* HTMLAncholElement
* 它的属性和方法：href, name, rel, accessKey, tabindex, blur, focus ...
*/
//  一·NODE类
/**
 * 2.nodeType,nodeName,nodeValue与Node常量
 * 
 * 每种nodeType的nodeValue都不同
 * element.nodeValue -> null
 * attr.nodeValue -> 字符串形式的属性值
 * text.nodeValue -> 字符串形式的节点内容
 * 
 * nodeType: 1代表element节点，2代表属性节点，3代表文本节点，8代表注释节点。。。范围是1-12
 * 但是数字不好记，所以标准的dom规范提供了Node常量
 * Node.ELEMENT_NODE == 1
 * Node.ATTRIBUTE_NODE == 2
 * Node.TEXT_NODE == 3
 * Node.CDATA_SECTION_NODE == 4
 * Node.ENTITY_REFERENCE_NODE == 5
 * Node.ENTITY_NODE == 6
 * Node.PROCESSING_INSTRUCTION_NODE == 7
 * Node.COMMENT_NODE == 8
 * Node.DOCUMENT_NODE == 9
 * Node.DOCUMENT_TYPE_NODE == 10
 * Node.DOCUMENT_FRAGMENT_NODE == 11
 * Node.NOTATION_NODE == 12
 * 但是IE不支持Node常量，所以我在ads库中用node代替，注意是小写的，这样不和Node冲突
*/
log.write(app.childNodes[0].nodeValue)
/**
 * node属性attributes
 * 
 * 节点的属性被包含在相应节点的attributes成员的一个NamedNodeMap对象中
 * node.hasAttributes() //boolean
 * node.hasChildNodes() //boolean
*/
/**
 * 兄弟节点
 * previousSibling
 * nextSibling
 * parentNode
*/

/**
 * 操作dom节点树
 * appendChild
 * parentNode.insertBefore(newNode, targetNode)
 * parentNode.replaceChild(newNode, oldNode)
 * parentNode.removeChild(removeNode)
 * cloneNode = sourceNode.cloneNode(true) //方法克隆所有属性以及它们的值。如果您需要克隆所有后代，请把 deep 参数设置 true，否则设置为 false。
*/

// 核心Element类

/**
 * ELment类继承Node所有的属性和方法，同时为了便于操作节点属性和查找子element对象的方法
 * element.getAttribute('href')
 * element.setAttribute('href', 'www.baodu.com')
 * element.removeAttribute('href)
*/

