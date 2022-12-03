import { Accordeon } from "./Accordeon.js";
import { Modal } from "./Modal.js";
import { dce } from "./utils.js";

import { Cart } from "./Cart.js";
import { goods0 } from "./data.js";

const CURRENCY = 'сом';


const body = document.body;


const m = new Modal(null, body);

const cart0 = new Cart(goods0);
const acc0 = new Accordeon(cart0.goodsLabel, cart0.accordeonTotals, cart0.ul, cart0.changeLabelVisibility);


// const cart1 = new Cart(goods1);
const acc1 = new Accordeon(cart0.accordeonTotalsUnavailable, cart0.accordeonTotalsUnavailable, cart0.ulUnavailable);


acc1.accordeon.classList.add('accordeon_bottom');

body.append(acc0.accordeon, acc1.accordeon);

const block = dce('div', 'block');
// body.append(block);
m.appendChild(block);

body.append(m.modal);
m.openModal();
