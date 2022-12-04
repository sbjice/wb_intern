// import {
//     Good
// } from "./Good.js";
// import {
//     Accordeon
// } from "./Accordeon.js";

import {
    dce,
    countTotal,
    prettifyPrice,
    getWordByAmount
} from "./utils.js";
const CURRENCY = 'сом';

import { months } from "./data.js";



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
    }

    countTotalForCard = () => {
        console.log(this.goods);
        this.totals = countTotal(this.goods);
        this.accordeonTotals.textContent = this.setTotalsText();
        // console.log(this.totals);
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
                let deliveryInterval = good.deliveryFirstDate + '-' + good.deliveryLastDate;
                if (this.deliveryStats[deliveryInterval] === undefined) {
                    this.deliveryStats[deliveryInterval] = [];
                }
                this.deliveryStats[deliveryInterval].push({
                    'good': good,
                    'deliveryAmount': good.availableAmount
                });

                if (good.orderedAmount > good.availableAmount) {
                    deliveryInterval = good.secondDeliveryFirstDate + '-' + good.secondDeliveryLastDate;
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
    }

    generateDeliveryDatesTexts = () => {
        const dTexts = {};
        for (let key of Object.keys(this.deliveryStats)) {
            let [firstDate, secondDate] = key.split('-');
            // console.log(firstDate, secondDate);
            let [firstDateDay, firstDateMonth] = firstDate.split('.');
            let [secondDateDay, secondDateMonth] = secondDate.split('.');

            let firstDateDayNumber = +firstDateDay; 
            let firstDateMonthNumber = +firstDateMonth - 1; 
            let secondDateDayNumber = +secondDateDay; 
            let secondDateMonthNumber = +secondDateMonth - 1; 


            const delString = firstDateMonthNumber === secondDateMonthNumber ? 
                        `${firstDateDayNumber} - ${secondDateDayNumber} ${months[firstDateMonthNumber]}` :
                        `${firstDateDayNumber} ${months[firstDateMonthNumber]} - ${secondDateDayNumber} ${months[secondDateMonthNumber]}`;

            dTexts[delString] = this.deliveryStats[key];

        }
        // console.log(dTexts);
        // console.log(Object.keys(this.deliveryStats).sort((a,b) => {
        //     if (a < b) { return -1; }
        //     if (a > b) { return 1; }
        //     return 0;
        // } ));
        // console.log(Object.keys(this.deliveryStats).sort((a,b) => {
        //     if (a > b) { return -1; }
        //     if (a < b) { return 1; }
        //     return 0;
        // } ));




    }
}