import { Good } from "./Good.js";
import { qs, dce } from "./Good.js";

const body = document.body;


const g = new Good(11500.235, 10500.235,
    184, 200,
    '5.02', '6.02',
    25,
    '7.02', '8.02',
    'first', 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe','OOO Мегапрофстиль','Коледино WB',
    null, null,
    '../assets/img/phone-case.png', true, {'Цвет': 'Прозрачный'}
    );

body.append(g.card);
