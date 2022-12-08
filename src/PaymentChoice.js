import { dce } from "./utils.js";
import { m } from "./Modal.js";

export class PaymentChoice {
    constructor(cards) {
        if (cards) this.cards = cards;
        if (this.cards) this.selectedCard = this.cards[0];
        else this.selectedCard = null;
        if (this.cards) this.createBasicContainer();
        if (this.cards) {
            for (let card of this.cards) {
                card.setCheckCallback(this.uncheckAllExceptCaller);
            }
        }
        if (this.cards) this.createCardChangeContainer();

        this.basicContainerChangeButton.addEventListener('click', (e) => {
            this.openModalForChanging();
        });
    }


    createBasicContainer = () => {
        this.basicContainer = dce('section', 'payment-choose');
        this.basicContainer.classList.add('payment-choose_basic');
        this.basicContainerTop = dce('div', 'payment-top');
        this.basicContainerHeader = dce('h2', 'section-header')
        this.basicContainerHeader.textContent = 'Способ оплаты';

        this.basicContainerChangeButton = dce('a', 'payment-top__change-button');
        this.basicContainerChangeButton.textContent = 'Изменить';
        
        this.basicContainerTop.append(this.basicContainerHeader, this.basicContainerChangeButton);

        this.basicContainer.append(this.basicContainerTop);


        this.cardData = dce('div', 'payment-data');

        this.cardImage = dce('img', 'payment-data__image');
        this.cardImage.src = this.selectedCard.cardImageSrcValue;
        this.cardImage.alt = this.selectedCard.cardImageAltValue;

        this.cardNumber = dce('span', 'payment-data__number');
        this.cardNumber.textContent = this.selectedCard.cardNumberValue;

        this.cardDate = dce('span', 'payment-data__date');
        this.cardDate.textContent = this.selectedCard.cardDateValue;

        this.cardData.append(this.cardImage, this.cardNumber, this.cardDate);

        this.basicContainer.append(this.cardData);

        this.cardDescription = dce('p', 'payment-description');
        this.cardDescription.textContent = 'Спишем оплату с карты при получении';

        this.basicContainer.append(this.cardDescription);

    }

    redraw = () => {
        this.cardImage.src = this.selectedCard.cardImageSrcValue;
        this.cardImage.alt = this.selectedCard.cardImageAltValue;
        this.cardNumber.textContent = this.selectedCard.cardNumberValue;
        this.cardDate.textContent = this.selectedCard.cardDateValue;
    }

    uncheckAllExceptCaller = (caller) => {
        for (let card of this.cards) {
            if (card !== caller) {
                card.cardCheck.checked = false;
            }
        }
        
    }

    createCardChangeContainer = () => {
        this.cardChangeContainer = dce('div', 'payment-choose');
        this.cardChangeContainer.classList.add('payment-choose_secondary');

        this.cardChangeContainerTop = dce('div', 'payment-top');
        this.cardChangeContainerHeader = dce('h2', 'section-header')
        this.cardChangeContainerHeader.textContent = 'Способ оплаты';

        this.cardChangeContainerCloseButton = dce('a', 'payment-top__close-button');
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add('payment-close');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.innerHTML = `<g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.92961 18.1568C4.53909 18.5473 4.53909 19.1805 4.92961 19.571C5.32014 19.9615 5.9533 19.9615 6.34383 19.571L12.0008 13.914L17.658 19.5711C18.0485 19.9616 18.6817 19.9616 19.0722 19.5711C19.4627 19.1806 19.4627 18.5474 19.0722 18.1569L13.4151 12.4998L19.0717 6.84309C19.4623 6.45257 19.4623 5.8194 19.0717 5.42888C18.6812 5.03835 18.0481 5.03836 17.6575 5.42888L12.0008 11.0856L6.34427 5.42899C5.95374 5.03846 5.32058 5.03846 4.93005 5.42899C4.53953 5.81951 4.53953 6.45267 4.93005 6.8432L10.5866 12.4998L4.92961 18.1568Z" fill="#9797AF"/>
        </g>`;
        this.cardChangeContainerCloseButton.append(svg);
        this.cardChangeContainerCloseButton.addEventListener('click', (e) => {
            e.preventDefault();
            m.closeModal();
        })
        this.cardChangeContainerTop.append(this.cardChangeContainerHeader, this.cardChangeContainerCloseButton);

        this.cardChangeContainer.append(this.cardChangeContainerTop);

        for (let card of this.cards) {
            this.cardChangeContainer.append(card.cardData);
        }

        this.cardChangeContainerChooseButton = dce('a', 'payment__choose-button');
        this.cardChangeContainerChooseButton.textContent = 'Выбрать';

        this.cardChangeContainerChooseButton.addEventListener('click', (e) => {
            e.preventDefault();
            for (let card of this.cards) {
                if (card.cardCheck.checked) {
                    this.selectedCard = card;
                    if (this.changeCallback) this.changeCallback(this.selectedCard);
                    this.redraw();
                    m.closeModal();
                    return;
                }
            }
            m.closeModal();
        });
        this.cardChangeContainer.append(this.cardChangeContainerChooseButton);
    }

    setChangeCallback = (cb) => {
        this.changeCallback = cb;
    }

    openModalForChanging = () => {
        m.appendChild(this.cardChangeContainer);
        m.openModal();
    }


}