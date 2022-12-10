import { m } from "./Modal.js";

import { dce, qs } from "./utils.js";
import { goods0, cards, deliveryPlaces } from "./data.js";

import { Accordeon } from "./Accordeon.js";
import { Cart } from "./Cart.js";
import { PaymentChoice } from "./PaymentChoice.js";
import { Delivery } from "./Delivery.js";
import { Recipient } from "./Recipient.js";
import { OrderInfo } from "./OrderInfo.js";

const body = document.body;
body.append(m.modal);

// определение точек для добавления компонентов
const cartContainer = qs('.cart-container');
const appContainer = dce('div', 'app');
const goodsContainer = dce('div', 'goods-container');

const cartHeader = dce('h1', 'cart-header');
cartHeader.textContent = 'Корзина';

// создание экземпляра корзины и аккордеонов для расположения товаров из корзины
const cart0 = new Cart(goods0);
const acc0 = new Accordeon(cart0.goodsLabel, cart0.accordeonTotals, cart0.ul, cart0.changeLabelVisibility);
const acc1 = new Accordeon(cart0.accordeonTotalsUnavailable, cart0.accordeonTotalsUnavailable, cart0.ulUnavailable, null, 'accordeon_bottom');
goodsContainer.append(cartHeader, acc0.accordeon, acc1.accordeon);

// создание экземпляра компонента доставки
const del = new Delivery(cart0.dTexts, deliveryPlaces);
cart0.setCallbackForUpdatingDeliveryData(del.updateDeliveryList);

// создание компонентов: выбора способа оплаты; формы получателя; информации о заказах
const pc = new PaymentChoice(cards);
const r = new Recipient();
const oi = new OrderInfo(cart0.totals, del.selectedDeliveryPlace, pc.selectedCard, cart0.dTexts);

// настройка обмена данными между компонентами
cart0.setCallbackForUpdatingOrderInfo(oi.updateOrderCostInfo);
cart0.setCallbackForUpdatingDeliveryTexts(oi.updateOrderDeliveryDates);
cart0.createOuterCartTooltip('header__nav-link-cart');
cart0.createAnotherOuterCartTooltip('footer-cart');

pc.setChangeCallback(oi.updateOrderPaymentInfo);
del.setCallbackForUpdatingDeliveryInfo(oi.updateOrderDeliveryInfo);

oi.setCallbackForChangingAddress(del.openModalForChanging);
oi.setCallbackForChangingPayment(pc.openModalForChanging);
oi.setSendOrderCallback(r.validateForm);

// размещение компонентов на странице
appContainer.append(goodsContainer, del.basicContainer, pc.basicContainer, r.basicContainer);
cartContainer.append(appContainer, oi.basicContainer);



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

