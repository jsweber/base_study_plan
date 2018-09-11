var log = ads.log
var app = document.querySelector('#app')
log.header('testNodeName')
log.write(app.nodeName)
log.write(app.tagName)

log.write(app.childNodes[0].nodeValue)


