import { dce } from "./utils.js";
import { m } from "./Modal.js";

import { DeliveryAddress } from "./DeliveryAddress.js";
import { DeliveryPoint } from "./DeliveryPoint.js";

export class Delivery {
    constructor(deliveryStats, deliveryPlaces) {
        this.deliveryStats = deliveryStats;
        this.deliveryPlaces = deliveryPlaces;
        this.selectedDeliveryPlace = this.deliveryPlaces['points'][0];
        this.selectedDeliveryPlaceType = this.selectedDeliveryPlace instanceof DeliveryPoint ? 'points' : 'addresses';
        this.createBasicContainer();
        this.createSecondaryContainer();
        this.basicContainerChangeButton.addEventListener('click', () => {
            m.appendChild(this.deliveryChangeContainer);
            m.openModal();
        })
    }

    createBasicContainer = () => {
        this.basicContainer = dce('div', 'delivery');
        this.basicContainer.classList.add('delivery_basic');
        this.basicContainerTop = dce('div', 'delivery-top');
        this.basicContainerHeader = dce('h2', 'section-header')
        this.basicContainerHeader.textContent = 'Способ доставки';


        this.basicContainerChangeButton = dce('a', 'delivery-top__change-button');
        this.basicContainerChangeButton.textContent = 'Изменить';
        
        this.basicContainerTop.append(this.basicContainerHeader, this.basicContainerChangeButton);

        this.basicContainer.append(this.basicContainerTop);

        this.deliveryData = dce('div', 'delivery-data');

        // создать блок пункта заказа
        this.createDeliveryPlaceInfo();
        this.deliveryData.append(this.deliveryPlace);

        this.createDeliveryCostInfo();
        this.deliveryData.append(this.deliveryCost);

        this.basicContainer.append(this.deliveryData);

        this.deliveryList = dce('ul', 'delivery__list');
        this.createDeliveryList();
        this.deliveryData.append(this.deliveryList);
        this.createAdditionalInfo();
        this.deliveryData.append(this.additionalInfo);

    }

    createDeliveryPlaceInfo = () => {
        // блок пункта заказа

        this.deliveryPlace = dce('div', 'delivery-place');
        this.deliveryPlaceTitle = dce('p', 'delivery-place__title');
        this.deliveryPlaceTitle.classList.add('delivery-title', 'del-maw153');
        this.deliveryPlaceTitle.textContent = 'Пункт выдачи';

        // адрес пункта заказа
        this.deliveryPlaceContent = dce('div', 'delivery-place__content');
        this.deliveryPlaceContentAddress = dce('p', 'delivery-place__content-address');
        this.deliveryPlaceContentAddress.textContent = 
                    `${this.selectedDeliveryPlace.city}, ${this.selectedDeliveryPlace.street}, ${this.selectedDeliveryPlace.house}`;

        this.deliveryPlaceContentData = dce('div', 'delivery-place__content-data');

        this.deliveryPlaceContentDataRate = dce('span', 'delivery-place__content-data-rate');

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('delivery-place__content-data-rate-icon');
        svg.setAttribute('width', '12');
        svg.setAttribute('height', '12');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 12 12');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69769 1.14922C6.43817 0.528396 5.56198 0.528387 5.30244 1.14919ZM5.30244 1.14919L4.14719 3.90977L1.19202 4.16613C0.519264 4.22467 0.262282 5.05966 0.759713 5.49464L3.00514 7.45915L2.33207 10.3824C2.18436 11.0238 2.87792 11.5567 3.46133 11.2023L6.00032 9.65611L8.53797 11.2015C9.12269 11.5588 9.81568 11.0227 9.66861 10.3826L8.99549 7.45915L11.2402 5.49537C11.7385 5.05961 11.4793 4.22519 10.8083 4.16667L7.85294 3.91029L6.69769 1.14922" fill="#FF970D"/>
        </g>`;
        this.deliveryPlaceContentDataRateText = dce('p', 'delivery-place__content-data-rate-text');
        this.deliveryPlaceContentDataRateText.textContent = `${this.selectedDeliveryPlace.rate}`;
        this.deliveryPlaceContentDataRate.append(svg, this.deliveryPlaceContentDataRateText);

        this.deliveryPlaceContentDataWorkTime = dce('p', 'delivery-place__content-data-worktime');
        this.deliveryPlaceContentDataWorkTime.textContent = `Ежедневно с ${this.selectedDeliveryPlace.workTimeStart} до ${this.selectedDeliveryPlace.workTimeEnd}`;

        this.deliveryPlaceContentData.append(this.deliveryPlaceContentDataRate, this.deliveryPlaceContentDataWorkTime);


        this.deliveryPlaceContent.append(this.deliveryPlaceContentAddress, this.deliveryPlaceContentData);
        this.deliveryPlace.append(this.deliveryPlaceTitle, this.deliveryPlaceContent);
    }

    createDeliveryCostInfo = () => {
        this.deliveryCost = dce('div', 'delivery-cost');
        this.deliveryCostTitle = dce('p', 'delivery-cost__title');
        this.deliveryCostTitle.classList.add('delivery-title', 'del-maw153');
        this.deliveryCostTitle.textContent = 'Стоимость доставки';

        // адрес пункта заказа
        this.deliveryCostContent = dce('з', 'delivery-cost__content');
        this.deliveryCostContent.textContent = `Бесплатно`;


        this.deliveryCost.append(this.deliveryCostTitle, this.deliveryCostContent);
    }

    createDeliveryList = () => {
        this.deliveryList.innerHTML = '';
        this.deliveryItems = [];
        for (let key in this.deliveryStats) {
            const delItem = this.createDeliveryItem(this.deliveryStats[key], key);
            this.deliveryItems.push(delItem);
            this.deliveryList.append(delItem);
        }
    }

    createDeliveryItem = (delRecord, key) => {
        let delItem = dce('li', 'delivery__list-item');

        const delDate = dce('p', 'delivery__list-item-date');
        delDate.classList.add('delivery-title', 'del-maw153')
        delDate.textContent = `${key}`;

        const delImages = dce('div', 'delivery__list-item-images');
        for (let goodInfo of delRecord) {
            const block = dce('div', 'delivery__list-item-images-block');

            const img = dce('img', 'delivery__list-item-images-image');
            img.src = goodInfo.good.imageSrc;
            if (goodInfo.deliveryAmount > 1) {
                const span = dce('span', 'delivery__list-item-images-data');

                const goodAmountText = dce('p', 'delivery__list-item-images-text');
                goodAmountText.textContent = goodInfo.deliveryAmount;
                span.append(goodAmountText);
    
                block.append(img, span);
            } else {
                block.append(img);
            }


            delImages.append(block);
        }

        delItem.append(delDate, delImages);

        return delItem;

    }

    createAdditionalInfo = () => {
        this.additionalInfo = dce('div', 'delivery__additional-info');

        this.additionalInfoIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.additionalInfoIcon.classList.add('delivery__additional-info-icon');
        this.additionalInfoIcon.setAttribute('width', '22');
        this.additionalInfoIcon.setAttribute('height', '22');
        this.additionalInfoIcon.setAttribute('fill', 'none');
        this.additionalInfoIcon.setAttribute('viewBox', '0 0 22 22');
        this.additionalInfoIcon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        this.additionalInfoIcon.innerHTML = `<g>
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

        this.additionalInfoContent= dce('div', 'delivery__additional-info-content');
        this.additionalInfoText = dce('p', 'delivery__additional-info-text');
        this.additionalInfoText.textContent = 'Обратная доставка товаров на склад при отказе —';

        this.additionalInfoSpan = dce('span', 'delivery__additional-info-span');
        this.additionalInfoSpan.textContent = 'бесплатно';

        this.additionalInfoTooltip = dce('span', 'delivery__additional-info-tooltip');
        this.additionalInfoTooltip.textContent = 'Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно';
        this.additionalInfoSpan.append(this.additionalInfoTooltip);

        this.additionalInfoContent.append(this.additionalInfoText, this.additionalInfoSpan);
        this.additionalInfo.append(this.additionalInfoIcon, this.additionalInfoContent);

    }

    updateDeliveryPlaceInfo = (delPlace) => {
        this.selectedDeliveryPlace = delPlace;
        console.log(delPlace);
        if (this.selectedDeliveryPlaceType === 'points') {
            this.deliveryPlaceTitle.textContent = 'Пункт выдачи';
            this.deliveryPlaceContentData.classList.toggle('dn', false);
            this.deliveryPlaceContentDataRateText.textContent = `${this.selectedDeliveryPlace.rate}`;
            this.deliveryPlaceContentDataWorkTime.textContent = `Ежедневно с ${this.selectedDeliveryPlace.workTimeStart} до ${this.selectedDeliveryPlace.workTimeEnd}`;
        } else {
            this.deliveryPlaceTitle.textContent = 'Адрес доставки';
            this.deliveryPlaceContentData.classList.toggle('dn', true);
        }

        this.deliveryPlaceContentAddress.textContent = 
            `${this.selectedDeliveryPlace.city},${this.selectedDeliveryPlace.district ? ' '+this.selectedDeliveryPlace.district+',' : '' } ${this.selectedDeliveryPlace.street}, ${this.selectedDeliveryPlace.house}`;

    }

    updateDeliveryList = (delStats) => {
        this.deliveryStats = delStats;
        this.createDeliveryList();
    }

    
    createSecondaryContainer = () => {
        this.deliveryChangeContainer = dce('div', 'delivery');
        this.deliveryChangeContainer.classList.add('delivery_secondary');

        this.deliveryChangeContainerTop = dce('div', 'delivery-top');
        this.deliveryChangeContainerHeader = dce('h2', 'section-header')
        this.deliveryChangeContainerHeader.textContent = 'Способ доставки';

        this.deliveryChangeContainerCloseButton = dce('a', 'delivery-top__close-button');
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('delivery-close');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.92961 18.1568C4.53909 18.5473 4.53909 19.1805 4.92961 19.571C5.32014 19.9615 5.9533 19.9615 6.34383 19.571L12.0008 13.914L17.658 19.5711C18.0485 19.9616 18.6817 19.9616 19.0722 19.5711C19.4627 19.1806 19.4627 18.5474 19.0722 18.1569L13.4151 12.4998L19.0717 6.84309C19.4623 6.45257 19.4623 5.8194 19.0717 5.42888C18.6812 5.03835 18.0481 5.03836 17.6575 5.42888L12.0008 11.0856L6.34427 5.42899C5.95374 5.03846 5.32058 5.03846 4.93005 5.42899C4.53953 5.81951 4.53953 6.45267 4.93005 6.8432L10.5866 12.4998L4.92961 18.1568Z" fill="#9797AF"/>
        </g>`;
        this.deliveryChangeContainerCloseButton.append(svg);
        this.deliveryChangeContainerCloseButton.addEventListener('click', (e) => {
            e.preventDefault();
            m.closeModal();
        });
        this.deliveryChangeContainerTop.append(this.deliveryChangeContainerHeader, this.deliveryChangeContainerCloseButton);
        this.deliveryChangeContainer.append(this.deliveryChangeContainerTop);

        this.createDeliveryTypeButtons();
        this.deliveryChangeContainer.append(this.deliveryTypeButtons);

        this.deliveryPlacesElement = dce('div', 'delivery-places');
        this.deliveryPlacesTitle = dce('p', 'delivery-places__title');
        this.deliveryPlacesTitle.textContent = 'Мои адреса';

        this.deliveryPlacesList = dce('ul', 'delivery-places__list');
        this.fillDeliveryPlacesBlock();
        this.deliveryPlacesElement.append(this.deliveryPlacesTitle, this.deliveryPlacesList);
        this.deliveryChangeContainer.append(this.deliveryPlacesElement);


        this.deliveryChangeContainerChooseButton = dce('a', 'delivery__choose-button');
        this.deliveryChangeContainerChooseButton.textContent = 'Выбрать';

        this.deliveryChangeContainerChooseButton.addEventListener('click', (e) => {
            e.preventDefault();
            for (let del of this.delItems) {
                if (del.deliveryCheck.checked) {
                    this.updateDeliveryPlaceInfo(del.delPoint);
                    m.closeModal();
                    return;
                }
            }
            m.closeModal();
        });
        this.deliveryChangeContainer.append(this.deliveryChangeContainerChooseButton);


    }

    createDeliveryTypeButtons = () => {
        this.deliveryTypeButtons = dce('div', 'delivery__type-buttons');

        this.deliveryTypePoint = dce('a', 'delivery__type-buttons-button');
        this.deliveryTypePointText = dce('p', 'delivery__type-buttons-button-text');
        this.deliveryTypePointText.textContent = 'В пункт выдачи';
        this.deliveryTypePoint.append(this.deliveryTypePointText);

        this.deliveryTypeAddress = dce('a', 'delivery__type-buttons-button');
        this.deliveryTypeAddressText = dce('p', 'delivery__type-buttons-button-text');
        this.deliveryTypeAddressText.textContent = 'Курьером';
        this.deliveryTypeAddress.append(this.deliveryTypeAddressText);


        this.deliveryTypePoint.addEventListener('click', () => {
            if (this.selectedDeliveryPlaceType === 'addresses') {
                this.selectedDeliveryPlaceType = 'points';
                this.deliveryTypePoint.classList.toggle('delivery__type-buttons-button_active', true);
                this.deliveryTypeAddress.classList.toggle('delivery__type-buttons-button_active', false);
                this.fillDeliveryPlacesBlock();

            }
        });

        this.deliveryTypeAddress.addEventListener('click', () => {
            if (this.selectedDeliveryPlaceType === 'points') {
                this.selectedDeliveryPlaceType = 'addresses';
                this.deliveryTypeAddress.classList.toggle('delivery__type-buttons-button_active', true);
                this.deliveryTypePoint.classList.toggle('delivery__type-buttons-button_active', false);
                this.fillDeliveryPlacesBlock();
            }
        });


        this.deliveryTypePoint.classList.toggle('delivery__type-buttons-button_active', this.selectedDeliveryPlace instanceof DeliveryPoint);
        this.deliveryTypePoint.classList.toggle('delivery__type-buttons-button_active', this.selectedDeliveryPlace instanceof DeliveryAddress);

        this.deliveryTypeButtons.append(this.deliveryTypePoint, this.deliveryTypeAddress);
    }

    fillDeliveryPlacesBlock = () => {
        this.deliveryPlacesList.innerHTML = '';
        this.delItems = [];
        if (this.selectedDeliveryPlaceType === 'points') {
            for (let delPoint of this.deliveryPlaces.points) {
                const di = this.createDeliveryPointItem(delPoint);
                this.delItems.push(di);
                this.deliveryPlacesList.append(di.deliveryItem);
            }
        } else {
            for (let delPoint of this.deliveryPlaces.addresses) {
                const di = this.createDeliveryAddressItem(delPoint);
                this.delItems.push(di);
                this.deliveryPlacesList.append(di.deliveryItem);
            }
        }
    }

    uncheckAllExceptCaller = (caller) => {
        for (let di of this.delItems) {
            if (di.deliveryCheck !== caller) {
                di.deliveryCheck.checked = false;
            }
        }
    }

    createDeliveryPointItem = (delPoint) => {
        const id = 'del' + new Date().toDateString();
        const deliveryItem = dce('li', 'delivery-places__item');

        const deliveryData = dce('label', 'delivery-data');
        deliveryData.forHTML = id;

        const delCheckBlock = dce('div', 'delivery-data__card-block');

        const deliveryCheck = dce('input', 'delivery-data__card-check');
        deliveryCheck.type = 'checkbox';
        deliveryCheck.id = id;
        deliveryCheck.addEventListener('click', (e) => {
            deliveryCheck.checked = true;
            this.uncheckAllExceptCaller(deliveryCheck);
            // this.updateDeliveryPlaceInfo(delPoint);
        });

        delCheckBlock.append(deliveryCheck);

        const deliveryDescription = dce('div', 'delivery-data__description');
        const deliveryDescriptionAddress = dce('p', 'delivery-data__description-address');
        deliveryDescriptionAddress.textContent = `г. ${delPoint.city},${delPoint.district ? ' '+delPoint.district+',' : '' } ${delPoint.street}, д. ${delPoint.house}`;

        const deliveryDescriptionBottom = dce('div', 'delivery-data__description-bottom');

        const deliveryDescriptionRate = dce('div', 'delivery-data__description-bottom-rate');
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('delivery-data__description-bottom-rate-icon');
        svg.setAttribute('width', '12');
        svg.setAttribute('height', '12');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 12 12');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69769 1.14922C6.43817 0.528396 5.56198 0.528387 5.30244 1.14919ZM5.30244 1.14919L4.14719 3.90977L1.19202 4.16613C0.519264 4.22467 0.262282 5.05966 0.759713 5.49464L3.00514 7.45915L2.33207 10.3824C2.18436 11.0238 2.87792 11.5567 3.46133 11.2023L6.00032 9.65611L8.53797 11.2015C9.12269 11.5588 9.81568 11.0227 9.66861 10.3826L8.99549 7.45915L11.2402 5.49537C11.7385 5.05961 11.4793 4.22519 10.8083 4.16667L7.85294 3.91029L6.69769 1.14922" fill="#FF970D"/>
        </g>`;

        deliveryDescriptionRate.append(svg);
        if (delPoint.rate) {
            const delRate = dce('p', 'delivery-data__description-bottom-rate-text');
            delRate.textContent = delPoint.rate;
            deliveryDescriptionRate.append(delRate);
        }

        const delBottomP = dce('p', 'delivery-data__description-bottom-text');
        delBottomP.textContent = 'Пункт выдачи';
        
        deliveryDescriptionBottom.append(deliveryDescriptionRate,delBottomP);
        deliveryDescription.append(deliveryDescriptionAddress, deliveryDescriptionBottom);

        deliveryData.append(delCheckBlock, deliveryDescription);
        deliveryItem.append(deliveryData);

        const deliveryItemDelete = dce('a', 'delivery-places__item-delete');

        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('delivery-places__item-delete-icon');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#9797AF"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#9797AF"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#9797AF"/>
        </g>`;
        deliveryItemDelete.append(svg);
        deliveryItemDelete.addEventListener('click', (e) => {
            e.preventDefault();
            this.deleteDeliveryPoint(delPoint);
        });

        deliveryItem.append(deliveryItemDelete);

        return ({
            delPoint,
            deliveryItem,
            deliveryCheck,
        });


    }

    createDeliveryAddressItem = (delPoint) => {
        const id = 'del' + new Date().toDateString();
        const deliveryItem = dce('li', 'delivery-places__item');

        const deliveryData = dce('label', 'delivery-data');
        deliveryData.forHTML = id;

        const delCheckBlock = dce('div', 'delivery-data__card-block');

        const deliveryCheck = dce('input', 'delivery-data__card-check');
        deliveryCheck.type = 'checkbox';
        deliveryCheck.id = id;
        deliveryCheck.addEventListener('click', (e) => {
            deliveryCheck.checked = true;
            this.uncheckAllExceptCaller(deliveryCheck);
            // this.updateDeliveryPlaceInfo(delPoint);
        });

        delCheckBlock.append(deliveryCheck);

        // const deliveryDescription = dce('div', 'delivery-data__description');
        const deliveryDescriptionAddress = dce('p', 'delivery-data__description-address');
        deliveryDescriptionAddress.textContent = `${delPoint.city},${delPoint.district ? ' '+delPoint.district+',' : '' } ${delPoint.street}, ${delPoint.house}`;
        // deliveryDescription.ap

        deliveryData.append(delCheckBlock, deliveryDescriptionAddress);
        deliveryItem.append(deliveryData);

        const deliveryItemDelete = dce('a', 'delivery-places__item-delete');

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('delivery-places__item-delete-icon');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#9797AF"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#9797AF"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#9797AF"/>
        </g>`;
        deliveryItemDelete.append(svg);
        deliveryItemDelete.addEventListener('click', (e) => {
            e.preventDefault();
            this.deleteDeliveryPoint(delPoint);
        });

        deliveryItem.append(deliveryItemDelete);

        return ({
            delPoint,
            deliveryItem,
            deliveryCheck,
        });


    }

    deleteDeliveryPoint = (delPoint) => {
        console.log(this.deliveryPlaces);
        this.delItems = this.delItems.filter(item => {
            if (item.delPoint !== delPoint) return item;
            else {
                this.deliveryPlacesList.removeChild(item.deliveryItem);
                return;
            }
        });
        console.log('before:', this.deliveryPlaces);
        console.log('type:', this.selectedDeliveryPlaceType);
        console.log(delPoint)

        this.deliveryPlaces[this.selectedDeliveryPlaceType] = this.deliveryPlaces[this.selectedDeliveryPlaceType].filter(item => {
            return item !== delPoint;
        });

        console.log('after:', this.deliveryPlaces);

    }
}