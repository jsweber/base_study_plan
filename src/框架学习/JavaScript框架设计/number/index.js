function limit(target, n1, n2){
    var a = [n1, n2].sort()
    if (target < a[0]){
        return a[0]
    }else if( target > a[1] ){
        return a[1]
    }
    return target
}

if( 0.9.toFixed(0) !== '1'){
    Number.prototype.toFixed = function(n){
        let power = Math.pow(10, n)
            let toFixed = Math.round(this * power) / power + ''
    
            if (n === 0){
                return toFixed
            }
            
            if (toFixed.indexOf(n) < 0){
                toFixed += '.'
            }
    
            let padding = n - ((toFixed.length - 1) - toFixed.indexOf('.'))
            for (let i = 0; i < padding; i++){
                toFixed += '0'
            }
            return toFixed
    }
}


