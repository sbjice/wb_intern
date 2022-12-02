import { Good } from "./Good.js";
import { qs, dce } from "./Good.js";

const CURRENCY = 'сом';

function prettifyPrice(price) {
    if (price < 1000) return `${price}`;
    else if (price >= 1000 && price <1000000) {
        const thousands =  Math.floor(price/1000);
        const other = Math.floor(price % 1000);
        return `${thousands} ${other}`;
    } else {
        const millions = Math.floor(price/1000000);
        const thousands = Math.floor((price%1000000)/1000);
        const other = Math.floor(price % 1000);
        return `${millions} ${thousands} ${other}`;
    };
}

function countTotal(goods) {
    let amount = 0;
    let basicPrice = 0;
    let currentPrice = 0;
    goods.forEach(good => {
        if (good.ordered) {
            amount += good.orderedAmount;
            basicPrice += good.orderedAmount * good.basicPrice;
            currentPrice += good.orderedAmount * good.currentPrice;
        }
    });



    return ({
        amount,
        basicPrice,
        currentPrice
    });
}

const body = document.body;


const goods = [
    new Good(1051, 522,
        3, 1,
        true,
        '5.02', '6.02',
        0,
        '', '',
        'first', 'Футболка UZcotton мужская', {
            name: 'OOO Вайлдберриз',
            ogrn:  '5167746237148',
            address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
        },'Коледино WB',
        null, null, null,
        '../assets/img/shirt.png', true, {'Цвет': 'белый', 'Размер': '56'}
        ),
    
    new Good(11500.235, 10500.235,
        184, 200,
        true,
        '5.02', '6.02',
        25,
        '7.02', '8.02',
        'second', 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe', {
            name: 'OOO Мегапрофстиль',
            ogrn:  '5167746237148',
            address: '129337, Москва, проспект Главных Героев, 2, корпус 1, стр. 1, помещение 2, офис 34',
        },'Коледино WB',
        null, null, null,
        '../assets/img/phone-case.png', false, {'Цвет': 'прозрачный'}
        ),

    new Good(11500.235, 10500.235,
        4, 2,
        true,
        '5.02', '6.02',
        0,
        '', '',
        'third', 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell', {
            name: 'OOO Вайлдберриз',
            ogrn:  '5167746237148',
            address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
        },'Коледино WB',
        null, null, null,
        '../assets/img/pencils.png', false, null
        ),
    

];

const ul = dce('ul', 'goods-list');
const goodsVisuals = [];

for(const good of goods) {
    // console.log(good);
    const li = dce('li', 'goods-li');
    const goodCheckbox = dce('input', 'goods-checkbox');
    goodCheckbox.type = 'checkbox';
    goodCheckbox.addEventListener('change', (e) => {
        good.setOrdered(goodCheckbox.checked);
    });
    goodCheckbox.checked = good.ordered;
    li.append(goodCheckbox, good.card);
    goodsVisuals.push({goodCheckbox, good});
    ul.append(li);
}

// чекбокс для выбора всех товаров

const goodsCheckbox = dce('input', 'goods-checkbox');
goodsCheckbox.type = 'checkbox';
goodsCheckbox.id = 'allGoods';
goodsCheckbox.addEventListener('change', (e) => {
    goodsVisuals.forEach(goodItem => {
        goodItem.goodCheckbox.checked = goodsCheckbox.checked;
        goodItem.good.setOrdered(goodsCheckbox.checked);
    })
});

// текст с ценой и количеством товаров
const accordeonTotals = dce('p', 'accordeon-totals');
const totals = countTotal(goods);

accordeonTotals.textContent = `${totals.amount} товаров · ${prettifyPrice(totals.currentPrice)} ${CURRENCY}`


// создание лейбла для чекбокса всех товаров
const goodsLabel= dce('label', 'goods-label');
goodsLabel.htmlFor = 'allGoods';

const goodsSpan = dce('span', 'goods-span');
goodsSpan.textContent = 'Выбрать все';
goodsLabel.append(goodsCheckbox, goodsSpan);


const accordeon = dce('div', 'accordeon');
const accordeonBar = dce('div', 'accordeon-bar');
const accordeonLink = dce('a','accordeon-link');
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.classList.add('accordeon-arrow');
svg.setAttribute('width', '20');
svg.setAttribute('height', '20');
svg.setAttribute('fill', 'none');
svg.setAttribute('viewBox', '0 0 20 20');
svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
svg.innerHTML = `<g>
<path d="M17.3417 6.71341C16.966 6.32727 16.3477 6.32112 15.9644 6.6997L10.1418 12.4507C10.0634 12.5282 9.93715 12.5276 9.85945 12.4495L4.15281 6.70958C3.76725 6.32178 3.14293 6.31178 2.74516 6.68704C2.33549 7.07353 2.32163 7.72061 2.71437 8.12429L9.28326 14.876C9.67588 15.2796 10.3241 15.2796 10.7167 14.876L17.3417 8.06665C17.7082 7.69 17.7082 7.09006 17.3417 6.71341Z" fill="#9797AF"/>
</g>`;
accordeonLink.append(svg);
accordeonBar.append(goodsLabel, accordeonTotals, accordeonLink);

const accordeonBody = dce('div', 'accordeon-body');

accordeonLink.addEventListener('click', e => {
    accordeonBody.classList.toggle('accordeon-body_open');
    accordeonLink.classList.toggle('accordeon-link_open');
    accordeonTotals.classList.toggle('accordeon-totals_hidden');
    goodsLabel.classList.toggle('goods-label_visible');
});

accordeonBody.append(ul);
accordeon.append(accordeonBar, accordeonBody);







body.append(accordeon);
