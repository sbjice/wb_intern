import { dce } from "./utils.js";

export class Accordeon {
    constructor(elementShownOnOpened, elementShownOnClosed, elementForBody, callback) {
        this.elementShownOnOpened = elementShownOnOpened;
        this.elementShownOnClosed = elementShownOnClosed;    
        this.callback = callback;
        this.elementForBody = elementForBody;

        this.accordeon = dce('div', 'accordeon');
        this.accordeonBar = dce('div', 'accordeon-bar');
        this.accordeonLink = dce('a','accordeon-link');
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.classList.add('accordeon-arrow');
        this.svg.setAttribute('width', '20');
        this.svg.setAttribute('height', '20');
        this.svg.setAttribute('fill', 'none');
        this.svg.setAttribute('viewBox', '0 0 20 20');
        this.svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        this.svg.innerHTML = `<g>
        <path d="M17.3417 6.71341C16.966 6.32727 16.3477 6.32112 15.9644 6.6997L10.1418 12.4507C10.0634 12.5282 9.93715 12.5276 9.85945 12.4495L4.15281 6.70958C3.76725 6.32178 3.14293 6.31178 2.74516 6.68704C2.33549 7.07353 2.32163 7.72061 2.71437 8.12429L9.28326 14.876C9.67588 15.2796 10.3241 15.2796 10.7167 14.876L17.3417 8.06665C17.7082 7.69 17.7082 7.09006 17.3417 6.71341Z" fill="#9797AF"/>
        </g>`;
        this.accordeonLink.append(this.svg);
        
        this.accordeonBarLabel = dce('div', 'accordeon-bar-label');
        if (this.elementShownOnOpened) this.accordeonBarLabel.append(this.elementShownOnOpened);
        if (this.elementShownOnClosed) this.accordeonBarLabel.append(this.elementShownOnClosed);

        
        this.accordeonBar.append(this.accordeonBarLabel, this.accordeonLink);

        this.accordeonBody = dce('div', 'accordeon-body');

        this.accordeonLink.addEventListener('click', e => {
            this.accordeonBody.classList.toggle('accordeon-body_open');
            this.accordeonLink.classList.toggle('accordeon-link_open');
            if (this.callback) this.callback();
            // cart.accordeonTotals.classList.toggle('accordeon-totals_hidden');
            // cart.goodsLabel.classList.toggle('goods-label_visible');
        });

        if (this.elementForBody) this.accordeonBody.append(elementForBody);
        this.accordeon.append(this.accordeonBar, this.accordeonBody);
    }

    // в идеале в следующих методах стоит затирать предыдыущие значения свойств
    // и удалять заранее размещенные в компоненте элементы
    // но это потом

    setCallback = (callback) => {
        this.callback = callback;
    }

    setBody = (elementForBody) => {
        this.elementForBody = elementForBody;
    }

    setElementOnOpened = (el) => {
        this.elementShownOnOpened = el;
    }

    setElementOnClosed = (el) => {
        this.elementShownOnClosed = el;
    }
}