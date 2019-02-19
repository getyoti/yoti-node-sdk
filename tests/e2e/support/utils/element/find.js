import { by } from 'protractor';

export const byCssSelector = (cssSelector) => {
    return element(by.css(cssSelector));
};

export const allByCssSelector = (cssSelector) => {
    return element.all(by.css(cssSelector));
};

export const byXPath = (xPath) => {
    return element(by.xpath(xPath));
};

export const byCssContainingText = (cssSelector, text) => {
    return element(by.cssContainingText(cssSelector, text));
};
