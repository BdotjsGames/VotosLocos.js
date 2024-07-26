var Time = {
    frame:1,
    update() {
        this.frame += 1;
        if(this.frame>=Number.MAX_SAFE_INTEGER) this.frame = 1;
        //it is important for input that frame does not ever equal 0
    }
}