let algoLine = function(domId, process, size = 5, sizeGird=50){
    let doc = document
    let oUl = doc.getElementById(domId)
    let lis = oUl.children
    let len = size * size
    let row = 0
    let col = 0
    let min = 0 //最小环数
    let max = size - 1 //最大环数
    let lineArray = []

    oUl.style.width = ((sizeGird + 1) * size) + 'px'
    for (let i = 0; i < len; i++){
        let domLi = doc.createElement('li')
        domLi.style.cssText = `width:${sizeGird}px;height:${sizeGird}px`;
        oUl.appendChild(domLi)
    }
    
    for (let i = 0; i < len; i++){
        let idx = row * size + col
        lineArray.push(idx)
        process && process(idx, lis[idx])

        if (row == min && col < max){
            col++
        }else if (col == max && row < max){
            row++
        }else if (row == max && col > min){
            col--
        }else if (col == min && row > min){
            row --
        }
        if (col == min && (row - 1) == min){
            min++
            max--
        }
    }
    return lineArray
}