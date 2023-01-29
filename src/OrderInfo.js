import { dce, getWordByAmount, prettifyPrice } from "./utils.js";
import { DeliveryAddress } from "./DeliveryAddress.js";
import { DeliveryPoint } from "./DeliveryPoint.js";

const CURRENCY = 'сом';

export class OrderInfo {
    constructor(totals, delPlace, selectedCard, delTexts) {
        this.totals = totals;
        this.delPlace = delPlace;
        this.selectedCard = selectedCard;
        this.delTexts = delTexts;
        this.createContainer();
    }
    
    createContainer = () => {
        this.basicContainer = dce('aside', 'order-info');
        this.createOrderInfoTotal();
        this.createOrderCostInfo();
        this.createOrderDeliveryInfo();
        this.createOrderPaymentInfo();



        this.basicContainer.append(this.orderInfoTotal, this.orderCostInfo, this.orderDeliveryInfo, this.orderPaymentInfo);
    }

    createOrderInfoTotal = () => {
        this.orderInfoTotal = dce('h2', 'order-info__total');
        this.orderInfoTotal.classList.add('section-header');
        this.orderInfoTotalText = dce('span', 'order-info__total-text');
        this.orderInfoTotalText.textContent = 'Итого';
        this.orderInfoTotalPrice = dce('div', 'order-info__total-price');
        
        this.orderCostTotalPriceNumber = dce('p', 'order-info__cost-total-price-number');
        this.orderCostTotalPriceNumber.textContent = `${prettifyPrice(this.totals.currentPrice)}`;
        
        this.orderCostTotalPriceCurrency = dce('p', 'order-info__cost-total-price-currency');
        this.orderCostTotalPriceCurrency.textContent = `${CURRENCY}`;

        this.orderInfoTotalPrice.append(this.orderCostTotalPriceNumber, this.orderCostTotalPriceCurrency);

        this.orderInfoTotal.append(this.orderInfoTotalText, this.orderInfoTotalPrice);
    }

    createOrderCostInfo = () => {
        this.orderCostInfo = dce('div', 'order-info__cost');

        this.orderCostTotal = dce('div', 'order-info__cost-total');
        this.orderCostTotalAmount = dce('p', 'order-info__cost-total-amount');
        this.orderCostTotalAmount.textContent = `${this.totals.amount} ${getWordByAmount(this.totals.amount)}`;
        // console.log(this.orderCostTotalAmount);

        this.orderCostTotalCost = dce('p', 'order-info__cost-total-cost');
        this.orderCostTotalCost.textContent = `${prettifyPrice(this.totals.basicPrice)} ${CURRENCY}`;

        this.orderCostTotal.append(this.orderCostTotalAmount, this.orderCostTotalCost);

        this.orderCostDiscount = dce('div', 'order-info__cost-discount');
        this.orderCostDiscountText = dce('p', 'order-info__cost-discount-text');
        this.orderCostDiscountText.textContent = `Скидка`;

        this.orderCostDiscountAmount = dce('p', 'order-info__cost-discount-amount');
        this.orderCostDiscountAmount.textContent = `−${prettifyPrice(this.totals.basicPrice - this.totals.currentPrice)} ${CURRENCY}`;

        this.orderCostDiscount.append(this.orderCostDiscountText, this.orderCostDiscountAmount);

        this.orderCostDelivery = dce('div', 'order-info__cost-delivery');
        this.orderCostDeliveryText = dce('p', 'order-info__cost-delivery-text');
        this.orderCostDeliveryText.textContent = `Доставка`;

        this.orderCostDeliveryCost = dce('p', 'order-info__cost-delivery-cost');
        this.orderCostDeliveryCost.textContent = `Бесплатно`;

        this.orderCostDelivery.append(this.orderCostDeliveryText, this.orderCostDeliveryCost);

        this.orderCostInfo.append(this.orderCostTotal, this.orderCostDiscount, this.orderCostDelivery);

    }

    updateOrderCostInfo = (totals) => {
        this.totals = totals;
        this.fillOrderCostInfo();
    }

    fillOrderCostInfo = () => {
        this.orderCostTotalPriceNumber.textContent = `${prettifyPrice(this.totals.currentPrice)}`;
        this.orderCostTotalAmount.textContent = `${this.totals.amount} ${getWordByAmount(this.totals.amount)}`;
        this.orderCostTotalCost.textContent = `${prettifyPrice(this.totals.currentPrice)} ${CURRENCY}`;
        this.orderCostDiscountAmount.textContent = `-${prettifyPrice(this.totals.basicPrice - this.totals.currentPrice)} ${CURRENCY}`;
        if (this.orderPaymentCheckCheckbox.checked){
            this.orderPaymentButtonText.textContent = `Оплатить ${prettifyPrice(this.totals.currentPrice)} ${CURRENCY}`;
        }
    }

    createOrderDeliveryInfo = () => {
        this.orderDeliveryInfo = dce('div', 'order-info__delivery');

        this.orderDeliveryInfoTop = dce('div', 'order-info__delivery-top');
        this.orderDeliveryInfoHeader = dce('h3', 'order-info__delivery-header');
        this.orderDeliveryInfoHeader.textContent = 'Доставка в пункт выдачи';
        this.orderDeliveryInfoButton = dce('a', 'order-info__delivery-button');
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('order-info__delivery-icon');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1585 3.05991L16.9401 6.84154L6.72705 17.0546L2.73544 17.8529C2.38557 17.9229 2.07711 17.6144 2.14709 17.2646L2.94541 13.273L13.1585 3.05991ZM4.17707 13.9321L13.1585 4.95072L15.0493 6.84154L6.06789 15.8229L3.70436 16.2956L4.17707 13.9321Z" fill="#CB11AB"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9948 7.78715L12.2132 4.00552L13.6313 2.5874C14.4145 1.8042 15.6843 1.8042 16.4675 2.5874L17.4129 3.53281C18.1961 4.31601 18.1961 5.58584 17.4129 6.36904L15.9948 7.78715ZM16.4675 5.42363C16.7286 5.16256 16.7286 4.73929 16.4675 4.47822L15.5221 3.53281C15.261 3.27174 14.8378 3.27174 14.5767 3.53281L14.104 4.00552L15.9948 5.89634L16.4675 5.42363Z" fill="#CB11AB"/>
        </g>`;
        this.orderDeliveryInfoButton.append(svg);
        this.orderDeliveryInfoButton .addEventListener('click', (e) => {
            e.preventDefault();
            if (this.callbackForChangingAddress) this.callbackForChangingAddress();
        })

        this.orderDeliveryInfoTop.append(this.orderDeliveryInfoHeader, this.orderDeliveryInfoButton);

        this.orderDeliveryAddress = dce('p', 'order-info__delivery-address');
        this.orderDeliveryAddress.textContent = `${this.delPlace.city},${this.delPlace.district ? ' '+this.delPlace.district+',' : '' } ${this.delPlace.street}, ${this.delPlace.house}`;

        
        this.orderDeliveryDates = dce('ul', 'order-info__delivery-dates');
        // console.log(this.delTexts);
        this.orderDeliveryDatesItems = [];

        for (let key in this.delTexts) {
            const li = dce('li', 'order-info__delivery-date');
            li.textContent = key;
            this.orderDeliveryDatesItems.push(li);
            this.orderDeliveryDates.append(li);
        }
        
        
        this.orderDeliveryAdditionalInfo = dce('div', 'order-info__delivery-additional-info');

        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('order-info__delivery-additional-info-icon');
        svg.setAttribute('width', '22');
        svg.setAttribute('height', '22');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 22 22');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1 10.9998C1 16.5226 5.47715 20.9998 11 20.9998C16.5228 20.9998 21 16.5226 21 10.9998C21 5.47691 16.5228 0.999756 11 0.999756C5.47715 0.999756 1 5.47691 1 10.9998ZM19.1818 10.9997C19.1818 15.5184 15.5187 19.1816 11 19.1816C6.48128 19.1816 2.81815 15.5184 2.81815 10.9997C2.81815 6.48103 6.48128 2.81791 11 2.81791C15.5187 2.81791 19.1818 6.48103 19.1818 10.9997Z" fill="url(#paint0_linear_7_813)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.98273 9.6548C7.40206 9.29538 8.03336 9.34394 8.39278 9.76327L10.6286 12.3717L14.6826 7.58061C15.0394 7.15901 15.6704 7.10643 16.092 7.46317C16.5136 7.81991 16.5662 8.45089 16.2094 8.8725L11.7761 14.1118C11.1795 14.817 10.0933 14.8204 9.49219 14.1191L6.87427 11.0648C6.51485 10.6455 6.56341 10.0142 6.98273 9.6548Z" fill="url(#paint1_linear_7_813)"/>
        <defs>
        <linearGradient id="paint0_linear_7_813" x1="4" y1="1.99994" x2="11" y2="20.9998" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0CD38B"/>
        <stop offset="1" stop-color="#0CB477"/>
        </linearGradient>
        <linearGradient id="paint1_linear_7_813" x1="9" y1="7.5" x2="10.5089" y2="15.8594" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0CD38B"/>
        <stop offset="1" stop-color="#0CB477"/>
        </linearGradient>
        </defs>
        </g>`;

        this.orderDeliveryAdditionalInfoContent= dce('div', 'order-info__delivery-additional-info-content');
        this.orderDeliveryAdditionalInfoText = dce('p', 'order-info__delivery-additional-info-text');
        this.orderDeliveryAdditionalInfoText.textContent = 'Обратная доставка товаров на склад при отказе — ';

        this.orderDeliveryAdditionalInfoSpan = dce('span', 'order-info__delivery-additional-info-span');
        this.orderDeliveryAdditionalInfoSpan.textContent = 'бесплатно';

        this.orderDeliveryAdditionalInfoTooltip = dce('span', 'order-info__delivery-additional-info-tooltip');
        this.orderDeliveryAdditionalInfoTooltip.textContent = 'Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно';
        this.orderDeliveryAdditionalInfoSpan.append(this.orderDeliveryAdditionalInfoTooltip);

        this.orderDeliveryAdditionalInfoContent.append(this.orderDeliveryAdditionalInfoText, this.orderDeliveryAdditionalInfoSpan);
        this.orderDeliveryAdditionalInfo.append(svg, this.orderDeliveryAdditionalInfoContent);

        this.orderDeliveryInfo.append(this.orderDeliveryInfoTop, this.orderDeliveryAddress, this.orderDeliveryDates, this.orderDeliveryAdditionalInfo);
    }

    updateOrderDeliveryInfo = (delPlace) => {
        this.delPlace = delPlace;
        this.fillDeliveryPlaceInfo();
    }

    fillDeliveryPlaceInfo = () => {
        this.orderDeliveryInfoHeader.textContent =  this.delPlace instanceof DeliveryPoint ? 
            'Доставка в пункт выдачи' : 'Доставка курьером';
        this.orderDeliveryAddress.textContent = `${this.delPlace.city},${this.delPlace.district ? ' '+this.delPlace.district+',' : '' } ${this.delPlace.street}, ${this.delPlace.house}`;
    }

    updateOrderDeliveryDates = (delTexts) => {
        this.delTexts = delTexts;
        this.fillDeliveryDates();
    }

    fillDeliveryDates = () => {
        this.orderDeliveryDates.innerHTML = '';
        this.orderDeliveryDatesItems = [];
        for (let key in this.delTexts) {
            const li = dce('li', 'order-info__delivery-date');
            li.textContent = key;
            this.orderDeliveryDatesItems.push(li);
            this.orderDeliveryDates.append(li);
        }
    }

    createOrderPaymentInfo = () => {
        this.orderPaymentInfo = dce('div', 'order-info__payment');

        this.orderPaymentInfoTop = dce('div', 'order-info__payment-info-top');
        this.orderPaymentInfoHeader = dce('h3', 'order-info__payment-info-header');
        this.orderPaymentInfoHeader.textContent = 'Оплата картой';
        this.orderPaymentInfoButton = dce('a', 'order-info__payment-info-button');
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('order-info__payment-icon');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1585 3.05991L16.9401 6.84154L6.72705 17.0546L2.73544 17.8529C2.38557 17.9229 2.07711 17.6144 2.14709 17.2646L2.94541 13.273L13.1585 3.05991ZM4.17707 13.9321L13.1585 4.95072L15.0493 6.84154L6.06789 15.8229L3.70436 16.2956L4.17707 13.9321Z" fill="#CB11AB"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9948 7.78715L12.2132 4.00552L13.6313 2.5874C14.4145 1.8042 15.6843 1.8042 16.4675 2.5874L17.4129 3.53281C18.1961 4.31601 18.1961 5.58584 17.4129 6.36904L15.9948 7.78715ZM16.4675 5.42363C16.7286 5.16256 16.7286 4.73929 16.4675 4.47822L15.5221 3.53281C15.261 3.27174 14.8378 3.27174 14.5767 3.53281L14.104 4.00552L15.9948 5.89634L16.4675 5.42363Z" fill="#CB11AB"/>
        </g>`;
        this.orderPaymentInfoButton.append(svg);
        this.orderPaymentInfoButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.callbackForChangingPayment) this.callbackForChangingPayment();
        })

        this.orderPaymentInfoTop.append(this.orderPaymentInfoHeader, this.orderPaymentInfoButton);

        this.orderPaymentInfoCard = dce('div', 'order-info__payment-card');
        // console.log(this.selectedCard);


        this.orderPaymentInfoImage = dce('img', 'order-info__payment-image');
        this.orderPaymentInfoImage.src = this.selectedCard.cardImageSrcValue;
        this.orderPaymentInfoImage.alt = this.selectedCard.cardImageAltValue;

        this.orderPaymentInfoNumber = dce('p', 'order-info__payment-number');
        this.orderPaymentInfoNumber.textContent = this.selectedCard.cardNumberValue;

        this.orderPaymentInfoCard.append(this.orderPaymentInfoImage, this.orderPaymentInfoNumber);

        this.orderPaymentInfo.append(this.orderPaymentInfoTop, this.orderPaymentInfoCard);


        this.orderPaymentCheckInfo = dce('div', 'order-info__payment-check-info');
        this.orderPaymentCheckLabel = dce('label', 'order-info__payment-check-label');
        this.orderPaymentCheckCheckbox = dce('input', 'order-info__payment-check-checkbox');
        this.orderPaymentCheckCheckbox.type = 'checkbox';
        this.orderPaymentCheckCheckbox.id = 'orderCheckbox';
        this.orderPaymentCheckLabel.forHTML = 'orderCheckbox';
        this.orderPaymentCheckText = dce('span', 'order-info__payment-check-text');
        this.orderPaymentCheckText.textContent = 'Списать оплату сразу';

        this.orderPaymentCheckMessage = dce('p', 'order-info__payment-check-message');
        this.orderPaymentCheckMessage.textContent = 'Спишем оплату с карты при получении';

        this.orderPaymentCheckLabel.append(this.orderPaymentCheckCheckbox, this.orderPaymentCheckText);
        this.orderPaymentCheckInfo.append(this.orderPaymentCheckLabel, this.orderPaymentCheckMessage);

        this.orderPaymentInfo.append(this.orderPaymentCheckInfo);

        this.orderPaymentButton = dce('a', 'order-info__payment-button');
        this.orderPaymentButtonText = dce('p', 'order-info__payment-button-text');

        this.orderPaymentButtonText.textContent = 'Заказать';
        this.orderPaymentButton.append(this.orderPaymentButtonText);

        this.orderPaymentButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.sendOrderCallback) this.sendOrderCallback();
        })

        this.orderPaymentCheckCheckbox.addEventListener('click', () => {
            const checked = this.orderPaymentCheckCheckbox.checked;
            this.orderPaymentButtonText.textContent = checked ? 
                `Оплатить ${prettifyPrice(this.totals.currentPrice)} ${CURRENCY}` : 
                'Заказать';
            this.orderPaymentCheckMessage.classList.toggle('dn', checked);
        });


        this.orderPaymentInfo.append(this.orderPaymentButton);

        this.orderPaymentInfoBottom = dce('div', 'order-info__payment-bottom');
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('order-info__payment-bottom-icon');
        svg.setAttribute('width', '13');
        svg.setAttribute('height', '11');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 13 11');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7656 1.68034L4.59581 10.4815L0.257278 5.66922L1.74272 4.33001L4.61735 7.51853L11.2998 0.319672L12.7656 1.68034Z" fill="black"/>
        </g>`;

        this.orderPaymentInfoBottomSpan = dce('div', 'order-info__payment-bottom-span');
        this.orderPaymentInfoBottomSpanText = dce('p', 'order-info__payment-bottom-span-text');
        this.orderPaymentInfoBottomSpanText.textContent = 'Соглашаюсь с '

        this.orderPaymentInfoBottomSpanLink = dce('a','order-info__payment-bottom-span-link');
        this.orderPaymentInfoBottomSpanLink.textContent = 'правилами пользования торговой площадкой и возврата';

        this.orderPaymentInfoBottomSpan.append(this.orderPaymentInfoBottomSpanText, this.orderPaymentInfoBottomSpanLink);

        this.orderPaymentInfoBottom.append(svg, this.orderPaymentInfoBottomSpan);

        this.orderPaymentInfo.append(this.orderPaymentInfoBottom);

    }

    updateOrderPaymentInfo = (selectedCard) => {
        this.selectedCard = selectedCard;
        this.fillOrderPaymanetInfo();
    }

    fillOrderPaymanetInfo = () => {
        this.orderPaymentInfoImage.src = this.selectedCard.cardImageSrcValue;
        this.orderPaymentInfoImage.alt = this.selectedCard.cardImageAltValue;
        this.orderPaymentInfoNumber.textContent = this.selectedCard.cardNumberValue;
    }

    setCallbackForChangingAddress = (cb) => {
        this.callbackForChangingAddress = cb;
    }

    setCallbackForChangingPayment = (cb) => {
        this.callbackForChangingPayment = cb;
    }

    setSendOrderCallback = (cb) => {
        this.sendOrderCallback = cb;
    }

}