import { m } from "./Modal.js";
import { Accordeon } from "./Accordeon.js";

import { goods0, cards, deliveryPlaces } from "./data.js";

import { Cart } from "./Cart.js";
import { PaymentChoice } from "./PaymentChoice.js";
import { Delivery } from "./Delivery.js";
import { Recipient } from "./Recipient.js";


const CURRENCY = 'сом';


const body = document.body;
body.append(m.modal);

const cart0 = new Cart(goods0);
const acc0 = new Accordeon(cart0.goodsLabel, cart0.accordeonTotals, cart0.ul, cart0.changeLabelVisibility);
const acc1 = new Accordeon(cart0.accordeonTotalsUnavailable, cart0.accordeonTotalsUnavailable, cart0.ulUnavailable);
acc1.accordeon.classList.add('accordeon_bottom');

body.append(acc0.accordeon, acc1.accordeon);


const del = new Delivery(cart0.dTexts, deliveryPlaces);
cart0.setCallbackForUpdatingDeliveryData(del.updateDeliveryList);

body.append(del.basicContainer);


const pc = new PaymentChoice(cards);

body.append(pc.basicContainer);

const r = new Recipient();

body.append(r.basicContainer);

// body.append(del.deliveryChangeContainer);






//проверка перерисовки через класс контроллер

// import { Delivery } from "./test/Delivery.js";
// import { dc } from "./deliverycontroller.js";

// const del = new Delivery(cart0.deliveryStats);
// const delController = new dc(del.redraw);
// cart0.setCallbackForUpdatingDeliveryData(delController.call);
// console.log(del.trigger);
// body.append(del.trigger);
