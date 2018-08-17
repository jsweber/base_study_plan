/**
 * 当项目比较大时，经常会拆分前端工作，比如把按钮UI开发给A，脚本开发给B，最后实现页面上的按钮都有相应的点击事件执行函数，A只知道他开发的按钮将来被点击后会有相应的命令执行，命令模式可以方便把A和B的工作解耦出来，让他们只管自己的工作就好
 */

//A:
/**
 * <body>
 *  <button id="btn1"></button>
 *  <button id="btn2"></button>
 *  <button id="btn3"></button>
 * </body>
*/

let bt1 = document.getElementById('bt1'),
    bt2 = document.getElementById('bt2'),
    bt3 = document.getElementById('bt3'),
    log = console.log


var setCommand = function(btn, command){
    btn.onclick = function(){
        command.execute()
    }
}

let MenuBar = {
    refresh(){
        log('MenuBar refresh')
    }
}

let RefreshMenuBarCommand = function(receiver){
    return {
        execute(){
            return receiver.refresh()
        }
    }
}
let refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)
setCommand(bt1, refreshMenuBarCommand)




