import { dce } from "./utils.js";
export class PaymentCard {
    constructor (cardNumber, cardImageSrc, cardImageAlt, cardDate, checkCallback) {
        this.cardNumberValue = cardNumber;
        this.cardImageSrcValue = cardImageSrc;
        this.cardImageAltValue = cardImageAlt;
        this.cardDateValue = cardDate;
        if (checkCallback) this.checkCallback = checkCallback;

        // Костыль для опеределения уникального идентификатора
        this.id = new Date().toString();

        this.cardData = dce('label', 'payment-data');
        this.cardData.forHTML = this.id;

        this.cardCheck = dce('input', 'payment-data__card-check');
        this.cardCheck.type = 'checkbox';
        this.cardCheck.id = this.id;


        this.cardImage = dce('img', 'payment-data__image');
        this.cardImage.src = cardImageSrc;
        this.cardImage.alt = cardImageAlt;

        this.cardNumber = dce('span', 'payment-data__number');
        this.cardNumber.textContent = cardNumber;

        this.cardDate = dce('span', 'payment-data__date');
        this.cardDate.textContent = cardDate;
        this.cardDate.classList.add('dn');


        this.cardData.append(this.cardCheck, this.cardImage, this.cardNumber, this.cardDate);
    }

    setCheckCallback = (cb) => {
        if (this.checkCallback !== null) this.cardCheck.removeEventListener('click', this.checkCallback);
        this.checkCallback = cb;
        this.cardCheck.addEventListener('click', (e) => {
            this.cardCheck.checked = true;
            this.checkCallback(this);
        });
    }


    showDate = () => {
        this.cardDate.classList.remove('dn');
    }




}