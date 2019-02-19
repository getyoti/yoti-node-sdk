import Page from './page';

const Selectors = {
    LOGIN_BUTTON_SELECTOR: '.nav-bar__button',
    QR_CODE_SELECTOR: 'canvas',
};

class YotiSignPage extends Page {
    async visit() {
        await this.goTo('https://www.yotisign.com');
    }

    get loginButton() {
        return this.elementByCss(Selectors.LOGIN_BUTTON_SELECTOR);
    }

    get qrCode() {
        return this.elementByCss(Selectors.QR_CODE_SELECTOR);
    }
}

export default new YotiSignPage();
