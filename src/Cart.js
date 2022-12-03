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
}