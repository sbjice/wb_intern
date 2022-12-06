export class dc {
    constructor(callee) {
        this.callee = callee;
    }

    call = (data) => {
        // console.log('called with data:', data);
        this.callee(data);
    }
}