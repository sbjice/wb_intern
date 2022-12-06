import { DeliveryAddress } from "./DeliveryAddress.js";

export class DeliveryPoint extends DeliveryAddress {
    constructor(city, district = null, street, house, rate = null,
        workTimeStart, workTimeEnd) {

        super(city, street, house);
        this.district = district;
        this.rate = rate;
        this.workTimeStart = workTimeStart;
        this.workTimeEnd = workTimeEnd;
    }
}