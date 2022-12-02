import { dce, joinAdditionalProps} from "./utils.js";

const CURRENCY = 'сом';
const USER_DISCOUNT = 0.1;

export class Good {
    constructor(basicPrice, currentPrice,
        availableAmount, orderedAmount,
        ordered,
        deliveryFirstDate, deliveryLastDate,
        secondAvailableAmount,
        secondDeliveryFirstDate, secondDeliveryLastDate,
        goodID, name, provider, stock,
        deleteCallback, recountCallback, orderCallback,
        imageSrc, checked,
        additionalProps) {

        this.basicPrice = basicPrice;
        this.currentPrice = currentPrice;
        this.availableAmount = availableAmount;
        this.orderedAmount = orderedAmount;
        this.ordered = ordered;
        this.deliveryFirstDate = deliveryFirstDate;
        this.deliveryLastDate = deliveryLastDate;
        this.secondAvailableAmount = secondAvailableAmount;
        this.secondDeliveryFirstDate = secondDeliveryFirstDate;
        this.secondDeliveryLastDate = secondDeliveryLastDate;

        this.goodID = goodID;
        this.name = name;
        this.provider = provider;
        this.stock = stock;

        this.deleteCallback = deleteCallback;
        this.recountCallback = recountCallback;
        this.orderCallback = orderCallback;

        this.imageSrc = imageSrc;
        this.checked = checked;
        this.additionalProps = additionalProps;
        this.createVisuals();

        this.left
    }

    leftAmount = () => {
        return (this.secondAvailableAmount + this.availableAmount) - this.orderedAmount;
    }

    setCallback = (cb) => {
        this.orderCallback = cb;
        // console.log(this.orderCallback);
    }

    setOrdered = (val) => {
        this.ordered = val;
        // console.log(`${this.name} ${this.ordered ? 'is' : 'is not'} ordered`);
        this.orderCallback();
    }

    createVisuals = () => {
        this.card = dce('div', 'good-card');

        this.image = dce('img', 'good-card__image');
        this.image.src = this.imageSrc;
        this.card.append(this.image);

        this.description = dce('div', 'goods-card__description');
        this.nameElement = dce('p', 'goods-card__name');
        this.nameElement.textContent = this.name;
        this.description.append(this.nameElement);

        if (this.additionalProps) {
            this.additionalInfoElement = dce('p', 'goods-card__additional-info');
            this.additionalInfoElement.textContent = joinAdditionalProps(this.additionalProps);
            this.description.append(this.additionalInfoElement);
        }
        this.stockElement = dce('p', 'goods-card__stock');
        this.stockElement.textContent = this.stock;
        this.descriptionBottom = dce('div', 'goods-card__description-bottom');
        this.providerElement = dce('p', 'goods-card__provider');
        this.providerElement.textContent = this.provider.name;

        this.descriptionSpan = dce('span', 'goods-card__description-span');

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('goods-card__description-icon');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <circle cx="10" cy="10" r="7.5" stroke="#9797AF"/>
        <path d="M9.88867 7.58691C9.62826 7.58691 9.41504 7.51042 9.24902 7.35742C9.08301 7.20117 9 7.01074 9 6.78613C9 6.55501 9.08301 6.36621 9.24902 6.21973C9.41504 6.07324 9.62826 6 9.88867 6C10.1523 6 10.3656 6.07324 10.5283 6.21973C10.6943 6.36621 10.7773 6.55501 10.7773 6.78613C10.7773 7.02051 10.6943 7.21257 10.5283 7.3623C10.3656 7.51204 10.1523 7.58691 9.88867 7.58691ZM10.6504 13.3779H9.10742V8.37793H10.6504V13.3779Z" fill="#9797AF"/>
        </g>`;
        this.descriptionSpan.append(svg);
        this.descriptionContainer = dce('div', 'goods-card__description-container');
        this.descriptionContainerName = dce('p', 'goods-card__description-container-name');
        this.descriptionContainerName.textContent = this.provider.name;
        this.descriptionContainerOGRN = dce('p', 'goods-card__description-container-ogrn');
        this.descriptionContainerOGRN.textContent = 'ОГРН: ' + this.provider.ogrn;
        this.descriptionContainerAddress = dce('p', 'goods-card__description-container-address');
        this.descriptionContainerAddress.textContent = this.provider.address;
        this.descriptionContainer.append(this.descriptionContainerName, this.descriptionContainerOGRN, this.descriptionContainerAddress);

        this.descriptionSpan.append(this.descriptionContainer);
        this.descriptionBottom.append(this.providerElement, this.descriptionSpan);

        this.description.append(this.stockElement, this.descriptionBottom);
        this.card.append(this.description);

        this.actions = dce('div', 'goods-card__actions');

        this.actionsWithAmount = dce('div', 'goods-card__actions-with-amount');

        this.actionPlus = dce('a', 'goods-card__actions-plus');
        this.actionPlus.textContent = '+';
        // this.actionPlus.addEventListener('click',() => console.log('i`m clicked!'));
        //TODO: добавить вызов пересчета и подсчет количества


        this.actionAmount = dce('div', 'goods-card__actions-amount');
        this.actionAmount.textContent = this.orderedAmount;

        this.actionMinus = dce('a', 'goods-card__actions-minus');
        this.actionMinus.textContent = '-';
        //TODO: this.actionMinus.addEventListener('click',() => console.log('i`m clicked!'));


        this.actionsWithAmount.append(this.actionMinus, this.actionAmount, this.actionPlus);
        this.actions.append(this.actionsWithAmount);

        this.warning = dce('p', 'goods-card__warning');
        this.warning.textContent = 'Осталось ' + this.leftAmount() + ' шт.';
        this.warning.classList.toggle('goods-card__warning_hidden', this.leftAmount() > 5);

        this.actions.append(this.warning);

        this.actionsBottom = dce('div', 'goods-card__actions-bottom');

        this.actionFav = dce('a', 'goods-card__actions-fav');

        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('goods-card__fav-icon');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03396 4.05857C2.26589 4.75224 1.76684 5.83284 1.99493 7.42928C2.22332 9.02783 3.26494 10.6852 4.80436 12.3478C6.25865 13.9184 8.10962 15.4437 9.99996 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.735 10.6852 17.7766 9.02783 18.005 7.4293C18.233 5.83285 17.734 4.75224 16.9659 4.05856C16.1766 3.34572 15.055 3 14 3C12.1319 3 11.0923 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1582 5.04882 9.84166 5.04882 9.6464 4.85355C9.59641 4.80356 9.54182 4.7466 9.48224 4.68443C8.90757 4.08479 7.86797 3 5.99995 3C4.94495 3 3.82325 3.34573 3.03396 4.05857ZM2.36371 3.31643C3.37369 2.40427 4.75202 2 5.99995 2C8.07123 2 9.34539 3.11257 9.99996 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2668 5.66715 18.9949 7.5707C18.7233 9.47217 17.5149 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87773 18.0333 9.69995 17.9C7.69353 16.3952 5.66443 14.7485 4.0706 13.0272C2.48503 11.3148 1.27665 9.47217 1.00498 7.57072C0.733012 5.66716 1.33249 4.24776 2.36371 3.31643Z" fill="black"/>
        </g>`;
        this.actionFav.append(svg);
        this.actionFav.classList.toggle('goods-card__actions-fav_checked', this.checked);
        this.actionFav.addEventListener('click', () => {
            console.log('fav is clicked');
            this.checked = !this.checked;
            console.log(this.checked);
            this.actionFav.classList.toggle('goods-card__actions-fav_checked', this.checked);
        })
        this.actionsBottom.append(this.actionFav);



        this.actionDelete = dce('a', 'goods-card__actions-delete');

        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('goods-card__delete-icon');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
        </g>`;
        this.actionDelete.append(svg);
        // TODO: добавить вызов deleteCallback
        this.actionsBottom.append(this.actionDelete);

        this.actions.append(this.actionsBottom);

        this.card.append(this.actions);

        this.prices = dce('div', 'goods-card__prices');

        this.pricesTop = dce('div', 'goods-card__prices-top');

        this.pricesCurrent = dce('p', 'goods-card__prices-current');
        this.pricesCurrent.textContent = Math.round(this.currentPrice * this.orderedAmount); //* (1 - USER_DISCOUNT)

        this.pricesCurrency = dce('p', 'goods-card__prices-currency');
        this.pricesCurrency.textContent = CURRENCY;
        this.pricesTop.append(this.pricesCurrent, this.pricesCurrency);

        this.pricesData = dce('div', 'goods-card__prices-data');

        this.pricesPrevious = dce('p', 'goods-card__prices-previous');
        this.pricesPrevious.textContent = Math.round(this.basicPrice * this.orderedAmount) + ' ' + CURRENCY;

        this.pricesData.append(this.pricesPrevious);

        this.pricesDiscounts = dce('div', 'goods-card__prices-discounts');
        this.pricesDiscountsBasicDiscount = dce('div', 'goods-card__prices-basic-discount');
        this.pricesDiscountsBasicDiscountPercent = dce('p', 'goods-card__prices-basic-discount-percent');
        this.pricesDiscountsBasicDiscountPercent.textContent = `Скидка ${Math.round((1 - (this.currentPrice / this.basicPrice)) * 100)}%`;
        this.pricesDiscountsBasicDiscountValue = dce('p', 'goods-card__prices-basic-discount-value');
        this.pricesDiscountsBasicDiscountValue.textContent = `-${this.basicPrice - this.currentPrice} ${CURRENCY}`;
        this.pricesDiscountsBasicDiscount.append(this.pricesDiscountsBasicDiscountPercent, this.pricesDiscountsBasicDiscountValue);

        this.pricesDiscountsUserDiscount = dce('div', 'goods-card__prices-user-discount');
        this.pricesDiscountsUserDiscountPercent = dce('p', 'goods-card__prices-user-discount-percent');
        this.pricesDiscountsUserDiscountPercent.textContent = `Скидка покупателя ${Math.round(100 * USER_DISCOUNT)}%`;
        this.pricesDiscountsUserDiscountValue = dce('p', 'goods-card__prices-user-discount-value');
        this.pricesDiscountsUserDiscountValue.textContent = `-${Math.round(this.basicPrice * USER_DISCOUNT)} ${CURRENCY}`;
        this.pricesDiscountsUserDiscount.append(this.pricesDiscountsUserDiscountPercent, this.pricesDiscountsUserDiscountValue);
        this.pricesDiscounts.append(this.pricesDiscountsBasicDiscount, this.pricesDiscountsUserDiscount);
        this.pricesData.append(this.pricesDiscounts);


        this.prices.append(this.pricesTop, this.pricesData);

        this.card.append(this.prices);


    }


}