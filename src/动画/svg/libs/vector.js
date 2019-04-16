class Vector{
    constructor(x=0, y=0){
        this.x = x
        this.y = y
    }

    square(){
        return this.x * this.x + this.y * this.y
    }

    length(){
        return Math.sqrt(this.square())
    }

    add(q){
        return new Vector(this.x + q.x, this.y + q.y)
    }

    minus(q){
        return new Vector(this.x - q.x, this.y - q.y)
    }

    multipy(scale=1){
        return new Vector(this.x * scale, this.y * scale)
    }

    normalize(length=1){
        return this.multipy(length/this.length())
    }
    static fromPoints(p1, p2){
        return new Vector(p2.x - p1.x, p2.y - p1.y)
    }
}

// export default Vector
