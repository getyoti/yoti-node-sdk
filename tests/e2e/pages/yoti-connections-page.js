import Page from './page';

const Selectors = {
    LOGIN_BUTTON_SELECTOR: '.login',
    I_HAVE_YOTI_BUTTON_SELECTOR: '.login-intro__login_button',
    QR_CODE_SELECTOR: '#canvas',
};

class YotiConnectionsPage extends Page {
    async visit() {
        await this.goTo('https://www.yoticonnections.com');
    }

    get loginButton() {
        return this.elementByCss(Selectors.LOGIN_BUTTON_SELECTOR);
    }

    get iHaveYotiButton() {
        return this.elementByCss(Selectors.I_HAVE_YOTI_BUTTON_SELECTOR);
    }

    get qrCode() {
        return this.elementByCss(Selectors.QR_CODE_SELECTOR);
    }
}

export default new YotiConnectionsPage();
