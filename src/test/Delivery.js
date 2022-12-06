import { dce } from "../utils.js";

export class Delivery {
    constructor(delStats) {
        this.delStats = delStats;
        this.trigger = dce('a');
        this.redraw(delStats);
    }

    redraw = (delStats) => {
        let str = '';
        // console.log(delStats);
        // console.log('called');
        for (let key in delStats) {
            str += `${key}: ${delStats[key].length},   `
        }
        this.trigger.textContent = str;
    }
}