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


//Macro命令，和我们打游戏时给键盘的某些按键设置宏命令一样，就是一键执行多个任务
let openTVCommand = {
    execute(){
        console.log('开电视')
    }
}
let openAirConditioningCommand = {
    execute(){
        console.log('开空调')
    }
}

let MacroCommand = function(){
    return {
        commandList: [],
        add(command){
            this.commandList.push(command)
        },
        execute(){
            while(this.commandList.length > 0){
                this.commandList.shift().execute()
            }
        }
    }
}

//unit test
let macro = MacroCommand()
macro.add(openTVCommand)
macro.add(openAirConditioningCommand)
macro.execute()

//上面没有接受者的command虽然和策略模式很像，
//但是它们意图不同
//策略模式的目标一致，只是解决同一个问题，不过方法不同，
//而命令模式的问题域更广，因为它可以接受recevier，就算没有recevier的智能命令，其解决的问题也是不同的
//此外命令模式还有撤销，排队等功能
