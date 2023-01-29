import { Good } from "./Good.js";
import { DeliveryPoint } from "./DeliveryPoint.js";
import { DeliveryAddress } from "./DeliveryAddress.js";
import { PaymentCard } from "./PaymentCard.js";

export const goods0 = [
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

    new Good(475, 247,
        4, 2,
        true,
        '5.02', '6.02',
        0,
        '', '',
        'third', 'Карандаши цветные Faber\u2011Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber\u2011Castell', {
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

export const goods1 = [
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

export const cardImages = {
    mir: {
        src: '../assets/img/card_mir.svg',
        alt: 'mir card alt',
    },
    maestro:{
        src: '../assets/img/card_maestro.svg',
        alt: 'maestro card alt',
    },
    mastercard: {
        src: '../assets/img/card_mastercard.svg',
        alt: 'mastercard card alt',
    },
    visa: {
        src: '../assets/img/card_visa.svg',
        alt: 'visa card alt',
    },
};

export const cardsData = [
    {
        cardNumber: '1234 12•• •••• 1234',
        cardImageSrc: cardImages.mir.src,
        cardImageAlt: cardImages.mir.alt,
        cardDate: '01/30'
    },
    {
        cardNumber: '1234 56•• •••• 2345',
        cardImageSrc: cardImages.visa.src,
        cardImageAlt: cardImages.visa.alt,
        cardDate: '12/25'
    },
    {
        cardNumber: '1234 56•• •••• 3456',
        cardImageSrc: cardImages.mastercard.src,
        cardImageAlt: cardImages.mastercard.alt,
        cardDate: '02/28'
    },
    {
        cardNumber: '1234 56•• •••• 4567',
        cardImageSrc: cardImages.maestro.src,
        cardImageAlt: cardImages.maestro.alt,
        cardDate: '05/23'
    },
];

export const cards = [];

for (let card of cardsData) {
    const c = new PaymentCard(
        card.cardNumber,
        card.cardImageSrc,
        card.cardImageAlt,
        card.cardDate
        );
    cards.push(c);
};


export const months = ['января','февраля','марта',
                        'апреля', 'мая', 'июня',
                        'июля', 'августа', 'сентября', 
                        'октября', 'ноября', 'декабря'];
export const monthsShort = ['янв','фев','мар',
                        'апр', 'май', 'июн',
                        'июл', 'авг', 'сен', 
                        'окт', 'ноя', 'дек'];
                
export const deliveryPoints = [
    new DeliveryPoint('Бишкек',
                        null,
                        'улица Ахматбека Суюмбаева',
                        '12/1',        
                        4.99,
                        10,
                        21),
    new DeliveryPoint('Бишкек',
                        'микрорайон Джал',
                        'улица Ахунбаева Исы',
                        '67/1',        
                        4.99,
                        10,
                        21),
    new DeliveryPoint('Бишкек',
                        null,
                        'улица Табышалиева',
                        '57',        
                        4.99,
                        10,
                        21),
];

export const deliveryAddresses= [
    new DeliveryAddress('Бишкек',
                        'улица Ахматбека Суюмбаева',
                        '12/1'),
    new DeliveryAddress('Бишкек',
                        'улица Жукеева-Пудовкина',
                        '67/1'),
    new DeliveryAddress('Бишкек',
                        'улица Табышалиева',
                        '57'),
];

export const deliveryPlaces = {
    'addresses': deliveryAddresses.slice(),
    'points': deliveryPoints.slice(),
}