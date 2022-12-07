import {
    dce,
    filterPhoneInput,
    validatePhoneInput,
    filterIndexInput
} from "./utils.js";

const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export class Recipient {
    constructor() {
        this.createBasicContainer();
    }

    createBasicContainer = () => {
        this.basicContainer = dce('section', 'recipient');
        this.basicContainerHeader = dce('h2', 'section-header');
        this.basicContainerHeader.classList.add('recipient__header')
        this.basicContainerHeader.textContent = 'Получатель';
        this.basicContainer.append(this.basicContainerHeader);
        this.createForm();
        this.basicContainer.append(this.form);


        // проверочная кнопка для валидации

        // this.a = dce('a', 'validate');
        // this.a.textContent = 'validate';
        // this.a.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     this.validateForm();
        // })
        // this.basicContainer.append(this.a);
    }

    createForm = () => {
        this.form = dce('form', 'recipient__form');
        this.createNameFieldSet();
        this.createSurnameFieldSet();
        this.createEmailFieldSet();
        this.createPhoneFieldSet();
        this.createIndexFieldSet();

        this.form.append(
            this.nameFieldset,
            this.surnameFieldset,
            this.emailFieldset,
            this.phoneFieldset,
            this.indexFieldset,
        );
    }

    createNameFieldSet = () => {
        this.nameFieldset = dce('fieldset', 'recipient-fieldset');
        this.nameFieldset.classList.add('recipient__name-fieldset');

        this.nameLabel = dce('label', 'recipient-label');
        this.nameLabel.classList.add('recipient__name-label');
        this.nameLabel.textContent = 'Имя';

        this.nameInput = dce('input', 'recipient-input');
        this.nameInput.classList.add('recipient__name-input');
        this.nameInput.type = 'text';
        this.nameInput.placeholder = 'Имя';
        this.nameInputValid = true;

        this.nameMessage = dce('p', 'recipient-message');
        this.nameMessage.textContent = 'Укажите имя';

        this.nameInput.addEventListener('input', () => {
            this.showLabelOnFilledInput(this.nameLabel, this.nameInput);
            this.nameInputValid = this.nameInput.value !== '' || this.nameInputValid;
            console.log(this.nameInputValid);
            this.showError(this.nameMessage, this.nameInput, !this.nameInputValid);
        });


        this.nameInput.addEventListener('blur', () => {
            this.nameInputValid = this.nameInput.value !== '';
            this.showError(this.nameMessage, this.nameInput, !this.nameInputValid);
        });

        this.nameFieldset.append(this.nameLabel, this.nameInput, this.nameMessage);
    }

    createSurnameFieldSet = () => {
        this.surnameFieldset = dce('fieldset', 'recipient-fieldset');
        this.surnameFieldset.classList.add('recipient__surname-fieldset');

        this.surnameLabel = dce('label', 'recipient-label');
        this.surnameLabel.classList.add('recipient__surname-label');
        this.surnameLabel.textContent = 'Фамилия';

        this.surnameInput = dce('input', 'recipient-input');
        this.surnameInput.classList.add('recipient__surname-input');
        this.surnameInput.type = 'text';
        this.surnameInput.placeholder = 'Фамилия';
        this.surnameInputValid = true;

        this.surnameMessage = dce('p', 'recipient-message');
        this.surnameMessage.textContent = 'Введите фамилию';

        this.surnameInput.addEventListener('input', () => {
            this.showLabelOnFilledInput(this.surnameLabel, this.surnameInput);
            this.surnameInputValid = this.surnameInput.value !== '' || this.surnameInputValid;
            this.showError(this.surnameMessage, this.surnameInput, !this.surnameInputValid);
        });

        this.surnameInput.addEventListener('blur', () => {
            this.surnameInputValid = this.surnameInput.value !== '';
            this.showError(this.surnameMessage, this.surnameInput, !this.surnameInputValid);
        });


        this.surnameFieldset.append(this.surnameLabel, this.surnameInput, this.surnameMessage);
    }

    createEmailFieldSet = () => {
        this.emailFieldset = dce('fieldset', 'recipient-fieldset');
        this.emailFieldset.classList.add('recipient__email-fieldset');

        this.emailLabel = dce('label', 'recipient-label');
        this.emailLabel.classList.add('recipient__email-label');
        this.emailLabel.textContent = 'Почта';

        this.emailInput = dce('input', 'recipient-input');
        this.emailInput.classList.add('recipient__email-input');
        this.emailInput.type = 'email';
        this.emailInput.placeholder = 'Почта';
        this.emailInputValid = true;


        this.emailMessage = dce('p', 'recipient-message');
        this.emailMessage.textContent = 'Укажите правильную почту';

        this.emailInput.addEventListener('input', () => {
            this.showLabelOnFilledInput(this.emailLabel, this.emailInput);
            this.emailInputValid = this.emailInput.value.match(EMAIL_REGEXP) || this.emailInputValid;
            this.showError(this.emailMessage, this.emailInput, !this.emailInputValid);
        });

        this.emailInput.addEventListener('blur', () => {
            this.emailInputValid = this.emailInput.value.match(EMAIL_REGEXP);
            this.showError(this.emailMessage, this.emailInput, !this.emailInputValid);
        });

        this.emailFieldset.append(this.emailLabel, this.emailInput, this.emailMessage);
    }

    createPhoneFieldSet = () => {
        this.phoneFieldset = dce('fieldset', 'recipient-fieldset');
        this.phoneFieldset.classList.add('recipient__phone-fieldset');

        this.phoneLabel = dce('label', 'recipient-label');
        this.phoneLabel.classList.add('recipient__phone-label');
        this.phoneLabel.textContent = 'Телефон';

        this.phoneInput = dce('input', 'recipient-input');
        this.phoneInput.classList.add('recipient__phone-input');
        this.phoneInput.type = 'text';
        this.phoneInput.placeholder = 'Телефон';
        this.phoneInputValid = true;


        this.phoneMessage = dce('p', 'recipient-message');
        // this.nameMessage.classList.add('recipient-message_error');
        this.phoneMessage.textContent = 'Укажите правильный телефон';

        this.phoneInput.addEventListener('input', () => {
            const filtered = filterPhoneInput(this.phoneInput.value);
            this.phoneInput.value = filtered;
            this.showLabelOnFilledInput(this.phoneLabel, this.phoneInput);
            const isValid = validatePhoneInput(filtered);
            this.phoneInputValid = isValid || this.phoneInputValid;
            this.showError(this.phoneMessage, this.phoneInput, !this.phoneInputValid);
        });

        this.phoneInput.addEventListener('blur', () => {
            const isValid = validatePhoneInput(this.phoneInput.value);
            this.phoneInputValid = isValid;
            this.showError(this.phoneMessage, this.phoneInput, !this.phoneInputValid);
        });

        this.phoneFieldset.append(this.phoneLabel, this.phoneInput, this.phoneMessage);
    }

    createIndexFieldSet = () => {
        this.indexFieldset = dce('fieldset', 'recipient-fieldset');
        this.indexFieldset.classList.add('recipient__phone-fieldset');

        this.indexLabel = dce('label', 'recipient-label');
        this.indexLabel.classList.add('recipient__index-label');
        this.indexLabel.textContent = 'Индекс';

        this.indexInput = dce('input', 'recipient-input');
        this.indexInput.classList.add('recipient__index-input');
        this.indexInput.type = 'text';
        this.indexInput.placeholder = 'Индекс';
        this.indexInputValid = true;

        this.indexMessage = dce('p', 'recipient__index-message');
        // this.nameMessage.classList.add('recipient-message_error');
        this.indexMessage.textContent = 'Укажите индекс';

        this.indexInput.addEventListener('input', () => {
            this.showLabelOnFilledInput(this.indexLabel, this.indexInput);
            if (this.indexInput.value.length > 10) this.indexInput.value = this.indexInput.value.substr(0, 10);
            const filtered = filterIndexInput(this.indexInput.value)
            const isValid = this.indexInput.value === filtered && filtered !== '';
            this.indexInputValid = isValid || this.indexInputValid;
            this.indexInput.classList.toggle('recipient-input_error', !this.indexInputValid);
            this.indexMessage.classList.toggle('recipient__index-message_error', !this.indexInputValid);
            this.indexMessage.textContent = this.indexInputValid ? 'Укажите индекс' : 'Формат: 1234567';
        });

        this.indexInput.addEventListener('blur', () => {
            const filtered = filterIndexInput(this.indexInput.value)
            const isValid = this.indexInput.value === filtered && filtered !== '';
            this.indexInputValid = isValid;
            this.indexInput.classList.toggle('recipient-input_error', !this.indexInputValid);
            this.indexMessage.classList.toggle('recipient__index-message_error', !this.indexInputValid);
            this.indexMessage.textContent = this.indexInputValid ? 'Укажите индекс' : 'Формат: 1234567';
        });

        this.indexFieldset.append(this.indexLabel, this.indexInput, this.indexMessage);
    }

    showLabelOnFilledInput = (label, input) => {
        label.classList.toggle('recipient-label_visible', input.value !== '');
    }

    validateForm = () => {
        this.nameInputValid = this.nameInput.value !== '';
        this.showError(this.nameMessage, this.nameInput, !this.nameInputValid);

        this.surnameInputValid = this.surnameInput.value !== '';
        this.showError(this.surnameMessage, this.surnameInput, !this.surnameInputValid);

        this.emailInputValid = this.emailInput.value.match(EMAIL_REGEXP);
        this.showError(this.emailMessage, this.emailInput, !this.emailInputValid);

        this.phoneInputValid = validatePhoneInput(this.phoneInput.value);
        this.showError(this.phoneMessage, this.phoneInput, !this.phoneInputValid);

        const filtered = filterIndexInput(this.indexInput.value)
        const isValid = this.indexInput.value === filtered && filtered !== '';
        this.indexInputValid = isValid;
        this.indexInput.classList.toggle('recipient-input_error', !this.indexInputValid);
        this.indexMessage.classList.toggle('recipient__index-message_error', !this.indexInputValid);
        this.indexMessage.textContent = this.indexInputValid ? 'Укажите индекс' : 'Формат: 1234567';

    }

    showError = (message, input, condition) => {
        input.classList.toggle('recipient-input_error', condition);
        message.classList.toggle('recipient-message_error', condition);
    }
}