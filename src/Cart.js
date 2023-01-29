import {
    dce,
    qs,
    countTotal,
    prettifyPrice,
    getWordByAmount
} from "./utils.js";
const CURRENCY = 'сом';

import { months, monthsShort } from "./data.js";

const DATE_SEPARATOR = '\u{02014}';



export class Cart {
    constructor(goods) {
        this.goods = goods.slice();
        this.goodsVisuals = [];
        this.goodsVisualsUnavailable = [];

        this.ul = dce('ul', 'goods-list');
        this.ulUnavailable = dce('ul', 'goods-list');

        this.accordeonTotalsUnavailable = dce('p', 'accordeon-totals');

        this.fillGoodsVisuals();

        this.goodsCheckbox = dce('input', 'goods-checkbox');
        this.goodsCheckbox.type = 'checkbox';
        this.goodsCheckbox.id = 'allGoods';
        this.goodsCheckbox.addEventListener('change', (e) => {
            this.goodsVisuals.forEach(goodItem => {
                goodItem.goodCheckbox.checked = this.goodsCheckbox.checked;
                goodItem.good.setOrdered(this.goodsCheckbox.checked);
            })
        });

        // текст с ценой и количеством товаров для аккордеона
        this.accordeonTotals = dce('p', 'accordeon-totals');

        this.outerCart = null;
        this.outerCartTooltip = dce('div');
        this.outerCartTooltipText = dce('p');
        this.outerCartTooltip.append(this.outerCartTooltipText);

        this.anotherOuterCart = null;
        this.anotherOuterCartTooltip = dce('div');
        this.anotherOuterCartTooltipText = dce('p');
        this.anotherOuterCartTooltip.append(this.anotherOuterCartTooltipText);


        this.totals = countTotal(this.goods);
        this.accordeonTotals.textContent = this.setTotalsText();

        this.goodsLabel = dce('label', 'goods-label');
        this.goodsLabel.htmlFor = 'allGoods';

        this.goodsSpan = dce('span', 'goods-span');
        this.goodsSpan.textContent = 'Выбрать все';
        this.goodsLabel.append(this.goodsCheckbox, this.goodsSpan);
        this.countDeliveryStats();
        // console.log(this.deliveryStats);
        this.generateDeliveryDatesTexts();
        this.generateDeliveryDatesForDeliveryInfo();
    }

    countTotalForCard = () => {
        this.totals = countTotal(this.goods);
        this.accordeonTotals.textContent = this.setTotalsText();
        this.countDeliveryStats();
        this.outerCartTooltipText.textContent = this.totals.amount;
        this.outerCartTooltip.classList.toggle('dn', this.totals.amount === 0);
        this.anotherOuterCartTooltipText.textContent = this.totals.amount;
        this.anotherOuterCartTooltip.classList.toggle('dn', this.totals.amount === 0);
        if (this.callbackForUpdatingOrderInfo) this.callbackForUpdatingOrderInfo(this.totals);
    }

    setTotalsText = () => {
        return `${this.totals.amount} ${getWordByAmount(this.totals.amount)} · ${prettifyPrice(this.totals.currentPrice)} ${CURRENCY}`;
    }

    fillList = (arr, itemsList, visualsList, callback, deleteCallback) => {
        for (let good of arr) {
            if (callback) good.setCallback(callback);
            if (deleteCallback) good.setDeleteCallback(deleteCallback);

            const li = dce('li', 'goods-li');

            const goodCheckbox = dce('input', 'goods-checkbox');
            goodCheckbox.type = 'checkbox';
            goodCheckbox.addEventListener('change', (e) => {
                good.setOrdered(goodCheckbox.checked);
            });

            goodCheckbox.checked = good.ordered;
            li.append(goodCheckbox, good.card);
            visualsList.push({
                goodCheckbox,
                good,
                li
            });
            itemsList.append(li);
        }
    }

    fillGoodsVisuals = () => {
        this.getAvailableItems();
        this.getUnavailableItems();

        if (this.availableGoods.length) {
            this.fillList(this.availableGoods,
                this.ul,
                this.goodsVisuals,
                this.countTotalForCard,
                this.deleteGood);
        }

        if (this.unavailableGoods.length) {
            this.fillList(this.unavailableGoods,
                this.ulUnavailable,
                this.goodsVisualsUnavailable,
                null,
                this.deleteGood);
        }

        this.setTextForUnavailableItems();
    }

    getAvailableItems = () => {
        this.availableGoods = this.goods
            .filter(good => {
                return (good.availableAmount + good.secondAvailableAmount) > 0;
            });
    }

    getUnavailableItems = () => {
        this.unavailableGoods = this.goods
            .filter(good => {
                return (good.availableAmount + good.secondAvailableAmount) === 0;
            });
    }

    setTextForUnavailableItems = () => {
        this.accordeonTotalsUnavailable.textContent = this.unavailableGoods.length ? 
                    `Отсутствуют · ${this.unavailableGoods.length} ${getWordByAmount(this.unavailableGoods.length)}` : '';
    }

    changeLabelVisibility = () => {
        this.accordeonTotals.classList.toggle('accordeon-totals_hidden');
        this.goodsLabel.classList.toggle('goods-label_visible');
    }

    deleteGood = (good) => {

        this.goods = this.goods.filter(item => {
            return item !== good;
        });


        // удаление li из списка
        this.goodsVisuals.forEach(item => {
            if (item.good.card === good.card) this.ul.removeChild(item.li);
        });

        this.goodsVisuals = this.goodsVisuals.filter(item => {
            return item.good !== good;
        });



        this.countTotalForCard();
        


        this.goodsVisualsUnavailable.forEach(item => {
            if (item.good.card === good.card) this.ulUnavailable.removeChild(item.li);
        });

        this.goodsVisualsUnavailable = this.goodsVisualsUnavailable.filter(item => {
            return item.good !== good;
        });
        
        this.getUnavailableItems();

        this.setTextForUnavailableItems();
    }

    countDeliveryStats = () => {
        this.deliveryStats = {};
        for (let good of this.goods) {
            if((good.availableAmount + good.secondAvailableAmount) > 0 
                && good.ordered) {
                let deliveryInterval = good.deliveryFirstDate + DATE_SEPARATOR + good.deliveryLastDate;
                if (this.deliveryStats[deliveryInterval] === undefined) {
                    this.deliveryStats[deliveryInterval] = [];
                }
                this.deliveryStats[deliveryInterval].push({
                    'good': good,
                    'deliveryAmount': good.orderedAmount > good.availableAmount ? good.availableAmount : good.orderedAmount,
                });

                if (good.orderedAmount > good.availableAmount) {
                    deliveryInterval = good.secondDeliveryFirstDate + DATE_SEPARATOR + good.secondDeliveryLastDate;
                    if (this.deliveryStats[deliveryInterval] === undefined) {
                        this.deliveryStats[deliveryInterval] = [];
                    }
                    this.deliveryStats[deliveryInterval].push({
                        'good': good,
                        'deliveryAmount': good.orderedAmount - good.availableAmount,
                    });
                }

            }

            
        }
        this.generateDeliveryDatesTexts();
        this.generateDeliveryDatesForDeliveryInfo();
        if (this.callbackForUpdatingDeliveryData) this.callbackForUpdatingDeliveryData(this.dTexts);
        if (this.callbackForUpdatingDeliveryTexts) this.callbackForUpdatingDeliveryTexts(this.dInfoTexts);

        // if (this.callbackForUpdatingDeliveryData) this.callbackForUpdatingDeliveryData(this.deliveryStats);
    }

    generateDeliveryDatesTexts = () => {
        this.dTexts = {};
        for (let key of Object.keys(this.deliveryStats)) {
            // console.log(key);
            let [firstDate, secondDate] = key.split(DATE_SEPARATOR);
            // console.log(firstDate, secondDate);
            let [firstDateDay, firstDateMonth] = firstDate.split('.');
            let [secondDateDay, secondDateMonth] = secondDate.split('.');

            let firstDateDayNumber = +firstDateDay; 
            let firstDateMonthNumber = +firstDateMonth - 1; 
            let secondDateDayNumber = +secondDateDay; 
            let secondDateMonthNumber = +secondDateMonth - 1; 


            const delString = firstDateMonthNumber === secondDateMonthNumber ? 
                        `${firstDateDayNumber}\u{02014}${secondDateDayNumber} ${months[firstDateMonthNumber]}` :
                        `${firstDateDayNumber} ${months[firstDateMonthNumber]}\\U+02014${secondDateDayNumber} ${months[secondDateMonthNumber]}`;

                        this.dTexts[delString] = this.deliveryStats[key];

        }

    }

    generateDeliveryDatesForDeliveryInfo = () => {
        this.dInfoTexts = {};
        for (let key of Object.keys(this.deliveryStats)) {
            // console.log(key);
            let [firstDate, secondDate] = key.split(DATE_SEPARATOR);
            // console.log(firstDate, secondDate);
            let [firstDateDay, firstDateMonth] = firstDate.split('.');
            let [secondDateDay, secondDateMonth] = secondDate.split('.');

            let firstDateDayNumber = +firstDateDay; 
            let firstDateMonthNumber = +firstDateMonth - 1; 
            let secondDateDayNumber = +secondDateDay; 
            let secondDateMonthNumber = +secondDateMonth - 1; 


            const delString = firstDateMonthNumber === secondDateMonthNumber ? 
                        `${firstDateDayNumber}-${secondDateDayNumber} ${monthsShort[firstDateMonthNumber]}` :
                        `${firstDateDayNumber} ${monthsShort[firstDateMonthNumber]}-${secondDateDayNumber} ${monthsShort[secondDateMonthNumber]}`;

                        this.dInfoTexts[delString] = this.deliveryStats[key];

        }
    }


    setCallbackForUpdatingDeliveryData = (cb) => {
        this.callbackForUpdatingDeliveryData = cb;
    }

    setCallbackForUpdatingOrderInfo = (cb) => {
        this.callbackForUpdatingOrderInfo = cb;
    }

    setCallbackForUpdatingDeliveryTexts = (cb) => {
        this.callbackForUpdatingDeliveryTexts = cb;
    }

    createOuterCartTooltip = (className) => {
        this.outerCart = qs(`.${className}`);

        this.outerCartTooltip.classList.add(`${className}-tooltip`);
        this.outerCartTooltipText.classList.add(`${className}-tooltip-text`);

        this.outerCart.append(this.outerCartTooltip);
        this.outerCartTooltipText.textContent = this.totals.amount;
    }

    createAnotherOuterCartTooltip = (className) => {
        this.anotherOuterCart = qs(`.${className}`);

        this.anotherOuterCartTooltip.classList.add(`${className}-tooltip`);
        this.anotherOuterCartTooltipText.classList.add(`${className}-tooltip-text`);

        this.anotherOuterCart.append(this.anotherOuterCartTooltip);
        this.anotherOuterCartTooltipText.textContent = this.totals.amount;
    }
    
}