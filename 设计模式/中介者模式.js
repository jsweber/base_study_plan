//游戏案例

function example1(){
    class Player{
        constructor(name, teamColor){
            this.partners = [] //队友列表
            this.enemies = [] //敌人
            this.state = 'live'
            this.name = name
            this.teamColor = teamColor
        }
    
        win(){
            console.log('winner: '+ this.name)
        }
    
        lose(){
            console.log('loser: ' + this.name )
        }
    
        die(){
            let all_dead = true
    
            this.state = 'dead'
    
            this.partners.some(p => {
                if (p.state !== 'dead'){
                    all_dead = false
                    return true
                }
                return false
            })
    
            if (all_dead){
                this.lose()
                this.partners.forEach(p => p.lose())
                this.enemies.forEach(e => e.win())
            }
        }
    
    }
    
    let players = []
    let playerFactory = function(name, teamColor){
        let newPlayer = new Player(name, teamColor)
    
        for(let i = 0; i < players.length; i++){
            let p = players[i]
            if (p.teamColor === newPlayer.teamColor){
                newPlayer.partners.push(p)
                p.partners.push(newPlayer)
            }else {
                p.enemies.push(newPlayer)
                newPlayer.enemies.push(p)
            }
        }
        players.push(newPlayer)
        return newPlayer
    }
    
    let player1 = playerFactory('皮蛋','red')
    let player2 = playerFactory('小怪','red')
    let player3 = playerFactory('宝宝','red')
    let player4 = playerFactory('小强','red')
    
    let player5 = playerFactory('黑妞','blue')
    let player6 = playerFactory('棒子','blue')
    let player7 = playerFactory('海盗','blue')
    let player8 = playerFactory('葱头','blue')
    
    player1.die()
    player2.die()
    player3.die()
    player4.die()
}

//上面的代码在人少的时候可以用，但是当人多时，就不好更改
//比如某个角色死亡，需要移除时，需要遍历所有用户的敌人和队友的数组来移除
//当玩家有几千上万时，我们的代码无疑会跪
//这时就需要中介者模式来改良

function example2(){

    class Player{
        constructor(name, teamColor){
            this.state = 'live'
            this.name = name
            this.teamColor = teamColor
        }

        win(){
            console.log('winner: '+ this.name)
        }
    
        lose(){
            console.log('loser: ' + this.name )
        }

        die(){
            this.state = 'dead'
            playerDirector.reciveMessage('playerDead', this)
        }

        remove(){
            playerDirector.reciveMessage('removePlayer', this)
        }

        changeTeam(color){
            playerDirector.reciveMessage('changeTeam', this, color)
        }

    }

    let playerFactory = function(name, teamColor){
        let newPlayer = new Player(name, teamColor)
        playerDirector.reciveMessage('addPlayer', newPlayer)
        return newPlayer
    }

    let playerDirector = (function(){
        let players = {}, options = {}

        options.addPlayer = function(player){
            let color = player.teamColor
            if (!players[color]) players[color] = []
            players[color].push(player)
        }

        //移除玩家
        options.removePlayer = function(player){
            let color = player.teamColor
            if (players[color]){
                for (let i = players[color].length -1; i >=0; i--){
                    if (player == players[color][i]){
                        players[color].splice(i, 1)
                    }
                }
            }
        }

        options.changeTeam = function(player, color){
            options.removePlayer(player)
            player.teamColor = color
            options.addPlayer(player)
        }

        options.playerDead = function(player){
            let all_dead = true, 
            color = player.teamColor, 
            team = players[color]
            // console.log(player)

            if (team){
                team.some(p => {
                    if (p.state !== 'dead') return !(all_dead = false)
                    return false
                })
            }

            if (all_dead){
                team.forEach(p => {
                    p.lose()
                })

                for (let cr in players){
                    if (cr !== color){
                        players[cr].forEach(p => {
                            p.win()
                        })
                    }
                }
            }
        }

        function reciveMessage(){
            let fn = [].shift.call(arguments)
            if (options[fn]) return options[fn].apply(this, arguments)
        }

        return {
            reciveMessage
        }
    })()
    let player1 = playerFactory('皮蛋','red')
    let player2 = playerFactory('小怪','red')
    let player3 = playerFactory('宝宝','red')
    let player4 = playerFactory('小强','red')
    
    let player5 = playerFactory('黑妞','blue')
    let player6 = playerFactory('棒子','blue')
    let player7 = playerFactory('海盗','blue')
    let player8 = playerFactory('葱头','blue')

    player1.changeTeam('blue')
    
    player1.die()
    player2.die()
    player3.die()
    player4.die()
}
// example2()
//购物案例
function example3(){
    let colorSelect = document.getElementById('colorSelect')
    let numberInput = document.getElementById('numberInput')
    let colorInfo = document.getElementById('colorInfo')
    let numberInfo = document.getElementById('numberInfo')
    let nextBtn = document.getElementById('nextBtn')

    let goods = {
        red: 3,
        blue: 6
    }

    colorSelect.onchange = function(){
        let color = this.value
        let number = numberInput.value
        let stock = goods[color]

        colorInfo.innerHTML = color

        if (!color){
            nextBtn.disabled = true
            nextBtn.innerHTML = '请选择颜色'
            return
        }

        if (!number){
            nextBtn.disabled = true
            nextBtn.innerHTML = '请输入购买数量'
            return
        }

        if (!number && number > 0){
            nextBtn.disabled = true
            nextBtn.innerHTML = '请输入购买数量'
            return
        }

        if (number > stock){
            nextBtn.disabled = true
            nextBtn.innerHTML = '库存不足'
            return
        }

        nextBtn.disabled = false
        nextBtn.innerHTML = '放入购物车'
    }

    numberInput.onchange = function(){
        //类似上面
    }

}
//上面的代码不好维护，当再加一个选择内存的选项时，需要更改的代码会非常多
function example4(){
    let goods = {
        'red|32G': 3,
        'red|16G': 0,
        'blue|32G': 1,
        'blue|16G': 6
    }
    let colorSelect = document.getElementById('colorSelect')
    let memorySelect = document.getElementById('memorySelect')
    let numberInput = document.getElementById('numberInput')
    let colorInfo = document.getElementById('colorInfo')
    let memoryInfo = document.getElementById('memoryInfo')
    let numberInfo = document.getElementById('numberInfo')
    let nextBtn = document.getElementById('nextBtn')

    let mediator = (function(){

        return {
            changed(obj){
                let color = colorSelect.value
                let memory = memorySelect.value
                let num = numberInput.value
                let stock = goods[color + '|' + memory]

                if (obj == colorSelect){
                    colorInfo.innerHTML = color
                }else if (obj == memorySelect){
                    memoryInfo.innerHTML = memory
                }else if (obj == numberInput){
                    numberInfo.innerHTML = num
                }

                if (!color){
                    nextBtn.disabled = true
                    nextBtn.innerHTML = '请选择颜色'
                    return
                }
        
                if (!memory){
                    nextBtn.disabled = true
                    nextBtn.innerHTML = '请选择内存'
                    return
                }
        
                if (!num && num > 0){
                    nextBtn.disabled = true
                    nextBtn.innerHTML = '请输入购买数量'
                    return
                }
        
                if (num > stock){
                    nextBtn.disabled = true
                    nextBtn.innerHTML = '库存不足'
                    return
                }

                nextBtn.disabled = false
                nextBtn.innerHTML = '放入购物车'
            }
        }
    })()

    colorSelect.onchange = function(){
        mediator.changed(this)
    }


}
//中介者模式经常导致难以维护的中介者产生，所以注意不要过度设计

