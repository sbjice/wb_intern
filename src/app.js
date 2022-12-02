import { Good } from "./Good.js";
import { Accordeon } from "./Accordeon.js";

import { dce, countTotal, prettifyPrice } from "./utils.js";
import { Cart } from "./Cart.js";

const CURRENCY = 'сом';


const body = document.body;


const goods0 = [
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
    new Good(1051, 522,
        0, 1,
        false,
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
        0, 200,
        false,
        '5.02', '6.02',
        0,
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
        0, 2,
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

const goods1 = [
    new Good(1051, 522,
        3, 1,
        false,
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
        false,
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

const cart0 = new Cart(goods0);
const acc0 = new Accordeon(cart0.goodsLabel, cart0.accordeonTotals, cart0.ul, cart0.changeLabelVisibility);
console.log(cart0.accordeonTotalsUnavailable);

// const cart1 = new Cart(goods1);
const acc1 = new Accordeon(cart0.accordeonTotalsUnavailable, cart0.accordeonTotalsUnavailable, cart0.ulUnavailable);


acc1.accordeon.classList.add('accordeon_bottom');

body.append(acc0.accordeon, acc1.accordeon);
