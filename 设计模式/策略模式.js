//定义：定义一系列算法，把它们一个个封装起来，并且可以相互替换

//案例，根据员工的表现S-B和工资计算年终奖

var strategies = {
    S(salary){
        return salary * 4
    },
    A(salary){
        return salary * 3
    },
    B(salary){
        return salary * 2
    }
}

var calcBouns = function(level, salary){
    return strategies[level](salary)
}

console.log(calcBouns('S', 20000))

/**
 * 动画类
 * 
*/

const tween = {
	linear: function(usedTime, start, dis, allTime){
		return usedTime / allTime * dis + start
	},
	easeIn: function(usedTime, start, dis, allTime){
		return (usedTime /= allTime) * dis + start
	},
	strongEaseIn: function(usedTime, start, dis, allTime){
		return (usedTime /= allTime) * usedTime * usedTime * dis + start
	},
	strongEaseOut: function(usedTime, start, dis, allTime){
		return ((usedTime = usedTime/allTime - 1) * usedTime * usedTime +1) * dis + start
    }
}


class Animate{
    constructor(dom){
        this.dom = dom
        this.startTime = 0
        this.startPos = 0
        this.endPos = 0
        this.propertyName = null
        this.easing = null
        this.duration = null
    }

    start(propertyName, endPos, duration, easing){
        this.startTime = +new Date()
        this.startPos = this.dom.getBoundingClientRect()[propertyName]
        this.propertyName = propertyName
        this.endPos = endPos
        this.duration = duration
        this.easing = tween[easing]

        let timer = setInterval(()=>{
            if (!this.step()){
                clearInterval(timer)
            }
        }, 20)
    }

    step(){
        let t = +new Date()
        let pos = 0

        if (t >= this.start + this.duration){
            this.update(this.endPos)
            return false
        }
        pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration)
        this.update(pos)
        return true
    }

    update(pos){
        this.dom.style[this.propertyName] = pos +'px'
    }
}


