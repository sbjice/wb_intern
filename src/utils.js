export const prettifyPrice = (price) => {
    if (price < 1000) return `${price}`;
    else if (price >= 1000 && price < 1000000) {
        const thousands = Math.floor(price / 1000);
        const other = Math.floor(price % 1000).toString().padStart(3, '0');
        return `${thousands} ${other}`;
    } else {
        const millions = Math.floor(price / 1000000);
        const thousands = Math.floor((price % 1000000) / 1000);
        const other = Math.floor(price % 1000).toString().padStart(3, '0');
        return `${millions} ${thousands} ${other}`;
    };
}

export const getWordByAmount = (amount) => {
    if (amount % 10 === 0 || (amount % 10 > 4 && amount % 100 < 21)) return 'товаров';
    else if (amount % 10 > 0 && amount % 10 < 5) return 'товара';
    else return 'товар';

}

export const countTotal = (goods) => {
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

export const dce = (el, cl) => {
    const elem = document.createElement(el);
    if (cl !== undefined) elem.classList.add(cl);
    return elem;
};

export const qs = (sel) => {
    return document.querySelector(sel);
};

export const joinAdditionalProps = (props) => {
    const arr = Object.keys(props).map(k => `${k}: ${props[k]}`);
    return arr.join('   ');
}

export const months = ['января','февраля','марта',
                        'апреля', 'мая', 'июня',
                        'июля', 'августа', 'сентября', 
                        'октября', 'ноября', 'декабря',];

// export const getDateFromString = (str) => {
//     const vals = str.split('.')
//     return {
//         day: +vals[0],
//         month: +vals[1] - 1
//     }
// };

// const dates = [ {
//                 start: '5.02',
//                 end: '6.02'  
//             }, {
//                 start: '5.02',
//                 end: '7.02'  
//             }, {
//                 start: '7.02',
//                 end: '8.02'  
//             }, {
//                 start: '1.02',
//                 end: '2.02'  
//             }];

// datesObj = {};
// group dates of deiveries
// for (date of dates) {
//     if (datesObj[date.start] === undefined) {
//         datesObj[date.start] = [];
//     }
//     datesObj[date.start].push(date);
// }


// export const mapDatesToDatesObj = (dates) => {
//     return dates.map(date => {
//         return {
//             start: getDateFromString(date.start),
//             end: getDateFromString(date.end),
//         }
//     });
// };