import { dce } from "./utils.js";

class Modal {
    constructor(child, body) {
        this.child = child;
        this.outerBody = body;
        this.modal = dce('div', 'modal');
        this.createOverlay();
        this.createContainer();
    }

    createOverlay = () => {
        this.overlay = dce('div', 'modal-overlay');
        this.modal.append(this.overlay);
        this.overlay.addEventListener('click', (e) => {
            this.closeModal();
        });
    }

    createContainer = () => {
        this.container = dce('div', 'modal-container');
        this.overlay.append(this.container);
        this.container.addEventListener('click', (e) => {
            e.stopPropagation();
        })
    }

    openModal = () => {
        this.modal.classList.toggle('modal_shown', true);
        if (this.outerBody) this.outerBody.classList.toggle('no-overflow', true);
    }

    closeModal = () => {
        this.modal.classList.toggle('modal_shown', false);
        if (this.outerBody) this.outerBody.classList.toggle('no-overflow', false);
    }

    appendChild(child) {
        this.child = child;
        this.container.innerHTML = '';
        this.container.append(this.child);
    }
}

export const m = new Modal(null, document.body);