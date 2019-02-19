import * as wait from '../support/utils/element/wait';
import * as action from '../support/utils/element/action';
import * as find from '../support/utils/element/find';

export default class Page {
    goTo(url) {
        return browser.get(url);
    }
    elementByCss(cssSelector) {
        return find.byCssSelector(cssSelector);
    }
    allElementsByCss(cssSelector) {
        return find.allByCssSelector(cssSelector);
    }
    elementByCssContainingText(cssSelector, text) {
        return find.byCssContainingText(cssSelector, text);
    }
    waitUntilPresent(element) {
        return wait.untilPresent(element);
    }
    waitUntilVisible(element) {
        return wait.untilVisible(element);
    }
    waitUntilStale(element) {
        return wait.untilStale(element);
    }
    waitUntilClickable(element) {
        return wait.untilClickable(element);
    }
    waitUntilAllClickable(elementArray) {
        return wait.untilAllClickable(elementArray);
    }
    waitUntilTextPresent(element, text) {
        return wait.untilTextPresent(element, text);
    }
    clickAll(elementArray) {
        return action.clickAll(elementArray);
    }
    useScriptToClick(element) {
        return action.useScriptToClick(element);
    }
}
