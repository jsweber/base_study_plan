
<h3>一·DOM中的继承</h3>
<br>Node -> Element -> HTMLElement
<br>Node类属性和方法: nodeName, nodeType nodeValue , hasChildNodes, hasAttributes, insertBefore, appendChild...
<br>Element类中的属性和方法： getAttribute, setAttribute, removeAttribute...

<br>HTMLElement类中的属性和方法： id, className, style, title...
<br>继承上面类的一个类，比如a标签的类
<br>HTMLAncholElement
<br>它的属性和方法：href, name, rel, accessKey, tabindex, blur, focus ...

<h3>二·NODE类</h3>

<h4>nodeType,nodeName,nodeValue与Node常量</h4>
<br>每种nodeType的nodeValue都不同
<br>element.nodeValue -> null
<br>attr.nodeValue -> 字符串形式的属性值
<br>text.nodeValue -> 字符串形式的节点内容
<br>nodeType: 1代表element节点，2代表属性节点，3代表文本节点，8代表注释节点。。。范围是1-12
<br>但是数字不好记，所以标准的dom规范提供了Node常量
<br>Node.ELEMENT_NODE == 1
<br>Node.ATTRIBUTE_NODE == 2
<br>Node.TEXT_NODE == 3
<br>Node.CDATA_SECTION_NODE == 4
<br>Node.ENTITY_REFERENCE_NODE == 5
<br>Node.ENTITY_NODE == 6
<br>Node.PROCESSING_INSTRUCTION_NODE == 7
<br>Node.COMMENT_NODE == 8
<br>Node.DOCUMENT_NODE == 9
<br>Node.DOCUMENT_TYPE_NODE == 10
<br>Node.DOCUMENT_FRAGMENT_NODE == 11
<br>Node.NOTATION_NODE == 12
<br>但是IE不支持Node常量，所以我在ads库中用node代替，注意是小写的，这样不和Node冲突

<h4>node属性attributes</h4>
<br>节点的属性被包含在相应节点的attributes成员的一个NamedNodeMap对象中
<br>node.hasAttributes() //boolean
<br>node.hasChildNodes() //boolean

<h4>兄弟节点</h4>
<br>previousSibling
<br>nextSibling
<br>parentNode

<h4>操作dom节点树</h4>
<br>appendChild
<br>parentNode.insertBefore(newNode, targetNode)
<br>parentNode.replaceChild(newNode, oldNode)
<br>parentNode.removeChild(removeNode)
<br>cloneNode = sourceNode.cloneNode(true) //方法克隆所有属性以及它们的值。如果您需要克隆所有后代，请把 deep 参数设置 true，否则设置为 false。


<h3>三·核心Element类</h3>

* ELment类继承Node所有的属性和方法，同时为了便于操作节点属性和查找子element对象的方法
* element.getAttribute('href')
* element.setAttribute('href', 'www.baodu.com')
* element.removeAttribute('href)

<h3>四·核心Document对象</h3>
<br>注意Document继承Node，不是Element，getDocumentByclassName方法不在核心doc类中，因为它不适用xml
<br>document.documentElement => 根元素html
<br>document.body => body
<br>创建节点的方法
<br>createAttribute()
<br>createCDATASection()
<br>createComment()
<br>createFragment()
<br>createDocumentFragment()
<br>createElement()
<br>createEntityReference()
<br>createProcessingInstruction()
<br>createTextNode(str)

<h3>五·DOM HTML</h3>
< head > -> HTMLHeadElement<br/>
< body > -> HTMLBodyELement<br/>
< p > -> HTMLParagraphElement<br/>
< ul > -> HTMLULlistElement<br/>
< li > -> HTMLLIElement<br/>
....<br/>
<p>
document 实际上是HTMLDocument的一个实例<br/>
HTMLDocument从核心Document对象上继承了所有成员，还自己添加了一些：<br/>
title: < title >中的字符串<br/>
referrer: 包含链接到当前页面的前一个页面的url<br/>
domain: 包含当前站点的域名<br/>
url: 当前页面地址<br/>
images: img集合<br/>
links: link标签集合<br/>
forms: 。。。<br/>
anchors: a标签集合<br/>
cookie: cookie信息<br/>
还有一些方法：<br/>
open打开一个文档<br/>
close关闭当前文档<br/>
write写入文档<br/>
writeln写入文档和一个换行符<br/>
</p>
<code>
    var newDoc = document.open('text/html')
    newDoc.write('< p>hello</ p>')
    newDoc.close()
</code>


