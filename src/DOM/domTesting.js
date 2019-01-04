var log = ads.log
var app = document.querySelector('#app')
log.header('testNodeName')
log.write(app.nodeName)
log.write(app.tagName)

log.write(app.childNodes[0].nodeValue)
// ads.domWalk(document.body, function(depth, resultFromParent){
//     console.log(`parent nodeName: ${this.nodeName}, depth: ${depth}, from parent: ${resultFromParent}`)
//     return this.nodeName
// }, 1, 'body')
ads.domAttrWalk(document.body, function(attr, depth, returnFromParent){
    console.log(`nodeName: ${this.nodeName}, attr: ${attr.nodeName}, depth: ${depth}`)
    return this.nodeName
}, function(depth, resultFromParent){
    // console.log(`nodeName: ${this.nodeName}, depth: ${depth}, from parent: ${resultFromParent}`)
    return this.nodeName
}, 1, 'body')
