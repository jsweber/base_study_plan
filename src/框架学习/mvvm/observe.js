function observe(d, vm){
    if (!d || typeof d !== 'object') return
    return new Observer(d)
}
