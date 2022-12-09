import { m } from "./Modal.js";
import { Accordeon } from "./Accordeon.js";

import { goods0, cards, deliveryPlaces } from "./data.js";

import { Cart } from "./Cart.js";
import { PaymentChoice } from "./PaymentChoice.js";
import { Delivery } from "./Delivery.js";
import { Recipient } from "./Recipient.js";
import { OrderInfo } from "./OrderInfo.js";
import { dce, qs } from "./utils.js";

const body = document.body;
body.append(m.modal);

const cartContainer = qs('.cart-container');
const appContainer = dce('div', 'app');
const goodsContainer = dce('div', 'goods-container');

const cartHeader = dce('h1', 'cart-header');
cartHeader.textContent = 'Корзина';

const cart0 = new Cart(goods0);
const acc0 = new Accordeon(cart0.goodsLabel, cart0.accordeonTotals, cart0.ul, cart0.changeLabelVisibility);
const acc1 = new Accordeon(cart0.accordeonTotalsUnavailable, cart0.accordeonTotalsUnavailable, cart0.ulUnavailable, null, 'accordeon_bottom');
goodsContainer.append(cartHeader, acc0.accordeon, acc1.accordeon);

const del = new Delivery(cart0.dTexts, deliveryPlaces);
cart0.setCallbackForUpdatingDeliveryData(del.updateDeliveryList);

const pc = new PaymentChoice(cards);
const r = new Recipient();
const oi = new OrderInfo(cart0.totals, del.selectedDeliveryPlace, pc.selectedCard, cart0.dTexts);

cart0.setCallbackForUpdatingOrderInfo(oi.updateOrderCostInfo);
cart0.setCallbackForUpdatingDeliveryTexts(oi.updateOrderDeliveryDates);
pc.setChangeCallback(oi.updateOrderPaymentInfo);
del.setCallbackForUpdatingDeliveryInfo(oi.updateOrderDeliveryInfo);

oi.setCallbackForChangingAddress(del.openModalForChanging);
oi.setCallbackForChangingPayment(pc.openModalForChanging);


appContainer.append(goodsContainer, del.basicContainer, pc.basicContainer, r.basicContainer);
cartContainer.append(appContainer, oi.basicContainer);
acc0.accordeonLink.click();
acc1.accordeonLink.click();



/*
проверка перерисовки через класс контроллер

import { Delivery } from "./test/Delivery.js";
import { dc } from "./deliverycontroller.js";

const del = new Delivery(cart0.deliveryStats);
const delController = new dc(del.redraw);
cart0.setCallbackForUpdatingDeliveryData(delController.call);
console.log(del.trigger);
body.append(del.trigger);
*/

