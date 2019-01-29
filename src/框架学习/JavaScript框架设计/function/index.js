
let observable = function(val){
    let cur = val
    function field(neo){
        if (arguments.length){
            if (neo !== cur){
                cur = neo
            }
        }else {
            return neo
        }
    }
    field()
    return field
}

Function.prototype.bind = function(ctx){
    if (arguments.length < 2 && ctx === undefined){
        return this
    }

    let args = [].slice.call(arguments, 1)
    let fn = this

    return function(){
        return fn.apply(ctx, [].concat.apply(args, arguments))
    }
}

function curry(fn){
    let args = arguments.length > 1 ? [].slice.call(arguments, 1) : []

    function inner(len, args){
        if (len === 0){
            return fn.apply(null, args)
        }else {
            return function(){
                return inner(len - arguments.length, [].concat.apply(args, arguments))
            }
        }
    }

    return inner(fn.length, args)
}

/**
 *> partial(function f(a,b,c){
	return `a=${a};b=${b};c=${c}`
}, 1, undefined, 3)

>pp(10)
> "a=1;b=10;c=3"
 */
function partial(fn){
    if (arguments.length < 2){
        return fn
    }

    let args = [].slice.call(arguments, 1)

    function inner(){
        let innerArgs = [].slice.call(arguments)
        for (let i = 0; i < args.length; i++){
            if (args[i] === void 0){
                args[i] = innerArgs.shift()
            }
        }
        return  fn.apply(null, args)
    }

    return inner
}


